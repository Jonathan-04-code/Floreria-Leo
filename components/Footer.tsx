import Link from 'next/link'
import { MapPin, Clock, Shield } from 'lucide-react'

function TikTokIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.79a4.84 4.84 0 01-1.07-.1z"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer
      id="contacto"
      style={{ background: 'var(--footer-bg)', position: 'relative', overflow: 'hidden', color: '#FFFFFF' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--gradient-accent)' }} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '3.5rem 1.5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem', alignItems: 'start' }}>

          {/* Marca / Identidad */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
              <div>
                <span className="font-display" style={{ fontSize: '1.35rem', fontWeight: 700, color: '#FFFFFF', display: 'block', lineHeight: 1.2 }}>
                  Florería Leo
                </span>
                <p className="font-editorial" style={{ margin: '0.15rem 0 0', color: 'rgba(255,255,255,0.65)', fontSize: '0.82rem', fontStyle: 'italic' }}>
                  Detalles que hablan por ti.
                </p>
              </div>
            </div>
            <p style={{ margin: '0.75rem 0 0', color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, fontSize: '0.88rem' }}>
              Creamos arreglos florales únicos con flores frescas seleccionadas a mano, perfectos para expresar emociones y regalar sonrisas en cada ocasión especial.
            </p>
          </div>

          {/* Redes sociales */}
          <div className="footer-social-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 0.85rem', fontWeight: 600, fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1.2 }}>
              Conéctate con nosotros
            </h4>
            <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', alignItems: 'center' }}>
              <a
                href="https://www.instagram.com/leo_floreria?igsh=dzB1NjVhOGdjM3V6&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  transition: 'all .25s ease',
                  textDecoration: 'none',
                }}
                className="footer-social-btn"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://wa.me/5215619167705?text=Hola,%20me%20interesa%20hacer%20un%20pedido%20en%20Florer%C3%ADa%20Leo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  transition: 'all .25s ease',
                  textDecoration: 'none',
                }}
                className="footer-social-btn"
              >
                <WhatsAppIcon />
              </a>
              <a
                href="https://www.tiktok.com/@leosg_10?_r=1&_t=ZS-96HbxoRXOKm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  transition: 'all .25s ease',
                  textDecoration: 'none',
                }}
                className="footer-social-btn"
              >
                <TikTokIcon />
              </a>
            </div>
          </div>

          {/* Información y Ubicación */}
          <div className="footer-info-col" style={{ textAlign: 'left' }}>
            <h4 style={{ margin: '0 0 0.85rem', fontWeight: 600, fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: '0.06em', lineHeight: 1.2 }}>
              Atención y Entrega
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
              <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <MapPin size={15} style={{ color: 'var(--accent-light)', flexShrink: 0 }} />
                <span>Santa Fe, Ciudad de México</span>
              </span>
              <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <Clock size={15} style={{ color: 'var(--accent-light)', flexShrink: 0 }} />
                <span>Lun–Sáb 9:00 – 19:00</span>
              </span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.85rem' }}>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem' }}>
            © {new Date().getFullYear()} Florería Leo. Todos los derechos reservados.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
            <Link
              href="/admin"
              className="footer-legal-link"
              style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: '0.8rem', transition: 'color .2s ease', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Shield size={13} style={{ color: 'var(--accent-light)' }} />
              <span>Panel Admin</span>
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>•</span>
            <Link
              href="/aviso-de-privacidad"
              className="footer-legal-link"
              style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '0.8rem', transition: 'color .2s ease' }}
            >
              Aviso de Privacidad
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>•</span>
            <Link
              href="/propiedad-intelectual"
              className="footer-legal-link"
              style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '0.8rem', transition: 'color .2s ease' }}
            >
              Propiedad Intelectual
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
