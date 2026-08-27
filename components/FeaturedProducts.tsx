import { createClient } from '@/lib/supabase/server'
import { CATALOG_PRODUCTS } from '@/lib/catalog-products'
import FeaturedProductsClient from './FeaturedProductsClient'
import type { DisplayProduct } from './FeaturedProductsClient'

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return url && key && !url.includes('tu-proyecto') && !key.includes('tu-anon-key')
}

// Los 3 arreglos más destacados / icónicos
const TOP_3_IDS = [8, 1, 13]

export default async function FeaturedProducts() {
  let products: DisplayProduct[] = []

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient()
      const { data: featured } = await supabase
        .from('products')
        .select('*')
        .or('active.eq.true,activo.eq.true')
        .order('created_at', { ascending: false })
        .limit(3)

      if (featured && featured.length > 0) {
        products = (featured as Record<string, unknown>[]).map((p) => ({
          id: p.id as string | number,
          name: String(p.name || ''),
          description: (p.description as string) || (p.descripcion as string) || 'Arreglo floral fresco elaborado con dedicación y flores de la más alta calidad.',
          image: (p.image_url as string) || (p.imagen as string) || '/img/RamoRosas.png',
          category: (p.category as string) || (p.categoria as string) || 'ramos',
          badge: (p.badge as string) ?? 'Destacado',
          href: `/producto/${p.id}`,
        }))
      }
    } catch {
      // Fallback below
    }
  }

  // Fallback a los 3 más espectaculares del catálogo
  if (products.length === 0) {
    const topCatalog = TOP_3_IDS.map((id) => CATALOG_PRODUCTS.find((p) => p.id === id)!).filter(Boolean)
    
    products = topCatalog.map((cp) => ({
      id: cp.id,
      name: cp.name,
      description: cp.description,
      image: cp.image,
      category: cp.category,
      badge: cp.badge || (cp.id === 8 ? 'Popular' : cp.id === 1 ? 'Más Vendido' : 'Favorito'),
      href: `/producto/${cp.id}`,
    }))
  }

  return <FeaturedProductsClient products={products} />
}
