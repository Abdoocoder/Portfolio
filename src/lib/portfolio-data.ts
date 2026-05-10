export interface PortfolioProject {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  imageUrl: string;
  category: 'web' | 'mobile' | 'fullstack';
  tags: string[];
  featured: boolean;
  order: number;
  createdAt: string;
}

async function apiPost<T = unknown>(body: Record<string, unknown>): Promise<T> {
  const res = await fetch('/api/portfolio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.error ?? `Request failed: ${res.status}`);
  }
  return res.json() as T;
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const res = await fetch('/api/portfolio', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load portfolio projects');
  return res.json();
}

export async function addPortfolioProject(
  data: Omit<PortfolioProject, 'id' | 'createdAt'>
): Promise<PortfolioProject> {
  return apiPost<PortfolioProject>({ action: 'add', data });
}

export async function updatePortfolioProject(
  id: string,
  data: Partial<Omit<PortfolioProject, 'id' | 'createdAt'>>
): Promise<void> {
  await apiPost({ action: 'update', id, data });
}

export async function deletePortfolioProject(id: string): Promise<void> {
  await apiPost({ action: 'delete', id });
}
