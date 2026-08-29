import { Suspense } from 'react'
import FloralImage from '@/components/FloralImage'
import Navbar from '@/components/Navbar'
import CatalogClient from '@/components/catalog/CatalogClient'
import { createClient } from '@/lib/supabase/server'
import { CATALOG_PRODUCTS } from '@/lib/catalog-products'
import { LOGO_BLUR_DATA_URL } from '@/lib/image-constants'
import type { CatalogProduct } from '@/lib/catalog-products'

export const metadata = {
  title: 'Catálogo – Florería Leo',
  description: 'Explora nuestros arreglos florales: ramos, arreglos y especiales.',
}

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return Boolean(
    url &&
    key &&
    !url.includes('tu-proyecto') &&
    !key.includes('tu-anon-key') &&
    !key.includes('tu-publishable-key')
  )
}

function mapProduct(p: Record<string, unknown>): CatalogProduct {
  return {
    id: String(p.id),
    name: String(p.name || ''),
    description: (p.description as string) || (p.descripcion as string) || '',
    image: (p.image_url as string) || (p.imagen as string) || '/img/RamoRosas.png',
    category: (((p.category as string) || (p.categoria as string) || 'ramos').toLowerCase()) as CatalogProduct['category'],
    badge: (p.badge as string) ?? undefined,
    inStock: p.active !== undefined ? Boolean(p.active) : (p.activo !== undefined ? Boolean(p.activo) : true),
    seasons: p.seasons ? (Array.isArray(p.seasons) ? (p.seasons as string[]) : undefined) : undefined,
  }
}

export default async function CatalogoPage() {
  let products: CatalogProduct[] = CATALOG_PRODUCTS

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or('active.eq.true,activo.eq.true')
        .order('created_at', { ascending: false })

      if (!error && data && data.length > 0) {
        products = data.map(mapProduct)
      }
    } catch {
      // Falls back to static products
    }
  }

  return (
    <>
      <Navbar />
      <div className="cat-page">

        {/* Header */}
        <header className="cat-header" style={{ paddingTop: '96px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <div
              style={{
                position: 'relative',
                width: '88px',
                height: '88px',
                borderRadius: '50%',
                overflow: 'hidden',
                background: 'transparent',
                boxShadow: '0 8px 24px rgba(216, 90, 127, 0.18)',
                border: '2px solid rgba(216, 90, 127, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FloralImage
                src="/img/LogoFloreria.jpeg"
                fallbackSrc="/img/LogoFloreria.jpeg"
                alt="Florería Leo"
                width={88}
                height={88}
                priority
                placeholder="blur"
                blurDataURL={LOGO_BLUR_DATA_URL}
                sizes="88px"
                className="cat-logo-img"
                style={{
                  width: '88px',
                  height: '88px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
          <h1 className="cat-title">Catálogo Floral</h1>
          <p className="cat-subtitle">
            Arreglos florales únicos elaborados a mano para cada momento especial
          </p>
        </header>

        {/* Interactive catalog (filters + cards + modal) */}
        <Suspense fallback={
          <div style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Cargando catálogo floral...
          </div>
        }>
          <CatalogClient products={products} />
        </Suspense>
      </div>
    </>
  )
}
