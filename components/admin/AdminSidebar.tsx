'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  Eye,
  Users,
  Settings,
  LogOut,
  Flower2,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { logoutAdminAction } from '@/app/admin/login/actions'

interface AdminSidebarProps {
  userEmail?: string | null
  onCloseMobile?: () => void
}

const navItems = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    name: 'Productos',
    href: '/admin/productos',
    icon: Package,
    exact: false,
  },
  {
    name: 'Usuarios',
    href: '/admin/usuarios',
    icon: Users,
    exact: false,
  },
  {
    name: 'Configuración',
    href: '/admin/configuracion',
    icon: Settings,
    exact: false,
  },
]

export default function AdminSidebar({ userEmail, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname()

  const isActive = (itemHref: string, exact: boolean) => {
    if (exact) {
      return pathname === itemHref
    }
    return pathname === itemHref || pathname.startsWith(`${itemHref}/`)
  }

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <Link
          href="/admin"
          className="flex items-center gap-3 group text-white hover:opacity-90 transition-opacity"
          onClick={onCloseMobile}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
            <Flower2 size={22} />
          </div>
          <div>
            <div className="font-bold text-sm tracking-tight flex items-center gap-1.5">
              <span>Florería Leo</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                PRO
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">Panel de Control</div>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
          Menú Principal
        </div>

        {navItems.map((item) => {
          const active = isActive(item.href, item.exact)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className={active ? 'text-white' : 'text-slate-400'} />
                <span>{item.name}</span>
              </div>
              {active && <ChevronRight size={14} className="text-rose-200" />}
            </Link>
          )
        })}

        {/* Sección Tienda Pública */}
        <div className="pt-6 px-3 pb-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
          Tienda en Vivo
        </div>

        <Link
          href="/catalogo"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all group"
        >
          <div className="flex items-center gap-3">
            <Eye size={18} className="text-emerald-400" />
            <span>Ver Catálogo</span>
          </div>
          <ExternalLink size={14} className="text-slate-400 group-hover:text-slate-300" />
        </Link>

        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all group"
        >
          <div className="flex items-center gap-3">
            <Sparkles size={18} className="text-amber-400" />
            <span>Ver Sitio Web</span>
          </div>
          <ExternalLink size={14} className="text-slate-400 group-hover:text-slate-300" />
        </Link>
      </div>

      {/* User info & Logout */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
        <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800/80 mb-2">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
            Sesión Activa
          </div>
          <div className="text-xs font-medium text-slate-200 truncate mt-0.5" title={userEmail || 'Administrador'}>
            {userEmail || 'admin@florerialeo.com'}
          </div>
        </div>

        <form action={logoutAdminAction}>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-300 hover:text-white hover:bg-rose-500/20 border border-rose-500/20 transition-all cursor-pointer"
          >
            <LogOut size={15} />
            <span>Cerrar Sesión</span>
          </button>
        </form>
      </div>
    </aside>
  )
}
