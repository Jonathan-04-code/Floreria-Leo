import type { Metadata } from 'next'
import { Poppins, Montserrat, Playfair_Display, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Florería Leo – Detalles que hablan por ti',
  description: 'Arreglos florales únicos para cada ocasión especial. Ramos, centros de mesa, arreglos especiales y cotizaciones personalizadas por WhatsApp.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${poppins.variable} ${montserrat.variable} ${playfair.variable} ${cormorant.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        {/* Script sincrónico anti-flash: aplica el tema antes de que React pinte */}
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('fl-theme-v2');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');else document.documentElement.removeAttribute('data-theme');}catch(e){}` }} />
        {children}
      </body>
    </html>
  )
}
