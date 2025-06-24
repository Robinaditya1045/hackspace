import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthProvider'
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'HackSpace',
  description: 'HackSpace: Your AI-Powered Coding Playground',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className="dark" style={{colorScheme:"dark"}} suppressHydrationWarning={true} >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
