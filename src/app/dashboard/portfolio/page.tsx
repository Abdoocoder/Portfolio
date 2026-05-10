'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus, Pencil, Trash2, RefreshCw, LogOut, Globe, Github,
  ExternalLink, Star, StarOff, ImageIcon, ChevronRight, Download,
} from 'lucide-react';
import {
  getPortfolioProjects,
  addPortfolioProject,
  updatePortfolioProject,
  deletePortfolioProject,
  type PortfolioProject,
} from '@/lib/portfolio-data';

// ─── helpers ─────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { value: 'web',       label: 'ويب' },
  { value: 'mobile',    label: 'موبايل' },
  { value: 'fullstack', label: 'فول ستاك' },
] as const;

const EMPTY: Omit<PortfolioProject, 'id' | 'createdAt'> = {
  nameAr: '', nameEn: '', descriptionAr: '', descriptionEn: '',
  tech: [], liveUrl: '', githubUrl: '', imageUrl: '',
  category: 'web', tags: [], featured: false, order: 0,
};

const s = {
  input: {
    width: '100%', background: '#1f2937', border: '1px solid #374151',
    borderRadius: '8px', padding: '8px 12px', color: '#f9fafb',
    outline: 'none', fontSize: '14px',
  } as React.CSSProperties,
  label: { color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '5px' } as React.CSSProperties,
};

// ─── form modal ──────────────────────────────────────────────────────────────

