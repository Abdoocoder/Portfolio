import type { VaultProject } from '@/lib/vault-data';

interface StatsBarProps {
  projects: VaultProject[];
}

const stats = [
  {
    key: 'total',
    label: 'المجموع',
    filter: () => true,
    className: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  },
  {
    key: 'production',
    label: 'في الإنتاج',
    filter: (p: VaultProject) => p.status === 'production',
    className: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  },
  {
    key: 'active',
    label: 'نشط',
    filter: (p: VaultProject) => p.status === 'active',
    className: 'bg-violet-500/10 border-violet-500/30 text-violet-400',
  },
  {
    key: 'completed',
    label: 'مكتمل',
    filter: (p: VaultProject) => p.status === 'completed',
    className: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
  },
];

export function StatsBar({ projects }: StatsBarProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map(s => (
        <div
          key={s.key}
          className={`rounded-xl p-4 border ${s.className}`}
        >
          <p className={`text-2xl font-bold ${s.className}`}>
            {projects.filter(s.filter).length}
          </p>
          <p className="text-sm mt-0.5 text-gray-400">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
