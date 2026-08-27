import Link from 'next/link'
import { Flower2 } from 'lucide-react'
import type { Product } from '@/lib/types'
import { FLORAL_BLUR_DATA_URL } from '@/lib/image-constants'
import FloralImage from '@/components/FloralImage'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/producto/${product.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <article className="product-card">
        {/* ── Image wrapper (object-fit: contain, sin recortar flores) ── */}
        <div
          className="pc-img-wrap"
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1 / 1',
            minHeight: '240px',
            overflow: 'hidden',
            background: 'linear-gradient(145deg, rgba(243, 235, 228, 0.45) 0%, rgba(232, 240, 229, 0.45) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.85rem',
          }}
        >
          {product.image_url ? (
            <FloralImage
              src={product.image_url}
              fallbackSrc="/img/RamoRosas.png"
              alt={product.name}
              fill
              placeholder="blur"
              blurDataURL={FLORAL_BLUR_DATA_URL}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
              style={{ objectFit: 'contain' }}
              className="pc-img"
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-card))',
              }}
            >
              <Flower2 size={44} style={{ color: 'var(--accent)', opacity: 0.5 }} />
            </div>
          )}
        </div>

        {/* ── Info ── */}
        <div style={{ padding: '1.1rem 1.25rem 1.35rem' }}>
          <h3
            style={{
              margin: '0 0 0.5rem',
              fontSize: '0.98rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: 1.3,
            }}
          >
            {product.name}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: 600,
                color: 'var(--accent)',
                letterSpacing: '0.03em',
              }}
            >
              Ver arreglo →
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
