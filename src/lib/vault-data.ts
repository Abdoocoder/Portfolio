// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectCredential {
  label: string;
  value: string;
}

export type ProjectStatus =
  | 'idea'
  | 'active'
  | 'testing'
  | 'production'
  | 'paused'
  | 'completed';

export interface VaultProject {
  id?: string;
  name: string;
  nameEn: string;
  emoji: string;
  description: string;
  status: ProjectStatus;
  type: string;
  tech: string[];
  progress: number;
  featured: boolean;
  lastUpdated: string;
  notes: string;
  links: ProjectLink[];
  credentials: ProjectCredential[];
  createdAt?: string | null;
}

// ─── API helpers ──────────────────────────────────────────────────────────────

async function vaultPost<T = unknown>(body: Record<string, unknown>): Promise<T> {
  const res = await fetch('/api/vault', {
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

// ─── CRUD ─────────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<VaultProject[]> {
  return vaultPost<VaultProject[]>({ action: 'get' });
}

export async function addProject(
  data: Omit<VaultProject, 'id' | 'createdAt'>
): Promise<string> {
  const project = await vaultPost<VaultProject>({ action: 'add', data });
  return project.id!;
}

export async function updateProject(
  id: string,
  data: Partial<Omit<VaultProject, 'id' | 'createdAt'>>
): Promise<void> {
  await vaultPost({ action: 'update', id, data });
}

export async function deleteProject(id: string): Promise<void> {
  await vaultPost({ action: 'delete', id });
}

export async function seedIfEmpty(): Promise<void> {
  const existing = await getProjects();
  if (existing.length > 0) return;
  const today = new Date().toISOString().split('T')[0];
  for (const project of buildSeedProjects(today)) {
    await addProject(project);
  }
}

// ─── Seed data ────────────────────────────────────────────────────────────────

function buildSeedProjects(today: string): Omit<VaultProject, 'id' | 'createdAt'>[] {
  return [
    {
      name: 'تأييد الدوام',
      nameEn: 'Tayid Al-Dawam',
      emoji: '🏢',
      description: 'منصة لتأييد الدوام والحضور الإلكتروني للمؤسسات والشركات',
      status: 'production',
      type: 'Web App',
      tech: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Supabase'],
      progress: 90,
      featured: false,
      lastUpdated: today,
      notes: '',
      links: [
        { label: 'Live', url: 'https://tayid-aldawam.vercel.app/dashboard' },
        { label: 'GitHub', url: 'https://github.com/Abdoocoder/tayid-aldawam' },
        { label: 'Vercel', url: 'https://vercel.com/abdoocoders-projects/tayid-aldawam/deployments' },
        { label: 'Supabase', url: 'https://supabase.com/dashboard/project/axqpzdffbocbgcsaxlln' },
      ],
      credentials: [
        { label: 'Admin Email', value: 'abdullahabosagherah@gmail.com' },
        { label: 'Login via GitHub', value: 'AbdullahAbuSaghierh@my.uopeople.edu' },
      ],
    },
    {
      name: 'موقع الشيخ يوسف',
      nameEn: 'Sheikh Youssef',
      emoji: '☪️',
      description: 'موقع الشيخ يوسف الإسلامي لنشر المحتوى الديني والعلمي',
      status: 'production',
      type: 'Web App',
      tech: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Supabase', 'Clerk'],
      progress: 85,
      featured: false,
      lastUpdated: today,
      notes: '',
      links: [
        { label: 'Live', url: 'https://sheikh-youssef.vercel.app' },
        { label: 'GitHub', url: 'https://github.com/Abdoocoder/sheikh-youssef' },
        { label: 'Supabase', url: 'https://supabase.com/dashboard/project/qsnecyptoivoybnyypfd' },
        { label: 'Clerk', url: 'https://dashboard.clerk.com/apps/app_37ppfD5HZug5BUHU0PlnpME5Veq/instances/ins_37ppfMDV508WjLt4vIZnMmUxVuA' },
        { label: 'Sentry', url: 'https://abdoocoder-pu.sentry.io/dashboards/' },
      ],
      credentials: [
        { label: 'Admin', value: 'admin@sheikh-youssef.vercel.app' },
        { label: 'Password', value: 'admin@sheikh-youssef.vercel.app' },
        { label: 'Sentry login', value: 'skylineontheway@gmail.com' },
      ],
    },
    {
      name: 'سوق سيداتي',
      nameEn: 'Madaba Women Market',
      emoji: '🛍️',
      description: 'منصة سوق النساء في مادبا للبيع والشراء والتواصل التجاري',
      status: 'production',
      type: 'Web App',
      tech: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Supabase'],
      progress: 80,
      featured: false,
      lastUpdated: today,
      notes: '',
      links: [
        { label: 'Live', url: 'https://madaba-women-market.vercel.app/' },
        { label: 'GitHub', url: 'https://github.com/Abdoocoder/madaba-women-market' },
        { label: 'Supabase', url: 'https://supabase.com/dashboard/project/ibsnucymmticrnfqbfro' },
        { label: 'Vercel', url: 'https://vercel.com/engabdooraf3-6211s-projects/v0-seydaty-market-app' },
      ],
      credentials: [{ label: 'Vercel login', value: 'eng.abdooraf3@gmail.com' }],
    },
    {
      name: 'فجرك',
      nameEn: 'Fajrak',
      emoji: '🌅',
      description: 'تطبيق صحي لتتبع الروتين الصباحي وبناء العادات الإيجابية',
      status: 'testing',
      type: 'Mobile',
      tech: ['React Native', 'Expo', 'TypeScript', 'Supabase'],
      progress: 78,
      featured: true,
      lastUpdated: today,
      notes: 'Closed Testing Alpha on Google Play — 12+ testers',
      links: [
        { label: 'Supabase', url: 'https://supabase.com/dashboard/project/ujwcvtpwsaidljecqbaa' },
        { label: 'Vercel', url: 'https://vercel.com/enabdooraf3-6211s-projects/financetracker' },
        { label: 'GitHub', url: 'https://github.com/Abdoocoder/financetracker' },
        { label: 'Cron-Job', url: 'https://console.cron-job.org/dashboard' },
        { label: 'ImprovMX', url: 'https://app.improvmx.com/' },
        { label: 'Sentry', url: 'https://abdoocoder-m2.sentry.io' },
      ],
      credentials: [
        { label: 'Supabase', value: 'abdullahraf3abdullah@gmail.com' },
        { label: 'Vercel', value: 'en.abdooraf3@gmail.com' },
        { label: 'Cron-Job', value: 'abdooraf3@gmail.com' },
        { label: 'Sentry', value: 'abdoocoder@gmail.com / Abd0!(*@Abd0!(*@' },
      ],
    },
    {
      name: 'نظام نظافتي',
      nameEn: 'Nizam Nazafati',
      emoji: '🧹',
      description: 'نظام إدارة وتتبع خدمات النظافة لبلدية مادبا',
      status: 'active',
      type: 'Web App',
      tech: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Firebase', 'Google Maps API'],
      progress: 55,
      featured: false,
      lastUpdated: today,
      notes: 'مشروع بلدية مادبا — قيد التطوير',
      links: [],
      credentials: [],
    },
    {
      name: 'قاعات مادبا',
      nameEn: 'Madaba Halls',
      emoji: '🏛️',
      description: 'نظام إدارة وحجز قاعات الأفراح والمناسبات في مادبا',
      status: 'production',
      type: 'Dashboard',
      tech: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Supabase'],
      progress: 85,
      featured: false,
      lastUpdated: today,
      notes: '',
      links: [
        { label: 'Live', url: 'https://madabahalls.vercel.app/dashboard' },
        { label: 'GitHub', url: 'https://github.com/Abdoocoder/AhmedHall' },
        { label: 'Supabase', url: 'https://supabase.com/dashboard/project/fhkrmjttxmwutdcwyuhm' },
      ],
      credentials: [{ label: 'Supabase login', value: 'abdoocoder@gmail.com' }],
    },
    {
      name: 'FlexJob',
      nameEn: 'FlexJob',
      emoji: '',
      description: 'منصة لتوصيل العمالة الحرة بأصحاب العمل في الأردن',
      status: 'completed',
      type: 'Web App',
      tech: ['React', 'TypeScript', 'TailwindCSS'],
      progress: 100,
      featured: false,
      lastUpdated: today,
      notes: 'UoPeople Entrepreneurship project — scored 98%',
      links: [{ label: 'Live', url: 'https://flexjob-w3.vercel.app/' }],
      credentials: [],
    },
    {
      name: 'Enlyten2 Laser',
      nameEn: 'Enlyten2 Laser',
      emoji: '💆',
      description: 'موقع عيادة ليزر إنلايتن2 للعناية بالبشرة والتجميل',
      status: 'production',
      type: 'Web App',
      tech: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Supabase'],
      progress: 80,
      featured: false,
      lastUpdated: today,
      notes: 'Samasoftcode account',
      links: [
        { label: 'Live', url: 'https://enlyten2.vercel.app/' },
        { label: 'Vercel', url: 'https://vercel.com/samasoftcode-3882s-projects' },
        { label: 'Supabase Org', url: 'https://supabase.com/dashboard/org/umzrwjfsvbjdgzfnjluv' },
      ],
      credentials: [{ label: 'Password', value: 'Samasoftcode@gmail.com11' }],
    },
    {
      name: 'بورتفوليو',
      nameEn: 'Portfolio',
      emoji: '🧑‍💻',
      description: 'موقع البورتفوليو الشخصي لعرض المشاريع والمهارات',
      status: 'production',
      type: 'Web App',
      tech: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Firebase', 'Framer Motion'],
      progress: 95,
      featured: true,
      lastUpdated: today,
      notes: '',
      links: [
        { label: 'Live', url: 'https://abdoocoder.dev' },
        { label: 'GitHub', url: 'https://abdoocoder.github.io/Portfolio' },
      ],
      credentials: [],
    },
  ];
}
