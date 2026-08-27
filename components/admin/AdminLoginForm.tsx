'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { Lock, Mail, Eye, EyeOff, Loader2, ArrowLeft, ShieldCheck } from 'lucide-react'
import { loginAdminAction } from '@/app/admin/login/actions'

export default function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(loginAdminAction, null)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Tarjeta de Login */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
        {/* Cabecera del formulario */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mx-auto flex items-center justify-center mb-4 shadow-inner">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Panel Administrativo</h1>
          <p className="text-slate-400 text-sm mt-1.5">
            Ingresa con tus credenciales de Supabase Auth
          </p>
        </div>

        {/* Mensaje de error */}
        {state?.error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-sm flex items-start gap-3 animate-shake">
            <span className="text-red-400 font-bold">⚠️</span>
            <div className="flex-1">{state.error}</div>
          </div>
        )}

        {/* Formulario */}
        <form action={formAction} className="space-y-5">
          <div>
            <label
              htmlFor="admin-email"
              className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
            >
              Correo Electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail size={18} />
              </div>
              <input
                id="admin-email"
                name="email"
                type="email"
                required
                placeholder="admin@florerialeo.com"
                className="w-full pl-11 pr-4 py-3 bg-slate-950/70 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 text-sm transition-all"
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
            >
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock size={18} />
              </div>
              <input
                id="admin-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                className="w-full pl-11 pr-11 py-3 bg-slate-950/70 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 text-sm transition-all"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg shadow-rose-500/25 transition-all duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.99]"
          >
            {isPending ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Verificando credenciales...</span>
              </>
            ) : (
              <span>Entrar al Panel</span>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Volver a la tienda pública</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
