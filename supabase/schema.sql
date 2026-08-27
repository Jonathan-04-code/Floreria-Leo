-- ============================================================
--  Florería Leo — Supabase Schema
--  Ejecutar en: Supabase Dashboard → SQL Editor → New Query
-- ============================================================


-- ── 1. Tabla de productos ────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.products (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT        NOT NULL,
  description TEXT,
  image_url   TEXT,
  active      BOOLEAN     NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para mejorar rendimiento de las consultas más comunes
CREATE INDEX IF NOT EXISTS idx_products_active
  ON public.products (active);

CREATE INDEX IF NOT EXISTS idx_products_created_at
  ON public.products (created_at DESC);


-- ── 2. Habilitar Row Level Security (RLS) ───────────────────

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;


-- ── 3. Políticas RLS ────────────────────────────────────────

-- Visitantes (anon): solo pueden leer productos activos
CREATE POLICY "Public: leer productos activos"
  ON public.products
  FOR SELECT
  TO anon
  USING (active = true);

-- Admins autenticados: leer TODOS los productos (incluye inactivos)
CREATE POLICY "Auth: leer todos los productos"
  ON public.products
  FOR SELECT
  TO authenticated
  USING (true);

-- Admins autenticados: crear productos
CREATE POLICY "Auth: crear productos"
  ON public.products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Admins autenticados: editar productos
CREATE POLICY "Auth: editar productos"
  ON public.products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Admins autenticados: eliminar productos
CREATE POLICY "Auth: eliminar productos"
  ON public.products
  FOR DELETE
  TO authenticated
  USING (true);


-- ── 4. Storage — bucket "products" ─────────────────────────
--
-- PASO 1: Crear el bucket desde el Dashboard
--   Storage → New bucket → Name: "products" → Public bucket: ✅ ON → Save
--
-- PASO 2: Ejecutar estas políticas de Storage

-- Lectura pública (catálogo y web)
DROP POLICY IF EXISTS "products_public_read"   ON storage.objects;
DROP POLICY IF EXISTS "products_auth_insert"   ON storage.objects;
DROP POLICY IF EXISTS "products_auth_update"   ON storage.objects;
DROP POLICY IF EXISTS "products_auth_delete"   ON storage.objects;

CREATE POLICY "products_public_read"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'products');

-- Solo admins autenticados pueden subir imágenes
CREATE POLICY "products_auth_insert"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'products');

-- Solo admins autenticados pueden reemplazar imágenes
CREATE POLICY "products_auth_update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'products');

-- Solo admins autenticados pueden eliminar imágenes
CREATE POLICY "products_auth_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'products');


-- ── 5. (Opcional) Datos de ejemplo ──────────────────────────
--
-- Descomenta si quieres cargar datos de prueba:
--
-- INSERT INTO public.products (name, description, image_url, active) VALUES
--   ('Ramo de Rosas Rojas',  'Clásico ramo de rosas rojas para expresar amor.',  'https://...', true),
--   ('Bouquet Primaveral',   'Mezcla de gerberas, rosas y flores silvestres.',    'https://...', true),
--   ('Arreglo Elegante',     'Sofisticado arreglo en base decorativa.',           'https://...', true);


-- ── 6. Migración: columnas category y badge ────────────────
-- Ejecutar si la tabla ya existe sin estas columnas:
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'ramos'
    CHECK (category IN ('ramos', 'arreglos', 'especiales')),
  ADD COLUMN IF NOT EXISTS badge TEXT;

-- ── 7. Migración: eliminar precio ───────────────────────────
-- La app ya no muestra ni gestiona precios (cotización por WhatsApp).
-- Ejecutar si la tabla todavía tiene la columna price:
ALTER TABLE public.products
  DROP COLUMN IF EXISTS price;


-- ── 5. Notas de configuración ────────────────────────────────
--
-- AUTENTICACIÓN:
--   - Ir a Authentication → Users → Invite user
--   - Crear el usuario administrador con email + contraseña
--   - El usuario creado tendrá rol "authenticated"
--
-- VARIABLES DE ENTORNO (archivo .env.local):
--   NEXT_PUBLIC_SUPABASE_URL      → Supabase Dashboard → Settings → API → Project URL
--   NEXT_PUBLIC_SUPABASE_ANON_KEY → Supabase Dashboard → Settings → API → anon key
