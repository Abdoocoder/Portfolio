'use client';

import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import type { VaultProject, ProjectLink, ProjectCredential, ProjectStatus } from '@/lib/vault-data';

const STATUS_OPTIONS: { value: ProjectStatus; label: string }[] = [
  { value: 'idea', label: 'فكرة' },
  { value: 'active', label: 'نشط' },
  { value: 'testing', label: 'اختبار' },
  { value: 'production', label: 'إنتاج' },
  { value: 'paused', label: 'متوقف' },
  { value: 'completed', label: 'مكتمل' },
];

const TYPE_OPTIONS = ['Web App', 'Mobile', 'Dashboard', 'SaaS', 'API', 'Other'];

const EMPTY_FORM = {
  name: '',
  nameEn: '',
  emoji: '',
  description: '',
  status: 'idea' as ProjectStatus,
  type: 'Web App',
  tech: [] as string[],
  progress: 0,
  featured: false,
  lastUpdated: new Date().toISOString().split('T')[0],
  notes: '',
  links: [] as ProjectLink[],
  credentials: [] as ProjectCredential[],
};

interface ProjectFormProps {
  project: VaultProject | null;
  open: boolean;
  onClose: () => void;
  onSave: (data: Omit<VaultProject, 'id' | 'createdAt'>) => Promise<void>;
}

const inputStyle = {
  background: '#1f2937',
  border: '1px solid #374151',
  color: '#f9fafb',
  borderRadius: '8px',
  padding: '8px 12px',
  width: '100%',
  outline: 'none',
  fontSize: '14px',
};

const labelStyle = { color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '6px' };

