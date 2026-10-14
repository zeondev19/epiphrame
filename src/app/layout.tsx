import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EPIPHRAME — Illustration Collective & Character AI Ad Studio',
  description: 'Quirky human-drawn character art & scroll-stopping ads for AI worlds.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
