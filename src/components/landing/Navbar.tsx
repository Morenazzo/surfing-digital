"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const navigation = [
  { name: "Features", href: "#features" },
  { name: "How it works", href: "#how-it-works" },
  { name: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-lg z-50 border-b border-turquoise/10 shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-20 md:h-24 items-center justify-between">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="group relative hover:opacity-90 transition-all duration-300 ease-in-out"
              aria-label="Surfing Digital - AI Transformation Platform"
            >
              <Image 
                src="/logo-surfing-digital.png" 
                alt="Surfing.Digital - Ride the AI Wave from Idea to ROI" 
                width={400}
                height={100}
                priority
                className="h-14 w-auto sm:h-16 md:h-[72px] lg:h-20 transition-all duration-300 group-hover:scale-[1.02] group-hover:brightness-110"
                quality={100}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-light font-body text-navy hover:text-turquoise transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" className="text-navy hover:text-turquoise font-sans font-bold">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="bg-turquoise hover:bg-turquoise/90 text-white shadow-lg shadow-turquoise/20 rounded-xl font-sans font-bold">
                  Get Started
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-navy">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navigation.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-lg font-light font-body text-navy hover:text-turquoise transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button 
                        variant="outline"
                        className="mt-4 border-2 border-turquoise text-turquoise hover:bg-turquoise/5 rounded-xl font-sans font-bold" 
                        onClick={() => setIsOpen(false)}
                      >
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button 
                        className="bg-turquoise hover:bg-turquoise/90 text-white shadow-lg shadow-turquoise/20 rounded-xl font-sans font-bold" 
                        onClick={() => setIsOpen(false)}
                      >
                        Get Started
                      </Button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <div className="mt-4">
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  </SignedIn>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
