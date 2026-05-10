'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, LogOut, RefreshCw, Filter } from 'lucide-react';
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
      className="min-h-screen"
      style={{ background: '#070d1a', fontFamily: "'Tajawal', sans-serif" }}
      dir="rtl"
    >
      {/* Header */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6 h-14"
        style={{ background: 'rgba(7,13,26,0.95)', borderBottom: '1px solid #1f2937', backdropFilter: 'blur(8px)' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">🔐</span>
          <h1 className="font-bold text-white text-lg tracking-tight">Project Vault</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push('/dashboard/portfolio')}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors"
            style={{ color: '#34d399', background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)' }}
          >
            <span>🌐</span>
            <span>البورتفوليو</span>
          </button>
          <button
            onClick={loadProjects}
            className="p-2 rounded-lg transition-colors"
            style={{ color: '#6b7280' }}
            title="تحديث"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-colors"
            style={{ color: '#f87171', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}
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
            <Search
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: '#6b7280', right: '12px' }}
            />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ابحث عن مشروع..."
              className="w-full rounded-xl py-2.5 text-sm text-white placeholder-gray-500 outline-none"
              style={{
                background: '#111827',
                border: '1px solid #1f2937',
                paddingRight: '38px',
                paddingLeft: '12px',
              }}
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 shrink-0" style={{ color: '#6b7280' }} />
            <div className="flex gap-1.5 flex-wrap">
              {Object.entries(STATUS_LABELS).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setStatusFilter(val)}
                  className="text-xs px-3 py-1.5 rounded-full transition-all"
                  style={
                    statusFilter === val
                      ? {
                          background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                          color: '#fff',
                        }
                      : {
                          background: '#111827',
                          color: '#9ca3af',
                          border: '1px solid #1f2937',
                        }
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Add button */}
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shrink-0"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)', color: '#fff' }}
          >
            <Plus className="w-4 h-4" />
            مشروع جديد
          </button>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl h-52 animate-pulse"
                style={{ background: '#111827' }}
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20" style={{ color: '#4b5563' }}>
            <p className="text-4xl mb-3">🔍</p>
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
          <p className="text-xs text-center pb-4" style={{ color: '#374151' }}>
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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)' }}
        >
          <div
            className="w-full max-w-sm rounded-2xl p-6 text-center"
            style={{ background: '#111827', border: '1px solid #1f2937' }}
          >
            <p className="text-3xl mb-3">🗑️</p>
            <h3 className="font-bold text-white text-lg mb-1">حذف المشروع</h3>
            <p className="text-sm mb-5" style={{ color: '#9ca3af' }}>
              هل أنت متأكد؟ لا يمكن التراجع عن هذا الإجراء.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 rounded-xl font-semibold text-white"
                style={{ background: '#dc2626' }}
              >
                حذف
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl font-medium"
                style={{
                  background: '#1f2937',
                  color: '#9ca3af',
                  border: '1px solid #374151',
                }}
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
