'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

const navigation = [
  { name: 'Features', href: '#features' },
  { name: 'How it works', href: '#how-it-works' },
  { name: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
      <nav className="mx-auto max-w-screen-xl px-6 md:px-10" aria-label="Top">
        <div className="flex h-20 items-center justify-between">
          {/* Logo - ÉPICO GIGANTE con overflow masivo */}
          <div className="flex items-center -my-12">
            <Link 
              href="/" 
              className="group relative hover:opacity-90 transition-all duration-300 ease-in-out"
              aria-label="Surfing Digital - AI Transformation Platform"
            >
              <Image 
                src="/logo-surfing-digital.png"
                alt="Surfing.Digital - Ride the AI Wave from Idea to ROI"
                width={900}
                height={225}
                priority
                className="h-44 w-auto sm:h-52 md:h-60 lg:h-72 xl:h-80 transition-all duration-300 group-hover:scale-[1.02] group-hover:brightness-110 drop-shadow-2xl"
                quality={100}
                style={{ filter: 'brightness(1.05) contrast(1.08)' }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-[#0BB7B7] transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            {/* CTA Button */}
            <Button 
              asChild
              className="bg-[#0BB7B7] hover:bg-[#0BB7B7]/90 text-white px-6 py-2 rounded-xl font-semibold shadow-sm"
            >
              <Link href="/discover">
                Get Started
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-6 pt-4 border-t border-gray-100 mt-2">
            <div className="space-y-4">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-base font-medium text-gray-700 hover:text-[#0BB7B7] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Button 
                asChild
                className="w-full bg-[#0BB7B7] hover:bg-[#0BB7B7]/90 text-white px-6 py-3 rounded-xl font-semibold"
              >
                <Link href="/discover" onClick={() => setMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

