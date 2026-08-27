import { createClient } from '@/lib/supabase/server'
import ProductsManager, { type AdminProduct } from '@/components/admin/ProductsManager'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Gestión de Productos – Florería Leo Admin',
  description: 'Administración de catálogo de flores y arreglos en Supabase',
}

export default async function AdminProductosPage() {
  const supabase = await createClient()

  // Consultar todos los productos directamente desde Supabase
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products from Supabase:', error)
  }

  const products: AdminProduct[] = ((data as Record<string, unknown>[]) || []).map((p) => ({
    id: String(p.id),
    name: String(p.name || ''),
    description: (p.description as string) || (p.descripcion as string) || null,
    descripcion: (p.descripcion as string) || (p.description as string) || null,
    image_url: (p.image_url as string) || (p.imagen as string) || null,
    imagen: (p.imagen as string) || (p.image_url as string) || null,
    category: (p.category as string) || (p.categoria as string) || 'ramos',
    categoria: (p.categoria as string) || (p.category as string) || 'ramos',
    badge: (p.badge as string) || null,
    stock: p.stock !== undefined && p.stock !== null ? Number(p.stock) : 10,
    active: p.active !== undefined ? Boolean(p.active) : Boolean(p.activo),
    activo: p.activo !== undefined ? Boolean(p.activo) : Boolean(p.active),
    created_at: (p.created_at as string) || new Date().toISOString(),
    updated_at: (p.updated_at as string) || null,
  }))

  return <ProductsManager initialProducts={products} />
}
