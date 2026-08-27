'use client'

import { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import { X } from 'lucide-react'

interface AdminShellProps {
  children: React.ReactNode
  userEmail?: string | null
}

export default function AdminShell({ children, userEmail }: AdminShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-row">
      {/* Sidebar fijo para pantallas de escritorio (lg+) */}
      <div className="hidden lg:block w-64 flex-shrink-0 h-screen sticky top-0">
        <AdminSidebar userEmail={userEmail} />
      </div>

      {/* Menú Drawer Móvil con Backdrop */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Fondo oscuro con desenfoque */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Panel lateral móvil */}
          <div className="relative w-64 max-w-[80vw] h-full z-10">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-[-44px] p-2 bg-slate-900 border border-slate-800 rounded-full text-slate-300 hover:text-white"
              aria-label="Cerrar menú"
            >
              <X size={18} />
            </button>
            <AdminSidebar
              userEmail={userEmail}
              onCloseMobile={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Contenedor Principal */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          userEmail={userEmail}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