export function ProjectForm({ project, open, onClose, onSave }: ProjectFormProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [techInput, setTechInput] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(
        project
          ? {
              name: project.name,
              nameEn: project.nameEn,
              emoji: project.emoji,
              description: project.description,
              status: project.status,
              type: project.type,
              tech: [...project.tech],
              progress: project.progress,
              featured: project.featured,
              lastUpdated: project.lastUpdated,
              notes: project.notes,
              links: project.links.map(l => ({ ...l })),
              credentials: project.credentials.map(c => ({ ...c })),
            }
          : EMPTY_FORM
      );
      setTechInput('');
    }
  }, [open, project]);

  if (!open) return null;

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function addTech() {
    const t = techInput.trim();
    if (t && !form.tech.includes(t)) {
      set('tech', [...form.tech, t]);
      setTechInput('');
    }
  }

  function removeTech(t: string) {
    set('tech', form.tech.filter(x => x !== t));
  }

  function addLink() {
    set('links', [...form.links, { label: '', url: '' }]);
  }

  function updateLink(idx: number, field: keyof ProjectLink, value: string) {
    set(
      'links',
      form.links.map((l, i) => (i === idx ? { ...l, [field]: value } : l))
    );
  }

  function removeLink(idx: number) {
    set('links', form.links.filter((_, i) => i !== idx));
  }

  function addCred() {
    set('credentials', [...form.credentials, { label: '', value: '' }]);
  }

  function updateCred(idx: number, field: keyof ProjectCredential, value: string) {
    set(
      'credentials',
      form.credentials.map((c, i) => (i === idx ? { ...c, [field]: value } : c))
    );
  }

  function removeCred(idx: number) {
    set('credentials', form.credentials.filter((_, i) => i !== idx));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave({
        ...form,
        links: form.links.filter(l => l.label || l.url),
        credentials: form.credentials.filter(c => c.label || c.value),
      });
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full sm:max-w-2xl max-h-[95vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl"
        style={{ background: '#111827', border: '1px solid #1f2937' }}
        dir="rtl"
      >
        {/* Header */}
        <div
          className="sticky top-0 flex items-center justify-between px-5 py-4"
          style={{ background: '#111827', borderBottom: '1px solid #1f2937', zIndex: 10 }}
        >
          <h2 className="font-bold text-white text-lg">
            {project ? 'تعديل المشروع' : 'مشروع جديد'}
          </h2>
          <button onClick={onClose} style={{ color: '#6b7280' }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Basic info row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <label style={labelStyle}>الإيموجي</label>
              <input
                value={form.emoji}
                onChange={e => set('emoji', e.target.value)}
                placeholder="🚀"
                style={{ ...inputStyle, textAlign: 'center', fontSize: '20px' }}
              />
            </div>
            <div className="col-span-2">
              <label style={labelStyle}>الاسم بالعربية</label>
              <input
                value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder="اسم المشروع"
                style={inputStyle}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label style={labelStyle}>الاسم بالإنجليزية</label>
              <input
                value={form.nameEn}
                onChange={e => set('nameEn', e.target.value)}
                placeholder="Project Name"
                style={inputStyle}
                dir="ltr"
              />
            </div>
            <div>
              <label style={labelStyle}>النوع</label>
              <select
                value={form.type}
                onChange={e => set('type', e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}
                dir="ltr"
              >
                {TYPE_OPTIONS.map(t => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status & Progress */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label style={labelStyle}>الحالة</label>
              <select
                value={form.status}
                onChange={e => set('status', e.target.value as ProjectStatus)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                {STATUS_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>
                التقدم:{' '}
                <span dir="ltr" style={{ color: '#60a5fa' }}>
                  {form.progress}%
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={form.progress}
                onChange={e => set('progress', Number(e.target.value))}
                className="w-full mt-1"
                style={{ accentColor: '#3b82f6' }}
                dir="ltr"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>الوصف</label>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="وصف المشروع..."
              rows={2}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          {/* Featured + Last Updated */}
          <div className="grid grid-cols-2 gap-3 items-end">
            <div>
              <label style={labelStyle}>آخر تحديث</label>
              <input
                type="date"
                value={form.lastUpdated}
                onChange={e => set('lastUpdated', e.target.value)}
                style={inputStyle}
                dir="ltr"
              />
            </div>
            <div className="flex items-center gap-2 pb-2">
              <input
                type="checkbox"
                id="featured"
                checked={form.featured}
                onChange={e => set('featured', e.target.checked)}
                style={{ accentColor: '#fbbf24', width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <label htmlFor="featured" style={{ ...labelStyle, marginBottom: 0, cursor: 'pointer' }}>
                مشروع مميز ⭐
              </label>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <label style={labelStyle}>التقنيات</label>
            <div className="flex gap-2 mb-2" dir="ltr">
              <input
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTech();
                  }
                }}
                placeholder="Next.js"
                style={{ ...inputStyle, flex: 1 }}
              />
              <button
                type="button"
                onClick={addTech}
                className="px-3 rounded-lg transition-colors"
                style={{ background: '#1f2937', color: '#60a5fa', border: '1px solid #374151' }}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {form.tech.length > 0 && (
              <div className="flex flex-wrap gap-1.5" dir="ltr">
                {form.tech.map(t => (
                  <span
                    key={t}
                    className="flex items-center gap-1 text-sm px-2.5 py-1 rounded-lg"
                    style={{ background: '#1f2937', color: '#d1d5db', border: '1px solid #374151' }}
                  >
                    {t}
                    <button
                      type="button"
                      onClick={() => removeTech(t)}
                      style={{ color: '#6b7280' }}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Links */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label style={{ ...labelStyle, marginBottom: 0 }}>الروابط</label>
              <button
                type="button"
                onClick={addLink}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-colors"
                style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.1)' }}
              >
                <Plus className="w-3 h-3" /> إضافة
              </button>
            </div>
            <div className="space-y-2">
              {form.links.map((link, i) => (
                <div key={i} className="flex gap-2 items-center" dir="ltr">
                  <input
                    value={link.label}
                    onChange={e => updateLink(i, 'label', e.target.value)}
                    placeholder="Label"
                    style={{ ...inputStyle, width: '100px', flexShrink: 0 }}
                  />
                  <input
                    value={link.url}
                    onChange={e => updateLink(i, 'url', e.target.value)}
                    placeholder="https://"
                    style={{ ...inputStyle, flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={() => removeLink(i)}
                    style={{ color: '#f87171', flexShrink: 0 }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Credentials */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label style={{ ...labelStyle, marginBottom: 0 }}>بيانات الدخول</label>
              <button
                type="button"
                onClick={addCred}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-colors"
                style={{ color: '#a78bfa', background: 'rgba(167,139,250,0.1)' }}
              >
                <Plus className="w-3 h-3" /> إضافة
              </button>
            </div>
            <div className="space-y-2">
              {form.credentials.map((cred, i) => (
                <div key={i} className="flex gap-2 items-center" dir="ltr">
                  <input
                    value={cred.label}
                    onChange={e => updateCred(i, 'label', e.target.value)}
                    placeholder="Label"
                    style={{ ...inputStyle, width: '100px', flexShrink: 0 }}
                  />
                  <input
                    value={cred.value}
                    onChange={e => updateCred(i, 'value', e.target.value)}
                    placeholder="value"
                    style={{ ...inputStyle, flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={() => removeCred(i)}
                    style={{ color: '#f87171', flexShrink: 0 }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label style={labelStyle}>ملاحظات</label>
            <textarea
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
              placeholder="ملاحظات إضافية..."
              rows={2}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2" dir="ltr">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 rounded-xl font-semibold transition-all"
              style={{
                background: saving ? '#374151' : 'linear-gradient(135deg, #3b82f6, #6366f1)',
                color: '#fff',
                cursor: saving ? 'not-allowed' : 'pointer',
              }}
            >
              {saving ? 'جاري الحفظ...' : project ? 'حفظ التعديلات' : 'إضافة المشروع'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-medium transition-colors"
              style={{ background: '#1f2937', color: '#9ca3af', border: '1px solid #374151' }}
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
