/**
 * Utilidades para el control del tema de Florería Leo.
 *
 * REGLA DE NEGOCIO:
 * - Toda la aplicación utiliza el tema claro por defecto.
 * - El tema oscuro con detalles dorados existente se activa automáticamente
 *   ÚNICAMENTE cuando el usuario ve o selecciona productos de la categoría 'Especiales'.
 * - Al salir o cerrar el producto, se restaura el tema claro.
 */

/**
 * Detecta si una categoría corresponde a la categoría "Especiales".
 * Es insensible a mayúsculas/minúsculas y contempla variantes comunes.
 */
export function isEspecialCategory(category?: string | null): boolean {
  if (!category) return false
  const norm = category.trim().toLowerCase()
  return (
    norm === 'especiales' ||
    norm === 'especial' ||
    norm === 'colección especial' ||
    norm === 'coleccion especial'
  )
}

/**
 * Aplica el tema oscuro con dorado existente en el DOM.
 */
export function applyDarkTheme() {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', 'dark')
  document.documentElement.classList.add('dark')
}

/**
 * Restaura el tema claro por defecto en el DOM.
 */
export function applyLightTheme() {
  if (typeof document === 'undefined') return
  document.documentElement.removeAttribute('data-theme')
  document.documentElement.classList.remove('dark')
}

/**
 * Aplica automáticamente el tema según la categoría del producto:
 * - Si es 'Especiales' -> Tema oscuro dorado existente.
 * - Si es normal -> Tema claro.
 */
export function applyProductTheme(category?: string | null) {
  if (isEspecialCategory(category)) {
    applyDarkTheme()
  } else {
    applyLightTheme()
  }
}
