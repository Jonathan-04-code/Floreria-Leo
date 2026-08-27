import type { NextConfig } from 'next'
import fs from 'node:fs'
import path from 'node:path'

// Verificación y autorreparación de imágenes estáticas en public/img
function isPngValid(filePath: string): boolean {
  try {
    if (!fs.existsSync(filePath)) return false
    const fd = fs.openSync(filePath, 'r')
    const header = Buffer.alloc(8)
    const bytesRead = fs.readSync(fd, header, 0, 8, 0)
    fs.closeSync(fd)
    if (bytesRead < 8) return false
    return header[0] === 0x89 && header[1] === 0x50 && header[2] === 0x4e && header[3] === 0x47
  } catch {
    return false
  }
}

function ensureStaticImages() {
  try {
    const rootImgDir = path.join(process.cwd(), 'img')
    const publicImgDir = path.join(process.cwd(), 'public', 'img')

    if (!fs.existsSync(publicImgDir)) {
      fs.mkdirSync(publicImgDir, { recursive: true })
    }

    if (fs.existsSync(rootImgDir)) {
      const sourceFiles = fs.readdirSync(rootImgDir)
      for (const file of sourceFiles) {
        const srcPath = path.join(rootImgDir, file)
        const destPath = path.join(publicImgDir, file)

        if (!isPngValid(destPath) && isPngValid(srcPath)) {
          fs.copyFileSync(srcPath, destPath)
        }
      }

      // Asegurar logo.png
      const logoDest = path.join(publicImgDir, 'logo.png')
      const cleanLogoSrc = path.join(rootImgDir, 'logo.png')
      const rawLogoSrc = path.join(rootImgDir, 'Logo_Floreria (1).png')
      const logoSrc = isPngValid(cleanLogoSrc) ? cleanLogoSrc : rawLogoSrc
      if (isPngValid(logoSrc) && !isPngValid(logoDest)) {
        fs.copyFileSync(logoSrc, logoDest)
      }

      // Asegurar RamoBuchon.png
      const buchonDest = path.join(publicImgDir, 'RamoBuchon.png')
      const buchonSrc = path.join(rootImgDir, 'RamoRosas2.png')
      if (isPngValid(buchonSrc) && !isPngValid(buchonDest)) {
        fs.copyFileSync(buchonSrc, buchonDest)
      }
    }
  } catch (err) {
    console.warn('Advertencia al verificar imágenes estáticas:', err)
  }
}

// Ejecutar verificación preventiva en arranque / build
ensureStaticImages()

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: [
    'localhost:3000',
    '127.0.0.1:3000',
    '*.run.app',
    'ais-dev-2jfcra7675qycyhsahorbl-93408945653.us-west1.run.app',
    '*.google.com',
    '*.googleusercontent.com',
  ],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
}

export default nextConfig

