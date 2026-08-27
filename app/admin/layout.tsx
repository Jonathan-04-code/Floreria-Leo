import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Iniciar Sesión | Panel Florería Leo',
  description: 'Acceso administrativo seguro para Florería Leo',
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="admin-root-scope min-h-screen bg-slate-950 text-slate-100 antialiased">{children}</div>
}
