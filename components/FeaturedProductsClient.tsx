'use client'

import { useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { X } from 'lucide-react'
import { FLORAL_BLUR_DATA_URL } from '@/lib/image-constants'
import FloralImage from '@/components/FloralImage'
import WhatsAppQuoteButton from '@/components/WhatsAppQuoteButton'
import type { ProductCategory } from '@/lib/whatsapp'

const emptySubscribe = () => () => {}
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

export interface DisplayProduct {
  id: string | number
  name: string
  description: string
  image: string
  category: 'ramos' | 'arreglos' | 'especiales' | string
  badge?: string
  href: string
}

interface Props {
  products: DisplayProduct[]
}

export default function FeaturedProductsClient({ products }: Props) {
  const [selectedProduct, setSelectedProduct] = useState<DisplayProduct | null>(null)
  const isClient = useIsClient()

  return (
    <section id="destacados" style={{ padding: '4.5rem 1.25rem', position: 'relative', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(1.85rem, 4.5vw, 2.6rem)',
              fontWeight: 700,
              margin: '0 0 0.4rem',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            — Arreglos destacados —
          </h2>

          <div className="romantic-heart-divider">
            <span>♡</span>
          </div>

          <p
            style={{
              margin: '0 auto',
              maxWidth: '520px',
              color: 'var(--text-secondary)',
              fontSize: '0.96rem',
              lineHeight: 1.6,
            }}
          >
            Nuestros 3 arreglos florales más pedidos, aclamados y preferidos para regalar momentos memorables.
          </p>
        </div>

        {/* 3 Top Featured Products Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '1.75rem',
            maxWidth: '1050px',
            margin: '0 auto',
          }}
        >
          {products.slice(0, 3).map((p) => {
            const quoteText = encodeURIComponent(`Hola, me interesa consultar disponibilidad del arreglo "${p.name}" en Florería Leo.`)
            const waUrl = `https://wa.me/5215619167705?text=${quoteText}`

            return (
              <div key={p.id} className="featured-card">
                {/* Image Wrap */}
                <div
                  onClick={() => setSelectedProduct(p)}
                  style={{ cursor: 'pointer' }}
                >
                  <div
                    className="featured-card-img-wrap"
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '1 / 1',
                      minHeight: '220px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '1rem',
                      background: 'linear-gradient(145deg, rgba(243, 235, 228, 0.45) 0%, rgba(232, 240, 229, 0.45) 100%)',
                    }}
                  >
                    <FloralImage
                      src={p.image}
                      fallbackSrc="/img/RamoRosas.png"
                      alt={p.name}
                      fill
                      placeholder="blur"
                      blurDataURL={FLORAL_BLUR_DATA_URL}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                      style={{ objectFit: 'contain' }}
                      className="featured-card-img"
                    />

                    {/* Quick view button indicator */}
                    <div
                      className="featured-quick-view-btn"
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.92)',
                        color: 'var(--accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                        zIndex: 2,
                        backdropFilter: 'blur(4px)',
                      }}
                      title="Ver vista rápida"
                    >
                      ♡
                    </div>

                    {/* Badge */}
                    {p.badge && (
                      <span
                        className="featured-badge"
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          background: 'var(--gradient-accent)',
                          color: '#FFFFFF',
                          padding: '0.28rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          letterSpacing: '0.03em',
                          boxShadow: '0 4px 12px rgba(216,90,127,0.35)',
                          zIndex: 2,
                        }}
                      >
                        {p.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Details */}
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1, textAlign: 'center' }}>
                  <Link href={p.href} style={{ textDecoration: 'none' }}>
                    <h3
                      className="font-display"
                      style={{
                        margin: '0 0 0.4rem',
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        lineHeight: 1.3,
                      }}
                    >
                      {p.name}
                    </h3>
                  </Link>

                  <p
                    style={{
                      margin: '0 0 1.25rem',
                      color: 'var(--text-secondary)',
                      fontSize: '0.86rem',
                      lineHeight: 1.55,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      flexGrow: 1,
                    }}
                  >
                    {p.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.55rem', marginTop: 'auto' }}>
                    <Link
                      href={p.href}
                      className="featured-detail-btn"
                      style={{
                        flex: 1,
                        textDecoration: 'none',
                        textAlign: 'center',
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        padding: '0.6rem 0.85rem',
                        borderRadius: '9999px',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      Ver detalle
                    </Link>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{
                        padding: '0.6rem 0.95rem',
                        fontSize: '0.84rem',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <span>Cotizar</span>
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick View Modal */}
      {isClient && selectedProduct && createPortal(
        <div
          className="modal-bd"
          onClick={() => setSelectedProduct(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-img-side">
              {selectedProduct.badge && <span className="modal-badge">{selectedProduct.badge}</span>}
              <div className="modal-img-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
                <FloralImage
                  src={selectedProduct.image}
                  fallbackSrc="/img/RamoRosas.png"
                  alt={selectedProduct.name}
                  fill
                  placeholder="blur"
                  blurDataURL={FLORAL_BLUR_DATA_URL}
                  sizes="(max-width: 640px) 100vw, 420px"
                  style={{ objectFit: 'contain' }}
                  className="modal-img"
                  priority
                />
              </div>
            </div>

            <div className="modal-info-side">
              <div className="modal-top-row" style={{ justifyContent: 'flex-end' }}>
                <button
                  className="modal-close-btn"
                  onClick={() => setSelectedProduct(null)}
                  aria-label="Cerrar modal"
                  type="button"
                >
                  <X size={18} strokeWidth={2.2} />
                </button>
              </div>

              <h2 className="modal-name">{selectedProduct.name}</h2>
              <p className="modal-desc">{selectedProduct.description}</p>

              <div className="modal-divider" />

              <div className="modal-actions">
                <WhatsAppQuoteButton
                  productName={selectedProduct.name}
                  category={(selectedProduct.category as ProductCategory) || 'arreglos'}
                  className="modal-wa-btn"
                  iconSize={22}
                />
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}