function ProjectFormModal({
  project, onClose, onSave,
}: {
  project: PortfolioProject | null;
  onClose: () => void;
  onSave: (data: Omit<PortfolioProject, 'id' | 'createdAt'>) => Promise<void>;
}) {
  const [form, setForm] = useState<Omit<PortfolioProject, 'id' | 'createdAt'>>(
    project ? {
      nameAr: project.nameAr, nameEn: project.nameEn,
      descriptionAr: project.descriptionAr, descriptionEn: project.descriptionEn,
      tech: [...project.tech], liveUrl: project.liveUrl, githubUrl: project.githubUrl,
      imageUrl: project.imageUrl, category: project.category,
      tags: [...project.tags], featured: project.featured, order: project.order,
    } : { ...EMPTY }
  );
  const [techInput, setTechInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);

  function set(k: keyof typeof form, v: unknown) {
    setForm(f => ({ ...f, [k]: v }));
  }

  function addTech() {
    const t = techInput.trim();
    if (t && !form.tech.includes(t)) set('tech', [...form.tech, t]);
    setTechInput('');
  }

  function addTag() {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) set('tags', [...form.tags, t]);
    setTagInput('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try { await onSave(form); onClose(); }
    finally { setSaving(false); }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 py-8"
      style={{ background: 'rgba(0,0,0,0.75)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-2xl rounded-2xl" style={{ background: '#111827', border: '1px solid #1f2937' }}>
        {/* header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #1f2937' }}>
          <h2 className="font-bold text-white text-lg">
            {project ? 'تعديل المشروع' : 'مشروع جديد'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* names */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={s.label}>الاسم عربي *</label>
              <input style={s.input} required value={form.nameAr} onChange={e => set('nameAr', e.target.value)} placeholder="سوق سيداتي" />
            </div>
            <div>
              <label style={s.label}>الاسم إنجليزي *</label>
              <input style={s.input} dir="ltr" required value={form.nameEn} onChange={e => set('nameEn', e.target.value)} placeholder="Madaba Women Market" />
            </div>
          </div>

          {/* descriptions */}
          <div>
            <label style={s.label}>الوصف عربي *</label>
            <textarea
              style={{ ...s.input, minHeight: '80px', resize: 'vertical' }}
              required value={form.descriptionAr}
              onChange={e => set('descriptionAr', e.target.value)}
              placeholder="وصف المشروع بالعربية..."
            />
          </div>
          <div>
            <label style={s.label}>الوصف إنجليزي *</label>
            <textarea
              style={{ ...s.input, minHeight: '80px', resize: 'vertical' }}
              dir="ltr" required value={form.descriptionEn}
              onChange={e => set('descriptionEn', e.target.value)}
              placeholder="Project description in English..."
            />
          </div>

          {/* category + featured */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={s.label}>الفئة</label>
              <select
                style={{ ...s.input, cursor: 'pointer' }}
                value={form.category}
                onChange={e => set('category', e.target.value)}
              >
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => set('featured', !form.featured)}
                  className="w-11 h-6 rounded-full transition-colors relative"
                  style={{ background: form.featured ? '#3b82f6' : '#374151' }}
                >
                  <div
                    className="w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform"
                    style={{ transform: form.featured ? 'translateX(-5px) translateX(100%)' : 'translateX(2px)' }}
                  />
                </div>
                <span style={{ color: '#d1d5db', fontSize: '14px' }}>مميز (Featured)</span>
              </label>
            </div>
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label style={s.label}>رابط الموقع</label>
              <input style={s.input} dir="ltr" type="url" value={form.liveUrl} onChange={e => set('liveUrl', e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <label style={s.label}>رابط GitHub</label>
              <input style={s.input} dir="ltr" type="url" value={form.githubUrl} onChange={e => set('githubUrl', e.target.value)} placeholder="https://github.com/..." />
            </div>
            <div>
              <label style={s.label}>رابط الصورة (Screenshot)</label>
              <input style={s.input} dir="ltr" type="url" value={form.imageUrl} onChange={e => set('imageUrl', e.target.value)} placeholder="https://..." />
            </div>
          </div>

          {/* tech */}
          <div>
            <label style={s.label}>التقنيات</label>
            <div className="flex gap-2 mb-2">
              <input
                style={{ ...s.input, flex: 1 }}
                dir="ltr"
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech())}
                placeholder="Next.js"
              />
              <button
                type="button" onClick={addTech}
                className="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ background: '#1f2937', color: '#9ca3af', border: '1px solid #374151' }}
              >
                إضافة
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.tech.map(t => (
                <span
                  key={t}
                  className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full cursor-pointer"
                  style={{ background: '#1f2937', color: '#d1d5db', border: '1px solid #374151' }}
                  onClick={() => set('tech', form.tech.filter(x => x !== t))}
                >
                  {t} <span className="text-red-400">✕</span>
                </span>
              ))}
            </div>
          </div>

          {/* tags */}
          <div>
            <label style={s.label}>التاقات (Tags)</label>
            <div className="flex gap-2 mb-2">
              <input
                style={{ ...s.input, flex: 1 }}
                dir="ltr"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="E-commerce"
              />
              <button
                type="button" onClick={addTag}
                className="px-3 py-2 rounded-lg text-sm font-medium"
                style={{ background: '#1f2937', color: '#9ca3af', border: '1px solid #374151' }}
              >
                إضافة
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.tags.map(t => (
                <span
                  key={t}
                  className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full cursor-pointer"
                  style={{ background: '#374151', color: '#9ca3af' }}
                  onClick={() => set('tags', form.tags.filter(x => x !== t))}
                >
                  {t} <span className="text-red-400">✕</span>
                </span>
              ))}
            </div>
          </div>

          {/* order */}
          <div>
            <label style={s.label}>الترتيب</label>
            <input
              style={{ ...s.input, width: '100px' }}
              type="number" min={0}
              value={form.order}
              onChange={e => set('order', Number(e.target.value))}
            />
          </div>

          {/* actions */}
          <div className="flex gap-3 pt-2" style={{ borderTop: '1px solid #1f2937' }}>
            <button
              type="submit" disabled={saving}
              className="flex-1 py-2.5 rounded-xl font-semibold text-white transition-all"
              style={{ background: saving ? '#374151' : 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
            >
              {saving ? 'جاري الحفظ...' : project ? 'حفظ التعديلات' : 'إضافة المشروع'}
            </button>
            <button
              type="button" onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-medium transition-colors"
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

// ─── project card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project, onEdit, onDelete, onToggleFeatured,
}: {
  project: PortfolioProject;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFeatured: () => void;
}) {
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-3 group transition-all"
      style={{ background: '#111827', border: '1px solid #1f2937' }}
    >
      {/* top row */}
      <div className="flex items-start gap-3">
        {/* thumbnail */}
        <div
          className="w-14 h-14 rounded-lg shrink-0 overflow-hidden flex items-center justify-center"
          style={{ background: '#1f2937' }}
        >
          {project.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.imageUrl} alt={project.nameEn} className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-6 h-6" style={{ color: '#4b5563' }} />
          )}
        </div>
        {/* info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-white text-sm truncate">{project.nameAr}</h3>
            {project.featured && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full shrink-0" style={{ background: 'rgba(234,179,8,0.15)', color: '#eab308' }}>
                ★ مميز
              </span>
            )}
          </div>
          <p className="text-xs mt-0.5 truncate" style={{ color: '#6b7280' }}>{project.nameEn}</p>
          <div className="flex flex-wrap gap-1 mt-1.5">
            {project.tech.slice(0, 3).map(t => (
              <span key={t} className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: '#1f2937', color: '#9ca3af', border: '1px solid #374151' }}>
                {t}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-[10px]" style={{ color: '#4b5563' }}>+{project.tech.length - 3}</span>
            )}
          </div>
        </div>
      </div>

      {/* description */}
      <p className="text-xs leading-relaxed line-clamp-2" style={{ color: '#6b7280' }}>
        {project.descriptionAr}
      </p>

      {/* links */}
      <div className="flex gap-3">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs transition-colors"
            style={{ color: '#3b82f6' }}>
            <Globe className="w-3 h-3" /> Live
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs transition-colors"
            style={{ color: '#6b7280' }}>
            <Github className="w-3 h-3" /> GitHub
          </a>
        )}
      </div>

      {/* actions */}
      <div className="flex gap-2 pt-1" style={{ borderTop: '1px solid #1f2937' }}>
        <button
          onClick={onToggleFeatured}
          className="p-1.5 rounded-lg transition-colors"
          style={{ color: project.featured ? '#eab308' : '#4b5563', background: '#1f2937' }}
          title={project.featured ? 'إزالة من المميز' : 'تعيين كمميز'}
        >
          {project.featured ? <Star className="w-3.5 h-3.5" /> : <StarOff className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={onEdit}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
          style={{ background: '#1f2937', color: '#9ca3af', border: '1px solid #374151' }}
        >
          <Pencil className="w-3 h-3" /> تعديل
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 rounded-lg transition-colors"
          style={{ background: 'rgba(239,68,68,0.08)', color: '#f87171', border: '1px solid rgba(239,68,68,0.15)' }}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function PortfolioDashboardPage() {
  const router = useRouter();
  const [projects, setProjects]     = useState<PortfolioProject[]>([]);
  const [loading, setLoading]       = useState(true);
  const [formProject, setFormProject] = useState<PortfolioProject | null | undefined>(undefined);
  const [deleteId, setDeleteId]     = useState<string | null>(null);
  const [error, setError]           = useState('');
  const [seeding, setSeeding]       = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('vault_auth') !== 'true') {
      router.replace('/dashboard');
    }
  }, [router]);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getPortfolioProjects();
      setProjects(data);
    } catch {
      setError('تعذّر تحميل المشاريع. تحقق من إعدادات Gist.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleSave(data: Omit<PortfolioProject, 'id' | 'createdAt'>) {
    if (formProject?.id) {
      await updatePortfolioProject(formProject.id, data);
    } else {
      await addPortfolioProject({ ...data, order: projects.length });
    }
    await load();
  }

  async function handleDelete(id: string) {
    await deletePortfolioProject(id);
    setDeleteId(null);
    await load();
  }

  async function handleToggleFeatured(project: PortfolioProject) {
    await updatePortfolioProject(project.id, { featured: !project.featured });
    await load();
  }

  async function handleSeedFromVault() {
    setSeeding(true);
    setError('');
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'seed-from-vault' }),
      });
      const data = await res.json();
      await load();
      if (data.added === 0) setError('لا توجد مشاريع جديدة للاستيراد — جميعها موجودة مسبقاً');
    } catch {
      setError('فشل الاستيراد');
    } finally {
      setSeeding(false);
    }
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: '#070d1a', fontFamily: "'Tajawal', sans-serif" }}
      dir="rtl"
    >
      {/* header */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6 h-14"
        style={{ background: 'rgba(7,13,26,0.95)', borderBottom: '1px solid #1f2937', backdropFilter: 'blur(8px)' }}
      >
        <div className="flex items-center gap-2 text-sm" style={{ color: '#6b7280' }}>
          <button onClick={() => router.push('/dashboard/vault')} className="hover:text-white transition-colors">
            Project Vault
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white font-semibold">إدارة البورتفوليو</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            className="p-2 rounded-lg transition-colors hover:text-white"
            style={{ color: '#6b7280' }}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <a
            href="/" target="_blank"
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors"
            style={{ color: '#3b82f6', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}
          >
            <ExternalLink className="w-3 h-3" /> عرض الموقع
          </a>
          <button
            onClick={() => { sessionStorage.removeItem('vault_auth'); router.push('/dashboard'); }}
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg"
            style={{ color: '#f87171', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        {/* toolbar */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-white text-xl">مشاريع البورتفوليو</h1>
            <p className="text-sm mt-0.5" style={{ color: '#6b7280' }}>
              {projects.length} مشروع — {projects.filter(p => p.featured).length} مميز
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSeedFromVault}
              disabled={seeding}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
              style={{ background: '#1f2937', color: '#34d399', border: '1px solid rgba(52,211,153,0.3)' }}
              title="استيراد المشاريع من الـ Vault"
            >
              <Download className={`w-4 h-4 ${seeding ? 'animate-bounce' : ''}`} />
              {seeding ? 'جاري الاستيراد...' : 'استيراد من Vault'}
            </button>
            <button
              onClick={() => setFormProject(null)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
            >
              <Plus className="w-4 h-4" /> مشروع جديد
            </button>
          </div>
        </div>

        {/* error */}
        {error && (
          <div className="rounded-xl p-4 text-sm" style={{ background: 'rgba(239,68,68,0.08)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>
            {error}
          </div>
        )}

        {/* grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl h-52 animate-pulse" style={{ background: '#111827' }} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-24" style={{ color: '#4b5563' }}>
            <p className="text-5xl mb-4">📂</p>
            <p className="text-lg font-medium text-white mb-1">لا توجد مشاريع بعد</p>
            <p className="text-sm">اضغط على "مشروع جديد" للبدء</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(p => (
              <ProjectCard
                key={p.id}
                project={p}
                onEdit={() => setFormProject(p)}
                onDelete={() => setDeleteId(p.id)}
                onToggleFeatured={() => handleToggleFeatured(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* form modal */}
      {formProject !== undefined && (
        <ProjectFormModal
          project={formProject}
          onClose={() => setFormProject(undefined)}
          onSave={handleSave}
        />
      )}

      {/* delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="w-full max-w-sm rounded-2xl p-6 text-center" style={{ background: '#111827', border: '1px solid #1f2937' }}>
            <p className="text-3xl mb-3">🗑️</p>
            <h3 className="font-bold text-white text-lg mb-1">حذف المشروع</h3>
            <p className="text-sm mb-5" style={{ color: '#9ca3af' }}>لا يمكن التراجع عن هذا الإجراء.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 rounded-xl font-semibold text-white" style={{ background: '#dc2626' }}>حذف</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl font-medium" style={{ background: '#1f2937', color: '#9ca3af', border: '1px solid #374151' }}>إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
