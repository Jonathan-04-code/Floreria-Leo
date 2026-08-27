'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Heart,
  Flower2,
  GraduationCap,
  Gem,
  Cake,
  Sparkles,
  ArrowRight,
  Calendar,
  Sparkle,
} from 'lucide-react'
import { SEASONS, getNextUpcomingSeason } from '@/lib/seasons'
import { FLORAL_BLUR_DATA_URL } from '@/lib/image-constants'

const iconMap = {
  heart: Heart,
  flower: Flower2,
  'graduation-cap': GraduationCap,
  gem: Gem,
  cake: Cake,
  sparkles: Sparkles,
  gift: Sparkles,
}

export default function UpcomingSeasons() {
  const { season: upcomingSeason, isActiveNow } = useMemo(() => {
    return getNextUpcomingSeason()
  }, [])

  // Las 5 ocasiones principales solicitadas por el usuario + otras especiales
  const mainSeasons = useMemo(() => {
    // Priorizamos las 5 esenciales: San Valentín, Día de las Madres, Graduaciones, Aniversarios, Cumpleaños
    const priorityIds = ['san-valentin', 'dia-de-las-madres', 'graduaciones', 'aniversarios', 'cumpleanos']
    const main = priorityIds.map((id) => SEASONS.find((s) => s.id === id)!).filter(Boolean)
    return main
  }, [])

  return (
    <section
      id="proximas-fechas"
      className="upcoming-seasons-section"
      style={{
        padding: '5rem 0 4.5rem',
        background: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.25rem' }}>

        {/* ── Header de la Sección ── */}
        <div style={{ textAlign: 'center', marginBottom: '2.75rem', position: 'relative', zIndex: 2 }}>
          {/* Eyebrow badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.35rem 0.95rem', borderRadius: '9999px', background: 'rgba(216, 90, 127, 0.1)', border: '1px solid rgba(216, 90, 127, 0.25)', color: 'var(--accent)', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
            <Calendar size={14} />
            <span>Calendario & Momentos Especiales</span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(1.95rem, 4.5vw, 2.75rem)',
              fontWeight: 700,
              margin: '0 0 0.6rem',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Próximas fechas
          </h2>

          <p
            style={{
              margin: '0 auto',
              maxWidth: '620px',
              color: 'var(--text-secondary)',
              fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
              lineHeight: 1.6,
            }}
          >
            Encuentra el detalle perfecto para cada ocasión y anticipa tus momentos más memorables con flores frescas seleccionadas a mano.
          </p>

          <div className="romantic-heart-divider" style={{ marginTop: '1rem' }}>
            <span>♡</span>
          </div>
        </div>

        {/* ── Banner de Próxima Fecha Destacada / En Temporada ── */}
        {upcomingSeason && (
          <div
            className="upcoming-hero-banner anim-fade-up"
            style={{
              marginBottom: '2.5rem',
              borderRadius: '1.75rem',
              background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)',
              border: '1.5px solid rgba(216, 90, 127, 0.3)',
              boxShadow: '0 12px 36px var(--shadow-card)',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* Lado texto */}
            <div style={{ padding: 'clamp(1.5rem, 3.5vw, 2.5rem)', display: 'flex', flexDirection: 'column', gap: '0.85rem', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    background: 'var(--gradient-accent)',
                    color: '#FFFFFF',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.03em',
                    boxShadow: '0 4px 12px rgba(216, 90, 127, 0.3)',
                  }}
                >
                  <Sparkle size={13} fill="#FFFFFF" />
                  {isActiveNow ? 'Temporada activa hoy' : 'Próxima gran fecha recomendada'}
                </span>

                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  {upcomingSeason.shortDate}
                </span>
              </div>

              <h3
                className="font-display"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 700,
                  margin: 0,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                }}
              >
                {upcomingSeason.emoji} {upcomingSeason.name}
              </h3>

              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {upcomingSeason.tagline}. {upcomingSeason.description}
              </p>

              <div style={{ paddingTop: '0.5rem' }}>
                <Link
                  href={`/catalogo?temporada=${upcomingSeason.id}`}
                  className="hero-btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.55rem',
                    padding: '0.85rem 1.85rem',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    borderRadius: '9999px',
                    textDecoration: 'none',
                    width: 'fit-content',
                  }}
                >
                  <span>Ver arreglos para {upcomingSeason.name}</span>
                  <ArrowRight size={17} className="hero-btn-arrow" />
                </Link>
              </div>
            </div>

            {/* Lado Imagen */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                minHeight: '220px',
                maxHeight: '320px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.25rem',
                background: 'radial-gradient(circle, rgba(253, 215, 120, 0.2) 0%, rgba(246, 159, 182, 0.15) 70%, transparent 100%)',
              }}
            >
              <div style={{ position: 'relative', width: '220px', height: '220px' }}>
                <Image
                  src={upcomingSeason.image}
                  alt={upcomingSeason.name}
                  fill
                  placeholder="blur"
                  blurDataURL={FLORAL_BLUR_DATA_URL}
                  sizes="240px"
                  style={{ objectFit: 'contain', filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.12))' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Cuadrícula / Carrusel de Tarjetas de Ocasiones ── */}
        <div className="seasons-cards-container">
          {mainSeasons.map((season) => {
            const IconComponent = iconMap[season.iconName] || Sparkles
            const isTopUpcoming = season.id === upcomingSeason?.id

            return (
              <Link
                key={season.id}
                href={`/catalogo?temporada=${season.id}`}
                className={`season-feature-card ${isTopUpcoming ? 'is-upcoming-highlight' : ''}`}
                style={{ textDecoration: 'none' }}
              >
                {/* Imagen floral de fondo con overlay */}
                <div className="season-card-img-container">
                  <Image
                    src={season.image}
                    alt={season.name}
                    fill
                    placeholder="blur"
                    blurDataURL={FLORAL_BLUR_DATA_URL}
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 33vw, 240px"
                    style={{ objectFit: 'cover' }}
                    className="season-card-img"
                  />
                  <div className="season-card-gradient-overlay" />
                </div>

                {/* Badge de fecha / tipo en esquina superior */}
                <div className="season-card-header-badge">
                  <span className="season-badge-pill">
                    <span className="season-emoji">{season.emoji}</span>
                    <span className="season-date-text">{season.shortDate}</span>
                  </span>
                  {isTopUpcoming && (
                    <span className="season-highlight-indicator">
                      ★ Próxima
                    </span>
                  )}
                </div>

                {/* Contenido inferior */}
                <div className="season-card-body">
                  <div className="season-icon-title-row">
                    <span className="season-icon-wrap">
                      <IconComponent size={17} style={{ color: 'var(--accent)' }} />
                    </span>
                    <h3 className="season-card-title font-display">
                      {season.name}
                    </h3>
                  </div>

                  <p className="season-card-tagline">
                    {season.tagline}
                  </p>

                  <div className="season-card-cta">
                    <span className="season-cta-text">Ver arreglos</span>
                    <span className="season-cta-arrow">→</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Mobile swipe hint text */}
        <p
          className="mobile-seasons-swipe-hint"
          style={{
            textAlign: 'center',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            margin: '0.85rem 0 0',
            display: 'none',
          }}
        >
          ← Desliza para explorar más fechas especiales →
        </p>

        {/* Botón inferior: Ver todo el catálogo */}
        <div style={{ textAlign: 'center', marginTop: '2.75rem' }}>
          <Link
            href="/catalogo"
            className="hero-btn-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.85rem 1.95rem',
              fontSize: '0.95rem',
              fontWeight: 600,
              borderRadius: '9999px',
              textDecoration: 'none',
            }}
          >
            <span>Ver todo el catálogo floral</span>
            <ArrowRight size={17} className="hero-btn-arrow" />
          </Link>
        </div>

      </div>
    </section>
  )
}
