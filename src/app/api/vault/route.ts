import { NextResponse } from 'next/server';
import type { VaultProject } from '@/lib/vault-data';

// POST-only (no GET) so Next.js static export skips this route entirely —
// same pattern as /api/contact. All vault operations go through a single POST
// with an `action` discriminator field.

const GIST_ID = process.env.NEXT_PUBLIC_GIST_ID;
const GIST_TOKEN = process.env.GIST_TOKEN;
const GIST_FILE = 'vault.json';
const GIST_API = `https://api.github.com/gists/${GIST_ID}`;

function authHeaders() {
  return {
    Authorization: `Bearer ${GIST_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
  };
}

async function readProjects(): Promise<VaultProject[]> {
  if (!GIST_ID || !GIST_TOKEN) {
    throw new Error('NEXT_PUBLIC_GIST_ID and GIST_TOKEN must be set');
  }
  const res = await fetch(GIST_API, { headers: authHeaders(), cache: 'no-store' });
  if (!res.ok) throw new Error(`GitHub read error ${res.status}`);
  const gist = await res.json();
  try {
    return JSON.parse(gist.files?.[GIST_FILE]?.content ?? '[]') as VaultProject[];
  } catch {
    return [];
  }
}

async function writeProjects(projects: VaultProject[]): Promise<void> {
  const res = await fetch(GIST_API, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({
      files: { [GIST_FILE]: { content: JSON.stringify(projects, null, 2) } },
    }),
  });
  if (!res.ok) throw new Error(`GitHub write error ${res.status}`);
}

type VaultAction =
  | { action: 'get' }
  | { action: 'add'; data: Omit<VaultProject, 'id' | 'createdAt'> }
  | { action: 'update'; id: string; data: Partial<Omit<VaultProject, 'id' | 'createdAt'>> }
  | { action: 'delete'; id: string };

export async function POST(request: Request) {
  try {
    const body: VaultAction = await request.json();

    switch (body.action) {
      case 'get': {
        return NextResponse.json(await readProjects());
      }

      case 'add': {
        const projects = await readProjects();
        const newProject: VaultProject = {
          ...body.data,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
        projects.unshift(newProject);
        await writeProjects(projects);
        return NextResponse.json(newProject, { status: 201 });
      }

      case 'update': {
        const projects = await readProjects();
        const idx = projects.findIndex(p => p.id === body.id);
        if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        projects[idx] = { ...projects[idx], ...body.data, id: body.id };
        await writeProjects(projects);
        return NextResponse.json(projects[idx]);
      }

      case 'delete': {
        const projects = await readProjects();
        const filtered = projects.filter(p => p.id !== body.id);
        if (filtered.length === projects.length)
          return NextResponse.json({ error: 'Not found' }, { status: 404 });
        await writeProjects(filtered);
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
