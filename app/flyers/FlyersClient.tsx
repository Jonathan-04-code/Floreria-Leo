'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Sparkles,
  Download,
  Copy,
  Check,
  ArrowLeft,
  Smartphone,
  LayoutGrid,
  Eye,
  CheckCircle2,
} from 'lucide-react'

interface FlyerOption {
  id: string
  num: string
  name: string
  subtitle: string
  phrase: string
  badge: string
  colorBadge: string
  description: string
  concept: string
  paletteNames: string[]
  recommendedFor: string
  file4x5: string
  file9x16: string
  socialCopy: string
}

const FLYERS: FlyerOption[] = [
  {
    id: 'premium',
    num: '01',
    name: 'Alternativa 1 — Premium',
    subtitle: 'Minimalismo & Lujo Atemporal',
    phrase: '“Flores que hablan por ti.”',
    badge: 'Lujo & Minimalismo',
    colorBadge: 'bg-emerald-800 text-emerald-100 border-emerald-700',
    description:
      'Composición limpia inspirada en ateliers florales europeos de alta gama. Máximo espacio negativo, marco arquitectónico sutil y protagonismo absoluto a los arreglos florales.',
    concept:
      'Transmite exclusividad, sofisticación y buen gusto. El contraste suave sobre marfil y salvia hace que los colores vivos de las rosas y girasoles resalten con naturalidad.',
    paletteNames: ['Marfil Seda #FAF8F5', 'Verde Bosque Profundo #1C3829', 'Champán Dorado #CBBFA8'],
    recommendedFor: 'Feed principal de Instagram, clientes corporativos, aniversarios de lujo y branding premium.',
    file4x5: '/flyers/flyer-1-premium-4x5.png',
    file9x16: '/flyers/flyer-1-premium-9x16.png',
    socialCopy: `✨ Cada detalle cuenta una historia que las palabras no alcanzan a decir.\n\nEn Florería Leo creamos arreglos de autor con flores 100% frescas seleccionadas a mano.\n\n🌿 Ramo Buchón Exclusivo (Rosas Rojas & Azules Místicas)\n🌻 Destello Floral (Girasoles Radiantes & Rosas)\n\n📲 Cotiza tu arreglo personalizado vía WhatsApp: https://wa.me/5215619167705\n📍 Santa Fe, Ciudad de México • Entregas a domicilio\n\n#FloreriaLeo #FloresQueHablanPorTi #ArreglosFlorales #FloresCDMX #RamoBuchon #Girasoles`,
  },
  {
    id: 'romantica',
    num: '02',
    name: 'Alternativa 2 — Romántica',
    subtitle: 'Cálida, Emocional & Afectiva',
    phrase: '“Cada flor, una historia de amor.”',
    badge: 'Romántica & Parejas',
    colorBadge: 'bg-rose-800 text-rose-100 border-rose-700',
    description:
      'Atmósfera cálida y envolvente en tonos rosa empolvado, crema y burdeos. Diseñada para despertar el impulso de regalar a la persona amada.',
    concept:
      'Conecta directamente con el corazón del receptor. La luz tenue y los degradados suaves evocan ternura, romance duradero y momentos que se graban en la memoria.',
    paletteNames: ['Rosa Empolvado #FCEEEF', 'Cerezo Profundo #571728', 'Oro Rosa Suave #E3B3BE'],
    recommendedFor: 'San Valentín, aniversarios de pareja, declaraciones de amor, cumpleaños especiales y San Valentín.',
    file4x5: '/flyers/flyer-2-romantica-4x5.png',
    file9x16: '/flyers/flyer-2-romantica-9x16.png',
    socialCopy: `🌹 Hay momentos que merecen ser celebrados con el corazón.\n\n“Cada flor, una historia de amor.” Regala flores frescas y haz que su día sea inolvidable con Florería Leo.\n\n💖 Ramos buchones de impacto y arreglos luminosos hechos a tu medida.\n\n📲 Envía un WhatsApp y cotiza tu diseño: https://wa.me/5215619167705\n✨ Síguenos en Instagram @leo_floreria\n\n#FloreriaLeo #RegalaFlores #Amor #Aniversario #RosasRojas #RosasAzules #DetallesDeAmor`,
  },
  {
    id: 'moderna',
    num: '03',
    name: 'Alternativa 3 — Moderna',
    subtitle: 'Contemporánea & Alto Impacto',
    phrase: '“Regala algo que permanezca.”',
    badge: 'Impacto & Redes Sociales',
    colorBadge: 'bg-amber-800 text-amber-100 border-amber-700',
    description:
      'Diseño audaz con fondo verde esmeralda nocturno y detalles dorados metálicos. Máximo contraste cromático que detiene el scroll en feeds saturados.',
    concept:
      'Destaca la vibrancia hipnótica de las rosas rojas y azules frente a los girasoles dorados. Estilo urbano, contemporáneo y visualmente magnético.',
    paletteNames: ['Esmeralda Nocturno #0F2119', 'Oro Metálico #D4AF37', 'Salvia Claro #A2BDAE'],
    recommendedFor: 'Anuncios publicitarios (Meta Ads), historias de WhatsApp de alto CTR, público joven y viralización.',
    file4x5: '/flyers/flyer-3-moderna-4x5.png',
    file9x16: '/flyers/flyer-3-moderna-9x16.png',
    socialCopy: `🔥 Deja una impresión inolvidable. “Regala algo que permanezca.”\n\nDescubre el arte floral de Florería Leo: ramos de alto impacto, combinaciones místicas y frescura garantizada.\n\n✨ Diseños exclusivos listos para sorprender.\n\n💬 Cotiza al instante vía WhatsApp: https://wa.me/5215619167705\n📱 Conéctate en TikTok @leosg_10 e Instagram @leo_floreria\n\n#FloreriaLeo #FloresModernas #RegalosOriginales #RamosBuchones #FloresPremium`,
  },
  {
    id: 'editorial',
    num: '04',
    name: 'Alternativa 4 — Florería Editorial',
    subtitle: 'Campaña Lookbook de Alta Gama',
    phrase: '“Diseños para momentos inolvidables.”',
    badge: 'Editorial & Lookbook',
    colorBadge: 'bg-stone-800 text-stone-100 border-stone-700',
    description:
      'Estructura de catálogo editorial y revista de diseño floral. Marco tipo galería de arte, tipografías serif clásicas y jerarquía visual depurada.',
    concept:
      'Posiciona a Florería Leo como una casa de diseño botánico de autor. La presentación tipo galería trata a cada ramo como una obra artística única.',
    paletteNames: ['Piedra Galería #F2EEE9', 'Tierra Tostada #2E2822', 'Lino Natural #9C8F7E'],
    recommendedFor: 'Catálogo de lujo, material impreso, presentaciones a wedding planners, eventos y clientes de alto perfil.',
    file4x5: '/flyers/flyer-4-editorial-4x5.png',
    file9x16: '/flyers/flyer-4-editorial-9x16.png',
    socialCopy: `🌿 COLECCIÓN FLORAL DE AUTOR — Florería Leo\n\n“Diseños para momentos inolvidables.”\n\nCada uno de nuestros arreglos combina frescura botánica, armonía de color y la pasión artesanal que nos distingue.\n\n📍 Entregas puntuales en CDMX y área metropolitana.\n📲 Consulta disponibilidad y cotiza con nosotros: https://wa.me/5215619167705\n\n#FloreriaLeo #ColeccionFloral #DiseñoFloral #LookbookFloral #FloresDeAutor`,
  },
]

