'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus, Pencil, Trash2, RefreshCw, LogOut, Globe, Github, Folder,
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
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 py-8 bg-black/75"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-2xl rounded-2xl bg-gray-900 border border-gray-800">
        {/* header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h2 className="font-bold text-gray-100 text-lg">
            {project ? 'تعديل المشروع' : 'مشروع جديد'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300 transition-colors text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* names */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-sm block mb-1.5">الاسم عربي *</label>
              <input className="w-full rounded-lg px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 outline-none focus:border-blue-500" required value={form.nameAr} onChange={e => set('nameAr', e.target.value)} placeholder="سوق سيداتي" />
            </div>
            <div>
              <label className="text-gray-400 text-sm block mb-1.5">الاسم إنجليزي *</label>
              <input className="w-full rounded-lg px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 outline-none focus:border-blue-500" dir="ltr" required value={form.nameEn} onChange={e => set('nameEn', e.target.value)} placeholder="Madaba Women Market" />
            </div>
          </div>

          {/* descriptions */}
          <div>
            <label className="text-gray-400 text-sm block mb-1.5">الوصف عربي *</label>
            <textarea
              className="w-full rounded-lg px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 outline-none focus:border-blue-500 resize-vertical min-h-[80px]"
              required value={form.descriptionAr}
              onChange={e => set('descriptionAr', e.target.value)}
              placeholder="وصف المشروع بالعربية..."
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm block mb-1.5">الوصف إنجليزي *</label>
            <textarea
              className="w-full rounded-lg px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 outline-none focus:border-blue-500 resize-vertical min-h-[80px]"
              dir="ltr" required value={form.descriptionEn}
              onChange={e => set('descriptionEn', e.target.value)}
              placeholder="Project description in English..."
            />
          </div>

          {/* category + featured */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-sm block mb-1.5">الفئة</label>
              <select
                className="w-full rounded-lg px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 outline-none focus:border-blue-500 cursor-pointer"
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
                  className={`w-11 h-6 rounded-full transition-colors relative ${form.featured ? 'bg-blue-500' : 'bg-gray-700'}`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${form.featured ? 'left-0.5' : 'left-0.5'}`}
                    style={{ transform: form.featured ? 'translateX(22px)' : 'translateX(2px)' }}
                  />
                </div>
                <span className="text-gray-300 text-sm">مميز (Featured)</span>
              </label>
            </div>
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="text-gray-400 text-sm block mb-1.5">رابط الموقع</label>
              <input className="w-full rounded-lg px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 outline-none focus:border-blue-500" dir="ltr" type="url" value={form.liveUrl} onChange={e => set('liveUrl', e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <label className="text-gray-400 text-sm block mb-1.5">رابط GitHub</label>
              <input className="w-full rounded-lg px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 outline-none focus:border-blue-500" dir="ltr" type="url" value={form.githubUrl} onChange={e => set('githubUrl', e.target.value)} placeholder="https://github.com/..." />
            </div>
            <div>
              <label className="text-gray-400 text-sm block mb-1.5">رابط الصورة (Screenshot)</label>
              <input className="w-full rounded-lg px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 outline-none focus:border-blue-500" dir="ltr" type="url" value={form.imageUrl} onChange={e => set('imageUrl', e.target.value)} placeholder="https://..." />
            </div>
          </div>

          {/* tech */}
          <div>
            <label className="text-gray-400 text-sm block mb-1.5">التقنيات</label>
            <div className="flex gap-2 mb-2">
              <input
                className="flex-1 rounded-lg px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 outline-none focus:border-blue-500"
                dir="ltr"
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech())}
                placeholder="Next.js"
              />
              <button
                type="button" onClick={addTech}
                className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700 transition-colors"
              >
                إضافة
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.tech.map(t => (
                <span
                  key={t}
                  className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full cursor-pointer bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
                  onClick={() => set('tech', form.tech.filter(x => x !== t))}
                >
                  {t} <span className="text-red-400">✕</span>
                </span>
              ))}
            </div>
          </div>

          {/* tags */}
          <div>
            <label className="text-gray-400 text-sm block mb-1.5">التاقات (Tags)</label>
            <div className="flex gap-2 mb-2">
              <input
                className="flex-1 rounded-lg px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 outline-none focus:border-blue-500"
                dir="ltr"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="E-commerce"
              />
              <button
                type="button" onClick={addTag}
                className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700 transition-colors"
              >
                إضافة
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.tags.map(t => (
                <span
                  key={t}
                  className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full cursor-pointer bg-gray-700 text-gray-400 hover:bg-gray-600"
                  onClick={() => set('tags', form.tags.filter(x => x !== t))}
                >
                  {t} <span className="text-red-400">✕</span>
                </span>
              ))}
            </div>
          </div>

          {/* order */}
          <div>
            <label className="text-gray-400 text-sm block mb-1.5">الترتيب</label>
            <input
              className="rounded-lg px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 outline-none focus:border-blue-500 w-[100px]"
              type="number" min={0}
              value={form.order}
              onChange={e => set('order', Number(e.target.value))}
            />
          </div>

          {/* actions */}
          <div className="flex gap-3 pt-2 border-t border-gray-800">
            <button
              type="submit" disabled={saving}
              className="flex-1 py-2.5 rounded-xl font-semibold text-white transition-all disabled:bg-gray-600 bg-gradient-to-br from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
            >
              {saving ? 'جاري الحفظ...' : project ? 'حفظ التعديلات' : 'إضافة المشروع'}
            </button>
            <button
              type="button" onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-medium bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700 transition-colors"
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
    <div className="rounded-xl p-4 flex flex-col gap-3 group transition-all bg-gray-900 border border-gray-800 hover:border-gray-700">
      {/* top row */}
      <div className="flex items-start gap-3">
        {/* thumbnail */}
        <div className="w-14 h-14 rounded-lg shrink-0 overflow-hidden flex items-center justify-center bg-gray-800">
          {project.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.imageUrl} alt={project.nameEn} className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-6 h-6 text-gray-600" />
          )}
        </div>
        {/* info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-100 text-sm truncate">{project.nameAr}</h3>
            {project.featured && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full shrink-0 bg-yellow-400/15 text-yellow-400">
                ★ مميز
              </span>
            )}
          </div>
          <p className="text-xs mt-0.5 truncate text-gray-500">{project.nameEn}</p>
          <div className="flex flex-wrap gap-1 mt-1.5">
            {project.tech.slice(0, 3).map(t => (
              <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-400 border border-gray-700">
                {t}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-[10px] text-gray-600">+{project.tech.length - 3}</span>
            )}
          </div>
        </div>
      </div>

      {/* description */}
      <p className="text-xs leading-relaxed line-clamp-2 text-gray-500">
        {project.descriptionAr}
      </p>

      {/* links */}
      <div className="flex gap-3">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors">
            <Globe className="w-3 h-3" /> Live
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-400 transition-colors">
            <Github className="w-3 h-3" /> GitHub
          </a>
        )}
      </div>

      {/* actions */}
      <div className="flex gap-2 pt-1 border-t border-gray-800">
        <button
          onClick={onToggleFeatured}
          className={`p-1.5 rounded-lg transition-colors ${project.featured ? 'text-yellow-400 bg-gray-800' : 'text-gray-600 bg-gray-800 hover:text-gray-400'}`}
          title={project.featured ? 'إزالة من المميز' : 'تعيين كمميز'}
        >
          {project.featured ? <Star className="w-3.5 h-3.5" /> : <StarOff className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={onEdit}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700 transition-colors"
        >
          <Pencil className="w-3 h-3" /> تعديل
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 rounded-lg bg-red-400/10 text-red-400 border border-red-400/20 hover:bg-red-400/20 transition-colors"
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
      className="min-h-screen bg-gray-950"
      dir="rtl"
      style={{ fontFamily: "'Tajawal', sans-serif" }}
    >
      {/* header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6 h-14 bg-gray-950/95 border-b border-gray-800 backdrop-blur-md">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <button onClick={() => router.push('/dashboard/vault')} className="hover:text-gray-300 transition-colors">
            Project Vault
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-100 font-semibold">إدارة البورتفوليو</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-300 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <a
            href="/" target="_blank"
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg text-blue-400 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
          >
            <ExternalLink className="w-3 h-3" /> عرض الموقع
          </a>
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg text-red-400 bg-red-400/10 border border-red-400/20 hover:bg-red-400/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        {/* toolbar */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-gray-100 text-xl">مشاريع البورتفوليو</h1>
            <p className="text-sm mt-0.5 text-gray-500">
              {projects.length} مشروع — {projects.filter(p => p.featured).length} مميز
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSeedFromVault}
              disabled={seeding}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all bg-gray-800 text-emerald-400 border border-emerald-400/30 hover:bg-gray-700 disabled:opacity-50"
              title="استيراد المشاريع من الـ Vault"
            >
              <Download className={`w-4 h-4 ${seeding ? 'animate-pulse' : ''}`} />
              {seeding ? 'جاري الاستيراد...' : 'استيراد من Vault'}
            </button>
            <button
              onClick={() => setFormProject(null)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-br from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
            >
              <Plus className="w-4 h-4" /> مشروع جديد
            </button>
          </div>
        </div>

        {/* error */}
        {error && (
          <div className="rounded-xl p-4 text-sm bg-red-400/10 text-red-400 border border-red-400/20">
            {error}
          </div>
        )}

        {/* grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl h-52 animate-pulse bg-gray-900" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-24 text-gray-600">
            <Folder className="w-12 h-12 mx-auto mb-4 text-gray-500" />
            <p className="text-lg font-medium text-gray-100 mb-1">لا توجد مشاريع بعد</p>
            <p className="text-sm">اضغط على &quot;مشروع جديد&quot; للبدء</p>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="w-full max-w-sm rounded-2xl p-6 text-center bg-gray-900 border border-gray-800">
            <Trash2 className="w-8 h-8 mx-auto mb-3 text-gray-500" />
            <h3 className="font-bold text-gray-100 text-lg mb-1">حذف المشروع</h3>
            <p className="text-sm mb-5 text-gray-400">لا يمكن التراجع عن هذا الإجراء.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors">حذف</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl font-medium bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700 transition-colors">إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
