import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/ui/header'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Indekos - Find Your Perfect Room',
  description: 'Discover and book the best rooms for rent',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  )
}

