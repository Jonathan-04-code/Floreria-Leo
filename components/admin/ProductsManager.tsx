'use client'

import { useState, useTransition, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import FloralImage from '@/components/FloralImage'
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  Upload,
  Loader2,
  X,
  AlertTriangle,
} from 'lucide-react'

export interface AdminProduct {
  id: string
  name: string
  description: string | null
  descripcion?: string | null
  image_url: string | null
  imagen?: string | null
  category: string | null
  categoria?: string | null
  badge: string | null
  stock?: number | null
  active: boolean
  activo?: boolean
  created_at: string
  updated_at?: string | null
}

interface ProductsManagerProps {
  initialProducts: AdminProduct[]
}

const CATEGORY_OPTIONS = [
  { value: 'ramos', label: '🌹 Ramos' },
  { value: 'arreglos', label: '💐 Arreglos' },
  { value: 'especiales', label: '✨ Especiales' },
  { value: '14-de-febrero', label: '💖 14 de Febrero' },
  { value: 'dia-de-las-madres', label: '🌸 Día de las Madres' },
  { value: 'graduaciones', label: '🎓 Graduaciones' },
]

const CATEGORY_LABEL_MAP: Record<string, string> = {
  ramos: 'Ramos',
  arreglos: 'Arreglos',
  especiales: 'Especiales',
  '14-de-febrero': '14 de Febrero',
  'dia-de-las-madres': 'Día de las Madres',
  graduaciones: 'Graduaciones',
}

function formatCategoryLabel(cat: string | null | undefined): string {
  if (!cat) return 'Ramos'
  return CATEGORY_LABEL_MAP[cat.toLowerCase()] || cat
}

const BADGE_PRESETS = [
  'Popular',
  'Más Vendido',
  'Especial',
  'Exclusivo',
  'Oferta',
  'Nuevo',
  'Premium',
]

