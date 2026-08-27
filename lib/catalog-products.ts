export type BaseCategory = 'ramos' | 'arreglos' | 'especiales' | '14-de-febrero' | 'dia-de-las-madres' | 'graduaciones' | string
export type SeasonCategory = '14-de-febrero' | 'dia-de-las-madres' | 'graduaciones'
export type CategoryFilter = 'all' | BaseCategory | SeasonCategory

export interface CatalogProduct {
  id: string | number
  name: string
  description: string
  image: string
  category: BaseCategory
  badge?: string
  inStock: boolean
  seasons?: string[]
}

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: 1,
    name: 'Ramo de Rosas Rojas',
    description: 'Clásico ramo de rosas rojas, símbolo del amor verdadero. Perfecto para expresar tus sentimientos más profundos con un gesto lleno de elegancia y pasión.',
    image: '/img/RamoRosas.png',
    category: 'ramos',
    badge: 'Popular',
    inStock: true,
    seasons: ['14-de-febrero', 'san-valentin', 'dia-de-las-madres'],
  },
  {
    id: 2,
    name: 'Bouquet Primaveral',
    description: 'Mezcla vibrante de gerberas, rosas y flores silvestres. Un estallido de color y alegría para cualquier ocasión. Cada flor seleccionada a mano por nuestros floricultores.',
    image: '/img/RamoFlores.png',
    category: 'ramos',
    badge: 'Nuevo',
    inStock: true,
    seasons: ['dia-de-las-madres', 'graduaciones'],
  },
  {
    id: 3,
    name: 'Arreglo Elegante',
    description: 'Sofisticado arreglo floral en base decorativa. Ideal para oficinas, eventos o como regalo distinguido. Diseño exclusivo creado por nuestros artistas florales.',
    image: '/img/Arreglo1.png',
    category: 'arreglos',
    badge: 'Oferta',
    inStock: true,
    seasons: ['dia-de-las-madres', 'graduaciones'],
  },
  {
    id: 4,
    name: 'Rosas Azules Místicas',
    description: 'Exclusivo ramo de rosas azules teñidas. Representa lo imposible hecho realidad y la unicidad del amor. Una pieza única que sorprenderá a quien la reciba.',
    image: '/img/Ramo-RosasAzul-removebg-preview.png',
    category: 'especiales',
    badge: 'Exclusivo',
    inStock: true,
    seasons: ['graduaciones', '14-de-febrero', 'san-valentin'],
  },
  {
    id: 5,
    name: 'Gerberas Multicolor',
    description: 'Radiantes gerberas en múltiples colores. Transmiten alegría, optimismo y energía positiva. Perfectas para dar la bienvenida o celebrar un logro especial.',
    image: '/img/RamoGerberas-removebg-preview.png',
    category: 'ramos',
    inStock: true,
    seasons: ['graduaciones', 'dia-de-las-madres'],
  },
  {
    id: 6,
    name: 'Arreglo Girasoles y Gerberas',
    description: 'Combinación perfecta de girasoles radiantes y gerberas coloridas. Ideal para iluminar cualquier espacio con calidez y naturalidad única.',
    image: '/img/ArregloG.png',
    category: 'arreglos',
    inStock: true,
    seasons: ['graduaciones', 'dia-de-las-madres'],
  },
  {
    id: 7,
    name: 'Alstroemerias Delicadas',
    description: 'Tierno ramo de alstroemerias en tonos suaves. Simboliza amistad duradera y afecto sincero. Perfectas para regalar a alguien especial en tu vida.',
    image: '/img/Ramo-Astromelias.png',
    category: 'ramos',
    inStock: true,
    seasons: ['dia-de-las-madres'],
  },
  {
    id: 8,
    name: 'Destello Floral',
    description: 'Espectacular ramo de girasoles frescos con notas de flores silvestres y envoltura editorial. Representa admiración, luminosidad y pensamientos positivos.',
    image: '/img/Girasoles1.png',
    category: 'ramos',
    badge: 'Popular',
    inStock: true,
    seasons: ['graduaciones', 'dia-de-las-madres'],
  },
  {
    id: 9,
    name: 'Rosas Bicolor Premium',
    description: 'Elegante combinación de rosas blancas y rojas. Perfecta para bodas, aniversarios y celebraciones especiales. Un arreglo que quedará en la memoria.',
    image: '/img/RamoRosas2.png',
    category: 'especiales',
    badge: 'Premium',
    inStock: true,
    seasons: ['14-de-febrero', 'san-valentin', 'dia-de-las-madres'],
  },
  {
    id: 10,
    name: 'Bouquet de Temporada',
    description: 'Selección especial de flores frescas de temporada. Cada ramo es único y lleno de sorpresas naturales recién cortadas de nuestros proveedores locales.',
    image: '/img/RamoMixto.png',
    category: 'ramos',
    inStock: true,
    seasons: ['dia-de-las-madres', '14-de-febrero', 'san-valentin'],
  },
  {
    id: 11,
    name: 'Orquídea Exótica',
    description: 'Exquisita orquídea de larga duración. Símbolo de refinamiento, belleza y fortaleza interior. Una planta que embellece cualquier espacio con su presencia.',
    image: '/img/Orquidea.png',
    category: 'especiales',
    badge: 'Lujo',
    inStock: true,
    seasons: ['dia-de-las-madres', 'graduaciones'],
  },
  {
    id: 12,
    name: 'Arreglo Rosas y Girasoles',
    description: 'Perfecta armonía entre la pasión de las rosas y la alegría de los girasoles. Expresa amor y felicidad en un solo arreglo diseñado con esmero.',
    image: '/img/ArregloRyG.png',
    category: 'arreglos',
    badge: 'Especial',
    inStock: true,
    seasons: ['14-de-febrero', 'san-valentin', 'dia-de-las-madres'],
  },
  {
    id: 13,
    name: 'Buchón de Rosas',
    description: 'Ramo natural de rosas frescas en presentación buchón. Elegante y sorprendente, perfecto para declaraciones especiales y momentos memorables.',
    image: '/img/RamoBuchon.png',
    category: 'ramos',
    badge: 'Popular',
    inStock: true,
    seasons: ['14-de-febrero', 'san-valentin'],
  },
  {
    id: 14,
    name: 'Arreglo Gerberas y Rosas',
    description: 'Explosivo arreglo de flores frescas que combina la vivacidad de las gerberas con la elegancia de las rosas. Un regalo perfecto para cualquier celebración.',
    image: '/img/ArregloGerberayRosas.png',
    category: 'arreglos',
    badge: 'Popular',
    inStock: true,
    seasons: ['dia-de-las-madres', 'graduaciones'],
  },
  {
    id: 15,
    name: 'Arreglo Girasoles y Rosas',
    description: 'Arreglo luminoso que une la calidez de los girasoles con la suavidad de las rosas. Una combinación que ilumina el día de quien lo recibe con alegría.',
    image: '/img/ArregloGirasolyRosas.png',
    category: 'arreglos',
    badge: 'Popular',
    inStock: true,
    seasons: ['graduaciones', 'dia-de-las-madres'],
  },
  {
    id: 16,
    name: 'Ramo de Girasoles Grande',
    description: 'Gran ramo de girasoles frescos y radiantes. Perfecto para felicitaciones, decoración y transmitir alegría desbordante a quien los recibe.',
    image: '/img/RamoGirasoles.png',
    category: 'ramos',
    inStock: true,
    seasons: ['graduaciones', 'dia-de-las-madres'],
  },
  {
    id: 17,
    name: 'Tulipanes Encantadores',
    description: 'Delicados tulipanes en tonos vibrantes. Simbolizan amor perfecto y elegancia natural. Una elección sofisticada para regalar en cualquier ocasión especial.',
    image: '/img/Tulipan1.png',
    category: 'ramos',
    badge: 'Nuevo',
    inStock: true,
    seasons: ['14-de-febrero', 'san-valentin', 'dia-de-las-madres'],
  },
]

export const CATEGORIES: { value: CategoryFilter; label: string; isSpecial?: boolean }[] = [
  { value: 'all',               label: 'Todos' },
  { value: 'ramos',             label: 'Ramos' },
  { value: 'arreglos',          label: 'Arreglos' },
  { value: 'especiales',        label: 'Especiales' },
  { value: '14-de-febrero',     label: '14 de Febrero',   isSpecial: true },
  { value: 'dia-de-las-madres', label: 'Día de las Madres', isSpecial: true },
  { value: 'graduaciones',      label: 'Graduaciones',     isSpecial: true },
]

export { WHATSAPP_NUMBER } from '@/lib/whatsapp'
