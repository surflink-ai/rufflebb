import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '../contexts/AuthContext'
import Navigation from '../components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ruffle - Raffles for Animal Shelters',
  description: 'Support Ocean Acres Animal Shelter through online raffles',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navigation />
          <main className="min-h-screen bg-background">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
