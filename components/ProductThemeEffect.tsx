'use client'

import { useEffect, useLayoutEffect } from 'react'
import { applyProductTheme, applyLightTheme } from '@/lib/theme'

interface Props {
  category?: string | null
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function ProductThemeEffect({ category }: Props) {
  useIsomorphicLayoutEffect(() => {
    // Aplica el tema según la categoría del producto (Especiales -> oscuro dorado, otros -> claro)
    applyProductTheme(category)

    // Al desmontar (salir del producto / volver al catálogo), vuelve al modo claro
    return () => {
      applyLightTheme()
    }
  }, [category])

  return null
}
