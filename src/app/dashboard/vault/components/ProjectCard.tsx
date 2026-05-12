import { Star, Link2, KeyRound, Pencil, Trash2 } from 'lucide-react';
import type { VaultProject } from '@/lib/vault-data';

export const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  idea:       { label: 'فكرة',    className: 'text-gray-400 bg-gray-400/20' },
  active:     { label: 'نشط',     className: 'text-blue-400 bg-blue-400/20' },
  testing:    { label: 'اختبار',  className: 'text-yellow-400 bg-yellow-400/20' },
  production: { label: 'إنتاج',   className: 'text-emerald-400 bg-emerald-400/20' },
  paused:     { label: 'متوقف',   className: 'text-orange-400 bg-orange-400/20' },
  completed:  { label: 'مكتمل',   className: 'text-violet-400 bg-violet-400/20' },
};

interface ProjectCardProps {
  project: VaultProject;
  onClick: () => void;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

export function ProjectCard({ project, onClick, onEdit, onDelete }: ProjectCardProps) {
  const s = STATUS_CONFIG[project.status] ?? STATUS_CONFIG.idea;

  const progressColor =
    project.progress === 100
      ? 'bg-violet-400'
      : project.progress >= 75
      ? 'bg-emerald-400'
      : project.progress >= 40
      ? 'bg-blue-400'
      : 'bg-yellow-400';

  return (
    <div
      onClick={onClick}
      className="rounded-xl p-5 cursor-pointer group relative transition-all duration-200 bg-gray-900 border border-gray-800 hover:border-gray-700 hover:-translate-y-0.5"
    >
      {/* Actions */}
      <div
        className="absolute top-3 left-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
        dir="ltr"
      >
        <button
          onClick={onEdit}
          className="p-1.5 rounded-lg transition-colors bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
          title="تعديل"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 rounded-lg transition-colors bg-red-500/20 text-red-400 hover:bg-red-500/30"
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
            <h3 className="font-bold text-gray-100 truncate">{project.name}</h3>
            {project.featured && (
              <Star className="w-3.5 h-3.5 shrink-0 text-yellow-400" fill="#fbbf24" />
            )}
          </div>
          <p className="text-xs mt-0.5 text-gray-400">{project.nameEn}</p>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${s.className}`}>
          {s.label}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm mb-3 line-clamp-2 text-gray-400 leading-relaxed">
        {project.description}
      </p>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1 text-gray-500">
          <span>التقدم</span>
          <span dir="ltr">{project.progress}%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden bg-gray-800">
          <div
            className={`h-full rounded-full transition-all ${progressColor}`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Tech chips */}
      {project.tech.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {project.tech.slice(0, 4).map(t => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-md bg-gray-800 text-gray-400"
              dir="ltr"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="text-xs px-2 py-0.5 rounded-md bg-gray-800 text-gray-500">
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex gap-3 text-xs text-gray-500">
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
