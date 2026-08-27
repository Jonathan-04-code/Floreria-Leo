'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

interface Props {
  compact?: boolean
}

export default function ThemeToggle({ compact = false }: Props) {
  const [isDark, setIsDark]   = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    const saved = localStorage.getItem('fl-theme-v2')
    if (saved === 'dark') {
      setIsDark(true)
    }
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    if (next) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('fl-theme-v2', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('fl-theme-v2', 'cream')
    }
  }

  const label = mounted && isDark ? 'Crema' : 'Oscuro'

  if (compact) {
    return (
      <button
        onClick={toggle}
        aria-label="Cambiar tema"
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
          transition: 'all .25s ease',
          lineHeight: 1,
        }}
      >
        {mounted && isDark ? <Sun size={17} /> : <Moon size={17} />}
      </button>
    )
  }

  return (
    <button
      onClick={toggle}
      aria-label="Cambiar tema"
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
        transition: 'all .25s ease',
        whiteSpace: 'nowrap',
        lineHeight: 1,
      }}
    >
      {mounted && isDark ? <Sun size={15} /> : <Moon size={15} />}
      <span suppressHydrationWarning>{mounted ? label : 'Tema'}</span>
    </button>
  )
}
