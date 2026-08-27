import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import {
  Package,
  CheckCircle2,
  XCircle,
  Sparkles,
  Layers,
  ArrowUpRight,
  Plus,
  Eye,
  ShieldCheck,
} from 'lucide-react'
import FloralImage from '@/components/FloralImage'

export const dynamic = 'force-dynamic'

interface DashboardProductRow {
  id: string
  name: string
  description?: string | null
  descripcion?: string | null
  image_url?: string | null
  imagen?: string | null
  category?: string | null
  categoria?: string | null
  badge?: string | null
  stock?: number | null
  active?: boolean | null
  activo?: boolean | null
  created_at?: string | null
}

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // 1. Obtener todos los productos REALES de Supabase
  const { data: rawProducts } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  const products: DashboardProductRow[] = (rawProducts as DashboardProductRow[]) || []

  // Métricas calculadas con datos reales
  const totalCount = products.length
  const activeCount = products.filter((p: DashboardProductRow) =>
    p.active !== undefined && p.active !== null ? Boolean(p.active) : Boolean(p.activo)
  ).length
  const inactiveCount = totalCount - activeCount
  const featuredCount = products.filter(
    (p: DashboardProductRow) => p.badge && String(p.badge).trim().length > 0
  ).length

  // Categorías
  const categoriesCount = {
    ramos: products.filter(
      (p: DashboardProductRow) =>
        (p.category || p.categoria || '').toLowerCase() === 'ramos'
    ).length,
    arreglos: products.filter(
      (p: DashboardProductRow) =>
        (p.category || p.categoria || '').toLowerCase() === 'arreglos'
    ).length,
    especiales: products.filter(
      (p: DashboardProductRow) =>
        (p.category || p.categoria || '').toLowerCase() === 'especiales'
    ).length,
    febrero: products.filter(
      (p: DashboardProductRow) =>
        (p.category || p.categoria || '').toLowerCase() === '14-de-febrero'
    ).length,
    madres: products.filter(
      (p: DashboardProductRow) =>
        (p.category || p.categoria || '').toLowerCase() === 'dia-de-las-madres'
    ).length,
    graduaciones: products.filter(
      (p: DashboardProductRow) =>
        (p.category || p.categoria || '').toLowerCase() === 'graduaciones'
    ).length,
  }

  const recentProducts = products.slice(0, 5)

  return (
    <div className="space-y-8">
      {/* Bienvenida y Acciones Rápidas */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/40 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold mb-2">
            <Sparkles size={13} />
            <span>Panel de Administración en Vivo</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Dashboard Florería Leo
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Resumen en tiempo real conectado directamente a tu base de datos Supabase.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/productos"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-sm font-semibold shadow-lg shadow-rose-500/25 transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Gestionar Productos</span>
          </Link>
          <Link
            href="/catalogo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition-all"
          >
            <Eye size={16} />
            <span>Ver Catálogo</span>
          </Link>
        </div>
      </div>

      {/* Tarjetas de Métricas Principales (Datos Reales) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Productos */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
              <Package size={24} />
            </div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              En Catálogo
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-white tracking-tight">
              {totalCount}
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium flex items-center gap-1.5">
              <span>Total de productos registrados</span>
            </div>
          </div>
        </div>

        {/* Productos Activos */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Disponibles
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-white tracking-tight">
              {activeCount}
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">
              Visibles para clientes en la web
            </div>
          </div>
        </div>

        {/* Productos Inactivos */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <XCircle size={24} />
            </div>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Pausados
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-white tracking-tight">
              {inactiveCount}
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">
              Ocultos temporalmente
            </div>
          </div>
        </div>

        {/* Destacados / Badges */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
              <Sparkles size={24} />
            </div>
            <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
              Destacados
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-white tracking-tight">
              {featuredCount}
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">
              Con distintivo o badge especial
            </div>
          </div>
        </div>
      </div>

      {/* Sección Distribución por Categorías y Estado del Sistema */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Desglose por Categoría */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
                <Layers size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Distribución de Catálogo
                </h2>
                <p className="text-xs text-slate-400">
                  Clasificación de arreglos florales por categoría
                </p>
              </div>
            </div>
            <Link
              href="/admin/productos"
              className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1"
            >
              <span>Ver todos</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {/* Ramos */}
            <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                🌹 Ramos
              </div>
              <div className="text-xl font-black text-white mt-1.5">
                {categoriesCount.ramos}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {totalCount > 0
                  ? `${Math.round((categoriesCount.ramos / totalCount) * 100)}% del total`
                  : '0%'}
              </div>
            </div>

            {/* Arreglos */}
            <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                💐 Arreglos
              </div>
              <div className="text-xl font-black text-white mt-1.5">
                {categoriesCount.arreglos}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {totalCount > 0
                  ? `${Math.round((categoriesCount.arreglos / totalCount) * 100)}% del total`
                  : '0%'}
              </div>
            </div>

            {/* Especiales */}
            <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                ✨ Especiales
              </div>
              <div className="text-xl font-black text-white mt-1.5">
                {categoriesCount.especiales}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {totalCount > 0
                  ? `${Math.round((categoriesCount.especiales / totalCount) * 100)}% del total`
                  : '0%'}
              </div>
            </div>

            {/* 14 de Febrero */}
            <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl">
              <div className="text-xs font-semibold text-pink-400 uppercase tracking-wider">
                💖 14 de Feb
              </div>
              <div className="text-xl font-black text-white mt-1.5">
                {categoriesCount.febrero}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {totalCount > 0
                  ? `${Math.round((categoriesCount.febrero / totalCount) * 100)}% del total`
                  : '0%'}
              </div>
            </div>

            {/* Día de las Madres */}
            <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl">
              <div className="text-xs font-semibold text-rose-300 uppercase tracking-wider">
                🌸 Madres
              </div>
              <div className="text-xl font-black text-white mt-1.5">
                {categoriesCount.madres}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {totalCount > 0
                  ? `${Math.round((categoriesCount.madres / totalCount) * 100)}% del total`
                  : '0%'}
              </div>
            </div>

            {/* Graduaciones */}
            <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl">
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                🎓 Graduaciones
              </div>
              <div className="text-xl font-black text-white mt-1.5">
                {categoriesCount.graduaciones}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {totalCount > 0
                  ? `${Math.round((categoriesCount.graduaciones / totalCount) * 100)}% del total`
                  : '0%'}
              </div>
            </div>
          </div>
        </div>

        {/* Estado de Supabase & Storage */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Infraestructura
                </h2>
                <p className="text-xs text-slate-400">Estado de servicios Supabase</p>
              </div>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Base de Datos (PostgreSQL)</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Activa
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Storage Bucket (&quot;products&quot;)</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Conectado
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Supabase Auth</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Protegido
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Sincronización RLS</span>
            <span className="text-slate-300 font-mono">auth.role = authenticated</span>
          </div>
        </div>
      </div>

      {/* Lista de Últimos Productos Registrados */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Últimos Productos Agregados
            </h2>
            <p className="text-xs text-slate-400">
              Registros recientes en la tabla public.products
            </p>
          </div>
          <Link
            href="/admin/productos"
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-all flex items-center gap-1.5"
          >
            <span>Ver Catálogo Completo ({totalCount})</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {recentProducts.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            No hay productos registrados en Supabase.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 pl-2">Producto</th>
                  <th className="pb-3">Categoría</th>
                  <th className="pb-3">Estado</th>
                  <th className="pb-3">Badge</th>
                  <th className="pb-3">Fecha</th>
                  <th className="pb-3 text-right pr-2">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentProducts.map((p: DashboardProductRow) => {
                  const isActive =
                    p.active !== undefined && p.active !== null ? Boolean(p.active) : Boolean(p.activo)
                  const imgUrl = p.image_url || p.imagen || '/img/RamoRosas.png'
                  const cat = p.category || p.categoria || 'ramos'
                  const badge = p.badge
                  const dateStr = p.created_at
                    ? new Date(p.created_at).toLocaleDateString('es-MX', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'Reciente'

                  return (
                    <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                      {/* Imagen + Nombre */}
                      <td className="py-3 pl-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/80 overflow-hidden relative flex-shrink-0 flex items-center justify-center">
                            <FloralImage
                              src={imgUrl}
                              fallbackSrc="/img/RamoRosas.png"
                              alt={p.name}
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-white truncate max-w-[220px]">
                              {p.name}
                            </div>
                            <div className="text-[11px] text-slate-400 truncate max-w-[240px]">
                              {p.description || p.descripcion || 'Sin descripción'}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Categoría */}
                      <td className="py-3">
                        <span className="capitalize px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                          {cat}
                        </span>
                      </td>

                      {/* Estado */}
                      <td className="py-3">
                        {isActive ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            Activo
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            Inactivo
                          </span>
                        )}
                      </td>

                      {/* Badge */}
                      <td className="py-3">
                        {badge ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            {badge}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-500">—</span>
                        )}
                      </td>

                      {/* Fecha */}
                      <td className="py-3 text-xs text-slate-400">
                        {dateStr}
                      </td>

                      {/* Botón editar */}
                      <td className="py-3 text-right pr-2">
                        <Link
                          href="/admin/productos"
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-300 text-xs font-medium border border-slate-700 hover:border-rose-500 transition-all inline-block"
                        >
                          Editar
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
