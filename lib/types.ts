export type ProductCategory =
  | 'ramos'
  | 'arreglos'
  | 'especiales'
  | '14-de-febrero'
  | 'dia-de-las-madres'
  | 'graduaciones'
  | string

export interface Product {
  id: string
  name: string
  image_url: string | null
  description: string | null
  active: boolean
  category: ProductCategory | null
  badge: string | null
  seasons?: string[] | null
  created_at: string
}
