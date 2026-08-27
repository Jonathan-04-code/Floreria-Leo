import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminShell from '@/components/admin/AdminShell'

export const metadata = {
  title: 'Panel Administrativo – Florería Leo',
  description: 'Gestión integral de catálogo, productos y configuración',
}

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let user = null

  try {
    const supabase = await createClient()
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()

    user = authUser
  } catch (error) {
    console.error('Error in AdminProtectedLayout:', error)
  }

  if (!user) {
    redirect('/admin/login')
  }

  return <AdminShell userEmail={user.email}>{children}</AdminShell>
}
