import Link from 'next/link'
import { Linkedin, Twitter } from 'lucide-react'

const navigation = {
  main: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: 'mailto:contact@surfing.digital' },
    { name: 'Terms', href: '/terms' },
    { name: 'Privacy', href: '/privacy' },
  ],
  social: [
    {
      name: 'LinkedIn',
      href: '#',
      icon: Linkedin,
    },
    {
      name: 'X',
      href: '#',
      icon: Twitter,
    },
  ],
}

export default function SiteFooter() {
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-screen-xl overflow-hidden px-6 py-12 md:px-10 lg:px-8">
        {/* Links */}
        <nav
          className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-[#00BFA5] transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        {/* Social */}
        <div className="mt-8 flex justify-center space-x-6">
          {navigation.social.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-[#00BFA5] transition-colors"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </Link>
          ))}
        </div>
        
        {/* Tagline */}
        <p className="mt-8 text-center text-sm text-gray-400 italic">
          "You can't stop a wave — but you can learn to surf it."
        </p>
        
        {/* Copyright */}
        <p className="mt-4 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Surfing Digital. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

