import { NextResponse } from 'next/server';
import type { PortfolioProject } from '@/lib/portfolio-data';
import { projects as staticProjects } from '@/lib/projects-data';

const GIST_ID    = process.env.NEXT_PUBLIC_GIST_ID;
const GIST_TOKEN = process.env.GIST_TOKEN;
const GIST_FILE  = 'portfolio.json';
const VAULT_FILE = 'vault.json';
const GIST_API   = `https://api.github.com/gists/${GIST_ID}`;

function authHeaders() {
  return {
    Authorization: `Bearer ${GIST_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
  };
}

async function readGist() {
  if (!GIST_ID || !GIST_TOKEN) throw new Error('Gist env vars not set');
  const res = await fetch(GIST_API, { headers: authHeaders(), cache: 'no-store' });
  if (!res.ok) throw new Error(`GitHub read error ${res.status}`);
  return res.json();
}

async function readProjects(): Promise<PortfolioProject[]> {
  const gist = await readGist();
  try {
    return JSON.parse(gist.files?.[GIST_FILE]?.content ?? '[]') as PortfolioProject[];
  } catch {
    return [];
  }
}

async function writeProjects(projects: PortfolioProject[]): Promise<void> {
  const res = await fetch(GIST_API, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({
      files: { [GIST_FILE]: { content: JSON.stringify(projects, null, 2) } },
    }),
  });
  if (!res.ok) throw new Error(`GitHub write error ${res.status}`);
}

// GET — public, returns all projects sorted by order
export async function GET() {
  try {
    const projects = await readProjects();
    return NextResponse.json(projects.sort((a, b) => a.order - b.order));
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// POST — CRUD for dashboard
type Action =
  | { action: 'add';             data: Omit<PortfolioProject, 'id' | 'createdAt'> }
  | { action: 'update';          id: string; data: Partial<Omit<PortfolioProject, 'id' | 'createdAt'>> }
  | { action: 'delete';          id: string }
  | { action: 'reorder';         ids: string[] }
  | { action: 'seed-from-vault' }
  | { action: 'seed-from-static' };

export async function POST(request: Request) {
  try {
    const body: Action = await request.json();
    const projects = await readProjects();

    switch (body.action) {

      case 'add': {
        const next: PortfolioProject = {
          ...body.data,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          order: body.data.order ?? projects.length,
        };
        projects.push(next);
        await writeProjects(projects);
        return NextResponse.json(next, { status: 201 });
      }

      case 'update': {
        const idx = projects.findIndex(p => p.id === body.id);
        if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        projects[idx] = { ...projects[idx], ...body.data, id: body.id };
        await writeProjects(projects);
        return NextResponse.json(projects[idx]);
      }

      case 'delete': {
        const filtered = projects.filter(p => p.id !== body.id);
        if (filtered.length === projects.length)
          return NextResponse.json({ error: 'Not found' }, { status: 404 });
        await writeProjects(filtered);
        return NextResponse.json({ success: true });
      }

      case 'reorder': {
        const map = new Map(projects.map(p => [p.id, p]));
        const reordered = body.ids
          .map((id, i) => map.has(id) ? { ...map.get(id)!, order: i } : null)
          .filter(Boolean) as PortfolioProject[];
        await writeProjects(reordered);
        return NextResponse.json({ success: true });
      }

      // استيراد من الـ vault (Gist)
      case 'seed-from-vault': {
        const gist = await readGist();
        type VaultProject = {
          id?: string; name: string; nameEn: string; description: string;
          tech: string[]; links: { label: string; url: string }[];
          featured: boolean; status: string;
        };
        let vaultProjects: VaultProject[] = [];
        try {
          vaultProjects = JSON.parse(gist.files?.[VAULT_FILE]?.content ?? '[]');
        } catch { /* empty */ }

        const existingNames = new Set(projects.map(p => p.nameEn.toLowerCase()));
        let added = 0;

        for (const [i, vp] of vaultProjects.entries()) {
          if (existingNames.has(vp.nameEn.toLowerCase())) continue;
          const live   = vp.links.find(l => l.label === 'Live')?.url   ?? '';
          const github = vp.links.find(l => l.label === 'GitHub')?.url ?? '';
          const newP: PortfolioProject = {
            id: crypto.randomUUID(),
            nameAr: vp.name,
            nameEn: vp.nameEn,
            descriptionAr: vp.description,
            descriptionEn: '',
            tech: vp.tech,
            liveUrl: live,
            githubUrl: github,
            imageUrl: '',
            category: 'fullstack',
            tags: [],
            featured: vp.featured,
            order: projects.length + i,
            createdAt: new Date().toISOString(),
          };
          projects.push(newP);
          added++;
        }

        await writeProjects(projects);
        return NextResponse.json({ added, total: projects.length });
      }

      // استيراد من الملف الثابت
      case 'seed-from-static': {
        const existingNames = new Set(projects.map(p => p.nameEn.toLowerCase()));
        let added = 0;

        const enTr = (await import('@/translations/en.json')).default;

        for (const [i, sp] of staticProjects.entries()) {
          const nameEn = (enTr.projects as Record<string, string>)[sp.titleKey] ?? sp.id;
          if (existingNames.has(nameEn.toLowerCase())) continue;

          const newP: PortfolioProject = {
            id: crypto.randomUUID(),
            nameAr: (enTr.projects as Record<string, string>)[sp.titleKey] ?? sp.id,
            nameEn,
            descriptionAr: (enTr.projects as Record<string, string>)[sp.descriptionKey] ?? '',
            descriptionEn: (enTr.projects as Record<string, string>)[sp.descriptionKey] ?? '',
            tech: sp.techStack,
            liveUrl: sp.liveDemoUrl ?? '',
            githubUrl: sp.githubRepoUrl ?? '',
            imageUrl: sp.image?.imageUrl ?? '',
            category: sp.category === 'mobile' ? 'mobile' : sp.category === 'fullstack' ? 'fullstack' : 'web',
            tags: sp.tags,
            featured: sp.featured ?? false,
            order: projects.length + i,
            createdAt: new Date().toISOString(),
          };
          projects.push(newP);
          added++;
        }

        await writeProjects(projects);
        return NextResponse.json({ added, total: projects.length });
      }

      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
