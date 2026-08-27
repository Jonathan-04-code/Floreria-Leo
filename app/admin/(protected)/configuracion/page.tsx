import {
  Store,
  MessageCircle,
  Database,
  Layers,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Configuración – Florería Leo Admin',
  description: 'Ajustes generales del sistema y conectividad',
}

export default function AdminConfiguracionPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'No configurado'

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <span>Configuración del Sistema</span>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            Ajustes
          </span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Información general de la tienda, canales de cotización y servicios conectados.
        </p>
      </div>

      {/* Datos de Florería Leo */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
            <Store size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Datos de la Florería</h2>
            <p className="text-xs text-slate-400">Información pública y canales de contacto</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Nombre Comercial
            </div>
            <div className="text-sm font-bold text-white">Florería Leo</div>
            <div className="text-xs text-slate-400 mt-1">
              Detalles que hablan por ti &middot; Arreglos florales artesanales
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Canal de Cotización WhatsApp
            </div>
            <div className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <MessageCircle size={16} />
              <span>+52 1 56 1916 7705</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Cotizaciones personalizadas directas por WhatsApp
            </div>
          </div>
        </div>
      </div>

      {/* Conexión Supabase */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Database size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Configuración de Supabase</h2>
            <p className="text-xs text-slate-400">Variables de entorno y servicios de backend</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Supabase Project URL
              </div>
              <div className="text-xs font-mono text-slate-200 mt-1 break-all">
                {supabaseUrl}
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 w-fit">
              Conectado
            </span>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Storage Bucket para Fotos
              </div>
              <div className="text-xs font-mono text-slate-200 mt-1">
                products (Public Bucket)
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 w-fit">
              Activo
            </span>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Tabla de Base de Datos
              </div>
              <div className="text-xs font-mono text-slate-200 mt-1">
                public.products
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 w-fit">
              Sincronizada
            </span>
          </div>
        </div>
      </div>

      {/* Módulos Futuros Preparados */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
            <Layers size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Módulos de Expansión Preparados</h2>
            <p className="text-xs text-slate-400">
              Arquitectura lista para activar módulos adicionales cuando se requieran
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-slate-400">
            📦 Pedidos &amp; Entregas
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-slate-400">
            💬 Cotizaciones WhatsApp
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-slate-400">
            🏷️ Promociones &amp; Cupones
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-slate-400">
            📊 Analítica Avanzada
          </div>
        </div>
      </div>
    </div>
  )
}
