import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Copyright, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Propiedad Intelectual | Florería Leo',
  description: 'Información sobre derechos de propiedad intelectual, marcas, fotografías y contenido de Florería Leo.',
}

export default function PropiedadIntelectualPage() {
  return (
    <>
      <Navbar />
      <main
        style={{
          paddingTop: '88px',
          minHeight: '100vh',
          background: 'var(--bg-primary)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            maxWidth: '820px',
            width: '100%',
            margin: '0 auto',
            padding: '2.5rem 1.25rem 5rem',
            flex: 1,
          }}
        >
          {/* Botón para regresar al catálogo */}
          <div style={{ marginBottom: '2rem' }}>
            <Link
              href="/catalogo"
              className="back-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--text-secondary)',
                fontSize: '0.88rem',
                fontWeight: 600,
                textDecoration: 'none',
                padding: '0.45rem 0.95rem',
                borderRadius: '9999px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                transition: 'all 0.2s ease',
              }}
            >
              <ArrowLeft size={16} />
              <span>Volver al catálogo</span>
            </Link>
          </div>

          {/* Tarjeta de contenido legal */}
          <article
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '1.5rem',
              padding: 'clamp(1.75rem, 5vw, 3rem)',
              boxShadow: '0 12px 36px var(--shadow-card)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Cabecera del documento */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(216, 90, 127, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent)',
                  flexShrink: 0,
                }}
              >
                <Copyright size={24} />
              </div>
              <div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--accent)',
                  }}
                >
                  Información Legal
                </span>
                <h1
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)',
                    fontWeight: 700,
                    margin: '0.15rem 0 0',
                    color: 'var(--text-primary)',
                    lineHeight: 1.25,
                  }}
                >
                  Propiedad Intelectual
                </h1>
              </div>
            </div>

            {/* Separador sutil */}
            <div
              style={{
                height: '1px',
                background: 'linear-gradient(90deg, var(--border), transparent)',
                margin: '1.5rem 0 2rem',
              }}
            />

            {/* Contenido principal */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                color: 'var(--text-secondary)',
                fontSize: '1rem',
                lineHeight: 1.75,
              }}
            >
              {/* Párrafo destacado */}
              <div
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '1rem',
                  padding: '1.25rem 1.5rem',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '1.02rem',
                  lineHeight: 1.65,
                }}
              >
                El contenido de este sitio web pertenece a Florería Leo o se utiliza con la autorización de sus respectivos titulares.
              </div>

              <p style={{ margin: 0 }}>
                Esto incluye, entre otros elementos,{' '}
                <strong style={{ color: 'var(--text-primary)' }}>
                  fotografías, logotipo, nombre, textos, descripciones, diseños gráficos y materiales promocionales
                </strong>
                .
              </p>

              <p style={{ margin: 0 }}>
                El contenido puede consultarse y compartirse mediante enlaces al sitio. Sin embargo,{' '}
                <strong style={{ color: 'var(--text-primary)' }}>
                  no está permitido copiar, modificar, reproducir, distribuir o utilizar las fotografías, el logotipo, los textos u otros materiales de Florería Leo con fines comerciales sin autorización previa
                </strong>
                .
              </p>

              <p style={{ margin: 0 }}>
                Las fotografías de los arreglos tienen <strong style={{ color: 'var(--text-primary)' }}>fines ilustrativos</strong> y pueden presentar variaciones debido a la disponibilidad, temporada y naturaleza de las flores.
              </p>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
