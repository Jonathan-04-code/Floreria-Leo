import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Flower2, Truck, HeartHandshake, MessageCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppQuoteButton from '@/components/WhatsAppQuoteButton'
import { createClient } from '@/lib/supabase/server'
import { CATALOG_PRODUCTS } from '@/lib/catalog-products'
import { FLORAL_BLUR_DATA_URL } from '@/lib/image-constants'
import FloralImage from '@/components/FloralImage'

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

export default async function ProductoPage(props: PageProps<'/producto/[id]'>) {
  const { id } = await props.params

  let product: {
    id: string | number
    name: string
    description?: string | null
    image_url?: string | null
    category?: string | null
    badge?: string | null
    active?: boolean
  } | null = null

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient()
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()
      if (data) {
        product = {
          id: data.id,
          name: data.name,
          description: data.description || data.descripcion || null,
          image_url: data.image_url || data.imagen || null,
          category: data.category || data.categoria || null,
          badge: data.badge || null,
          active: data.active !== undefined ? Boolean(data.active) : (data.activo !== undefined ? Boolean(data.activo) : true),
        }
      }
    } catch {
      // fallback to static catalog
    }
  }

  // Fallback to static catalog products
  if (!product) {
    const catalogItem = CATALOG_PRODUCTS.find((p) => String(p.id) === String(id))
    if (catalogItem) {
      product = {
        id: catalogItem.id,
        name: catalogItem.name,
        description: catalogItem.description,
        image_url: catalogItem.image,
        category: catalogItem.category,
        badge: catalogItem.badge,
        active: catalogItem.inStock,
      }
    }
  }

  if (!product) notFound()

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem 5rem' }}>

          {/* Back */}
          <Link
            href="/catalogo"
            className="back-link"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              marginBottom: '2rem',
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              fontWeight: 600,
              textDecoration: 'none',
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
            }}
          >
            ← Volver al catálogo
          </Link>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem',
              alignItems: 'start',
            }}
          >
            {/* ── Image ── */}
            <div
              style={{
                borderRadius: '1.75rem',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                boxShadow: '0 16px 45px rgba(0,0,0,0.08)',
                position: 'relative',
                background: 'var(--bg-secondary)',
              }}
            >
              {product.image_url ? (
                <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', minHeight: '300px', padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FloralImage
                    src={product.image_url}
                    fallbackSrc="/img/RamoRosas.png"
                    alt={product.name}
                    fill
                    placeholder="blur"
                    blurDataURL={FLORAL_BLUR_DATA_URL}
                    sizes="(max-width: 768px) 100vw, 520px"
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                  {product.badge && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        background: 'var(--gradient-accent)',
                        color: '#FFFFFF',
                        padding: '0.35rem 0.85rem',
                        borderRadius: '9999px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        boxShadow: '0 4px 12px rgba(216,90,127,0.35)',
                        zIndex: 2,
                      }}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    aspectRatio: '1 / 1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-card))',
                    fontSize: '5rem',
                  }}
                >
                  🌸
                </div>
              )}
            </div>

            {/* ── Info ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>

              {/* Category badge */}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'rgba(216,90,127,0.1)',
                  border: '1px solid rgba(216,90,127,0.25)',
                  color: 'var(--accent)',
                  borderRadius: '99px',
                  padding: '0.35rem 0.95rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  width: 'fit-content',
                }}
              >
                {product.category === 'ramos' && 'RAMO DE FLORES'}
                {product.category === 'arreglos' && 'ARREGLO FLORAL'}
                {product.category === 'especiales' && 'COLECCIÓN ESPECIAL'}
                {product.category === '14-de-febrero' && '14 DE FEBRERO'}
                {product.category === 'dia-de-las-madres' && 'DÍA DE LAS MADRES'}
                {product.category === 'graduaciones' && 'GRADUACIONES'}
                {!['ramos', 'arreglos', 'especiales', '14-de-febrero', 'dia-de-las-madres', 'graduaciones'].includes(product.category ?? '') && (product.category?.toUpperCase() || 'ARREGLO FLORAL')}
              </span>

              <h1
                className="font-display"
                style={{
                  fontSize: 'clamp(1.85rem, 4vw, 2.75rem)',
                  fontWeight: 700,
                  margin: 0,
                  color: 'var(--text-primary)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                }}
              >
                {product.name}
              </h1>

              {/* Disponibilidad */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span
                  style={{
                    fontSize: '0.82rem',
                    color: '#16a34a',
                    background: 'rgba(22,163,74,0.1)',
                    border: '1px solid rgba(22,163,74,0.25)',
                    borderRadius: '99px',
                    padding: '0.3rem 0.85rem',
                    fontWeight: 600,
                  }}
                >
                  Disponible para entrega
                </span>
              </div>

              {/* Description */}
              {product.description && (
                <div
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '1.25rem',
                    padding: '1.35rem 1.5rem',
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      color: 'var(--text-secondary)',
                      lineHeight: 1.75,
                      fontSize: '0.96rem',
                    }}
                  >
                    {product.description}
                  </p>
                </div>
              )}

              {/* WhatsApp CTA */}
              <WhatsAppQuoteButton
                productName={product.name}
                category={product.category ?? undefined}
                className="btn-whatsapp-solid"
                iconSize={20}
              />

              {/* Trust badges */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem',
                  marginTop: '0.5rem',
                }}
              >
                {[
                  { icon: Flower2, text: 'Flores frescas de calidad' },
                  { icon: Truck, text: 'Entrega local cuidadosa' },
                  { icon: HeartHandshake, text: 'Elaboración con amor' },
                  { icon: MessageCircle, text: 'Atención personalizada' },
                ].map(({ icon: IconComponent, text }) => (
                  <div
                    key={text}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border)',
                      borderRadius: '0.85rem',
                      padding: '0.7rem 0.9rem',
                      fontSize: '0.82rem',
                      color: 'var(--text-secondary)',
                      fontWeight: 500,
                    }}
                  >
                    <IconComponent size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
