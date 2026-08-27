/**
 * Configuración centralizada de WhatsApp.
 * Cambia el número aquí y se actualiza en toda la aplicación.
 */
export const WHATSAPP_NUMBER = '5215619167705'

export type ProductCategory = string | null | undefined

export type ProductKind = 'ramo' | 'arreglo'

/** Un producto es "ramo" solo si su categoría es 'ramos'; cualquier otra categoría se cotiza como "arreglo". */
export function getProductKind(category: ProductCategory): ProductKind {
  return category === 'ramos' ? 'ramo' : 'arreglo'
}

export function getQuoteButtonLabel(category: ProductCategory): string {
  return getProductKind(category) === 'ramo' ? 'Cotizar este ramo' : 'Cotizar este arreglo'
}

export function buildQuoteMessage(productName: string, category: ProductCategory): string {
  const kind = getProductKind(category)
  return `Hola, me interesa el ${kind} "${productName}".`
}

/** Enlace universal de WhatsApp: sirve como href real del <a> (funciona sin JS, click derecho, lectores de pantalla). */
export function getWhatsAppFallbackUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/** App nativa en móvil, WhatsApp Web en escritorio. */
export function getWhatsAppDeviceUrl(message: string, isMobile: boolean): string {
  const base = isMobile ? 'https://api.whatsapp.com/send' : 'https://web.whatsapp.com/send'
  return `${base}?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`
}

export function isMobileDevice(): boolean {
  if (typeof navigator === 'undefined') return false
  return /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
