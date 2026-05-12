import { auth, clerkClient } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/')
  }

  const user = await (await clerkClient()).users.getUser(userId)

  if (!user.publicMetadata.isAdmin) {
    redirect('/')
  }

  return <>{children}</>
}
