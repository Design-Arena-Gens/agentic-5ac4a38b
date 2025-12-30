import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Uganda Student Dashboard 2026',
  description: 'Management dashboard for Uganda Lower Secondary Curriculum 2026',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
