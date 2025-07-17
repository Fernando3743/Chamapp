import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BusinessHub - All-in-One Business Solutions',
  description: 'Transform your business with our all-in-one software platform. From real estate to barbershops, we provide everything you need to run, manage, and grow your business.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}