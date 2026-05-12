'use client';

import { useState } from 'react';
import {
  ExternalLink,
  Eye,
  EyeOff,
  Copy,
  Check,
  Star,
  Pencil,
  Trash2,
  X,
} from 'lucide-react';
import type { VaultProject } from '@/lib/vault-data';
import { STATUS_CONFIG } from './ProjectCard';

interface ProjectDetailProps {
  project: VaultProject | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ProjectDetail({ project, onClose, onEdit, onDelete }: ProjectDetailProps) {
  const [visibleCreds, setVisibleCreds] = useState<Set<number>>(new Set());
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  if (!project) return null;

  const s = STATUS_CONFIG[project.status] ?? STATUS_CONFIG.idea;

  const progressColor =
    project.progress === 100
      ? 'bg-violet-400'
      : project.progress >= 75
      ? 'bg-emerald-400'
      : project.progress >= 40
      ? 'bg-blue-400'
      : 'bg-yellow-400';

  function toggleCred(idx: number) {
    setVisibleCreds(prev => {
      const next = new Set(prev);
      if (next.has(idx)) { next.delete(idx); } else { next.add(idx); }
      return next;
    });
  }

  async function copyToClipboard(text: string, idx: number) {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-gray-900 border border-gray-800"
        dir="rtl"
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center gap-3 px-5 py-4 bg-gray-900 border-b border-gray-800 z-10">
          <span className="text-3xl">{project.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-bold text-gray-100">{project.name}</h2>
              {project.featured && (
                <Star className="w-4 h-4 shrink-0 text-yellow-400" fill="#fbbf24" />
              )}
            </div>
            <p className="text-sm text-gray-400">
              {project.nameEn} · {project.type}
            </p>
          </div>
          <span className={`text-xs font-medium px-3 py-1 rounded-full shrink-0 ${s.className}`}>
            {s.label}
          </span>
          <div className="flex items-center gap-1 mr-2" dir="ltr">
            <button
              onClick={onEdit}
              className="p-2 rounded-lg text-blue-400 hover:text-blue-300 transition-colors"
              title="تعديل"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 rounded-lg text-red-400 hover:text-red-300 transition-colors"
              title="حذف"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Description */}
          {project.description && (
            <p className="text-gray-300 leading-relaxed">{project.description}</p>
          )}

          {/* Progress */}
          <div>
            <div className="flex justify-between text-sm mb-2 text-gray-400">
              <span>التقدم</span>
              <span dir="ltr">{project.progress}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden bg-gray-800">
              <div
                className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          {/* Tech Stack */}
          {project.tech.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-400">التقنيات المستخدمة</h3>
              <div className="flex flex-wrap gap-2" dir="ltr">
                {project.tech.map(t => (
                  <span
                    key={t}
                    className="text-sm px-3 py-1 rounded-lg bg-gray-800 text-gray-300 border border-gray-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {project.links.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-400">الروابط</h3>
              <div className="space-y-2">
                {project.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg px-4 py-2.5 transition-colors group bg-gray-800/80 border border-gray-800 hover:border-gray-700"
                    dir="ltr"
                  >
                    <ExternalLink className="w-4 h-4 shrink-0 text-gray-500 transition-colors" />
                    <span className="font-medium text-blue-400">{link.label}</span>
                    <span className="flex-1 text-sm truncate text-gray-500" style={{ direction: 'ltr' }}>
                      {link.url}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Credentials */}
          {project.credentials.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-400">بيانات الدخول</h3>
              <div className="space-y-2">
                {project.credentials.map((cred, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg px-4 py-2.5 bg-gray-800/80 border border-gray-800"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs mb-0.5 text-gray-500">{cred.label}</p>
                      <p
                        className={`text-sm font-mono truncate ${visibleCreds.has(i) ? 'text-gray-300' : 'text-gray-700'}`}
                        dir="ltr"
                      >
                        {visibleCreds.has(i) ? cred.value : '••••••••••••'}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0" dir="ltr">
                      <button
                        onClick={() => toggleCred(i)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-gray-400 transition-colors"
                        title={visibleCreds.has(i) ? 'إخفاء' : 'إظهار'}
                      >
                        {visibleCreds.has(i) ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => copyToClipboard(cred.value, i)}
                        className={`p-1.5 rounded-lg transition-colors ${copiedIdx === i ? 'text-emerald-400' : 'text-gray-500 hover:text-gray-400'}`}
                        title="نسخ"
                      >
                        {copiedIdx === i ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {project.notes && (
            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-400">ملاحظات</h3>
              <p className="rounded-lg px-4 py-3 text-sm bg-yellow-400/5 border border-yellow-400/20 text-yellow-200 leading-relaxed">
                {project.notes}
              </p>
            </div>
          )}

          {/* Last updated */}
          <p className="text-xs text-gray-600" dir="ltr">
            آخر تحديث: {project.lastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
}
