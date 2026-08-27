import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminLoginForm from '@/components/admin/AdminLoginForm'
import { Flower2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Acceso Administrativo – Florería Leo',
  description: 'Iniciar sesión en el panel de control de Florería Leo',
}

export default async function AdminLoginPage() {
  // Si ya tiene sesión activa en Supabase Auth, redirigir directo al dashboard
  let user = null
  try {
    const supabase = await createClient()
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()

    user = authUser
  } catch (err: unknown) {
    // Si ocurre un error al conectar con Supabase, permitir mostrar el formulario de login
    console.error('Error verificando sesión en login:', err)
  }

  if (user) {
    redirect('/admin')
  }

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Luces de fondo decorativas sutiles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Logo & Marca */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6 relative z-10">
        <div className="inline-flex items-center justify-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/30">
            <Flower2 size={22} />
          </div>
          <span className="text-2xl font-black tracking-tight text-white font-display">
            Florería <span className="text-rose-400">Leo</span>
          </span>
        </div>
      </div>

      {/* Formulario de Login */}
      <div className="relative z-10 px-4 sm:px-0">
        <AdminLoginForm />
      </div>

      <div className="mt-8 text-center text-xs text-slate-500">
        Florería Leo &copy; {new Date().getFullYear()} &middot; Panel de Control Seguro
      </div>
    </main>
  )
}
