import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative py-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 opacity-30 bg-[url('/noise.png')] mix-blend-overlay" />
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-purple-500/10 pt-8">
          {/* Logo and Copyright */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-2xl font-bold tracking-tight text-white font-display">
              Growmint
            </Link>
            <p className="mt-2 text-sm text-secondary">
              © {currentYear} Growmint. All rights reserved.
            </p>
          </div>
          
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-6 md:mb-0">
            <Link href="/" className="text-secondary hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-secondary hover:text-white transition-colors">
              About
            </Link>
            <Link href="/services" className="text-secondary hover:text-white transition-colors">
              Services
            </Link>
            <Link href="/contact" className="text-secondary hover:text-white transition-colors">
              Contact
            </Link>
          </div>
          
          {/* Social Links */}
          <div className="flex gap-4">
            <a href="#" className="text-secondary hover:text-white hover:scale-110 transition-all" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="#" className="text-secondary hover:text-white hover:scale-110 transition-all" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="#" className="text-secondary hover:text-white hover:scale-110 transition-all" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

