import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import CustomCursor from './CustomCursor';
import { useAuth } from '@/pages/_app';
import Footer from './footer';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    const currentTime = new Date().getTime();
    
    // Reset counter if more than 1 second has passed since last click
    if (currentTime - lastClickTime > 1000) {
      setClickCount(1);
    } else {
      setClickCount(clickCount + 1);
    }
    
    setLastClickTime(currentTime);
    
    // Redirect to auth page after 3 rapid clicks
    if (clickCount === 2) {
      router.push('/auth');
      setClickCount(0);
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    router.push('/');
  };

  return (
    <div className="flex justify-center w-full z-50 fixed top-0">
      <motion.nav 
        className={`glass py-3 px-6 md:px-8 rounded-full mt-4 flex items-center transition-all duration-300 w-auto border border-white/10 backdrop-blur-md navbar-glow ${isScrolled ? 'shadow-lg' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between w-full gap-8">
          <div 
            className="text-2xl font-bold hover-scale growmint-glow-navbar font-orbitron" 
            onClick={handleLogoClick}
          >
            GROWMINT
          </div>
          
          {/* Desktop menu */}
          <ul className="hidden md:flex gap-8 mx-auto">
            <li>
              <Link href="/" className="font-medium text-white/90 hover:text-white tracking-wide transition-all duration-150 relative group">
                <span className="relative z-10">Home</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
            <li>
              <Link href="/about" className="font-medium text-white/90 hover:text-white tracking-wide transition-all duration-150 relative group">
                <span className="relative z-10">About</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
            <li>
              <Link href="/services" className="font-medium text-white/90 hover:text-white tracking-wide transition-all duration-150 relative group">
                <span className="relative z-10">Services</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
            <li>
              <Link href="/contact" className="font-medium text-white/90 hover:text-white tracking-wide transition-all duration-150 relative group">
                <span className="relative z-10">Contact</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          </ul>
          
          {user ? (
            <div className="relative">
              <div 
                className="flex items-center gap-2 cursor-pointer hover-scale"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
                  {user.name[0].toUpperCase()}
                </div>
                <span className="hidden md:inline text-white font-medium">{user.name}</span>
              </div>
              
              {showUserMenu && (
                <motion.div 
                  className="absolute right-0 mt-2 w-48 bg-background/90 backdrop-blur-md border border-foreground/10 rounded-md shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="p-3 border-b border-foreground/10">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-secondary">{user.email}</p>
                  </div>
                  <Link href="/dashboard" className="block w-full text-left p-3 hover:bg-foreground/10">
                    Dashboard
                  </Link>
                  <button 
                    className="w-full text-left p-3 hover:bg-foreground/10"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              {/* Hamburger button for mobile */}
              <button
                className="p-2 md:hidden focus:outline-none"
                aria-label="Open menu"
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((open) => !open)}
              >
                <div className={`w-6 h-0.5 bg-foreground mb-1.5 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-foreground mb-1.5 transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-foreground transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
              </button>
            </div>
          )}
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-start pt-24 md:hidden animate-fade-in">
          <nav className="flex flex-col gap-8 w-full max-w-xs mx-auto">
            <Link href="/" legacyBehavior>
              <a
                className="block text-white text-2xl font-semibold py-2 px-4 rounded hover:bg-accent/20 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
            </Link>
            <Link href="/about" legacyBehavior>
              <a
                className="block text-white text-2xl font-semibold py-2 px-4 rounded hover:bg-accent/20 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
            </Link>
            <Link href="/services" legacyBehavior>
              <a
                className="block text-white text-2xl font-semibold py-2 px-4 rounded hover:bg-accent/20 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </a>
            </Link>
            <Link href="/contact" legacyBehavior>
              <a
                className="block text-white text-2xl font-semibold py-2 px-4 rounded hover:bg-accent/20 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </Link>
            {user ? (
              <>
                <Link href="/dashboard" legacyBehavior>
                  <a
                    className="block text-white text-2xl font-semibold py-2 px-4 rounded hover:bg-accent/20 transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </a>
                </Link>
                <button
                  className="block w-full text-left text-white text-2xl font-semibold py-2 px-4 rounded hover:bg-accent/20 transition-all"
                  onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}
                >
                  Sign Out
                </button>
              </>
            ) : null}
          </nav>
        </div>
      )}
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <>
      {/* <CustomCursor /> */}
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout; 