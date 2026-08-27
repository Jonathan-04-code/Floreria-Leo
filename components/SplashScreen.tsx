'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const dismissedRef = useRef(false)

  const dismissSplash = useCallback(() => {
    if (dismissedRef.current) return
    dismissedRef.current = true
    setIsVisible(false)
    if (typeof window !== 'undefined') {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    // Bloquear scroll momentáneamente mientras corre la animación de bienvenida
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const timer = setTimeout(() => {
      dismissSplash()
    }, 2500)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = originalOverflow
    }
  }, [isVisible, dismissSplash])

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
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Luz ambiental de fondo */}
      <div className="splash-ambient-bg" />

      {/* Pétalos florales flotantes decorativos */}
      <div className="splash-petals-container" aria-hidden="true">
        <span className="splash-petal petal-1">🌸</span>
        <span className="splash-petal petal-2">✨</span>
        <span className="splash-petal petal-3">🌺</span>
        <span className="splash-petal petal-4">✨</span>
        <span className="splash-petal petal-5">🌿</span>
      </div>

      {/* Contenedor central con la animación principal */}
      <div className="splash-content-container">
        
        {/* Contenedor del Logo con Anillo de Luz y Destellos */}
        <div className="splash-emblem-wrap">
          {/* Anillo de aura exterior rotatorio */}
          <div className="splash-aura-ring" aria-hidden="true" />
          {/* Anillo de pulso floral */}
          <div className="splash-pulse-halo" aria-hidden="true" />

          {/* Destellos / Estrellas decorativas */}
          <div className="splash-sparkle sparkle-top-right" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>
          <div className="splash-sparkle sparkle-bottom-left" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>

          {/* Tarjeta del Logo con destello de luz diagonal (shimmer sweep) */}
          <div className="splash-logo-card">
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
              className="splash-logo-image"
              width={240}
              height={240}
            />
            {/* Destello de brillo diagonal */}
            <div className="splash-shimmer-ray" aria-hidden="true" />
          </div>
        </div>

        {/* Texto Bienvenido */}
        <p
          id="splash-welcome-title"
          className="splash-welcome-text font-display"
        >
          Bienvenido
        </p>

      </div>
    </div>
  )
}
