import type { VaultProject } from '@/lib/vault-data';

interface StatsBarProps {
  projects: VaultProject[];
}

const stats = [
  {
    key: 'total',
    label: 'المجموع',
    filter: () => true,
    color: '#60a5fa',
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.2)',
  },
  {
    key: 'production',
    label: 'في الإنتاج',
    filter: (p: VaultProject) => p.status === 'production',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.08)',
    border: 'rgba(52,211,153,0.2)',
  },
  {
    key: 'active',
    label: 'نشط',
    filter: (p: VaultProject) => p.status === 'active',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.08)',
    border: 'rgba(167,139,250,0.2)',
  },
  {
    key: 'completed',
    label: 'مكتمل',
    filter: (p: VaultProject) => p.status === 'completed',
    color: '#fb923c',
    bg: 'rgba(251,146,60,0.08)',
    border: 'rgba(251,146,60,0.2)',
  },
];

export function StatsBar({ projects }: StatsBarProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map(s => (
        <div
          key={s.key}
          className="rounded-xl p-4"
          style={{ background: s.bg, border: `1px solid ${s.border}` }}
        >
          <p className="text-2xl font-bold" style={{ color: s.color }}>
            {projects.filter(s.filter).length}
          </p>
          <p className="text-sm mt-0.5" style={{ color: '#94a3b8' }}>
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