export default function ProductsManager({ initialProducts }: ProductsManagerProps) {
  const router = useRouter()
  const [products, setProducts] = useState<AdminProduct[]>(initialProducts)
  const [, startTransition] = useTransition()

  // Estados de Filtros y Búsqueda
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedBadge, setSelectedBadge] = useState<string>('all')

  // Estados de Modales
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null)
  const [deletingProduct, setDeletingProduct] = useState<AdminProduct | null>(null)

  // Estados de Formularios (Crear / Editar)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'ramos',
    badge: '',
    active: true,
    stock: 10,
    imageUrl: '',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Toast / Mensajes de Éxito
  const [toastMsg, setToastMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMsg({ text, type })
    setTimeout(() => setToastMsg(null), 4000)
  }

  // Filtrado reactivo en cliente
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Búsqueda texto
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.descripcion && p.descripcion.toLowerCase().includes(q))

      // 2. Categoría
      const cat = (p.category || p.categoria || 'ramos').toLowerCase()
      const matchesCategory = selectedCategory === 'all' || cat === selectedCategory

      // 3. Estado (Activo / Inactivo)
      const isActive = p.active !== undefined ? Boolean(p.active) : Boolean(p.activo)
      const matchesStatus =
        selectedStatus === 'all' ||
        (selectedStatus === 'active' && isActive) ||
        (selectedStatus === 'inactive' && !isActive)

      // 4. Badge / Destacado
      const hasBadge = Boolean(p.badge && p.badge.trim().length > 0)
      const matchesBadge =
        selectedBadge === 'all' ||
        (selectedBadge === 'featured' && hasBadge) ||
        (selectedBadge === 'normal' && !hasBadge)

      return matchesSearch && matchesCategory && matchesStatus && matchesBadge
    })
  }, [products, searchQuery, selectedCategory, selectedStatus, selectedBadge])

  // Abrir Modal de Creación
  const handleOpenCreate = () => {
    setFormData({
      name: '',
      description: '',
      category: 'ramos',
      badge: '',
      active: true,
      stock: 10,
      imageUrl: '',
    })
    setImageFile(null)
    setImagePreview(null)
    setFormError(null)
    setIsCreateModalOpen(true)
  }

  // Abrir Modal de Edición
  const handleOpenEdit = (product: AdminProduct) => {
    const isActive = product.active !== undefined ? Boolean(product.active) : Boolean(product.activo)
    setFormData({
      name: product.name || '',
      description: product.description || product.descripcion || '',
      category: (product.category || product.categoria || 'ramos').toLowerCase(),
      badge: product.badge || '',
      active: isActive,
      stock: product.stock !== undefined && product.stock !== null ? Number(product.stock) : 10,
      imageUrl: product.image_url || product.imagen || '',
    })
    setImageFile(null)
    setImagePreview(product.image_url || product.imagen || null)
    setFormError(null)
    setEditingProduct(product)
  }

  // Manejar selección de archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        setFormError('Por favor selecciona un archivo de imagen válido (PNG, JPG, WEBP).')
        return
      }
      setImageFile(file)
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
      setFormError(null)
    }
  }

  // Subir imagen al Bucket 'products' de Supabase Storage
  const uploadImageToStorage = async (file: File): Promise<string> => {
    const supabase = createClient()
    const fileExt = file.name.split('.').pop() || 'png'
    const cleanExt = fileExt.toLowerCase().replace(/[^a-z0-9]/g, '')
    const randomStr = Math.random().toString(36).substring(2, 8)
    const fileName = `${Date.now()}-${randomStr}.${cleanExt}`

    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      throw new Error(`Error al subir la imagen al Storage: ${uploadError.message}`)
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('products').getPublicUrl(fileName)

    return publicUrl
  }

  // Guardar Nuevo Producto (INSERT)
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    if (!formData.name.trim()) {
      setFormError('El nombre del producto es obligatorio.')
      return
    }

    setIsSubmitting(true)
    try {
      let finalImageUrl = formData.imageUrl.trim()

      // Si subió un archivo físico, subirlo al bucket 'products'
      if (imageFile) {
        finalImageUrl = await uploadImageToStorage(imageFile)
      } else if (!finalImageUrl) {
        finalImageUrl = '/img/RamoRosas.png'
      }

      const supabase = createClient()
      const newProductPayload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        descripcion: formData.description.trim(),
        image_url: finalImageUrl,
        imagen: finalImageUrl,
        category: formData.category,
        categoria: formData.category,
        badge: formData.badge.trim() || null,
        stock: Number(formData.stock) || 10,
        active: formData.active,
        activo: formData.active,
        created_at: new Date().toISOString(),
      }

      const { data, error } = await supabase
        .from('products')
        .insert(newProductPayload)
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }

      if (data) {
        setProducts((prev) => [data as AdminProduct, ...prev])
        showToast('¡Producto agregado exitosamente a Supabase!')
        setIsCreateModalOpen(false)
        startTransition(() => {
          router.refresh()
        })
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al crear el producto en Supabase'
      setFormError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Actualizar Producto Existente (UPDATE)
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProduct) return
    setFormError(null)

    if (!formData.name.trim()) {
      setFormError('El nombre del producto es obligatorio.')
      return
    }

    setIsSubmitting(true)
    try {
      let finalImageUrl = formData.imageUrl.trim()

      if (imageFile) {
        finalImageUrl = await uploadImageToStorage(imageFile)
      }

      const supabase = createClient()
      const updatePayload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        descripcion: formData.description.trim(),
        image_url: finalImageUrl || editingProduct.image_url || '/img/RamoRosas.png',
        imagen: finalImageUrl || editingProduct.imagen || '/img/RamoRosas.png',
        category: formData.category,
        categoria: formData.category,
        badge: formData.badge.trim() || null,
        stock: Number(formData.stock) || 10,
        active: formData.active,
        activo: formData.active,
        updated_at: new Date().toISOString(),
      }

      const { data, error } = await supabase
        .from('products')
        .update(updatePayload)
        .eq('id', editingProduct.id)
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }

      if (data) {
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? (data as AdminProduct) : p))
        )
        showToast('Producto actualizado correctamente en Supabase.')
        setEditingProduct(null)
        startTransition(() => {
          router.refresh()
        })
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al actualizar el producto en Supabase'
      setFormError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Activar / Desactivar Rápido (Toggle Active)
  const handleToggleActive = async (product: AdminProduct) => {
    const currentActive =
      product.active !== undefined ? Boolean(product.active) : Boolean(product.activo)
    const newActive = !currentActive

    // Optimistic update
    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, active: newActive, activo: newActive } : p
      )
    )

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('products')
        .update({
          active: newActive,
          activo: newActive,
          updated_at: new Date().toISOString(),
        })
        .eq('id', product.id)

      if (error) {
        // Revertir en caso de error
        setProducts((prev) =>
          prev.map((p) =>
            p.id === product.id ? { ...p, active: currentActive, activo: currentActive } : p
          )
        )
        showToast(`Error al cambiar estado: ${error.message}`, 'error')
      } else {
        showToast(
          newActive
            ? `"${product.name}" activado y disponible en el catálogo.`
            : `"${product.name}" pausado (oculto en la tienda pública).`
        )
        startTransition(() => {
          router.refresh()
        })
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al actualizar el estado'
      showToast(message, 'error')
    }
  }

  // Eliminar Producto (DELETE con Confirmación)
  const handleDeleteConfirm = async () => {
    if (!deletingProduct) return
    setIsSubmitting(true)

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', deletingProduct.id)

      if (error) {
        throw new Error(error.message)
      }

      setProducts((prev) => prev.filter((p) => p.id !== deletingProduct.id))
      showToast(`Producto "${deletingProduct.name}" eliminado de la base de datos.`)
      setDeletingProduct(null)
      startTransition(() => {
        router.refresh()
      })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'No se pudo eliminar'
      showToast(`No se pudo eliminar: ${message}`, 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl border text-sm font-medium flex items-center gap-3 transition-all animate-fade-up ${
            toastMsg.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-800 text-emerald-200 shadow-emerald-950/50'
              : 'bg-red-950/90 border-red-800 text-red-200 shadow-red-950/50'
          }`}
        >
          {toastMsg.type === 'success' ? (
            <CheckCircle2 size={18} className="text-emerald-400" />
          ) : (
            <AlertTriangle size={18} className="text-red-400" />
          )}
          <span>{toastMsg.text}</span>
        </div>
      )}

      {/* Encabezado y Botón Principal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>Gestión de Productos</span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {products.length} totales
            </span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Administra arreglos florales, imágenes de Supabase Storage, categorías y estados en vivo.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold text-sm shadow-lg shadow-rose-500/25 transition-all cursor-pointer active:scale-95"
        >
          <Plus size={18} />
          <span>Nuevo Producto</span>
        </button>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 shadow-lg space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Buscador */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Search size={16} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/40"
            />
          </div>

          {/* Filtro Categoría */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3.5 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/40"
          >
            <option value="all">Todas las Categorías</option>
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          {/* Filtro Estado */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3.5 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/40"
          >
            <option value="all">Todos los Estados</option>
            <option value="active">🟢 Activos (En tienda)</option>
            <option value="inactive">🟡 Inactivos (Pausados)</option>
          </select>

          {/* Filtro Destacados */}
          <select
            value={selectedBadge}
            onChange={(e) => setSelectedBadge(e.target.value)}
            className="w-full px-3.5 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/40"
          >
            <option value="all">Todos los Badges</option>
            <option value="featured">✨ Con Distintivo</option>
            <option value="normal">Sin Distintivo</option>
          </select>
        </div>

        {/* Resumen de resultados */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60 px-1">
          <span>Mostrando {filteredProducts.length} de {products.length} productos</span>
          {(searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all' || selectedBadge !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setSelectedStatus('all')
                setSelectedBadge('all')
              }}
              className="text-rose-400 hover:text-rose-300 font-semibold cursor-pointer"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Tabla de Productos para Pantallas Grandes */}
      <div className="hidden md:block bg-slate-900/80 border border-slate-800/80 rounded-3xl overflow-hidden shadow-xl">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 px-4">
            <Package size={40} className="mx-auto text-slate-600 mb-3" />
            <h3 className="text-lg font-bold text-white">No se encontraron productos</h3>
            <p className="text-slate-400 text-sm mt-1">
              Prueba cambiando los filtros o agrega un nuevo producto.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/40 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 pl-6">Arreglo Floral</th>
                  <th className="py-4">Categoría</th>
                  <th className="py-4">Disponibilidad</th>
                  <th className="py-4">Distintivo</th>
                  <th className="py-4">Stock</th>
                  <th className="py-4 text-right pr-6">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProducts.map((p) => {
                  const isActive =
                    p.active !== undefined ? Boolean(p.active) : Boolean(p.activo)
                  const imgUrl = p.image_url || p.imagen || '/img/RamoRosas.png'
                  const cat = p.category || p.categoria || 'ramos'

                  return (
                    <tr key={p.id} className="hover:bg-slate-800/30 transition-colors group">
                      {/* Imagen + Nombre + Descripción */}
                      <td className="py-4 pl-6">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700/80 overflow-hidden relative flex-shrink-0 flex items-center justify-center">
                            <FloralImage
                              src={imgUrl}
                              fallbackSrc="/img/RamoRosas.png"
                              alt={p.name}
                              width={48}
                              height={48}
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-white group-hover:text-rose-300 transition-colors">
                              {p.name}
                            </div>
                            <div className="text-xs text-slate-400 line-clamp-1 max-w-[280px]">
                              {p.description || p.descripcion || 'Sin descripción'}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Categoría */}
                      <td className="py-4">
                        <span className="capitalize px-3 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                          {formatCategoryLabel(cat)}
                        </span>
                      </td>

                      {/* Estado (Toggle Interactivo) */}
                      <td className="py-4">
                        <button
                          onClick={() => handleToggleActive(p)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                            isActive
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20'
                          }`}
                          title="Haz clic para cambiar disponibilidad"
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isActive ? 'bg-emerald-400' : 'bg-amber-400'
                            }`}
                          />
                          <span>{isActive ? 'Activo' : 'Pausado'}</span>
                        </button>
                      </td>

                      {/* Badge / Destacado */}
                      <td className="py-4">
                        {p.badge ? (
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            {p.badge}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-600">—</span>
                        )}
                      </td>

                      {/* Stock */}
                      <td className="py-4 text-xs font-semibold text-slate-300">
                        {p.stock !== undefined && p.stock !== null ? p.stock : 10} u.
                      </td>

                      {/* Acciones */}
                      <td className="py-4 text-right pr-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-300 border border-slate-700 transition-all cursor-pointer"
                            title="Editar producto"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => setDeletingProduct(p)}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-red-500 hover:text-white text-slate-300 border border-slate-700 transition-all cursor-pointer"
                            title="Eliminar producto"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Grid de Tarjetas para Dispositivos Móviles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {filteredProducts.map((p) => {
          const isActive =
            p.active !== undefined ? Boolean(p.active) : Boolean(p.activo)
          const imgUrl = p.image_url || p.imagen || '/img/RamoRosas.png'

          return (
            <div
              key={p.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-16 h-16 rounded-xl bg-slate-800 border border-slate-700/80 overflow-hidden relative flex-shrink-0 flex items-center justify-center">
                  <FloralImage
                    src={imgUrl}
                    fallbackSrc="/img/RamoRosas.png"
                    alt={p.name}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {formatCategoryLabel(p.category || p.categoria)}
                    </span>
                    {p.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-white text-sm mt-1 truncate">{p.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">
                    {p.description || p.descripcion || 'Sin descripción'}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => handleToggleActive(p)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  <span>{isActive ? 'Activo' : 'Pausado'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => setDeletingProduct(p)}
                    className="p-2 rounded-lg bg-slate-800 text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ═════════════════════════════════════════════════════════════
          MODAL CREAR / EDITAR PRODUCTO (Formulario Real Supabase)
      ═════════════════════════════════════════════════════════════ */}
      {(isCreateModalOpen || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl my-8 relative">
            {/* Cerrar */}
            <button
              onClick={() => {
                setIsCreateModalOpen(false)
                setEditingProduct(null)
              }}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Título */}
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                {editingProduct ? 'Editar Producto' : 'Crear Nuevo Arreglo Floral'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {editingProduct
                  ? 'Modifica los campos en la tabla products de Supabase.'
                  : 'Registra un nuevo arreglo directamente en tu base de datos.'}
              </p>
            </div>

            {/* Error en modal */}
            {formError && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-start gap-2.5">
                <AlertTriangle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <form
              onSubmit={editingProduct ? handleEditSubmit : handleCreateSubmit}
              className="space-y-4"
            >
              {/* Nombre */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Nombre del Arreglo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej. Ramo Romance Infinito"
                  className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                />
              </div>

              {/* Categoría y Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Categoría
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Distintivo (Badge)
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="Ej. Popular, Nuevo, Oferta"
                    className="w-full px-3.5 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                  />
                </div>
              </div>

              {/* Badges sugeridos */}
              <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-slate-400">
                <span className="text-slate-500">Sugerencias:</span>
                {BADGE_PRESETS.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setFormData({ ...formData, badge: b })}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] cursor-pointer"
                  >
                    {b}
                  </button>
                ))}
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Descripción Detallada
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe las flores, follaje, detalles y mensaje que transmite este arreglo..."
                  className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 resize-none"
                />
              </div>

              {/* Subida de Imagen a Supabase Storage (Bucket 'products') */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Imagen del Producto (Supabase Storage)
                </label>

                <div className="border-2 border-dashed border-slate-800 hover:border-rose-500/50 rounded-2xl p-4 text-center transition-colors bg-slate-950/40">
                  {imagePreview ? (
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-xl bg-slate-800 border border-slate-700 relative overflow-hidden flex-shrink-0 flex items-center justify-center">
                        <FloralImage
                          src={imagePreview}
                          fallbackSrc="/img/RamoRosas.png"
                          alt="Vista previa"
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-xs font-semibold text-white">Imagen Seleccionada</div>
                        <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                          {imageFile ? imageFile.name : 'Imagen actual guardada en Supabase'}
                        </div>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="mt-2 text-xs text-rose-400 hover:text-rose-300 font-semibold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Upload size={12} />
                          <span>Cambiar imagen</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="cursor-pointer py-3 flex flex-col items-center"
                    >
                      <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-2">
                        <Upload size={20} />
                      </div>
                      <div className="text-xs font-semibold text-white">
                        Haz clic para subir una imagen
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        PNG, JPG o WEBP &middot; Se guardará en el bucket &quot;products&quot;
                      </div>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Estado Activo y Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div>
                    <div className="text-xs font-semibold text-white">Estado Activo</div>
                    <div className="text-[11px] text-slate-400">Mostrar en catálogo público</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-5 h-5 rounded accent-rose-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div>
                    <div className="text-xs font-semibold text-white">Stock / Disponibilidad</div>
                    <div className="text-[11px] text-slate-400">Unidades estimadas</div>
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-16 px-2 py-1 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs text-center"
                  />
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    setIsCreateModalOpen(false)
                    setEditingProduct(null)
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-xs font-semibold shadow-lg shadow-rose-500/25 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Guardando en Supabase...</span>
                    </>
                  ) : (
                    <span>{editingProduct ? 'Guardar Cambios' : 'Crear Producto'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          MODAL CONFIRMACIÓN DE ELIMINACIÓN
      ═════════════════════════════════════════════════════════════ */}
      {deletingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mb-4">
              <AlertTriangle size={24} />
            </div>

            <h3 className="text-lg font-bold text-white">¿Eliminar &quot;{deletingProduct.name}&quot;?</h3>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
              Esta acción eliminará el registro de la tabla <code className="text-slate-300">products</code> en Supabase.
            </p>

            <div className="mt-4 p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-200 text-xs">
              💡 <strong>Recomendación:</strong> Si solo deseas ocultarlo temporalmente de los clientes, puedes usar <strong>&quot;Pausar / Inactivo&quot;</strong> sin borrar el registro.
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-800">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setDeletingProduct(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-lg shadow-red-600/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Eliminando...</span>
                  </>
                ) : (
                  <span>Sí, Eliminar de Supabase</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
