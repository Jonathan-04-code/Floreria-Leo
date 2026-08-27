'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

// Variable a nivel de módulo en cliente: persiste durante la navegación SPA,
// se reinicia únicamente en una recarga completa del navegador (F5 / nuevo tab).
let hasShownSplashInSession = false

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined' && hasShownSplashInSession) {
      return false
    }
    return true
  })

  const dismissedRef = useRef(false)

  const dismissSplash = useCallback(() => {
    if (dismissedRef.current) return
    dismissedRef.current = true
    hasShownSplashInSession = true
    setIsVisible(false)
    if (typeof window !== 'undefined') {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (hasShownSplashInSession && !isVisible) {
      if (typeof window !== 'undefined') {
        document.body.style.overflow = ''
      }
      return
    }

    hasShownSplashInSession = true

    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const timer = setTimeout(() => {
      dismissSplash()
    }, 1650)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = originalOverflow
    }
  }, [dismissSplash, isVisible])

  if (!isVisible) return null

  return (
    <div
      id="floreria-splash-screen"
      role="status"
      aria-label="Bienvenido a Florería Leo"
      aria-live="polite"
      onClick={dismissSplash}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget) {
          dismissSplash()
        }
      }}
      className="splash-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary, #FAF5F0)',
        cursor: 'pointer',
      }}
    >
      {/* Halo de luz sutil de marca */}
      <div
        className="splash-halo"
        style={{
          position: 'absolute',
          width: 'min(420px, 88vw)',
          height: 'min(420px, 88vw)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Contenedor coordinado: Logo + Texto Bienvenido */}
      <div
        className="splash-content-container"
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '1rem',
          pointerEvents: 'none',
        }}
      >
        {/* Logo */}
        <div
          className="splash-logo-card"
          style={{
            position: 'relative',
            width: 'clamp(180px, 32vw, 240px)',
            height: 'clamp(180px, 32vw, 240px)',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 12px 36px rgba(216, 90, 127, 0.22)',
            border: '2px solid rgba(216, 90, 127, 0.25)',
            background: '#FBECEB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logo.png"
            onError={(e) => {
              const target = e.currentTarget
              if (!target.dataset.triedFallback) {
                target.dataset.triedFallback = 'true'
                target.src = '/img/Logo_Floreria (1).png'
              }
            }}
            alt="Florería Leo"
            width={240}
            height={240}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Texto Bienvenido */}
        <p
          id="splash-welcome-title"
          className="splash-welcome-text"
          style={{
            margin: '1.25rem 0 0 0',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          Bienvenido
        </p>
      </div>
    </div>
  )
}


