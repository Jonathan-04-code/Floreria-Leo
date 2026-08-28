'use client'

import { useEffect, useState, useCallback } from 'react'
import { Sun, Moon } from 'lucide-react'

interface Props {
  compact?: boolean
}

export default function ThemeToggle({ compact = false }: Props) {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Sincronizar estado con el DOM y localStorage inmediatamente
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    const checkDark = () => {
      const isDarkDom = document.documentElement.getAttribute('data-theme') === 'dark' ||
                        document.documentElement.classList.contains('dark')
      setIsDark(isDarkDom)
    }

    checkDark()

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ dark: boolean }>
      if (customEvent.detail !== undefined) {
        setIsDark(customEvent.detail.dark)
      } else {
        checkDark()
      }
    }

    window.addEventListener('fl-theme-change', handleThemeChange)
    return () => window.removeEventListener('fl-theme-change', handleThemeChange)
  }, [])

  const toggle = useCallback(() => {
    // Determinar el nuevo estado a partir del DOM actual para máxima reactividad
    const currentIsDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
                          document.documentElement.classList.contains('dark')
    const nextIsDark = !currentIsDark

    // Mutación inmediata del DOM (sin esperar al ciclo de render de React)
    if (nextIsDark) {
      document.documentElement.setAttribute('data-theme', 'dark')
      document.documentElement.classList.add('dark')
      try {
        localStorage.setItem('fl-theme-v2', 'dark')
        localStorage.setItem('floreria-theme', 'dark')
      } catch {}
    } else {
      document.documentElement.removeAttribute('data-theme')
      document.documentElement.classList.remove('dark')
      try {
        localStorage.setItem('fl-theme-v2', 'cream')
        localStorage.setItem('floreria-theme', 'light')
      } catch {}
    }

    setIsDark(nextIsDark)

    // Notificar a todos los demás botones de la app
    window.dispatchEvent(
      new CustomEvent('fl-theme-change', { detail: { dark: nextIsDark } })
    )
  }, [])

  const label = mounted && isDark ? 'Crema' : 'Oscuro'

  if (compact) {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={mounted && isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        title={mounted && isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        suppressHydrationWarning
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1.5px solid var(--border)',
          background: 'var(--hero-badge-bg)',
          cursor: 'pointer',
          color: 'var(--accent)',
          transition: 'transform 0.15s ease, background-color 0.15s ease, border-color 0.15s ease',
          lineHeight: 1,
          touchAction: 'manipulation',
          userSelect: 'none',
        }}
      >
        {mounted && isDark ? <Sun size={17} /> : <Moon size={17} />}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mounted && isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={mounted && isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      suppressHydrationWarning
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        background: 'var(--hero-badge-bg)',
        border: '1.5px solid var(--border)',
        borderRadius: '99px',
        padding: '0.42rem 0.95rem',
        cursor: 'pointer',
        fontSize: '0.82rem',
        fontWeight: 600,
        color: 'var(--accent)',
        letterSpacing: '0.02em',
        transition: 'transform 0.15s ease, background-color 0.15s ease, border-color 0.15s ease',
        whiteSpace: 'nowrap',
        lineHeight: 1,
        touchAction: 'manipulation',
        userSelect: 'none',
      }}
    >
      {mounted && isDark ? <Sun size={15} /> : <Moon size={15} />}
      <span suppressHydrationWarning>{mounted ? label : 'Tema'}</span>
    </button>
  )
}
