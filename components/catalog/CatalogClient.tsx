'use client'

import { useState, useEffect, useCallback, useMemo, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Flower2, Search, X, RotateCcw } from 'lucide-react'
import { CATEGORIES, type CatalogProduct, type CategoryFilter } from '@/lib/catalog-products'
import WhatsAppQuoteButton from '@/components/WhatsAppQuoteButton'
import { FLORAL_BLUR_DATA_URL } from '@/lib/image-constants'
import FloralImage from '@/components/FloralImage'

const emptySubscribe = () => () => {}
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

const CATEGORY_LABELS: Record<string, string> = {
  ramos: 'Ramo de Flores',
  arreglos: 'Arreglo Floral',
  especiales: 'Colección Especial',
  '14-de-febrero': '14 de Febrero',
  'dia-de-las-madres': 'Día de las Madres',
  graduaciones: 'Graduaciones',
}

/* ── Product Card (Toda la tarjeta es interactiva) ─────────────── */
function CatalogCard({ product, onOpen }: { product: CatalogProduct; onOpen: (p: CatalogProduct) => void }) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onOpen(product)
    }
  }

  return (
    <article
      className="cat-card"
      onClick={() => onOpen(product)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Ver detalles y cotizar ${product.name}`}
    >
      {product.badge && <span className="cat-badge">{product.badge}</span>}

      {/* Imagen completa (object-fit: contain, sin recortes) */}
      <div
        className="cat-img-wrap"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          minHeight: '220px',
        }}
      >
        <FloralImage
          src={product.image}
          fallbackSrc="/img/RamoRosas.png"
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
          style={{ objectFit: 'contain' }}
          className="cat-img"
          placeholder="blur"
          blurDataURL={FLORAL_BLUR_DATA_URL}
        />
      </div>

      <div className="cat-info">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem', gap: '0.5rem' }}>
          <span className="cat-card-category">{CATEGORY_LABELS[product.category] || product.category}</span>
          <span className="cat-card-stock">
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'inline-block' }} />
            Disponible
          </span>
        </div>

        <h3 className="cat-name">{product.name}</h3>
        <p className="cat-desc">{product.description}</p>

        {/* Indicador visual de acción */}
        <div className="cat-card-action-hint">
          <span>Ver detalles y cotizar</span>
          <span className="hint-arrow">→</span>
        </div>
      </div>
    </article>
  )
}

/* ── Modal de Producto con Portal a document.body ─────────────── */
function ProductModal({ product, onClose }: { product: CatalogProduct; onClose: () => void }) {
  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const seasonNames: Record<string, string> = {
    '14-de-febrero': '14 de Febrero',
    'san-valentin': 'San Valentín',
    'dia-de-las-madres': 'Día de las Madres',
    graduaciones: 'Graduaciones',
  }

  return (
    <div
      className="modal-bd anim-fade"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      <div
        className="modal-card anim-zoom"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Lado izquierdo: Imagen limpia */}
        <div className="modal-img-side">
          {product.badge && (
            <span className="modal-badge">{product.badge}</span>
          )}
          <div
            className="modal-img-container"
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
          >
            <FloralImage
              key={`modal-img-${product.id}-${product.image}`}
              src={product.image}
              fallbackSrc="/img/RamoRosas.png"
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, 480px"
              style={{ objectFit: 'contain' }}
              className="modal-img"
              placeholder="blur"
              blurDataURL={FLORAL_BLUR_DATA_URL}
              priority
            />
          </div>
        </div>

        {/* Lado derecho: Info, beneficios y llamada de acción */}
        <div className="modal-info-side">
          <div className="modal-top-row" style={{ justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              className="modal-close-btn"
              aria-label="Cerrar modal"
            >
              <X size={18} strokeWidth={2.2} />
            </button>
          </div>

          <h2 id="modal-product-title" className="modal-name font-display">
            {product.name}
          </h2>

          <p className="modal-desc">{product.description}</p>

          {product.seasons && product.seasons.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: 'var(--accent)',
                  background: 'rgba(216, 90, 127, 0.1)',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(216, 90, 127, 0.2)',
                }}
              >
                {product.seasons.map((s) => seasonNames[s] || s).join(', ')}
              </span>
            </div>
          )}

          <div className="modal-divider" />

          {/* Acciones: Botón Cotizar por WhatsApp */}
          <div className="modal-actions" style={{ marginTop: 'auto' }}>
            <WhatsAppQuoteButton
              productName={product.name}
              category={product.category}
              className="modal-wa-btn"
              iconSize={22}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Main export ───────────────────────────────────────────────── */
interface Props {
  products: CatalogProduct[]
}

export default function CatalogClient({ products }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const urlCategoryParam = searchParams.get('categoria') || searchParams.get('temporada') || searchParams.get('cat')
  
  const initialCategory: CategoryFilter = useMemo(() => {
    if (urlCategoryParam === 'san-valentin' || urlCategoryParam === '14-de-febrero') return '14-de-febrero'
    if (urlCategoryParam === 'dia-de-las-madres') return 'dia-de-las-madres'
    if (urlCategoryParam === 'graduaciones') return 'graduaciones'
    if (urlCategoryParam === 'ramos') return 'ramos'
    if (urlCategoryParam === 'arreglos') return 'arreglos'
    if (urlCategoryParam === 'especiales') return 'especiales'
    return 'all'
  }, [urlCategoryParam])

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(initialCategory)
  const [searchQuery, setSearchQuery] = useState('')
  const [modalProduct, setModalProduct] = useState<CatalogProduct | null>(null)
  const isClient = useIsClient()

  const handleSelectCategory = (category: CategoryFilter) => {
    setActiveCategory(category)
    const params = new URLSearchParams(searchParams.toString())
    if (category !== 'all') {
      params.set('categoria', category)
      params.delete('temporada')
    } else {
      params.delete('categoria')
      params.delete('temporada')
    }
    const queryString = params.toString()
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false })
  }

  const normalizedQuery = searchQuery.trim().toLowerCase()

  const filtered = products.filter((p) => {
    // Filtro de categoría / ocasión especial
    if (activeCategory !== 'all') {
      if (activeCategory === 'ramos' || activeCategory === 'arreglos' || activeCategory === 'especiales') {
        if (p.category !== activeCategory) return false
      } else if (activeCategory === '14-de-febrero') {
        const matchesCategory = p.category === '14-de-febrero'
        const matchesSeason = p.seasons?.some((s) => s === '14-de-febrero' || s === 'san-valentin')
        if (!matchesCategory && !matchesSeason) return false
      } else if (activeCategory === 'dia-de-las-madres') {
        const matchesCategory = p.category === 'dia-de-las-madres'
        const matchesSeason = p.seasons?.some((s) => s === 'dia-de-las-madres')
        if (!matchesCategory && !matchesSeason) return false
      } else if (activeCategory === 'graduaciones') {
        const matchesCategory = p.category === 'graduaciones'
        const matchesSeason = p.seasons?.some((s) => s === 'graduaciones')
        if (!matchesCategory && !matchesSeason) return false
      } else {
        if (p.category !== activeCategory) return false
      }
    }

    // Filtro de texto de búsqueda
    if (!normalizedQuery) return true

    const nameMatch = p.name.toLowerCase().includes(normalizedQuery)
    const descMatch = p.description.toLowerCase().includes(normalizedQuery)
    const badgeMatch = p.badge ? p.badge.toLowerCase().includes(normalizedQuery) : false
    const catMatch = CATEGORY_LABELS[p.category] ? CATEGORY_LABELS[p.category].toLowerCase().includes(normalizedQuery) : false

    return nameMatch || descMatch || badgeMatch || catMatch
  })

  const openModal = useCallback((p: CatalogProduct) => setModalProduct(p), [])
  const closeModal = useCallback(() => setModalProduct(null), [])

  const handleClearAllFilters = () => {
    setSearchQuery('')
    handleSelectCategory('all')
  }

  const activeCategoryLabel = useMemo(() => {
    const found = CATEGORIES.find((c) => c.value === activeCategory)
    return found ? found.label : ''
  }, [activeCategory])

  return (
    <>
      {/* Search bar */}
      <div className="cat-search-container">
        <div className="cat-search-box">
          <Search size={18} className="cat-search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por flor, estilo u ocasión (ej. rosas, girasoles, tulipanes)..."
            className="cat-search-input"
            aria-label="Buscar arreglos florales"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="cat-search-clear"
              aria-label="Limpiar búsqueda"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Category filter pills: Todos, Ramos, Arreglos, Especiales, 14 de Febrero, Día de las Madres, Graduaciones */}
      <div className="cat-filters" role="tablist" aria-label="Filtrar por categoría">
        {CATEGORIES.map(({ value, label, isSpecial }) => (
          <button
            key={value}
            role="tab"
            aria-selected={activeCategory === value}
            className={`cat-filter-btn${activeCategory === value ? ' active' : ''}${isSpecial ? ' special-cat-btn' : ''}`}
            onClick={() => handleSelectCategory(value)}
          >
            <span className="filter-inner">{label}</span>
          </button>
        ))}
      </div>

      {/* Product count & active filter badges */}
      <div className="cat-count-wrapper">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
          <p className="cat-count" style={{ margin: 0 }}>
            {filtered.length} {filtered.length === 1 ? 'arreglo encontrado' : 'arreglos encontrados'}
            {activeCategory !== 'all' && (
              <span className="cat-count-season-tag"> en <strong>{activeCategoryLabel}</strong></span>
            )}
            {searchQuery && (
              <span className="cat-count-query"> para &ldquo;{searchQuery}&rdquo;</span>
            )}
          </p>

          {(activeCategory !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={handleClearAllFilters}
              className="cat-count-clear-all"
            >
              <RotateCcw size={13} />
              <span>Ver todos los productos</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid or Empty State */}
      {filtered.length > 0 ? (
        <div className="cat-grid" role="grid" aria-label="Catálogo de arreglos florales">
          {filtered.map((product, index) => (
            <div
              key={product.id}
              style={{ animationDelay: `${index * 0.05}s` }}
              className="cat-card-wrapper"
            >
              <CatalogCard product={product} onOpen={openModal} />
            </div>
          ))}
        </div>
      ) : (
        <div className="cat-empty-state">
          <div className="cat-empty-icon-wrap">
            <Flower2 size={36} style={{ color: 'var(--accent)' }} />
          </div>
          <h3 className="cat-empty-title">No encontramos arreglos con esos filtros</h3>
          <p className="cat-empty-desc">
            {activeCategory !== 'all'
              ? `No encontramos productos para ${activeCategoryLabel} con los filtros seleccionados.`
              : 'Prueba buscando con otras palabras como "rosas", "tulipanes" o selecciona otra categoría.'}
          </p>
          <button
            type="button"
            onClick={handleClearAllFilters}
            className="cat-empty-reset-btn"
          >
            <RotateCcw size={16} />
            <span>Ver todo el catálogo completo</span>
          </button>
        </div>
      )}

      {/* Detailed Product Modal with Portal directly on document.body */}
      {isClient && modalProduct && createPortal(
        <ProductModal product={modalProduct} onClose={closeModal} />,
        document.body
      )}
    </>
  )
}
