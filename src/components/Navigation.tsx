'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'

export default function Navigation() {
  const pathname = usePathname()
  const { user, isAdmin, signOut } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const menuItems = [
    { href: '/about', label: 'About' },
    { href: '/raffles', label: 'Raffles' },
    { href: '/contact', label: 'Contact' },
  ]

  const authMenuItems = user
    ? [
        ...(isAdmin ? [{ href: '/admin', label: 'Admin' }] : []),
        { href: '/dashboard', label: 'Dashboard' },
      ]
    : []

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm border-b z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary-500">
          RUFFLE
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {menuItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`hover:text-primary-500 transition ${
                isActive(href) ? 'text-primary-500' : ''
              }`}
            >
              {label}
            </Link>
          ))}

          {user ? (
            <>
              {authMenuItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`hover:text-primary-500 transition ${
                    pathname.startsWith(href) ? 'text-primary-500' : ''
                  }`}
                >
                  {label}
                </Link>
              ))}
              <button
                onClick={() => signOut()}
                className="text-gray-600 hover:text-primary-500 transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2"
          aria-label="Toggle mobile menu"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-b">
            {menuItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`block px-3 py-2 rounded-md ${
                  isActive(href)
                    ? 'bg-primary-50 text-primary-500'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}

            {user ? (
              <>
                {authMenuItems.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`block px-3 py-2 rounded-md ${
                      pathname.startsWith(href)
                        ? 'bg-primary-50 text-primary-500'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    signOut()
                    setIsMobileMenuOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-white bg-primary-500 hover:bg-primary-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
