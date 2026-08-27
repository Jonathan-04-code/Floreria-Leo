export interface Season {
  id: string
  name: string
  shortDate: string
  startMonth: number // 1 - 12
  startDay: number   // 1 - 31
  endMonth: number   // 1 - 12
  endDay: number     // 1 - 31
  isYearRound?: boolean
  tagline: string
  description: string
  emoji: string
  iconName: 'heart' | 'flower' | 'graduation-cap' | 'gem' | 'cake' | 'sparkles' | 'gift'
  image: string
  badgeText?: string
  accentColor?: string
  keywords: string[]
  productIds?: number[]
}

export const SEASONS: Season[] = [
  {
    id: 'san-valentin',
    name: 'San Valentín',
    shortDate: '14 de Febrero',
    startMonth: 1,
    startDay: 15,
    endMonth: 2,
    endDay: 16,
    tagline: 'Expresa tu amor con las rosas más rojas y apasionadas',
    description: 'El clásico de los enamorados. Arreglos románticos diseñados para conquistar corazones y celebrar el amor verdadero.',
    emoji: '🌹',
    iconName: 'heart',
    image: '/img/RamoRosas.png',
    badgeText: '14 de Febrero',
    accentColor: '#E11D48',
    keywords: ['rosas', 'amor', 'romántico', 'rojas', 'buchón', 'tulipanes', 'pasión', 'valentin'],
    productIds: [1, 4, 9, 10, 12, 13, 17],
  },
  {
    id: 'dia-de-las-madres',
    name: 'Día de las Madres',
    shortDate: '10 de Mayo',
    startMonth: 4,
    startDay: 15,
    endMonth: 5,
    endDay: 12,
    tagline: 'Un homenaje de amor y gratitud para la reina del hogar',
    description: 'Flores frescas en tonos suaves y vibrantes que transmiten ternura, admiración y el cariño más puro para mamá.',
    emoji: '🌷',
    iconName: 'flower',
    image: '/img/RamoFlores.png',
    badgeText: '10 de Mayo',
    accentColor: '#DB2777',
    keywords: ['madre', 'mamá', 'alstroemerias', 'gerberas', 'orquidea', 'primaveral', 'tulipanes', 'rosas'],
    productIds: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17],
  },
  {
    id: 'graduaciones',
    name: 'Graduaciones',
    shortDate: 'Junio – Julio',
    startMonth: 6,
    startDay: 1,
    endMonth: 7,
    endDay: 31,
    tagline: 'Celebra sus logros y el comienzo de una nueva etapa',
    description: 'Girasoles luminosos y arreglos audaces que representan el éxito, la perseverancia y un futuro brillante.',
    emoji: '🎓',
    iconName: 'graduation-cap',
    image: '/img/Girasoles1.png',
    badgeText: 'Junio – Julio',
    accentColor: '#D97706',
    keywords: ['graduacion', 'girasoles', 'exito', 'logro', 'azul', 'destello', 'gerberas'],
    productIds: [2, 3, 4, 5, 6, 8, 11, 14, 15, 16],
  },
  {
    id: 'aniversarios',
    name: 'Aniversarios',
    shortDate: 'Todo el año',
    startMonth: 1,
    startDay: 1,
    endMonth: 12,
    endDay: 31,
    isYearRound: true,
    tagline: 'Celebra cada año juntos con elegancia inolvidable',
    description: 'Composiciones exclusivas con orquídeas, rosas premium y diseños refinados que marcan momentos trascendentes.',
    emoji: '💍',
    iconName: 'gem',
    image: '/img/Arreglo1.png',
    badgeText: 'Especial Romántico',
    accentColor: '#9333EA',
    keywords: ['aniversario', 'elegante', 'orquidea', 'bicolor', 'buchon', 'lujo', 'pareja'],
    productIds: [1, 3, 4, 7, 9, 10, 11, 12, 13, 14, 15, 17],
  },
  {
    id: 'cumpleanos',
    name: 'Cumpleaños',
    shortDate: 'Todo el año',
    startMonth: 1,
    startDay: 1,
    endMonth: 12,
    endDay: 31,
    isYearRound: true,
    tagline: 'Llena su día de fiesta, color y una gran sonrisa',
    description: 'Combinaciones alegres de gerberas, girasoles y flores mixtas para desear el mejor de los cumpleaños.',
    emoji: '🎂',
    iconName: 'cake',
    image: '/img/RamoGerberas-removebg-preview.png',
    badgeText: 'Celebración',
    accentColor: '#2563EB',
    keywords: ['cumpleaños', 'fiesta', 'alegría', 'multicolor', 'gerberas', 'girasoles', 'mixto'],
    productIds: [1, 2, 4, 5, 6, 7, 8, 10, 12, 13, 14, 15, 16],
  },
  {
    id: 'dia-de-muertos',
    name: 'Día de Muertos',
    shortDate: '1 y 2 de Noviembre',
    startMonth: 10,
    startDay: 20,
    endMonth: 11,
    endDay: 3,
    tagline: 'Flores tradicionales para recordar con amor eterno',
    description: 'Arreglos con tonos cálidos y dorados que rinden homenaje con respeto y profunda tradición.',
    emoji: '🌼',
    iconName: 'flower',
    image: '/img/ArregloG.png',
    badgeText: 'Noviembre',
    accentColor: '#EA580C',
    keywords: ['tradicion', 'muertos', 'girasoles', 'amarillo', 'naranja', 'calidez'],
    productIds: [6, 8, 15, 16],
  },
  {
    id: 'navidad',
    name: 'Navidad y Fin de Año',
    shortDate: 'Diciembre',
    startMonth: 12,
    startDay: 1,
    endMonth: 1,
    endDay: 6,
    tagline: 'Detalles mágicos para compartir paz y alegría',
    description: 'Arreglos elegantes en tonos rojos, blancos y dorados ideales para el hogar, cenas familiares y buenos deseos.',
    emoji: '🎄',
    iconName: 'sparkles',
    image: '/img/RamoRosas2.png',
    badgeText: 'Diciembre',
    accentColor: '#059669',
    keywords: ['navidad', 'diciembre', 'blanco', 'rojo', 'bicolor', 'fiestas'],
    productIds: [1, 3, 9, 11, 13, 17],
  },
]

