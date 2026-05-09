import { Star, Link2, KeyRound, Pencil, Trash2 } from 'lucide-react';
import type { VaultProject } from '@/lib/vault-data';

export const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  idea:       { label: 'فكرة',    color: '#94a3b8', bg: 'rgba(148,163,184,0.15)' },
  active:     { label: 'نشط',     color: '#60a5fa', bg: 'rgba(96,165,250,0.15)'  },
  testing:    { label: 'اختبار',  color: '#fbbf24', bg: 'rgba(251,191,36,0.15)'  },
  production: { label: 'إنتاج',   color: '#34d399', bg: 'rgba(52,211,153,0.15)'  },
  paused:     { label: 'متوقف',   color: '#fb923c', bg: 'rgba(251,146,60,0.15)'  },
  completed:  { label: 'مكتمل',   color: '#a78bfa', bg: 'rgba(167,139,250,0.15)' },
};

interface ProjectCardProps {
  project: VaultProject;
  onClick: () => void;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

export function ProjectCard({ project, onClick, onEdit, onDelete }: ProjectCardProps) {
  const s = STATUS_CONFIG[project.status] ?? STATUS_CONFIG.idea;

  return (
    <div
      onClick={onClick}
      className="rounded-xl p-5 cursor-pointer group relative transition-all duration-200"
      style={{
        background: '#111827',
        border: '1px solid #1f2937',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = '#374151';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = '#1f2937';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
      }}
    >
      {/* Actions */}
      <div
        className="absolute top-3 left-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
        dir="ltr"
      >
        <button
          onClick={onEdit}
          className="p-1.5 rounded-lg transition-colors"
          style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa' }}
          title="تعديل"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 rounded-lg transition-colors"
          style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171' }}
          title="حذف"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl leading-none mt-0.5">{project.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-white truncate">{project.name}</h3>
            {project.featured && (
              <Star className="w-3.5 h-3.5 shrink-0" style={{ color: '#fbbf24' }} fill="#fbbf24" />
            )}
          </div>
          <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>
            {project.nameEn}
          </p>
        </div>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full shrink-0"
          style={{ color: s.color, background: s.bg }}
        >
          {s.label}
        </span>
      </div>

      {/* Description */}
      <p
        className="text-sm mb-3 line-clamp-2"
        style={{ color: '#9ca3af', lineHeight: '1.6' }}
      >
        {project.description}
      </p>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1" style={{ color: '#6b7280' }}>
          <span>التقدم</span>
          <span dir="ltr">{project.progress}%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#1f2937' }}>
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${project.progress}%`,
              background:
                project.progress === 100
                  ? '#a78bfa'
                  : project.progress >= 75
                  ? '#34d399'
                  : project.progress >= 40
                  ? '#60a5fa'
                  : '#fbbf24',
            }}
          />
        </div>
      </div>

      {/* Tech chips */}
      {project.tech.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {project.tech.slice(0, 4).map(t => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-md"
              style={{ background: '#1f2937', color: '#9ca3af' }}
              dir="ltr"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span
              className="text-xs px-2 py-0.5 rounded-md"
              style={{ background: '#1f2937', color: '#6b7280' }}
            >
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex gap-3 text-xs" style={{ color: '#6b7280' }}>
        {project.links.length > 0 && (
          <span className="flex items-center gap-1">
            <Link2 className="w-3 h-3" />
            {project.links.length}
          </span>
        )}
        {project.credentials.length > 0 && (
          <span className="flex items-center gap-1">
            <KeyRound className="w-3 h-3" />
            {project.credentials.length}
          </span>
        )}
        <span className="mr-auto" dir="ltr">
          {project.lastUpdated}
        </span>
      </div>
    </div>
  );
}
