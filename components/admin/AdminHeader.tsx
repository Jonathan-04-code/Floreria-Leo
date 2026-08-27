'use client'

import { useState } from 'react'
import { Menu, Shield, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface AdminHeaderProps {
  userEmail?: string | null
  onOpenMobileMenu: () => void
}

export default function AdminHeader({ userEmail, onOpenMobileMenu }: AdminHeaderProps) {
  const router = useRouter()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    router.refresh()
    setTimeout(() => setIsRefreshing(false), 600)
  }

  return (
    <header className="h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      {/* Botón menú móvil + Título */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Abrir menú de navegación"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-slate-300 hidden sm:inline-block">
            Base de Datos Supabase Conectada
          </span>
        </div>
      </div>

      {/* Acciones de la barra superior */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors relative cursor-pointer"
          title="Actualizar datos"
        >
          <RefreshCw size={17} className={isRefreshing ? 'animate-spin text-rose-400' : ''} />
        </button>

        {/* Indicador de rol Admin */}
        <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-300 text-xs font-bold">
            <Shield size={14} />
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-semibold text-white">Administrador</div>
            <div className="text-[10px] text-slate-400 truncate max-w-[150px]">
              {userEmail || 'admin@florerialeo.com'}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
