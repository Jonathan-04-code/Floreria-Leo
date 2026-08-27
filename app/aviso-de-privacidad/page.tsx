import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ShieldCheck, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Aviso de Privacidad | Florería Leo',
  description: 'Aviso de Privacidad de Florería Leo. Información sobre el uso y tratamiento de datos para consultas de catálogo y atención al cliente.',
}

export default function AvisoDePrivacidadPage() {
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
                <ShieldCheck size={24} />
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
                  Aviso de Privacidad
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
                Florería Leo es un sitio web de catálogo y consulta. No es necesario registrarse ni crear una cuenta para utilizarlo.
              </div>

              <p style={{ margin: 0 }}>
                Los datos personales que el visitante proporcione voluntariamente al comunicarse con Florería Leo, por ejemplo, mediante WhatsApp u otros medios de contacto disponibles en el sitio, serán utilizados únicamente para{' '}
                <strong style={{ color: 'var(--text-primary)' }}>
                  atender su solicitud, gestionar su compra, responder sus consultas, proporcionar información sobre nuestros productos y servicios y, cuando sea necesario, coordinar la entrega de su pedido
                </strong>
                .
              </p>

              <p style={{ margin: 0 }}>
                En caso de requerirse información para realizar una entrega, como nombre, teléfono, domicilio, referencias o datos necesarios para localizar el lugar de entrega, ésta será utilizada únicamente para{' '}
                <strong style={{ color: 'var(--text-primary)' }}>
                  gestionar y realizar dicha entrega
                </strong>
                .
              </p>

              <p style={{ margin: 0 }}>
                Florería Leo no solicita datos personales para consultar el catálogo y no vende, renta ni comercializa la información personal proporcionada por sus visitantes.
              </p>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
