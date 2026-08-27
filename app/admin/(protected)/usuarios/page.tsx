import { createClient } from '@/lib/supabase/server'
import {
  ShieldCheck,
  UserCheck,
  Info,
  Calendar,
  Mail,
  Lock,
  Database,
} from 'lucide-react'

interface AdminUserRecord {
  id: string
  email: string
  created_at?: string | null
}

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Usuarios y Administradores – Florería Leo Admin',
  description: 'Gestión de accesos y administradores en Supabase',
}

export default async function AdminUsuariosPage() {
  const supabase = await createClient()

  // 1. Obtener la sesión actual del administrador autenticado
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser()

  // 2. Consultar registros en la tabla real `admins`
  const { data: rawAdmins } = await supabase
    .from('admins')
    .select('id, email, created_at')
    .order('created_at', { ascending: false })

  const adminsList = (rawAdmins as AdminUserRecord[]) || []

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>Usuarios y Administradores</span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Supabase Auth
            </span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Control de cuentas y credenciales autorizadas para el panel de Florería Leo.
          </p>
        </div>
      </div>

      {/* Tarjeta de Sesión Activa */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
            <UserCheck size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Sesión Activa Actual</h2>
            <p className="text-xs text-slate-400">Datos del administrador autenticado en este momento</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              <Mail size={14} className="text-rose-400" />
              <span>Correo Administrador</span>
            </div>
            <div className="text-sm font-bold text-white truncate">
              {currentUser?.email || 'admin@florerialeo.com'}
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Rol en Supabase</span>
            </div>
            <div className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{currentUser?.role || 'authenticated (Admin)'}</span>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              <Calendar size={14} className="text-blue-400" />
              <span>Último Acceso</span>
            </div>
            <div className="text-sm font-bold text-white">
              {currentUser?.last_sign_in_at
                ? new Date(currentUser.last_sign_in_at).toLocaleString('es-MX', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'En sesión actual'}
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Administradores Registrados (Tabla `admins`) */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
              <Database size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Lista de Administradores (Tabla `admins`)</h2>
              <p className="text-xs text-slate-400">
                Registros de cuentas autorizadas en la base de datos
              </p>
            </div>
          </div>
        </div>

        {adminsList && adminsList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-bold text-slate-400 uppercase">
                  <th className="pb-3">Correo</th>
                  <th className="pb-3">Identificador</th>
                  <th className="pb-3">Fecha de Registro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {adminsList.map((adm: AdminUserRecord) => (
                  <tr key={adm.id} className="hover:bg-slate-800/20">
                    <td className="py-3 font-semibold text-white">{adm.email}</td>
                    <td className="py-3 font-mono text-xs text-slate-400">{adm.id}</td>
                    <td className="py-3 text-xs text-slate-400">
                      {adm.created_at
                        ? new Date(adm.created_at).toLocaleDateString('es-MX')
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-slate-400 text-xs flex items-start gap-3">
            <Info size={18} className="text-slate-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-200">
                Gestión centralizada mediante Supabase Auth
              </p>
              <p className="mt-1 leading-relaxed">
                Los usuarios administradores inician sesión directamente mediante las credenciales seguras de Supabase Authentication (<code>auth.users</code>).
                Las contraseñas y tokens criptográficos están resguardados por Supabase y nunca se exponen al cliente.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Guía de Seguridad y Nuevos Administradores */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
            <Lock size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">¿Cómo agregar un nuevo Administrador?</h2>
            <p className="text-xs text-slate-400">Proceso oficial y seguro mediante Supabase Dashboard</p>
          </div>
        </div>

        <div className="space-y-3 text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
          <p>
            Para garantizar la máxima seguridad y no exponer contraseñas en formularios web públicos:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-slate-400">
            <li>
              Accede a tu <strong>Supabase Dashboard</strong> &rarr; <strong>Authentication</strong> &rarr; <strong>Users</strong>.
            </li>
            <li>
              Haz clic en <strong>&quot;Add user&quot;</strong> &rarr; <strong>&quot;Create user&quot;</strong> o <strong>&quot;Invite user&quot;</strong>.
            </li>
            <li>
              Ingresa el correo electrónico y contraseña deseada para el nuevo administrador.
            </li>
            <li>
              El nuevo administrador podrá ingresar inmediatamente desde <code>/admin/login</code>.
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
