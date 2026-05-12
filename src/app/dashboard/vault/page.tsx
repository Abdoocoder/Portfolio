'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, LogOut, RefreshCw, Filter, Lock, Globe, Trash2 } from 'lucide-react';
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  seedIfEmpty,
  type VaultProject,

} from '@/lib/vault-data';
import { StatsBar } from './components/StatsBar';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetail } from './components/ProjectDetail';
import { ProjectForm } from './components/ProjectForm';

const STATUS_LABELS: Record<string, string> = {
  all: 'الكل',
  idea: 'فكرة',
  active: 'نشط',
  testing: 'اختبار',
  production: 'إنتاج',
  paused: 'متوقف',
  completed: 'مكتمل',
};

export default function VaultPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<VaultProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<VaultProject | null>(null);
  const [formProject, setFormProject] = useState<VaultProject | null | undefined>(undefined);
  // undefined = closed, null = add new, VaultProject = edit
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('vault_auth') !== 'true') {
      router.replace('/dashboard');
      return;
    }
    loadProjects();
  }, [router]);

  async function loadProjects() {
    setLoading(true);
    try {
      await seedIfEmpty();
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error('Failed to load vault:', err);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    sessionStorage.removeItem('vault_auth');
    router.push('/dashboard');
  }

  const filtered = useMemo(() => {
    return projects.filter(p => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.name.includes(search) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [projects, search, statusFilter]);

  async function handleSave(data: Omit<VaultProject, 'id' | 'createdAt'>) {
    if (formProject && formProject.id) {
      await updateProject(formProject.id, data);
    } else {
      await addProject(data);
    }
    await loadProjects();
  }

  async function handleDelete(id: string) {
    await deleteProject(id);
    setSelectedProject(null);
    setDeleteConfirm(null);
    await loadProjects();
  }

  function openEdit(p: VaultProject) {
    setSelectedProject(null);
    setFormProject(p);
  }

  function openAdd() {
    setFormProject(null);
  }

  return (
    <div
      className="min-h-screen bg-gray-950"
      dir="rtl"
      style={{ fontFamily: "'Tajawal', sans-serif" }}
    >
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6 h-14 bg-gray-950/95 border-b border-gray-800 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-gray-400" />
          <h1 className="font-bold text-gray-100 text-lg tracking-tight">Project Vault</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push('/dashboard/portfolio')}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 hover:bg-emerald-400/20 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>البورتفوليو</span>
          </button>
          <button
            onClick={loadProjects}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-400 transition-colors"
            title="تحديث"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg text-red-400 bg-red-400/10 border border-red-400/20 hover:bg-red-400/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>خروج</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        {/* Stats */}
        <StatsBar projects={projects} />

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 right-3" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ابحث عن مشروع..."
              className="w-full rounded-xl py-2.5 pr-10 pl-3 text-sm text-gray-100 placeholder-gray-500 outline-none bg-gray-900 border border-gray-800 focus:border-gray-700"
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 shrink-0 text-gray-500" />
            <div className="flex gap-1.5 flex-wrap">
              {Object.entries(STATUS_LABELS).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setStatusFilter(val)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                    statusFilter === val
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white'
                      : 'bg-gray-900 text-gray-400 border border-gray-800 hover:bg-gray-800'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Add button */}
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shrink-0 bg-gradient-to-br from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600"
          >
            <Plus className="w-4 h-4" />
            مشروع جديد
          </button>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl h-52 animate-pulse bg-gray-900" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            <Search className="w-10 h-10 mx-auto mb-3 text-gray-500" />
            <p className="text-lg">لا توجد مشاريع</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(p => (
              <ProjectCard
                key={p.id}
                project={p}
                onClick={() => setSelectedProject(p)}
                onEdit={e => {
                  e.stopPropagation();
                  openEdit(p);
                }}
                onDelete={e => {
                  e.stopPropagation();
                  setDeleteConfirm(p.id!);
                }}
              />
            ))}
          </div>
        )}

        {/* Count */}
        {!loading && filtered.length > 0 && (
          <p className="text-xs text-center pb-4 text-gray-700">
            {filtered.length} من {projects.length} مشروع
          </p>
        )}
      </div>

      {/* Project Detail */}
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onEdit={() => openEdit(selectedProject)}
          onDelete={() => setDeleteConfirm(selectedProject.id!)}
        />
      )}

      {/* Project Form */}
      <ProjectForm
        project={formProject ?? null}
        open={formProject !== undefined}
        onClose={() => setFormProject(undefined)}
        onSave={handleSave}
      />

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="w-full max-w-sm rounded-2xl p-6 text-center bg-gray-900 border border-gray-800">
            <Trash2 className="w-8 h-8 mx-auto mb-3 text-gray-500" />
            <h3 className="font-bold text-gray-100 text-lg mb-1">حذف المشروع</h3>
            <p className="text-sm mb-5 text-gray-400">
              هل أنت متأكد؟ لا يمكن التراجع عن هذا الإجراء.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                حذف
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl font-medium bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700 transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
