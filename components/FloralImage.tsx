'use client'

import { useState } from 'react'
import Image, { type ImageProps } from 'next/image'
import { Flower2 } from 'lucide-react'
import { FLORAL_BLUR_DATA_URL } from '@/lib/image-constants'

export interface FloralImageProps extends Omit<ImageProps, 'src'> {
  src?: string | null
  fallbackSrc?: string
  alt: string
}

export default function FloralImage({
  src,
  fallbackSrc = '/img/RamoRosas.png',
  alt,
  fill,
  width,
  height,
  style,
  className,
  placeholder = 'blur',
  blurDataURL = FLORAL_BLUR_DATA_URL,
  sizes,
  priority,
  ...rest
}: FloralImageProps) {
  const initialSrc = src || fallbackSrc
  const [currentSrc, setCurrentSrc] = useState<string | null>(initialSrc)
  const [prevSrc, setPrevSrc] = useState<string | null | undefined>(src)
  const [hasError, setHasError] = useState(false)
  const [triedFallback, setTriedFallback] = useState(false)

  // Sincronizar si cambia el prop src
  if (src !== prevSrc) {
    setPrevSrc(src)
    setCurrentSrc(src || fallbackSrc)
    setHasError(false)
    setTriedFallback(false)
  }

  const handleError = () => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[Florería Leo] No se pudo cargar la imagen "${currentSrc}". Intentando fallback...`)
    }

    if (!triedFallback && fallbackSrc && currentSrc !== fallbackSrc) {
      setTriedFallback(true)
      setCurrentSrc(fallbackSrc)
    } else {
      setHasError(true)
    }
  }

  if (!currentSrc || hasError) {
    return (
      <div
        className={`floral-fallback-placeholder ${className || ''}`}
        style={{
          position: fill ? 'absolute' : 'relative',
          top: 0,
          left: 0,
          width: fill ? '100%' : width,
          height: fill ? '100%' : height,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, rgba(243, 235, 228, 0.5) 0%, rgba(232, 240, 229, 0.5) 100%)',
          borderRadius: 'inherit',
          padding: '1rem',
          ...style,
        }}
        role="img"
        aria-label={alt}
      >
        <Flower2 size={fill ? 44 : 26} style={{ color: 'var(--accent, #b83354)', opacity: 0.6 }} />
        <span
          style={{
            fontSize: '0.72rem',
            color: 'var(--text-secondary, #736b6d)',
            marginTop: '0.35rem',
            textAlign: 'center',
            fontWeight: 500,
            letterSpacing: '0.02em',
          }}
        >
          Florería Leo
        </span>
      </div>
    )
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      sizes={sizes}
      priority={priority}
      style={{
        objectFit: 'contain',
        objectPosition: 'center 35%',
        ...style,
      }}
      className={className}
      onError={handleError}
      {...rest}
    />
  )
}
