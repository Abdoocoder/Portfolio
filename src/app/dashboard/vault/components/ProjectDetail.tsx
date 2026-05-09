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

  function toggleCred(idx: number) {
    setVisibleCreds(prev => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl"
        style={{ background: '#111827', border: '1px solid #1f2937' }}
        dir="rtl"
      >
        {/* Header */}
        <div
          className="sticky top-0 flex items-center gap-3 px-5 py-4"
          style={{ background: '#111827', borderBottom: '1px solid #1f2937', zIndex: 10 }}
        >
          <span className="text-3xl">{project.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-bold text-white">{project.name}</h2>
              {project.featured && (
                <Star className="w-4 h-4 shrink-0" style={{ color: '#fbbf24' }} fill="#fbbf24" />
              )}
            </div>
            <p className="text-sm" style={{ color: '#94a3b8' }}>
              {project.nameEn} · {project.type}
            </p>
          </div>
          <span
            className="text-xs font-medium px-3 py-1 rounded-full shrink-0"
            style={{ color: s.color, background: s.bg }}
          >
            {s.label}
          </span>
          <div className="flex items-center gap-1 mr-2" dir="ltr">
            <button
              onClick={onEdit}
              className="p-2 rounded-lg transition-colors"
              style={{ color: '#60a5fa' }}
              title="تعديل"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 rounded-lg transition-colors"
              style={{ color: '#f87171' }}
              title="حذف"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-colors"
              style={{ color: '#6b7280' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Description */}
          {project.description && (
            <p style={{ color: '#d1d5db', lineHeight: '1.7' }}>{project.description}</p>
          )}

          {/* Progress */}
          <div>
            <div className="flex justify-between text-sm mb-2" style={{ color: '#9ca3af' }}>
              <span>التقدم</span>
              <span dir="ltr">{project.progress}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: '#1f2937' }}>
              <div
                className="h-full rounded-full transition-all duration-500"
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

          {/* Tech Stack */}
          {project.tech.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2" style={{ color: '#9ca3af' }}>
                التقنيات المستخدمة
              </h3>
              <div className="flex flex-wrap gap-2" dir="ltr">
                {project.tech.map(t => (
                  <span
                    key={t}
                    className="text-sm px-3 py-1 rounded-lg"
                    style={{ background: '#1f2937', color: '#d1d5db', border: '1px solid #374151' }}
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
              <h3 className="text-sm font-semibold mb-2" style={{ color: '#9ca3af' }}>
                الروابط
              </h3>
              <div className="space-y-2">
                {project.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg px-4 py-2.5 transition-colors group"
                    style={{ background: '#1a2235', border: '1px solid #1f2937' }}
                    onMouseEnter={e =>
                      ((e.currentTarget as HTMLElement).style.borderColor = '#374151')
                    }
                    onMouseLeave={e =>
                      ((e.currentTarget as HTMLElement).style.borderColor = '#1f2937')
                    }
                    dir="ltr"
                  >
                    <ExternalLink
                      className="w-4 h-4 shrink-0 transition-colors"
                      style={{ color: '#6b7280' }}
                    />
                    <span className="font-medium" style={{ color: '#60a5fa' }}>
                      {link.label}
                    </span>
                    <span
                      className="flex-1 text-sm truncate"
                      style={{ color: '#6b7280', direction: 'ltr' }}
                    >
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
              <h3 className="text-sm font-semibold mb-2" style={{ color: '#9ca3af' }}>
                بيانات الدخول
              </h3>
              <div className="space-y-2">
                {project.credentials.map((cred, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg px-4 py-2.5"
                    style={{ background: '#1a2235', border: '1px solid #1f2937' }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs mb-0.5" style={{ color: '#6b7280' }}>
                        {cred.label}
                      </p>
                      <p
                        className="text-sm font-mono truncate"
                        style={{ color: visibleCreds.has(i) ? '#d1d5db' : '#374151' }}
                        dir="ltr"
                      >
                        {visibleCreds.has(i) ? cred.value : '••••••••••••'}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0" dir="ltr">
                      <button
                        onClick={() => toggleCred(i)}
                        className="p-1.5 rounded-lg transition-colors"
                        style={{ color: '#6b7280' }}
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
                        className="p-1.5 rounded-lg transition-colors"
                        style={{ color: copiedIdx === i ? '#34d399' : '#6b7280' }}
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
              <h3 className="text-sm font-semibold mb-2" style={{ color: '#9ca3af' }}>
                ملاحظات
              </h3>
              <p
                className="rounded-lg px-4 py-3 text-sm"
                style={{
                  background: 'rgba(251,191,36,0.06)',
                  border: '1px solid rgba(251,191,36,0.2)',
                  color: '#fde68a',
                  lineHeight: '1.7',
                }}
              >
                {project.notes}
              </p>
            </div>
          )}

          {/* Last updated */}
          <p className="text-xs" style={{ color: '#4b5563' }} dir="ltr">
            آخر تحديث: {project.lastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
}
