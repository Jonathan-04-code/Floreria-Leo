import Image from 'next/image'
import Link from 'next/link'
import {
  Sparkles,
  ArrowRight,
  Flower2,
  Truck,
  HeartHandshake,
  Leaf,
  Palette,
  ChevronDown,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FeaturedProducts from '@/components/FeaturedProducts'
import SplashScreen from '@/components/SplashScreen'
import { FLORAL_BLUR_DATA_URL } from '@/lib/image-constants'

/* ── 3 Pilares destacados del Hero (Lucide + Texto claro) ──────── */
const heroHighlights = [
  { icon: Flower2, text: 'Arreglos personalizados' },
  { icon: Truck, text: 'Entrega local puntual' },
  { icon: HeartHandshake, text: 'Hecho con cariño' },
]

/* ── Pilares "Sobre nosotros" (Iconos vectoriales limpios) ─────── */
const pilares = [
  {
    icon: Leaf,
    title: 'Flores 100% Frescas',
    desc: 'Seleccionadas cada mañana para garantizar máxima frescura, aroma y duración.',
  },
  {
    icon: HeartHandshake,
    title: 'Atención Personalizada',
    desc: 'Te asesoramos con calidez para que tu mensaje llegue directo al corazón.',
  },
  {
    icon: Palette,
    title: 'Diseño Artesanal',
    desc: 'Cada arreglo es una composición única con follajes selectos y empaque premium.',
  },
]

export default function HomePage() {
  return (
    <>
      <SplashScreen />
      <Navbar />
      <main style={{ overflowX: 'hidden', width: '100%' }}>

        {/* ═══════════════════════════════════════════════════════════
            1. HERO SECTION (Rediseño UX/UI de Alta Gama)
        ═══════════════════════════════════════════════════════════ */}
        <section
          style={{
            position: 'relative',
            background: 'var(--gradient-hero)',
            paddingTop: 'clamp(5.2rem, 9vw, 7.2rem)',
            paddingBottom: 'clamp(3rem, 5vw, 4.5rem)',
            overflow: 'hidden',
          }}
        >
          {/* Ambient decorative glow */}
          <div
            className="blob-el"
            style={{
              width: '500px',
              height: '500px',
              top: '-12%',
              right: '-8%',
              background: 'var(--blob1)',
            }}
          />
          <div
            className="blob-el"
            style={{
              width: '400px',
              height: '400px',
              bottom: '-5%',
              left: '-8%',
              background: 'var(--blob2)',
            }}
          />

          <div
            style={{
              maxWidth: '1240px',
              margin: '0 auto',
              padding: '0 1.5rem',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div
              className="hero-grid-container"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                alignItems: 'center',
                gap: 'clamp(2rem, 5vw, 3.5rem)',
              }}
            >
              {/* Left Column: Brand Eyebrow, Headline, Description, CTAs & Trust Badges */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                
                {/* Eyebrow Brand Pill */}
                <div
                  className="anim-fade-down hero-badge-pill"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.55rem',
                    padding: '0.42rem 1rem',
                    borderRadius: '9999px',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    marginBottom: '1.25rem',
                  }}
                >
                  <span className="hero-badge-dot" />
                  <Sparkles size={14} />
                  <span>Florería Artesanal &middot; Envíos con Amor</span>
                </div>

                {/* Headline */}
                <h1
                  className="font-editorial anim-fade-up hero-h1-glow"
                  style={{
                    fontSize: 'clamp(2.5rem, 5.8vw, 4.3rem)',
                    fontWeight: 600,
                    color: 'var(--accent)',
                    fontStyle: 'italic',
                    margin: '0 0 1rem',
                    lineHeight: 1.14,
                    letterSpacing: '-0.015em',
                  }}
                >
                  Detalles que hablan por ti.
                </h1>

                {/* Subtitle */}
                <p
                  className="anim-fade-up"
                  style={{
                    fontSize: 'clamp(1.02rem, 1.8vw, 1.15rem)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    margin: '0 0 2rem',
                    maxWidth: '510px',
                    animationDelay: '0.08s',
                  }}
                >
                  Arreglos florales únicos diseñados con amor, flores frescas de corte diario y entrega puntual para cada momento especial.
                </p>

                {/* Mobile Hero image visible only on small screens */}
                <div
                  className="hero-mobile-image-wrap"
                  style={{
                    width: '100%',
                    maxWidth: '320px',
                    margin: '0 auto 1.85rem',
                    display: 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  <div className="hero-stage-aura" style={{ width: '260px', height: '260px' }} />
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                    }}
                  >
                    <Image
                      src="/img/Girasoles1.png"
                      alt="Ramo Destello Floral - Girasoles Florería Leo"
                      width={960}
                      height={1280}
                      priority
                      placeholder="blur"
                      blurDataURL={FLORAL_BLUR_DATA_URL}
                      sizes="(max-width: 480px) 260px, 290px"
                      style={{
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 14px 28px rgba(0, 0, 0, 0.14))',
                        width: 'auto',
                        height: 'auto',
                        maxWidth: '280px',
                        maxHeight: '320px',
                      }}
                    />
                  </div>
                </div>

                {/* Action Button - Centered */}
                <div
                  className="anim-fade-up hero-actions-wrap"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '2.25rem',
                    width: '100%',
                    animationDelay: '0.16s',
                  }}
                >
                  <Link
                    href="/catalogo"
                    className="hero-btn-primary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.6rem',
                      padding: '0.95rem 2.25rem',
                      fontSize: '1rem',
                      fontWeight: 700,
                      borderRadius: '9999px',
                      textDecoration: 'none',
                    }}
                  >
                    <span>Ver catálogo</span>
                    <ArrowRight size={18} className="hero-btn-arrow" />
                  </Link>
                </div>

                {/* 3 Quick highlights pill row */}
                <div
                  className="anim-fade-up hero-trust-strip"
                  style={{
                    animationDelay: '0.24s',
                    width: '100%',
                  }}
                >
                  {heroHighlights.map(({ icon: IconComponent, text }) => (
                    <div key={text} className="hero-trust-item">
                      <span className="hero-trust-icon-box">
                        <IconComponent size={15} />
                      </span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Right Column: Hero bouquet presentation with Stage */}
              <div
                className="hero-desktop-image-wrap"
                style={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {/* Luminous Organic Backdrop Stage */}
                <div className="hero-stage-aura" />

                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '460px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                  }}
                >
                  {/* Hero bouquet with floating animation */}
                  <div
                    className="anim-float-a"
                    style={{
                      position: 'relative',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image
                      src="/img/Girasoles1.png"
                      alt="Ramo Destello Floral - Girasoles Florería Leo"
                      width={960}
                      height={1280}
                      priority
                      placeholder="blur"
                      blurDataURL={FLORAL_BLUR_DATA_URL}
                      sizes="(max-width: 1024px) 380px, 460px"
                      style={{
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 18px 36px rgba(0, 0, 0, 0.14))',
                        width: 'auto',
                        height: 'auto',
                        maxWidth: '100%',
                        maxHeight: '480px',
                      }}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Bottom Down Arrow Indicator */}
          <div
            style={{
              position: 'relative',
              margin: '2rem auto 0',
              display: 'flex',
              justifyContent: 'center',
              zIndex: 3,
            }}
          >
            <a
              href="#destacados"
              aria-label="Ir a arreglos destacados"
              className="hero-down-arrow"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px var(--shadow-card)',
                textDecoration: 'none',
                transition: 'transform .2s ease',
              }}
            >
              <ChevronDown size={18} />
            </a>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            2. FEATURED PRODUCTS (— Arreglos destacados —)
        ═══════════════════════════════════════════════════════════ */}
        <FeaturedProducts />

        {/* ═══════════════════════════════════════════════════════════
            3. WHATSAPP CUSTOM QUOTE BANNER (¿Tienes algo diferente en mente?)
        ═══════════════════════════════════════════════════════════ */}
        <section
          style={{
            padding: '2rem 1.25rem 3.5rem',
            background: 'var(--bg-primary)',
          }}
        >
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div
              className="home-quote-banner"
              style={{
                borderRadius: '1.75rem',
                padding: 'clamp(1.75rem, 4vw, 2.75rem) clamp(1.5rem, 4vw, 3rem)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '2rem',
                flexWrap: 'wrap',
              }}
            >
              {/* Left Column: Title & Description */}
              <div style={{ flex: '1 1 480px', minWidth: '280px', textAlign: 'left' }}>
                <h2
                  className="font-display"
                  style={{
                    margin: '0 0 0.55rem',
                    fontSize: 'clamp(1.65rem, 3.5vw, 2.25rem)',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}
                >
                  💭 ¿Tienes algo en mente?
                </h2>
                <p
                  style={{
                    margin: 0,
                    fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    maxWidth: '680px',
                  }}
                >
                  Buscas un diseño único o personalizado
                  Cuéntanos tu idea, tu ocasión especial o presupuesto y lo hacemos realidad con flores frescas seleccionadas.
                </p>
              </div>

              {/* Right Column: WhatsApp CTA Button */}
              <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                <a
                  href="https://wa.me/5215619167705?text=Hola,%20tengo%20una%20idea%20para%20un%20arreglo%20floral%20personalizado%20y%20me%20gustar%C3%ADa%20cotizarlo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp-cta"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.65rem',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Pide tu Diseño</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            5. INSPIRATIONAL QUOTE BANNER ("Cada flor, una historia de amor.")
        ═══════════════════════════════════════════════════════════ */}
        <section
          style={{
            padding: '2.5rem 1.25rem 4.5rem',
            background: 'var(--bg-primary)',
          }}
        >
          <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
            <div
              className="home-inspire-card"
              style={{
                borderRadius: '2rem',
                padding: 'clamp(2rem, 5vw, 3rem) 1.5rem',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'var(--accent-glow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                <Sparkles size={20} style={{ color: 'var(--accent)' }} />
              </div>
              <p
                className="font-editorial"
                style={{
                  margin: '0 0 0.65rem',
                  fontSize: 'clamp(1.5rem, 3.8vw, 2.2rem)',
                  color: 'var(--text-primary)',
                  fontStyle: 'italic',
                  lineHeight: 1.3,
                }}
              >
                &ldquo;Cada flor, una historia de amor..&rdquo;
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.92rem',
                  color: 'var(--accent)',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}
              >
                — Diseños para momentos inolvidables.. —
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            6. SOBRE NOSOTROS (#nosotros)
        ═══════════════════════════════════════════════════════════ */}
        <section
          id="nosotros"
          style={{
            padding: '4rem 1.25rem 5rem',
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border)',
          }}
        >
          <div style={{ maxWidth: '980px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2
                className="font-display"
                style={{
                  fontSize: 'clamp(1.85rem, 4.5vw, 2.5rem)',
                  fontWeight: 700,
                  margin: '0 0 0.5rem',
                  color: 'var(--text-primary)',
                }}
              >
                Somos <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Florería Leo</span>
              </h2>

              <div className="romantic-heart-divider">
                <span>♡</span>
              </div>

              <p
                style={{
                  margin: '0 auto',
                  maxWidth: '600px',
                  color: 'var(--text-secondary)',
                  fontSize: '0.98rem',
                  lineHeight: 1.7,
                }}
              >
                Nacimos con la pasión de transmitir emociones puras a través de arreglos florales frescos, creativos y elaborados a mano con el más alto cuidado en Ciudad de México.
              </p>
            </div>

            {/* 3 Pillars */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {pilares.map(({ icon: PillarIcon, title, desc }) => (
                <div
                  key={title}
                  className="about-pillar-card"
                  style={{
                    borderRadius: '1.5rem',
                    padding: '1.65rem 1.4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'var(--accent-glow)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <PillarIcon size={22} style={{ color: 'var(--accent)' }} />
                  </div>
                  <h3
                    className="font-display about-pillar-title"
                    style={{
                      margin: 0,
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      color: 'var(--text-secondary)',
                      fontSize: '0.88rem',
                      lineHeight: 1.55,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