/**
 * Determina cuál es la próxima fecha o la temporada activa actual.
 */
export function getNextUpcomingSeason(referenceDate: Date = new Date()): {
  season: Season
  isActiveNow: boolean
  daysRemaining: number
} {
  const currentMonth = referenceDate.getMonth() + 1 // 1-12
  const currentDay = referenceDate.getDate()

  // 1. Verificar si hoy cae dentro de alguna temporada específica (no año redondo)
  const activeSeason = SEASONS.find((s) => {
    if (s.isYearRound) return false
    // Si la temporada cruza el año (ej. Dic a Ene)
    if (s.startMonth > s.endMonth) {
      return (
        (currentMonth === s.startMonth && currentDay >= s.startDay) ||
        currentMonth > s.startMonth ||
        (currentMonth === s.endMonth && currentDay <= s.endDay) ||
        currentMonth < s.endMonth
      )
    }
    // Temporada dentro del mismo año
    if (currentMonth > s.startMonth && currentMonth < s.endMonth) return true
    if (currentMonth === s.startMonth && currentMonth === s.endMonth) {
      return currentDay >= s.startDay && currentDay <= s.endDay
    }
    if (currentMonth === s.startMonth && currentDay >= s.startDay) return true
    if (currentMonth === s.endMonth && currentDay <= s.endDay) return true
    return false
  })

  if (activeSeason) {
    return {
      season: activeSeason,
      isActiveNow: true,
      daysRemaining: 0,
    }
  }

  // 2. Si ninguna fecha específica está activa, buscar la más cercana hacia el futuro
  const seasonalList = SEASONS.filter((s) => !s.isYearRound)
  const currentYear = referenceDate.getFullYear()

  let closestSeason: Season = SEASONS[0]
  let minDiffDays = Infinity

  for (const s of seasonalList) {
    let targetYear = currentYear
    let targetDate = new Date(targetYear, s.startMonth - 1, s.startDay)

    // Si la fecha de inicio ya pasó este año, evaluar el próximo año
    if (targetDate.getTime() < referenceDate.getTime()) {
      targetYear = currentYear + 1
      targetDate = new Date(targetYear, s.startMonth - 1, s.startDay)
    }

    const diffMs = targetDate.getTime() - referenceDate.getTime()
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays >= 0 && diffDays < minDiffDays) {
      minDiffDays = diffDays
      closestSeason = s
    }
  }

  return {
    season: closestSeason,
    isActiveNow: false,
    daysRemaining: minDiffDays === Infinity ? 0 : minDiffDays,
  }
}

/**
 * Obtiene todas las temporadas ordenadas poniendo primero la próxima / activa,
 * seguida de las demás ocasiones principales.
 */
export function getOrderedSeasons(referenceDate: Date = new Date()): Season[] {
  const { season: topSeason } = getNextUpcomingSeason(referenceDate)
  const others = SEASONS.filter((s) => s.id !== topSeason.id)
  return [topSeason, ...others]
}

export function getSeasonById(id: string | null | undefined): Season | undefined {
  if (!id) return undefined
  return SEASONS.find((s) => s.id.toLowerCase() === id.toLowerCase())
}
