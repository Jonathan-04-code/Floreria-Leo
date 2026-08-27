'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import ThemeToggle from '@/components/ThemeToggle'

const links = [
  { href: '/',         label: 'Inicio',   targetId: 'top' },
  { href: '/catalogo', label: 'Catálogo', targetId: 'catalogo' },
  { href: '/#nosotros',label: 'Nosotros', targetId: 'nosotros' },
  { href: '/#contacto',label: 'Contacto', targetId: 'contacto' },
]

function WhatsAppNavIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function Navbar() {
  const pathname                = usePathname()
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Soporte para scroll automático si se carga con hash desde otra página
  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash
    if (hash && hash.length > 1) {
      const id = hash.substring(1)
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [pathname])

  const handleNavAction = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false)

    if (href === '/') {
      if (pathname === '/') {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    if (href === '/catalogo') {
      if (pathname === '/catalogo') {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '')
      if (pathname === '/') {
        e.preventDefault()
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
          window.history.pushState(null, '', `/#${targetId}`)
        }
      }
    }
  }, [pathname])

  const whatsappQuoteUrl = 'https://wa.me/5215619167705?text=Hola,%20me%20gustar%C3%ADa%20cotizar%20un%20arreglo%20floral%20en%20Florer%C3%ADa%20Leo'

  return (
    <>
      <nav
        className="anim-fade-down"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          backgroundColor: scrolled ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg-top)',
          backdropFilter:       'blur(18px) saturate(180%)',
          WebkitBackdropFilter: 'blur(18px) saturate(180%)',
          borderBottom: scrolled
            ? '1px solid var(--border)'
            : '1px solid rgba(234, 216, 220, 0.4)',
          transition: 'background .3s ease, border-color .3s ease, box-shadow .3s ease',
          boxShadow: scrolled ? 'var(--nav-shadow)' : 'none',
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: '0 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px',
          }}
        >
          {/* Brand — Florería Leo */}
          <Link
            href="/"
            prefetch={true}
            onClick={(e) => handleNavAction(e, '/')}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
          >
            <span
              className="font-display"
              style={{
                fontSize: '1.45rem',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                color: 'var(--text-primary)',
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              Florería Leo
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {links.map(({ href, label }) => {
              const isActive = (href === '/' && pathname === '/') || (href === '/catalogo' && pathname === '/catalogo')
              return (
                <Link
                  key={href}
                  href={href}
                  prefetch={true}
                  onClick={(e) => handleNavAction(e, href)}
                  className={`nav-link${isActive ? ' active' : ''}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    padding: '0.5rem 0.95rem',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {label}
                </Link>
              )
            })}
          </div>

          {/* Desktop right actions: WhatsApp Cotizar CTA + ThemeToggle */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <a
              href={whatsappQuoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                fontSize: '0.88rem',
                padding: '0.6rem 1.35rem',
                borderRadius: '9999px',
                fontWeight: 600,
              }}
            >
              <WhatsAppNavIcon />
              <span>Cotizar arreglo</span>
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile buttons: ThemeToggle + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="nav-toggle-mobile">
              <ThemeToggle compact />
            </div>
            <button
              className="nav-burger"
              onClick={() => setOpen(!open)}
              aria-label="Menú"
              style={{
                background: 'rgba(255,255,255,0.7)',
                border: '1.5px solid var(--border)',
                borderRadius: '0.75rem',
                padding: '0.45rem 0.7rem',
                color: 'var(--accent)',
                cursor: 'pointer',
                fontSize: '1.15rem',
                display: 'none',
                lineHeight: 1,
              }}
            >
              {open ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {open && (
          <div
            style={{
              position: 'absolute',
              top: '72px',
              left: 0,
              right: 0,
              padding: '1rem 1.25rem 1.5rem',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              background: 'var(--nav-bg-scrolled)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              animation: 'nav-slide .22s ease both',
              boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
              zIndex: 99,
            }}
          >
            {links.map(({ href, label }) => {
              const isActive = (href === '/' && pathname === '/') || (href === '/catalogo' && pathname === '/catalogo')
              return (
                <Link
                  key={href}
                  href={href}
                  prefetch={true}
                  onClick={(e) => handleNavAction(e, href)}
                  style={{
                    textDecoration: 'none',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.85rem',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                    backgroundColor: isActive ? 'var(--bg-rose-card)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {label}
                </Link>
              )
            })}

            <div style={{ marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
              <a
                href={whatsappQuoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '0.8rem 1.25rem',
                  fontSize: '0.95rem',
                }}
              >
                <WhatsAppNavIcon />
                <span>Cotizar arreglo</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop       { display: none !important; }
          .nav-burger        { display: flex !important; }
          .nav-toggle-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-toggle-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}
