'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export interface LoginActionResult {
  success?: boolean
  error?: string
}

export async function loginAdminAction(
  _prevState: LoginActionResult | null,
  formData: FormData
): Promise<LoginActionResult> {
  const email = (formData.get('email') as string)?.trim()
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Por favor ingresa tu correo y contraseña.' }
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      if (error.message.toLowerCase().includes('invalid login credentials')) {
        return { error: 'Correo o contraseña incorrectos. Verifica tus credenciales de administrador.' }
      }
      return { error: error.message || 'Error al iniciar sesión con Supabase Auth' }
    }

    if (!data?.user) {
      return { error: 'No se pudo obtener la sesión de usuario de Supabase.' }
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error inesperado al conectar con Supabase.'
    console.error('Exception during admin login:', msg)
    return { error: msg }
  }

  // Redirigir al dashboard con las cookies de sesión ya establecidas en la cabecera HTTP
  redirect('/admin')
}

export async function logoutAdminAction() {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
  } catch (err) {
    console.error('Error during logout:', err)
  }
  redirect('/admin/login')
}
