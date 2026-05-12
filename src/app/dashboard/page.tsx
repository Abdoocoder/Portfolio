import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { FolderKanban, Shield } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-blue-400" />
          <h1 className="text-lg font-bold text-gray-100">Admin Dashboard</h1>
        </div>
        <UserButton />
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full">
          <Link
            href="/dashboard/vault"
            className="group rounded-2xl border border-gray-800 bg-gray-900 p-8 hover:border-blue-500/50 transition-colors"
          >
            <FolderKanban className="w-10 h-10 text-blue-400 mb-4" />
            <h2 className="text-xl font-bold text-gray-100 group-hover:text-blue-400 transition-colors">
              Project Vault
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Manage your personal project repository
            </p>
          </Link>

          <Link
            href="/dashboard/portfolio"
            className="group rounded-2xl border border-gray-800 bg-gray-900 p-8 hover:border-blue-500/50 transition-colors"
          >
            <svg className="w-10 h-10 text-blue-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
            </svg>
            <h2 className="text-xl font-bold text-gray-100 group-hover:text-blue-400 transition-colors">
              Portfolio Manager
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Add, edit, and manage portfolio projects
            </p>
          </Link>
        </div>
      </main>
    </div>
  )
}
