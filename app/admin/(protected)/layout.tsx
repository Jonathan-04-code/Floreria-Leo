import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminShell from '@/components/admin/AdminShell'

export const dynamic = 'force-dynamic'

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
  } catch (error: unknown) {
    // Si es un error interno de Next.js (DYNAMIC_SERVER_USAGE o NEXT_REDIRECT), permitir que Next.js lo procese
    if (
      typeof error === 'object' &&
      error !== null &&
      'digest' in error &&
      typeof (error as { digest: unknown }).digest === 'string' &&
      ((error as { digest: string }).digest.startsWith('NEXT_') ||
        (error as { digest: string }).digest.startsWith('DYNAMIC_'))
    ) {
      throw error
    }
    console.error('Error de autenticación en AdminProtectedLayout:', error)
  }

  if (!user) {
    redirect('/admin/login')
  }

  return <AdminShell userEmail={user.email}>{children}</AdminShell>
}
