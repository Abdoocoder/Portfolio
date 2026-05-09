'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock } from 'lucide-react';

const VAULT_USER = 'abdoo';
const VAULT_PASS = 'Sss123456.';

export default function DashboardLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('vault_auth') === 'true') {
      router.replace('/dashboard/vault');
    }
  }, [router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (username === VAULT_USER && password === VAULT_PASS) {
        sessionStorage.setItem('vault_auth', 'true');
        router.push('/dashboard/vault');
      } else {
        setError('بيانات الدخول غير صحيحة');
        setLoading(false);
      }
    }, 400);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: '#0a0f1e', fontFamily: "'Tajawal', sans-serif" }}
      dir="rtl"
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
          >
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Project Vault</h1>
          <p style={{ color: '#94a3b8' }} className="text-sm mt-1">خزنة المشاريع الشخصية</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-6 space-y-4"
          style={{ background: '#111827', border: '1px solid #1f2937' }}
        >
          <div>
            <label className="block text-sm mb-1.5" style={{ color: '#d1d5db' }}>
              اسم المستخدم
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="username"
              dir="ltr"
              required
              className="w-full rounded-lg px-4 py-2.5 text-white placeholder-gray-500 outline-none transition-all"
              style={{
                background: '#1f2937',
                border: '1px solid #374151',
              }}
              onFocus={e => (e.target.style.borderColor = '#3b82f6')}
              onBlur={e => (e.target.style.borderColor = '#374151')}
            />
          </div>

          <div>
            <label className="block text-sm mb-1.5" style={{ color: '#d1d5db' }}>
              كلمة المرور
            </label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                dir="ltr"
                required
                className="w-full rounded-lg px-4 py-2.5 text-white placeholder-gray-500 outline-none transition-all"
                style={{
                  background: '#1f2937',
                  border: '1px solid #374151',
                  paddingLeft: '2.5rem',
                }}
                onFocus={e => (e.target.style.borderColor = '#3b82f6')}
                onBlur={e => (e.target.style.borderColor = '#374151')}
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: '#6b7280' }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = '#d1d5db')}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = '#6b7280')}
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-center" style={{ color: '#f87171' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-semibold py-2.5 rounded-lg transition-all mt-1"
            style={{
              background: loading ? '#374151' : 'linear-gradient(135deg, #3b82f6, #6366f1)',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? '...' : 'دخول'}
          </button>
        </form>
      </div>
    </div>
  );
}
