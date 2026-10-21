import { Metadata } from 'next'
import FlyersClient from './FlyersClient'

export const metadata: Metadata = {
  title: 'Flyers Publicitarios Premium – Florería Leo',
  description:
    'Material publicitario oficial y descargable de Florería Leo para redes sociales y WhatsApp. 4 alternativas creativas en formatos 4:5 y 9:16.',
}

export default function FlyersPage() {
  return <FlyersClient />
}
