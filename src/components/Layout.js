import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CustomCursor from './CustomCursor';
import { useAuth } from '@/pages/_app';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [showUserMenu, setShowUserMenu] = useState(false);
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
        className={`glass py-3 px-6 md:px-8 rounded-full mt-4 flex items-center transition-all duration-300 w-auto border border-white/10 backdrop-blur-md ${isScrolled ? 'shadow-lg' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between w-full gap-8">
          <div 
            className="text-2xl font-bold hover-scale tracking-tight text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] font-display" 
            onClick={handleLogoClick}
          >
            Growmint
          </div>
          
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
            <div className="flex items-center">
              <button className="p-2 md:hidden">
                <div className="w-6 h-0.5 bg-foreground mb-1.5"></div>
                <div className="w-6 h-0.5 bg-foreground mb-1.5"></div>
                <div className="w-6 h-0.5 bg-foreground"></div>
              </button>
            </div>
          )}
        </div>
      </motion.nav>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-background py-12 px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        <div>
          <h3 className="text-xl font-bold mb-4">Growmint</h3>
          <p className="text-secondary">
            Professional web development services that bring your digital vision to life
          </p>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-4">Navigation</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="text-secondary hover:text-foreground">Home</Link></li>
            <li><Link href="/about" className="text-secondary hover:text-foreground">About Us</Link></li>
            <li><Link href="/services" className="text-secondary hover:text-foreground">Services</Link></li>
            <li><Link href="/contact" className="text-secondary hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-4">Services</h4>
          <ul className="space-y-2">
            <li><span className="text-secondary">Web Development</span></li>
            <li><span className="text-secondary">UI/UX Design</span></li>
            <li><span className="text-secondary">3D Web Experiences</span></li>
            <li><span className="text-secondary">Web Applications</span></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-4">Contact Us</h4>
          <p className="text-secondary mb-2">hello@growmint.com</p>
          <p className="text-secondary mb-2">+1 (555) 123-4567</p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover-scale">
              <span className="sr-only">Twitter</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="#" className="hover-scale">
              <span className="sr-only">LinkedIn</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="#" className="hover-scale">
              <span className="sr-only">Instagram</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div className="border-t border-secondary/20 mt-12 pt-6 text-center text-secondary">
        <p>&copy; {new Date().getFullYear()} Growmint. All rights reserved.</p>
      </div>
    </footer>
  );
};

const Layout = ({ children }) => {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout; 