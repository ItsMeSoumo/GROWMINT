import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import { FadeIn, SlideIn, ScaleIn, Stagger, StaggerItem } from '@/components/animations';
import { scrollToSection } from '@/utils/scroll';
import { initScrollReveal } from '@/utils/scrollReveal';
// Dynamically import the 3D scene to avoid SSR issues
// Commented out for now
// const Scene3D = dynamic(() => import('@/components/Scene3D'), { ssr: false });


// Testimonial component with premium styling
const Testimonial = ({ quote, author, company, delay = 0 }) => (
  <motion.div
    className="relative overflow-hidden backdrop-blur-md bg-black/20 border border-purple-500/20 shadow-lg hover:shadow-purple-500/30 transition-all duration-500 rounded-3xl p-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="absolute -top-6 -left-6 text-8xl opacity-10 text-accent font-serif">❝</div>
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
    <p className="text-secondary mb-8 italic text-lg leading-relaxed relative z-10 font-light">{quote}</p>
    <div className="flex items-center">
      <div className="w-12 h-12 rounded-full bg-accent/20 mr-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-purple-400/10" />
        <div className="absolute inset-0 blur-sm bg-gradient-to-r from-accent/20 to-transparent opacity-50" />
      </div>
      <div className="relative">
        <p className="font-bold neon-text text-lg font-display">{author}</p>
        <div className="absolute -inset-x-3 top-1/2 transform -translate-y-1/2 -z-10 h-10 blur-xl opacity-20 bg-gradient-to-r from-accent to-violet-400 rounded-full" />
        <p className="text-secondary font-light tracking-wide">{company}</p>
      </div>
    </div>
  </motion.div>
);

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  
  useEffect(() => {
    // Handle scroll progress and active section
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const currentScrollY = window.scrollY;
      const progress = currentScrollY / totalHeight;
      setScrollProgress(progress);
      
      // Determine active section based on scroll position
      const sections = ['hero', 'about', 'services', 'testimonials', 'cta'];
      const sectionElements = sections.map(id => document.getElementById(id));
      const viewportHeight = window.innerHeight;
      const viewportMiddle = currentScrollY + viewportHeight / 2;
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section) {
          const sectionTop = section.offsetTop;
          if (viewportMiddle >= sectionTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize scroll reveal animations (now one-sided and lightweight)
    const { cleanup } = initScrollReveal();
    // Parallax and tilt logic (unchanged)
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(element => {
      if (element.classList.contains('parallax-scroll')) {
        const speed = element.getAttribute('data-speed') || 0.5;
        element.style.setProperty('--parallax-factor', `${speed * 100}px`);
      }
      if (element.classList.contains('tilt-on-scroll')) {
        const tiltX = element.getAttribute('data-tilt-x') || 10;
        const tiltY = element.getAttribute('data-tilt-y') || 5;
        element.style.setProperty('--tilt-factor-x', `${tiltX}deg`);
        element.style.setProperty('--tilt-factor-y', `${tiltY}deg`);
      }
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cleanup();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden">
      {/* Global background gradients and glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Main dark background */}
        <div className="absolute inset-0 bg-black" />
        
        {/* Single, properly blended glowing effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(123,31,162,0.15)_0%,rgba(128,0,255,0.1)_25%,rgba(76,29,149,0.05)_50%,rgba(0,0,0,0)_100%)] blur-2xl"></div>
        </div>
        
        {/* Remove all solid oval shapes */}
        {/* <div className="absolute left-1/4 top-1/4 w-1/2 h-1/2 rounded-full bg-purple-500/10 blur-4xl" /> */}
        {/* <div className="absolute right-1/4 bottom-1/4 w-1/3 h-1/3 rounded-full bg-purple-700/30 blur-2xl" /> */}
        {/* Existing overlays */}
        <div className="absolute inset-0 opacity-30 bg-[url('/noise.png')] mix-blend-overlay" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black to-transparent" />
      </div>
      <Layout>
        <Head>
          <title>Growmint | Premium Web Development Studio</title>
          <meta name="description" content="Luxury web development services that transform digital visions into exceptional online experiences" />
          <link rel="icon" href="/favicon.ico" />
          {/* Google Fonts for premium typography */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
          <style jsx global>{`
            :root {
              --font-display: 'Playfair Display', serif;
              --font-luxury: 'Cormorant', serif;
              --font-body: 'Montserrat', sans-serif;
            }
            html, body {
              font-family: var(--font-body);
              letter-spacing: 0.01em;
            }
            .font-display {
              font-family: var(--font-display);
              letter-spacing: -0.02em;
            }
            .font-luxury {
              font-family: var(--font-luxury);
              letter-spacing: 0.02em;
            }
            .font-body {
              font-family: var(--font-body);
            }
            h1, h2, h3, h4, h5, h6 {
              font-family: var(--font-display);
              letter-spacing: -0.02em;
            }
            .text-glow {
              text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
            }
            .premium-text {
              font-family: var(--font-luxury);
              font-weight: 300;
              letter-spacing: 0.05em;
              text-transform: uppercase;
            }
          `}</style>
        </Head>

        {/* Section navigation dots */}
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center gap-6">
          {/* Vertical line/track */}
          <div className="absolute h-full w-0.5 bg-foreground/10 -z-10 rounded-full" />
          
          {/* Progress line that grows based on scroll position */}
          <div 
            className="absolute top-0 bottom-0 right-1/2 w-0.5 bg-gradient-to-b from-accent/70 via-accent to-accent/70 rounded-full transform translate-x-1/2" 
            style={{ height: `${scrollProgress * 100}%` }}
          />
          
          {/* Accent border line */}
          <div className="absolute h-full w-0.5 border-r border-accent/30 -z-10 rounded-full right-1/2 transform translate-x-1/2" />
          
          {['hero', 'about', 'services', 'testimonials', 'cta'].map((section, index) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`w-3 h-3 rounded-none rotate-45 transition-all duration-300 relative group ${
                activeSection === section 
                  ? 'bg-accent scale-125 shadow-lg shadow-accent/30' 
                  : 'bg-foreground/20 border border-accent/40 hover:bg-accent/40'
              }`}
              aria-label={`Navigate to ${section} section`}
            >
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs uppercase tracking-wider text-secondary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap flex items-center">
                {activeSection === section && (
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
                {section === 'hero' ? 'Home' : section.charAt(0).toUpperCase() + section.slice(1)}
              </span>
              <span className={`absolute inset-0 rounded-none rotate-45 animate-pulse ${
                activeSection === section ? 'bg-accent/30' : 'bg-transparent'
              }`}></span>
            </button>
          ))}
        </div>

        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-black">
          <div className="absolute inset-0 z-0">
            {/* Main dark background */}
            <div className="absolute inset-0 bg-black" />
            {/* Subtle purple-pink radial gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#a259ff33] via-transparent to-transparent" />
            {/* Existing overlays */}
            <div className="absolute inset-0 opacity-30 bg-[url('/noise.png')] mix-blend-overlay" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black to-transparent" />
            {/* Decorative curved lines */}
            <div className="absolute inset-0 opacity-20 overflow-hidden">
              {/* Large outer circle */}
              <div className="absolute w-[150%] h-[150%] rounded-full border border-accent/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute w-[120%] h-[120%] rounded-full border border-accent/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute w-[90%] h-[90%] rounded-full border border-accent/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              {/* Line segments - vertical and horizontal */}
              <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent left-1/4"></div>
              <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent right-1/4"></div>
              <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent top-1/3"></div>
              <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent bottom-1/3"></div>
              {/* Accent decorative elements */}
              <div className="absolute w-2 h-2 rounded-full bg-accent/50 top-1/4 left-1/4 blur-sm"></div>
              <div className="absolute w-3 h-3 rounded-full bg-accent/30 bottom-1/3 right-1/5 blur-sm"></div>
              <div className="absolute w-1.5 h-1.5 rounded-full bg-accent/40 top-2/3 right-1/3 blur-sm"></div>
              <div className="absolute w-2 h-2 rounded-full bg-accent/40 top-1/5 right-1/4 blur-sm"></div>
            </div>
          </div>
          
          {/* Spline 3D Component */}
          <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
            <div className="w-full h-full relative">
              <div style={{ 
                position: 'absolute', 
                width: '120%', 
                height: '120%', 
                top: '-10%', 
                left: '-10%', 
                overflow: 'hidden',
                pointerEvents: 'none'
              }}>
                <iframe 
                  src='https://my.spline.design/holoblobs-sVD6y8TJ2zIattfmcYCgfWH3/' 
                  frameBorder='0' 
                  width='100%' 
                  height='100%'
                  title="Spline 3D Scene"
                  style={{ opacity: 0.8 }}
                />
              </div>
            </div>
          </div>
          
          <div className="container mx-auto px-6 md:px-12 relative" style={{ zIndex: 10 }}>
            <div className="relative scroll-reveal scroll-reveal-fade">
              <p className="premium-text text-center text-white/80 mb-4 text-glow">Premium Web Development</p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-6 font-luxury tracking-tight leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-500 drop-shadow-[0_5px_15px_rgba(255,255,255,0.15)]">Digital Experiences</span><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-400 to-accent drop-shadow-[0_5px_15px_rgba(168,85,247,0.3)]">Reimagined</span>
              </h1>
              <div className="absolute -inset-x-10 top-1/2 transform -translate-y-1/2 -z-10 h-full blur-3xl opacity-20 bg-gradient-to-r from-accent to-violet-400 rounded-full" />
            </div>
            
            <p className="text-xl md:text-2xl text-center text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed font-light tracking-wide font-luxury scroll-reveal scroll-reveal-up reveal-delay-100">
              We craft extraordinary digital solutions using cutting-edge technologies and premium design principles.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => scrollToSection('services')}
                className="btn-primary px-10 py-4 rounded-full hover-scale text-lg font-medium tracking-wide w-full md:w-auto flex items-center justify-center scroll-reveal scroll-reveal-left reveal-delay-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Explore Our Services
              </button>
              
              <Link href="/contact" className="px-10 py-4 glass rounded-full hover-scale text-lg font-medium border border-accent/40 hover:border-accent/70 transition-colors tracking-wide flex items-center justify-center relative overflow-hidden group w-full md:w-auto scroll-reveal scroll-reveal-right reveal-delay-200">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                <span className="relative z-10">Start a Project</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="absolute -inset-x-2 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
              </Link>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2" style={{ zIndex: 10 }}>
            <motion.div
              initial={{ y: 0, opacity: 0.5 }}
              animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <button 
                onClick={() => scrollToSection('about')}
                className="flex flex-col items-center text-secondary group"
              >
                <span className="mb-2 text-lg font-light tracking-wider uppercase text-xs">Discover</span>
                <svg className="w-8 h-8 group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 relative">
          <div className="absolute inset-0 bg-black" />
          
          {/* Matching subtle purple glow background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(123,31,162,0.15)_0%,rgba(128,0,255,0.1)_25%,rgba(76,29,149,0.05)_50%,rgba(0,0,0,0)_100%)] blur-2xl"></div>
          </div>
          
          <div className="absolute inset-0 opacity-5 bg-[url('/grid.svg')]" />
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
          
          {/* Decorative curved lines for About section */}
          <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
            {/* Partial circles on edges */}
            <div className="absolute w-[70%] h-[140%] rounded-full border border-accent/20 -top-1/4 -right-1/4"></div>
            <div className="absolute w-[50%] h-[100%] rounded-full border border-accent/15 -bottom-1/4 -left-1/4"></div>
            
            {/* Diagonal line */}
            <div className="absolute h-[200%] w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent top-0 left-1/3 rotate-[30deg] origin-top"></div>
            
            {/* Small decorative dots */}
            <div className="absolute w-1.5 h-1.5 rounded-full bg-accent/40 top-1/4 right-1/4 blur-sm"></div>
            <div className="absolute w-2 h-2 rounded-full bg-accent/30 bottom-1/4 left-1/3 blur-sm"></div>
          </div>
          
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative">
            <div className="relative scroll-reveal scroll-reveal-left">
              <p className="premium-text text-accent mb-4 tracking-widest">Our Mission</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-glow font-display tracking-tight leading-tight">Crafting Digital Experiences That Stand Out</h2>
              <div className="h-1 w-32 bg-gradient-to-r from-accent to-purple-400 mb-8" />
              <p className="text-white/90 mb-6 text-lg leading-relaxed font-light">
                At Growmint, we blend technical expertise with innovative design thinking to deliver premium web solutions that exceed expectations. Our team of elite developers and designers create websites that not only look exceptional but perform flawlessly.
              </p>
              <p className="text-white/90 mb-10 text-lg leading-relaxed font-light">
                We remain at the forefront of web technology, utilizing advanced tools like React, Three.js, and Framer Motion to create immersive, interactive experiences that captivate users and drive measurable results.
              </p>
              <Link href="/about" className="inline-flex items-center text-accent text-glow text-lg group tracking-wide font-luxury">
                Our approach
                <svg className="ml-2 group-hover:ml-4 transition-all duration-300" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-8 relative">
              {/* Add background glow behind the entire cards section */}
              <div className="absolute -inset-10 bg-gradient-to-tr from-accent/10 via-purple-500/5 to-transparent blur-3xl opacity-30 rounded-full" />
              
              {/* Years Experience Card */}
              <motion.div 
                className="relative overflow-hidden bg-gradient-to-br from-[#1a1721]/90 to-[#0e0b12]/90 backdrop-blur-md rounded-2xl p-6 scroll-reveal scroll-reveal-up reveal-delay-100 border border-[#2a2536]/50"
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 20px 40px rgba(168, 85, 247, 0.15)",
                  transition: { duration: 0.3 }
                }}
              >
                {/* Glow effect */}
                <div className="absolute top-0 left-0 w-3/4 h-1/4 bg-[radial-gradient(ellipse_at_center,rgba(156,60,183,0.15)_0%,transparent_70%)]" />
                <div className="absolute -bottom-4 -right-4 w-3/4 h-3/4 bg-[radial-gradient(ellipse_at_center,rgba(156,60,183,0.1)_0%,transparent_70%)]" />
                {/* Glass effect */}
                <div className="absolute inset-0 bg-white/5 opacity-10" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center mb-3">
                    <div className="text-purple-500 mr-3">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-white/70 text-sm font-medium uppercase tracking-wider">Years Experience</p>
                  </div>
                  
                  <div className="flex-grow flex items-center justify-center">
                    <div className="text-7xl font-bold text-white font-display drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                      5<span className="text-purple-500">+</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Projects Completed Card */}
              <motion.div 
                className="relative overflow-hidden bg-gradient-to-br from-[#1a1721]/90 to-[#0e0b12]/90 backdrop-blur-md rounded-2xl p-6 scroll-reveal scroll-reveal-up reveal-delay-200 border border-[#2a2536]/50"
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 20px 40px rgba(168, 85, 247, 0.15)",
                  transition: { duration: 0.3 }
                }}
              >
                {/* Glow effect */}
                <div className="absolute top-0 right-0 w-3/4 h-1/4 bg-[radial-gradient(ellipse_at_center,rgba(156,60,183,0.15)_0%,transparent_70%)]" />
                <div className="absolute -bottom-4 -left-4 w-3/4 h-3/4 bg-[radial-gradient(ellipse_at_center,rgba(156,60,183,0.1)_0%,transparent_70%)]" />
                {/* Glass effect */}
                <div className="absolute inset-0 bg-white/5 opacity-10" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center mb-3">
                    <div className="text-purple-500 mr-3">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                    <p className="text-white/70 text-sm font-medium uppercase tracking-wider">Projects Completed</p>
                  </div>
                  
                  <div className="flex-grow flex items-center justify-center">
                    <div className="text-7xl font-bold text-white font-display drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                      100<span className="text-purple-500">+</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Happy Clients Card */}
              <motion.div 
                className="relative overflow-hidden bg-gradient-to-br from-[#1a1721]/90 to-[#0e0b12]/90 backdrop-blur-md rounded-2xl p-6 scroll-reveal scroll-reveal-up reveal-delay-300 border border-[#2a2536]/50"
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 20px 40px rgba(168, 85, 247, 0.15)",
                  transition: { duration: 0.3 }
                }}
              >
                {/* Glow effect */}
                <div className="absolute top-0 left-0 w-3/4 h-1/4 bg-[radial-gradient(ellipse_at_center,rgba(156,60,183,0.15)_0%,transparent_70%)]" />
                <div className="absolute -bottom-4 -right-4 w-3/4 h-3/4 bg-[radial-gradient(ellipse_at_center,rgba(156,60,183,0.1)_0%,transparent_70%)]" />
                {/* Glass effect */}
                <div className="absolute inset-0 bg-white/5 opacity-10" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center mb-3">
                    <div className="text-purple-500 mr-3">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-white/70 text-sm font-medium uppercase tracking-wider">Happy Clients</p>
                  </div>
                  
                  <div className="flex-grow flex items-center justify-center">
                    <div className="text-7xl font-bold text-white font-display drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                      50<span className="text-purple-500">+</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Premium Support Card */}
              <motion.div 
                className="relative overflow-hidden bg-gradient-to-br from-[#1a1721]/90 to-[#0e0b12]/90 backdrop-blur-md rounded-2xl p-6 scroll-reveal scroll-reveal-up reveal-delay-400 border border-[#2a2536]/50"
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 20px 40px rgba(168, 85, 247, 0.15)",
                  transition: { duration: 0.3 }
                }}
              >
                {/* Glow effect */}
                <div className="absolute top-0 right-0 w-3/4 h-1/4 bg-[radial-gradient(ellipse_at_center,rgba(156,60,183,0.15)_0%,transparent_70%)]" />
                <div className="absolute -bottom-4 -left-4 w-3/4 h-3/4 bg-[radial-gradient(ellipse_at_center,rgba(156,60,183,0.1)_0%,transparent_70%)]" />
                {/* Glass effect */}
                <div className="absolute inset-0 bg-white/5 opacity-10" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center mb-3">
                    <div className="text-purple-500 mr-3">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-white/70 text-sm font-medium uppercase tracking-wider">Premium Support</p>
                  </div>
                  
                  <div className="flex-grow flex items-center justify-center">
                    <div className="text-7xl font-bold text-white font-display drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                      24<span className="text-purple-500">/7</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-32 relative">
          <div className="absolute inset-0 bg-black" />
          
          {/* Matching subtle purple glow background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(123,31,162,0.15)_0%,rgba(128,0,255,0.1)_25%,rgba(76,29,149,0.05)_50%,rgba(0,0,0,0)_100%)] blur-2xl"></div>
          </div>
          
          <div className="absolute inset-0 opacity-5 bg-[url('/grid.svg')]" />
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
          
          {/* Decorative curved lines for Services section */}
          <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
            {/* Curved line at bottom */}
            <div className="absolute w-[120%] h-[60%] rounded-full border border-accent/15 top-[90%] left-1/2 -translate-x-1/2"></div>
            
            {/* Vertical lines */}
            <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-accent/15 to-transparent left-[15%]"></div>
            <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-accent/15 to-transparent right-[15%]"></div>
            
            {/* Small decorative elements */}
            <div className="absolute w-3 h-3 rounded-full bg-accent/20 top-[15%] right-[25%] blur-sm"></div>
            <div className="absolute w-4 h-4 rounded-full bg-accent/10 bottom-[30%] left-[20%] blur-sm"></div>
            <div className="absolute w-2 h-2 rounded-full bg-accent/30 top-[40%] left-[10%] blur-sm"></div>
          </div>
          
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="text-center mb-20 scroll-reveal scroll-reveal-fade">
              <p className="premium-text text-accent mb-4 tracking-widest">What we offer</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow font-display tracking-tight leading-tight">Our Premium Services</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-accent to-purple-400 mx-auto mb-10" />
              <p className="text-white/90 max-w-3xl mx-auto text-lg font-light tracking-wide">
                We provide comprehensive web development services tailored to elevate your brand in the digital landscape.
              </p>
            </div>
            
            {/* Bentobox grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6 relative">
              {/* Subtle glow background */}
              <div className="absolute -inset-10 pointer-events-none bg-gradient-to-br from-accent/10 via-transparent to-transparent blur-3xl opacity-20"></div>
              
              {/* Featured Service - Web Development - Spans 2 columns */}
              <div className="md:col-span-2 lg:col-span-2 md:row-span-2 relative group scroll-reveal scroll-reveal-up">
                <motion.div 
                  className="relative overflow-hidden group backdrop-blur-md bg-black/20 border border-purple-500/20 shadow-lg hover:shadow-purple-500/30 transition-all duration-500 rounded-3xl p-8 h-full"
                  whileHover={{ y: -5, scale: 1.01 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
                  
                  <div className="flex items-start gap-6 mb-6 relative z-10">
                    <div className="text-accent text-6xl relative p-4 rounded-2xl bg-background/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold mb-4 neon-text font-display tracking-tight">Web Development</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-accent to-purple-400 rounded-full mb-4"></div>
                    </div>
                  </div>
                  <p className="text-secondary text-lg font-light leading-relaxed mb-8">
                    Custom websites crafted with cutting-edge technologies, focused on performance, responsiveness, and exceptional user experience. 
                    Our development process ensures your site not only looks stunning but also delivers optimal functionality.
                  </p>
                  <div className="mt-auto flex flex-wrap gap-3">
                    <span className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-full">React</span>
                    <span className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-full">Next.js</span>
                    <span className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-full">Vue</span>
                    <span className="px-3 py-1 text-xs bg-accent/10 text-accent rounded-full">TailwindCSS</span>
                  </div>
                </motion.div>
              </div>
              
              {/* UI/UX Design */}
              <div className="relative group scroll-reveal scroll-reveal-right reveal-delay-100">
                <motion.div 
                  className="relative overflow-hidden group backdrop-blur-md bg-black/20 border border-purple-500/20 shadow-lg hover:shadow-purple-500/30 transition-all duration-500 rounded-3xl p-6 h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
                  
                  <div className="text-accent mb-6 text-5xl relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  </div>
                  <div className="relative">
                    <h3 className="text-xl font-bold mb-3 neon-text font-display tracking-tight">UI/UX Design</h3>
                  </div>
                  <p className="text-secondary text-sm font-light leading-relaxed">
                    Intuitive, beautiful interfaces designed to engage users and provide seamless experiences across all devices.
                  </p>
                </motion.div>
              </div>
              
              {/* 3D Web Experiences */}
              <div className="relative group scroll-reveal scroll-reveal-right reveal-delay-200">
                <motion.div 
                  className="relative overflow-hidden group backdrop-blur-md bg-black/20 border border-purple-500/20 shadow-lg hover:shadow-purple-500/30 transition-all duration-500 rounded-3xl p-6 h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
                  
                  <div className="text-accent mb-6 text-5xl relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                  </div>
                  <div className="relative">
                    <h3 className="text-xl font-bold mb-3 neon-text font-display tracking-tight">3D Web Experiences</h3>
                  </div>
                  <p className="text-secondary text-sm font-light leading-relaxed">
                    Immersive 3D elements and animations that make your website stand out and create memorable user experiences.
                  </p>
                </motion.div>
              </div>
              
              {/* E-commerce Solutions */}
              <div className="lg:col-span-2 relative group scroll-reveal scroll-reveal-left reveal-delay-100">
                <motion.div 
                  className="relative overflow-hidden group backdrop-blur-md bg-black/20 border border-purple-500/20 shadow-lg hover:shadow-purple-500/30 transition-all duration-500 rounded-3xl p-6 h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
                  
                  <div className="flex items-start gap-4">
                    <div className="text-accent mb-6 text-5xl relative">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="relative">
                        <h3 className="text-xl font-bold mb-3 neon-text font-display tracking-tight">E-commerce Solutions</h3>
                      </div>
                      <p className="text-secondary text-sm font-light leading-relaxed">
                        Secure, scalable online stores with seamless payment integration, inventory management, and detailed customer analytics.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Performance Optimization */}
              <div className="md:col-span-1 relative group scroll-reveal scroll-reveal-left reveal-delay-200">
                <motion.div 
                  className="relative overflow-hidden group backdrop-blur-md bg-black/20 border border-purple-500/20 shadow-lg hover:shadow-purple-500/30 transition-all duration-500 rounded-3xl p-6 h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
                  
                  <div className="flex items-start gap-4">
                    <div className="text-accent mb-6 text-5xl relative">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="relative">
                        <h3 className="text-xl font-bold mb-3 neon-text font-display tracking-tight">Performance Optimization</h3>
                      </div>
                      <p className="text-secondary text-sm font-light leading-relaxed">
                        Speed up your existing website with expert optimization techniques for better user experience and SEO rankings.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Web Applications */}
              <div className="md:col-span-2 relative group scroll-reveal scroll-reveal-up reveal-delay-300">
                <motion.div 
                  className="relative overflow-hidden group backdrop-blur-md bg-black/20 border border-purple-500/20 shadow-lg hover:shadow-purple-500/30 transition-all duration-500 rounded-3xl p-6 h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
                  
                  <div className="flex items-start gap-4">
                    <div className="text-accent mb-6 text-5xl relative">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="relative">
                        <h3 className="text-xl font-bold mb-3 neon-text font-display tracking-tight">Web Applications</h3>
                      </div>
                      <p className="text-secondary text-sm font-light leading-relaxed">
                        Custom web applications that solve complex business problems and optimize workflows with elegant user interfaces.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            
            <div className="text-center mt-16 scroll-reveal scroll-reveal-fade reveal-delay-400">
              <Link href="/services" className="inline-flex items-center text-accent hover-scale text-lg group tracking-wide">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                View all our services
                <svg className="ml-2 group-hover:ml-4 transition-all duration-300" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-32 relative">
          <div className="absolute inset-0 bg-black" />
          
          {/* Matching subtle purple glow background - same as services section */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(123,31,162,0.15)_0%,rgba(128,0,255,0.1)_25%,rgba(76,29,149,0.05)_50%,rgba(0,0,0,0)_100%)] blur-2xl"></div>
          </div>
          
          <div className="absolute inset-0 opacity-5 bg-[url('/grid.svg')]" />
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
          
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="text-center mb-20">
              <FadeIn>
                <p className="premium-text text-accent mb-4 tracking-widest">Testimonials</p>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow font-display tracking-tight leading-tight">Client Success Stories</h2>
                <div className="h-1 w-24 bg-gradient-to-r from-accent to-purple-400 mx-auto mb-10" />
                <p className="text-white/90 max-w-3xl mx-auto text-lg font-light tracking-wide">
                  The experiences of our clients speak volumes about our dedication to excellence and results.
                </p>
              </FadeIn>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative">
              {/* Add background glow behind the entire testimonial cards */}
              <div className="absolute -inset-10 bg-gradient-to-tl from-accent/10 via-purple-500/5 to-transparent blur-3xl opacity-30 rounded-full" />
              <div className="absolute top-1/3 right-1/4 w-1/2 h-1/2 bg-gradient-to-bl from-accent/5 to-purple-500/10 blur-3xl opacity-20 rounded-full" />
              
              <Testimonial 
                quote="Growmint transformed our outdated website into a modern, responsive platform that our customers love. The 3D elements they added truly set our brand apart in a competitive market."
                author="Sarah Johnson"
                company="TechStart Inc."
                delay={0.1}
              />
              
              <Testimonial 
                quote="Working with the Growmint team was exceptional from concept to launch. They understood our vision immediately and delivered a website that exceeded all our expectations."
                author="Michael Chen"
                company="Innovate Solutions"
                delay={0.2}
              />
              
              <Testimonial 
                quote="The e-commerce site Growmint built for us increased our online sales by 200% in the first quarter. Their attention to detail and focus on user experience made all the difference."
                author="Emily Rodriguez"
                company="Artisan Crafts Co."
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="py-32 relative">
          <div className="absolute inset-0 bg-black" />
          
          {/* Matching subtle purple glow background - same as services section */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(123,31,162,0.15)_0%,rgba(128,0,255,0.1)_25%,rgba(76,29,149,0.05)_50%,rgba(0,0,0,0)_100%)] blur-2xl"></div>
          </div>
          
          <div className="absolute inset-0 opacity-5 bg-[url('/grid.svg')]" />
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
          
          <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
            <ScaleIn>
              <div className="max-w-4xl mx-auto backdrop-blur-md bg-black/20 border border-purple-500/20 shadow-lg hover:shadow-purple-500/30 transition-all duration-500 rounded-3xl p-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
                
                {/* Small decorative elements */}
                <div className="absolute w-2 h-2 rounded-full bg-accent/50 top-1/4 left-1/4 blur-sm"></div>
                <div className="absolute w-3 h-3 rounded-full bg-accent/30 bottom-1/3 right-1/5 blur-sm"></div>
                <div className="absolute w-1.5 h-1.5 rounded-full bg-accent/40 top-2/3 right-1/3 blur-sm"></div>
                
                <div className="relative">
                  <p className="premium-text text-accent mb-4 text-center tracking-widest">Ready to collaborate</p>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow font-display tracking-tight leading-tight text-center">Elevate your digital presence</h2>
                  <div className="absolute -inset-x-20 top-1/2 transform -translate-y-1/2 -z-10 h-32 blur-3xl opacity-20 bg-gradient-to-r from-accent to-violet-400 rounded-full" />
                </div>
                <p className="text-white/90 max-w-2xl mx-auto mb-10 text-lg leading-relaxed font-light tracking-wide text-center font-luxury">
                  Let's collaborate to create a premium website that captures your brand's essence and engages your audience in meaningful ways.
                </p>
                
                <div className="text-center">
                  <Link href="/contact" className="bg-gradient-to-r from-accent to-purple-600 text-white px-10 py-4 rounded-full text-lg font-medium inline-flex items-center tracking-wide transition-all duration-150 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Begin Your Journey
                  </Link>
                </div>
              </div>
            </ScaleIn>
          </div>
        </section>
      </Layout>
    </div>
  );
}