export default function FlyersClient() {
  const [selectedAlt, setSelectedAlt] = useState<string>('premium')
  const [format, setFormat] = useState<'4x5' | '9x16'>('4x5')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const activeFlyer = FLYERS.find((f) => f.id === selectedAlt) || FLYERS[0]
  const currentImageSrc = format === '4x5' ? activeFlyer.file4x5 : activeFlyer.file9x16

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E2922] font-sans antialiased selection:bg-[#2D4D3A] selection:text-white pb-24">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E5DFD5] px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1C3829] hover:text-[#0F241A] transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Volver a Florería Leo</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-widest text-[#7C6F5E] bg-[#EFE9DF] px-3 py-1 rounded-full">
              Material Oficial de Campaña
            </span>
            <a
              href="https://wa.me/5215619167705?text=Hola,%20me%20gustar%C3%ADa%20cotizar%20un%20arreglo%20floral%20en%20Florer%C3%ADa%20Leo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1C3829] text-white px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase hover:bg-[#13281D] transition-colors shadow-sm"
            >
              <span>WhatsApp Directo</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Title Section */}
      <section className="pt-10 pb-8 px-4 sm:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAE3D6] text-[#4A3F33] text-xs font-semibold tracking-widest uppercase mb-4">
          <Sparkles size={13} className="text-[#A37B30]" />
          <span>Director Creativo • Branding &amp; Publicidad</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#14261C] tracking-tight mb-3">
          Flyers Publicitarios Premium
        </h1>
        <p className="text-base sm:text-lg text-[#5A5043] max-w-2xl mx-auto leading-relaxed">
          4 alternativas de diseño profesional con las imágenes reales de nuestros productos, el logotipo oficial y
          formatos optimizados para redes sociales y WhatsApp.
        </p>
      </section>

      {/* Main Studio Interactive Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Canvas Preview */}
        <section className="lg:col-span-7 bg-[#FFFFFF] rounded-2xl border border-[#E5DFD5] p-5 sm:p-8 shadow-sm">
          {/* Controls: Format Selector Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#EFE9DF] mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#7C6F5E] block">
                Formato de Salida
              </span>
              <h3 className="text-sm font-semibold text-[#1C3829]">
                {format === '4x5' ? '4:5 — Feed Instagram & Facebook' : '9:16 — Historias & Estados de WhatsApp'}
              </h3>
            </div>

            <div className="inline-flex bg-[#F0EBE1] p-1 rounded-xl border border-[#DFD8CC]">
              <button
                type="button"
                onClick={() => setFormat('4x5')}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  format === '4x5'
                    ? 'bg-[#1C3829] text-white shadow-sm'
                    : 'text-[#5C5143] hover:text-[#1C3829]'
                }`}
              >
                <LayoutGrid size={14} />
                <span>Feed (4:5)</span>
              </button>
              <button
                type="button"
                onClick={() => setFormat('9x16')}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  format === '9x16'
                    ? 'bg-[#1C3829] text-white shadow-sm'
                    : 'text-[#5C5143] hover:text-[#1C3829]'
                }`}
              >
                <Smartphone size={14} />
                <span>Story (9:16)</span>
              </button>
            </div>
          </div>

          {/* Canvas Display Viewport */}
          <div className="relative mx-auto flex items-center justify-center bg-[#F7F4EE] rounded-xl p-3 sm:p-6 border border-[#E5DFD5] overflow-hidden">
            <div
              className={`relative overflow-hidden rounded-lg shadow-xl transition-all duration-300 ${
                format === '4x5' ? 'w-full max-w-[440px] aspect-[4/5]' : 'w-full max-w-[360px] aspect-[9/16]'
              }`}
            >
              <Image
                src={currentImageSrc}
                alt={`${activeFlyer.name} - Florería Leo`}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          </div>

          {/* Quick Actions Under Canvas */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#EFE9DF]">
            <a
              href={currentImageSrc}
              download={`${activeFlyer.id}-${format}.png`}
              className="inline-flex items-center justify-center gap-2 bg-[#1C3829] hover:bg-[#12261C] text-white px-5 py-3 rounded-xl text-sm font-bold tracking-wide transition-colors shadow-sm flex-1 sm:flex-none"
            >
              <Download size={16} />
              <span>Descargar Imagen ({format === '4x5' ? '1080×1350' : '1080×1920'})</span>
            </a>

            <a
              href={currentImageSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#F0EBE1] hover:bg-[#E5DFD3] text-[#332B22] px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex-1 sm:flex-none"
            >
              <Eye size={16} />
              <span>Ver Tamaño Completo</span>
            </a>
          </div>
        </section>

        {/* Right Column: Direction Selector & Brand Rationale */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          {/* Alternative Selector Cards */}
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5DFD5] p-5 sm:p-6 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#7C6F5E] mb-4">
              Seleccionar Dirección Creativa (4 Opciones)
            </h2>

            <div className="flex flex-col gap-2.5">
              {FLYERS.map((flyer) => {
                const isSelected = flyer.id === selectedAlt
                return (
                  <button
                    key={flyer.id}
                    type="button"
                    onClick={() => setSelectedAlt(flyer.id)}
                    className={`text-left p-3.5 rounded-xl border transition-all flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-[#F4F0E8] border-[#1C3829] shadow-sm ring-1 ring-[#1C3829]'
                        : 'bg-[#FAF8F5] border-[#EAE3D8] hover:border-[#C4B8A6] hover:bg-[#F7F3EB]'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 ${
                        isSelected ? 'bg-[#1C3829] text-white' : 'bg-[#E5DFD3] text-[#4A4033]'
                      }`}
                    >
                      {flyer.num}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-serif font-bold text-sm text-[#14261C] truncate">
                          {flyer.name.replace('Alternativa ', 'Alt ')}
                        </span>
                        {isSelected && <CheckCircle2 size={16} className="text-[#1C3829] flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-[#6B5F50] truncate">{flyer.subtitle}</p>
                      <p className="text-xs font-serif italic text-[#874A32] mt-0.5">{flyer.phrase}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Active Alternative Brief Details */}
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5DFD5] p-5 sm:p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
              <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${activeFlyer.colorBadge}`}>
                {activeFlyer.badge}
              </span>
              <span className="text-xs text-[#7C6F5E] font-semibold">Frase Única Seleccionada</span>
            </div>

            <div>
              <h3 className="text-lg font-serif font-bold text-[#14261C]">{activeFlyer.name}</h3>
              <p className="text-sm font-serif italic text-[#6B3322] font-semibold mt-1">
                {activeFlyer.phrase}
              </p>
            </div>

            <div className="text-xs text-[#4A4033] leading-relaxed flex flex-col gap-2 pt-2 border-t border-[#EFE9DF]">
              <p>
                <strong className="text-[#14261C]">Concepto Visual:</strong> {activeFlyer.concept}
              </p>
              <p>
                <strong className="text-[#14261C]">Uso Recomendado:</strong> {activeFlyer.recommendedFor}
              </p>
            </div>

            {/* Color Palette Indicators */}
            <div className="pt-2 border-t border-[#EFE9DF]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C6F5E] block mb-2">
                Paleta de Color Aplicada
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeFlyer.paletteNames.map((c, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium bg-[#F0EBE1] text-[#4A4033] px-2.5 py-1 rounded-md border border-[#E0D8CC]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Copy Clipboard Helper */}
            <div className="pt-3 border-t border-[#EFE9DF]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C6F5E]">
                  Texto Listo para Publicación
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyText(activeFlyer.socialCopy, activeFlyer.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1C3829] hover:underline"
                >
                  {copiedId === activeFlyer.id ? (
                    <>
                      <Check size={13} className="text-emerald-700" />
                      <span className="text-emerald-700">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copiar Texto</span>
                    </>
                  )}
                </button>
              </div>

              <textarea
                readOnly
                value={activeFlyer.socialCopy}
                rows={3}
                className="w-full text-xs bg-[#FAF8F5] text-[#4A4033] p-2.5 rounded-lg border border-[#E2D9CC] font-mono resize-none focus:outline-none"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Grid Comparison Section: All 4 Alternatives at a Glance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-16">
        <div className="border-t border-[#E5DFD5] pt-12 text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#14261C]">
            Comparativa de las 4 Direcciones Creativas
          </h2>
          <p className="text-sm text-[#6B5F50] mt-1">
            Cada alternativa resuelve una intención comercial distinta sin perder la identidad de Florería Leo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FLYERS.map((f) => (
            <div
              key={f.id}
              className={`bg-white rounded-xl border p-4 flex flex-col justify-between transition-all ${
                f.id === selectedAlt ? 'border-[#1C3829] shadow-md ring-2 ring-[#1C3829]/20' : 'border-[#E5DFD5]'
              }`}
            >
              <div>
                <div className="relative aspect-[4/5] bg-[#F7F4EE] rounded-lg overflow-hidden mb-3 border border-[#E5DFD5]">
                  <Image
                    src={f.file4x5}
                    alt={f.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 250px"
                  />
                </div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="font-mono text-xs font-bold text-[#1C3829]">{f.num}.</span>
                  <h3 className="font-serif font-bold text-sm text-[#14261C]">{f.name.replace('Alternativa ', 'Alt. ')}</h3>
                </div>
                <p className="text-xs text-[#7C6F5E] mb-2">{f.subtitle}</p>
                <p className="text-xs font-serif italic text-[#874A32] font-semibold mb-3">{f.phrase}</p>
              </div>

              <div className="flex flex-col gap-2 pt-3 border-t border-[#EFE9DF]">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAlt(f.id)
                    window.scrollTo({ top: 120, behavior: 'smooth' })
                  }}
                  className="w-full text-center py-2 rounded-lg text-xs font-bold bg-[#FAF8F5] text-[#1C3829] border border-[#DDD4C7] hover:bg-[#F2ECE1] transition-colors"
                >
                  Ver en Studio
                </button>
                <a
                  href={f.file4x5}
                  download={`${f.id}-4x5.png`}
                  className="w-full text-center py-2 rounded-lg text-xs font-bold bg-[#1C3829] text-white hover:bg-[#12261C] transition-colors"
                >
                  Descargar 4:5
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
