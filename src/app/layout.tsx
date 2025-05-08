'use client';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-50`}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full border-b bg-white/95 backdrop-blur-sm px-4 sm:px-6 py-3 shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="cursor-pointer">
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-start">
            <div className="text-xl sm:text-2xl font-bold tracking-tight">
              <span className="text-purple-600">Happ</span>
              <span className="text-gray-800">ndr</span>
            </div>
            <p className="text-xs text-muted-foreground hidden sm:block">Bringing sparks your way</p>
          </div>
        </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {/* Search */}
          <div className="relative w-64 lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Nav Links */}
          <nav className="flex gap-6 items-center text-sm font-medium">
            <Link href="/events" className="text-gray-700 hover:text-purple-600 transition-colors">
              Discover
            </Link>
            <Link href="/events" className="text-gray-700 hover:text-purple-600 transition-colors">
              Categories
            </Link>
            <Link href="/events/submit" className="text-gray-700 hover:text-purple-600 transition-colors">
              Submit Event
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <SignedOut>
   
              <SignInButton mode="modal">
                <Button 
                  size="sm" 
                  className="rounded-full px-4 bg-purple-600 hover:bg-purple-700 text-white shadow-sm"
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8"
                  }
                }}
              />
            </SignedIn>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-gray-700" />
            ) : (
              <Menu className="h-5 w-5 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 bg-white border-t">
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <nav className="flex flex-col gap-3 text-sm font-medium">
            <Link
              href="/events"
           
              className="px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Discover
            </Link>
            <Link
              href="/events"
              className="px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/events/submit" 
              className="px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Submit Event
            </Link>
            <div className="border-t my-2 pt-2 flex gap-2">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button 
                    size="sm" 
                    className="rounded-lg w-full bg-purple-600 hover:bg-purple-700"
                  >
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="flex justify-between items-center w-full px-3">
                  <span className="text-sm font-medium">Your Account</span>
                  <UserButton/>
                </div>
              </SignedIn>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-white py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-xl font-bold mb-2">
              <span className="text-purple-600">Happ</span>
              <span className="text-gray-800">ndr</span>
            </div>
            <p className="text-sm text-gray-500 mb-6 max-w-sm">
              Discover and join events in your local community. Happndr brings people together through shared experiences.
            </p>
            <div className="flex space-x-4">
              {/* Social icons would go here */}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/how-it-works" className="text-gray-600 hover:text-purple-600 transition-colors">How It Works</Link></li>
              <li><Link href="/about-us" className="text-gray-600 hover:text-purple-600 transition-colors">About Us</Link></li>
              <li><Link href="/events/submit" className="text-gray-600 hover:text-purple-600 transition-colors">Submit Event</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-purple-600 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms-of-service" className="text-gray-600 hover:text-purple-600 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="text-gray-600 hover:text-purple-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookie-policy" className="text-gray-600 hover:text-purple-600 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400 text-center">
            © {new Date().getFullYear()} Happndr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}