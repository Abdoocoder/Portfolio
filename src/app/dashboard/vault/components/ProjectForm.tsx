'use client';

import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Star } from 'lucide-react';
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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full sm:max-w-2xl max-h-[95vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-gray-900 border border-gray-800"
        dir="rtl"
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between px-5 py-4 bg-gray-900 border-b border-gray-800 z-10">
          <h2 className="font-bold text-gray-100 text-lg">
            {project ? 'تعديل المشروع' : 'مشروع جديد'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-400 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Basic info row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <label className="text-gray-400 text-sm block mb-1.5">الإيموجي</label>
              <input
                value={form.emoji}
                onChange={e => set('emoji', e.target.value)}
                placeholder="رمز"
                className="w-full rounded-lg px-3 py-2 text-lg text-center bg-gray-800 border border-gray-700 text-gray-100 outline-none focus:border-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="text-gray-400 text-sm block mb-1.5">الاسم بالعربية</label>
              <input
                value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder="اسم المشروع"
                className="w-full rounded-lg px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-gray-400 text-sm block mb-1.5">الاسم بالإنجليزية</label>
              <input
                value={form.nameEn}
                onChange={e => set('nameEn', e.target.value)}
                placeholder="Project Name"
                className="w-full rounded-lg px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 outline-none focus:border-blue-500"
                dir="ltr"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm block mb-1.5">النوع</label>
              <select
                value={form.type}
                onChange={e => set('type', e.target.value)}
                className="w-full rounded-lg px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 outline-none focus:border-blue-500 cursor-pointer"
                dir="ltr"
              >
                {TYPE_OPTIONS.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Status & Progress */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-gray-400 text-sm block mb-1.5">الحالة</label>
              <select
                value={form.status}
                onChange={e => set('status', e.target.value as ProjectStatus)}
                className="w-full rounded-lg px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 outline-none focus:border-blue-500 cursor-pointer"
              >
                {STATUS_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-sm block mb-1.5">
                التقدم: <span dir="ltr" className="text-blue-400">{form.progress}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={form.progress}
                onChange={e => set('progress', Number(e.target.value))}
                className="w-full mt-1 accent-blue-500"
                dir="ltr"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-gray-400 text-sm block mb-1.5">الوصف</label>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="وصف المشروع..."
              rows={2}
              className="w-full rounded-lg px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 outline-none focus:border-blue-500 resize-vertical"
            />
          </div>

          {/* Featured + Last Updated */}
          <div className="grid grid-cols-2 gap-3 items-end">
            <div>
              <label className="text-gray-400 text-sm block mb-1.5">آخر تحديث</label>
              <input
                type="date"
                value={form.lastUpdated}
                onChange={e => set('lastUpdated', e.target.value)}
                className="w-full rounded-lg px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 outline-none focus:border-blue-500"
                dir="ltr"
              />
            </div>
            <div className="flex items-center gap-2 pb-2">
              <input
                type="checkbox"
                id="featured"
                checked={form.featured}
                onChange={e => set('featured', e.target.checked)}
                className="accent-yellow-400 w-4 h-4 cursor-pointer"
              />
               <label htmlFor="featured" className="text-gray-400 text-sm cursor-pointer flex items-center gap-1">
                مشروع مميز
                <Star className="w-3.5 h-3.5 text-yellow-400" fill="#fbbf24" />
              </label>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <label className="text-gray-400 text-sm block mb-1.5">التقنيات</label>
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
                className="flex-1 rounded-lg px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={addTech}
                className="px-3 rounded-lg bg-gray-800 text-blue-400 border border-gray-700 hover:bg-gray-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {form.tech.length > 0 && (
              <div className="flex flex-wrap gap-1.5" dir="ltr">
                {form.tech.map(t => (
                  <span
                    key={t}
                    className="flex items-center gap-1 text-sm px-2.5 py-1 rounded-lg bg-gray-800 text-gray-300 border border-gray-700"
                  >
                    {t}
                    <button
                      type="button"
                      onClick={() => removeTech(t)}
                      className="text-gray-500 hover:text-gray-400 transition-colors"
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
              <label className="text-gray-400 text-sm">الروابط</label>
              <button
                type="button"
                onClick={addLink}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 transition-colors"
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
                    className="w-[100px] shrink-0 rounded-lg px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 outline-none focus:border-blue-500"
                  />
                  <input
                    value={link.url}
                    onChange={e => updateLink(i, 'url', e.target.value)}
                    placeholder="https://"
                    className="flex-1 rounded-lg px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeLink(i)}
                    className="text-red-400 hover:text-red-300 shrink-0 transition-colors"
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
              <label className="text-gray-400 text-sm">بيانات الدخول</label>
              <button
                type="button"
                onClick={addCred}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg text-violet-400 bg-violet-500/10 hover:bg-violet-500/20 transition-colors"
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
                    className="w-[100px] shrink-0 rounded-lg px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 outline-none focus:border-blue-500"
                  />
                  <input
                    value={cred.value}
                    onChange={e => updateCred(i, 'value', e.target.value)}
                    placeholder="value"
                    className="flex-1 rounded-lg px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeCred(i)}
                    className="text-red-400 hover:text-red-300 shrink-0 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-gray-400 text-sm block mb-1.5">ملاحظات</label>
            <textarea
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
              placeholder="ملاحظات إضافية..."
              rows={2}
              className="w-full rounded-lg px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 outline-none focus:border-blue-500 resize-vertical"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2" dir="ltr">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 rounded-xl font-semibold transition-all disabled:bg-gray-600 disabled:cursor-not-allowed bg-gradient-to-br from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-gray-100"
            >
              {saving ? 'جاري الحفظ...' : project ? 'حفظ التعديلات' : 'إضافة المشروع'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-medium bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
