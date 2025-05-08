import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import { FadeIn, SlideIn, ScaleIn, Stagger, StaggerItem } from '@/components/animations';
import { scrollToSection } from '@/utils/scroll';
import { initScrollReveal } from '@/utils/scrollReveal';
import SpotlightCard from '@/components/Reactbits/SpotlightCard/SpotlightCard';
import TiltedCard from '@/components/Reactbits/TiltedCard/TiltedCard';
// Dynamically import the 3D scene to avoid SSR issues
// Commented out for now
// const Scene3D = dynamic(() => import('@/components/Scene3D'), { ssr: false });


// Testimonial component with premium styling
const Testimonial = ({ quote, author, company, delay = 0 }) => (
  <motion.div
    className="relative overflow-hidden backdrop-blur-md bg-black/20 border border-purple-500/20 shadow-lg hover:shadow-purple-500/30 transition-all duration-500 rounded-3xl p-8"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.4, delay }}
    whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(168, 85, 247, 0.2)" }}
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
      // Use requestAnimationFrame for smoother performance
      requestAnimationFrame(() => {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const currentScrollY = window.scrollY;
        const progress = currentScrollY / totalHeight;
        setScrollProgress(progress);
        
        // Determine active section based on scroll position
        const sections = ['hero', 'about', 'services', 'testimonials', 'cta'];
        const sectionElements = sections.map(id => document.getElementById(id));
        const viewportHeight = window.innerHeight;
        const viewportMiddle = currentScrollY + viewportHeight / 2;
        
        // Find active section with improved efficiency
        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const section = sectionElements[i];
          if (section && viewportMiddle >= section.offsetTop) {
            if (activeSection !== sections[i]) {
              setActiveSection(sections[i]);
            }
            break;
          }
        }
      });
    };
    
    // Throttle scroll events for better performance
    let scrollTimeout;
    const throttledScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          handleScroll();
          scrollTimeout = null;
        }, 10); // Small timeout to limit executions
      }
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initialize scroll reveal animations (now one-sided and lightweight)
    const { cleanup } = initScrollReveal();
    
    // Parallax and tilt logic - more efficient with selectors
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if (revealElements.length > 0) {
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
    }
    
    // Initial call to set everything up
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(scrollTimeout);
      cleanup();
    };
  }, [activeSection]); // Only re-run if activeSection changes

  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden">

<SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
  <h1>Content goes here</h1>
</SpotlightCard>
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
        <link href="https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Raleway:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <style jsx global>{`
          :root {
            --font-display: 'Playfair Display', serif;
            --font-luxury: 'Cormorant', serif;
            --font-body: 'Montserrat', sans-serif;
            --font-modern: 'Raleway', sans-serif;
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
          .font-modern {
            font-family: var(--font-modern);
            letter-spacing: 0.03em;
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
          @keyframes shimmer {
            0%, 100% {
              background-position: -100% 0, 200% 0;
            }
            50% {
              background-position: 200% 0, -100% 0;
            }
          }
          .shimmer-effect {
            background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent);
            background-size: 200% 100%;
            animation: shimmer 4s ease-in-out infinite;
          }
          @keyframes pulsate {
            0%, 100% {
              opacity: 0.4;
              transform: scale(1);
            }
            50% {
              opacity: 0.7;
              transform: scale(1.03);
            }
          }
          .pulsate {
            animation: pulsate 4s ease-in-out infinite;
            will-change: opacity, transform;
          }
          /* Hardware acceleration for animations */
          .animate-gpu {
            transform: translateZ(0);
            backface-visibility: hidden;
            perspective: 1000px;
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

      {/* Hero Section - Updated with futuristic design */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-10 bg-black">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          {/* Deep blue to purple gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#3B0764]" />
          
          {/* Animated orbital elements - purely CSS for better performance */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute w-[60vw] h-[60vw] border border-indigo-500/10 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            <div className="absolute w-[80vw] h-[80vw] border border-violet-500/10 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping animate-gpu" style={{animationDuration: '10s'}}></div>
            <div className="absolute w-[30vw] h-[30vw] border border-blue-400/20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDuration: '4s'}}></div>
          </div>
          
          {/* Blurred abstract shapes */}
          <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vh] bg-gradient-to-br from-blue-600/20 via-indigo-500/10 to-violet-800/20 rounded-full blur-[120px] animate-gpu animate-float" style={{animationDuration: '20s'}}></div>
          <div className="absolute bottom-1/3 left-1/4 w-[30vw] h-[30vh] bg-gradient-to-tr from-violet-600/20 via-purple-500/10 to-fuchsia-500/20 rounded-full blur-[100px] animate-gpu animate-float-delay" style={{animationDuration: '25s'}}></div>
          
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-5 bg-[url('/grid.svg')]" />
          
          {/* Gradient overlays for better text contrast */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative" style={{ zIndex: 10 }}>
          <div className="relative scroll-reveal scroll-reveal-fade flex flex-col md:flex-row items-center justify-between w-full gap-12">
            {/* Left side - Text content */}
            <div className="flex-1 text-left">
              <motion.p 
                className="mb-8 text-[#E2E8F0]/80 font-medium tracking-widest uppercase text-sm"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
              >
                Future of Web Development
              </motion.p>
              
              <motion.div 
                className="relative w-full flex justify-start items-center overflow-hidden"
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.7, delay: 0.1}}
              >
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 font-display tracking-tight leading-none">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E2E8F0] to-[#94A3B8] inline-block mr-4">GROW</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] via-[#C084FC] to-[#E879F9] inline-block animate-pulse" style={{animationDuration: '4s'}}>MINT</span>
                </h1>
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/0 via-purple-500/20 to-pink-500/0 blur-xl opacity-30 animate-pulse" style={{animationDuration: '5s'}}></div>
              </motion.div>
              
              <motion.p 
                className="text-xl md:text-2xl text-[#E2E8F0]/90 max-w-2xl mb-12 leading-relaxed font-light tracking-wide"
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.7, delay: 0.2}}
              >
                Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] font-medium">digital experiences</span> that transcend expectations with <span className="relative italic after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px after:bg-gradient-to-r after:from-transparent after:via-indigo-400/50 after:to-transparent">precision design</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] to-[#F0ABFC]">cutting-edge</span> technology.
              </motion.p>
              
              <motion.div 
                className="flex flex-col md:flex-row gap-6 justify-start items-center mt-12"
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.7, delay: 0.3}}
              >
                <button 
                  onClick={() => scrollToSection('services')}
                  className="relative px-8 py-4 rounded-full overflow-hidden group animate-gpu"
                >
                  {/* Button background with gradient border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-md opacity-50 group-hover:opacity-70 transition-opacity duration-300 rounded-full"></div>
                  
                  {/* Inner content with better contrast */}
                  <div className="relative flex items-center justify-center text-white font-medium z-10">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Explore Our Services
                  </div>
                </button>
                
                <Link 
                  href="/contact" 
                  className="relative px-8 py-4 rounded-full overflow-hidden group animate-gpu"
                >
                  {/* Button background with gradient border */}
                  <div className="absolute inset-0 bg-transparent border border-indigo-500/50 group-hover:border-indigo-500/90 transition-all duration-300 rounded-full"></div>
                  
                  {/* Glass effect */}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full backdrop-blur-sm"></div>
                  
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/20 blur-md transition-all duration-300 rounded-full"></div>
                  
                  {/* Inner content with better contrast */}
                  <div className="relative flex items-center justify-center text-[#E2E8F0] z-10">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                    <span>Start a Project</span>
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Right side - Glassmorphism cards */}
            <motion.div 
              className="flex-1 relative min-h-[340px]"
              initial={{opacity: 0, scale: 0.95}}
              animate={{opacity: 1, scale: 1}}
              transition={{duration: 0.7, delay: 0.4}}
            >
              {/* Glow behind cards */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[440px] h-[240px] bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(123,31,162,0.25)_0%,rgba(128,0,255,0.10)_60%,rgba(76,29,149,0.05)_90%,rgba(0,0,0,0)_100%)] blur-2xl opacity-80 z-0"></div>
              
              <div className="absolute right-0 top-[60%] -translate-y-1/2 flex flex-row items-end gap-1 z-10 pr-1">
                {/* Analytics Card */}
                <motion.div 
                  className="w-40 md:w-48 h-52 md:h-56 rounded-xl rotate-3 z-20 relative"
                  whileHover={{y: -10, rotateZ: 0}}
                  transition={{type: "spring", stiffness: 300, damping: 20}}
                >
                  {/* Glass card with border glow */}
                  <div className="absolute inset-[1px] bg-gradient-to-br from-[#0F172A]/80 to-[#1E293B]/95 rounded-xl backdrop-blur-xl z-10">
                    {/* Background image with overlay */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                      {/* <img 
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                        alt="Analytics Dashboard" 
                        className="w-full h-full object-cover"
                      /> */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/80 to-[#1E293B]/95 backdrop-blur-sm"></div>
                    </div>
                    
                    {/* Card content */}
                    <div className="h-full w-full p-4 flex flex-col justify-between relative z-10">
                      {/* Card header */}
                      <div className="flex justify-between items-center">
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-1.5">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <span className="text-[10px] text-indigo-300/80">LIVE</span>
                      </div>
                      
                      {/* Card title */}
                      <h3 className="text-sm font-medium text-[#E2E8F0] mt-2">Analytics Dashboard</h3>
                      
                      {/* Metrics */}
                      <div className="space-y-3 mt-auto">
                        <div>
                          <div className="flex justify-between text-xs">
                            <span className="text-[#94A3B8]">Engagement</span>
                            <span className="text-indigo-400">+32%</span>
                          </div>
                          <div className="w-full h-1 bg-[#1E293B] rounded-full mt-1">
                            <div className="h-full w-[65%] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-xs">
                            <span className="text-[#94A3B8]">Conversion</span>
                            <span className="text-indigo-400">18.2%</span>
                          </div>
                          <div className="w-full h-1 bg-[#1E293B] rounded-full mt-1">
                            <div className="h-full w-[45%] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Animated border gradient */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-[2px] opacity-70"></div>
                </motion.div>
                
                {/* Main stats card */}
                <motion.div 
                  className="w-56 md:w-64 h-64 md:h-72 rounded-xl z-30 relative"
                  whileHover={{y: -10}}
                  transition={{type: "spring", stiffness: 300, damping: 20}}
                >
                  {/* Glass card with border glow */}
                  <div className="absolute inset-[1px] bg-gradient-to-br from-[#0F172A]/80 to-[#1E293B]/95 rounded-xl backdrop-blur-xl z-10">
                    {/* Background image with overlay */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                      {/* <img 
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80" 
                        alt="Dashboard Statistics" 
                        className="w-full h-full object-cover"
                      /> */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/80 to-[#1E293B]/95 backdrop-blur-sm"></div>
                    </div>
                    
                    {/* Card content */}
                    <div className="h-full w-full p-5 flex flex-col relative z-10">
                      {/* Card header */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-md p-1.5">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-[#E2E8F0]">Growmint Stats</span>
                        </div>
                        <div className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse mr-1"></span>
                          <span className="text-[10px] text-[#94A3B8]">LIVE</span>
                        </div>
                      </div>
                      
                      {/* Chart visualization */}
                      <div className="mt-6 h-[110px] relative">
                        {/* Line chart with SVG */}
                        <svg className="w-full h-full" viewBox="0 0 240 110" fill="none">
                          {/* Grid lines */}
                          <line x1="0" y1="110" x2="240" y2="110" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                          <line x1="0" y1="82.5" x2="240" y2="82.5" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                          <line x1="0" y1="55" x2="240" y2="55" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                          <line x1="0" y1="27.5" x2="240" y2="27.5" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                          
                          {/* Animated gradient path for better performance than animated JS */}
                          <path 
                            d="M0 80 C20 85 40 25 60 40 C80 55 100 85 120 70 C140 55 160 20 180 35 C200 50 220 65 240 55" 
                            stroke="url(#lineGradient)" 
                            strokeWidth="3" 
                            fill="none" 
                            strokeLinecap="round"
                            className="animate-dash"
                          />
                          
                          {/* Area fill under the line */}
                          <path 
                            d="M0 80 C20 85 40 25 60 40 C80 55 100 85 120 70 C140 55 160 20 180 35 C200 50 220 65 240 55 L240 110 L0 110 Z" 
                            fill="url(#areaGradient)" 
                            opacity="0.2"
                          />
                          
                          {/* Gradient definitions */}
                          <defs>
                            <linearGradient id="lineGradient" x1="0" y1="0" x2="240" y2="0" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="#818CF8" />
                              <stop offset="50%" stopColor="#C084FC" />
                              <stop offset="100%" stopColor="#F472B6" />
                            </linearGradient>
                            
                            <linearGradient id="areaGradient" x1="120" y1="0" x2="120" y2="110" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="#C084FC" stopOpacity="0.7" />
                              <stop offset="100%" stopColor="#C084FC" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                        </svg>
                        
                        {/* Animate dot on the line */}
                        <div className="absolute top-[35px] left-[180px] w-3 h-3 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50 animate-pulse"></div>
                      </div>
                      
                      {/* Stats grid */}
                      <div className="grid grid-cols-2 gap-3 mt-6">
                        <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/20 rounded-lg p-3 border border-indigo-700/20">
                          <div className="text-lg font-semibold text-[#E2E8F0]">2.4k</div>
                          <div className="text-xs text-[#94A3B8]">Active users</div>
                        </div>
                        <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/20 rounded-lg p-3 border border-indigo-700/20">
                          <div className="text-lg font-semibold text-[#E2E8F0]">+28%</div>
                          <div className="text-xs text-[#94A3B8]">Growth rate</div>
                        </div>
                      </div>
                      
                      {/* Status bar */}
                      <div className="flex justify-between items-center text-xs mt-auto pt-3 border-t border-indigo-800/20">
                      </div>
                    </div>
                  </div>
                  
                  {/* Animated border gradient */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-[2px] opacity-70"></div>
                </motion.div>
                
                {/* Network Card */}
                <motion.div 
                  className="w-40 md:w-48 h-52 md:h-56 rounded-xl -rotate-3 z-20 relative"
                  whileHover={{y: -10, rotateZ: 0}}
                  transition={{type: "spring", stiffness: 300, damping: 20}}
                >
                  {/* Glass card with border glow */}
                  <div className="absolute inset-[1px] bg-gradient-to-br from-[#0F172A]/80 to-[#1E293B]/95 rounded-xl backdrop-blur-xl z-10">
                    {/* Background image with overlay */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                      {/* <img 
                        src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                        alt="Network Statistics" 
                        className="w-full h-full object-cover"
                      /> */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/80 to-[#1E293B]/95 backdrop-blur-sm"></div>
                    </div>
                    
                    {/* Card content */}
                    <div className="h-full w-full p-4 flex flex-col justify-between relative z-10">
                      {/* Card header */}
                      <div className="flex justify-between items-center">
                        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg p-1.5">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </div>
                        <span className="text-[10px] text-indigo-300/80">NETWORK</span>
                      </div>
                      
                      {/* Card title */}
                      <h3 className="text-sm font-medium text-[#E2E8F0] mt-2">Partner Network</h3>
                      
                      {/* Network stats */}
                      <div className="space-y-3 mt-auto">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#94A3B8]">Partners</span>
                          <span className="text-pink-400">48</span>
                        </div>
                        
                        <div className="flex justify-between text-xs">
                          <span className="text-[#94A3B8]">Countries</span>
                          <span className="text-pink-400">16</span>
                        </div>
                        
                        <div className="flex justify-between text-xs">
                          <span className="text-[#94A3B8]">Growth</span>
                          <span className="text-pink-400">+42%</span>
                        </div>
                        
                        <div className="w-full h-1 bg-[#1E293B] rounded-full mt-1">
                          <div className="h-full w-[75%] bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Animated border gradient */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 blur-[2px] opacity-70"></div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll prompt */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          initial={{opacity: 0, y: 10}}
          animate={{opacity: 1, y: [0, 10, 0]}}
          transition={{
            y: {
              repeat: Infinity,
              duration: 2,
              repeatDelay: 0.5,
              ease: "easeInOut"
            },
            opacity: {
              delay: 1.5,
              duration: 1
            }
          }}
        >
          <button 
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center focus:outline-none group"
            aria-label="Scroll to About section"
          >
            <span className="mb-2 text-[#94A3B8] text-sm tracking-wider">Discover</span>
            <div className="w-8 h-12 rounded-full border-2 border-[#94A3B8]/50 flex items-start justify-center p-1.5">
              <motion.div 
                className="w-1 h-2 bg-indigo-400 rounded-full" 
                animate={{y: [0, 6, 0]}}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              />
            </div>
          </button>
        </motion.div>
        
        {/* Add keyframes for floating animation */}
        <style jsx global>{`
          @keyframes dash {
            to {
              stroke-dashoffset: 0;
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0) translateX(0);
            }
            25% {
              transform: translateY(-10px) translateX(10px);
            }
            50% {
              transform: translateY(10px) translateX(-10px);
            }
            75% {
              transform: translateY(5px) translateX(5px);
            }
          }
          
          @keyframes float-delay {
            0%, 100% {
              transform: translateY(0) translateX(0);
            }
            25% {
              transform: translateY(10px) translateX(-10px);
            }
            50% {
              transform: translateY(-10px) translateX(10px);
            }
            75% {
              transform: translateY(-5px) translateX(-5px);
            }
          }
          
          .animate-dash {
            stroke-dasharray: 500;
            stroke-dashoffset: 500;
            animation: dash 4s linear forwards;
          }
          
          .animate-float {
            animation: float 20s ease-in-out infinite;
          }
          
          .animate-float-delay {
            animation: float-delay 25s ease-in-out infinite;
          }
        `}</style>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
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
          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
            <div className="relative p-[2px] bg-gradient-to-tr from-cyan-300 via-purple-400 to-pink-400 rounded-xl rounded-tr-[0.75rem]">
              <motion.div 
                className="relative overflow-hidden bg-gradient-to-br from-[#0e0b12]/95 to-[#1a1721]/95 backdrop-blur-md rounded-xl rounded-tr-[0.75rem] p-4 scroll-reveal scroll-reveal-up reveal-delay-100 border border-transparent shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 0 20px rgba(255,255,255,0.1), 0 0 30px rgba(168, 85, 247, 0.2)",
                  transition: { duration: 0.3 }
                }}
              >
                {/* Enhanced glow effects */}
                <div className="absolute top-0 left-0 w-3/4 h-1/4 bg-[radial-gradient(ellipse_at_center,rgba(156,60,183,0.2)_0%,transparent_70%)]" />
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(156,60,183,0.15)_0%,transparent_70%)]" />
                {/* White border lighting effect */}
                <div className="absolute inset-0 border border-white/10 rounded-xl rounded-tr-[0.75rem] opacity-80" />
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                {/* Glass effect */}
                <div className="absolute inset-0 bg-white/5 opacity-10" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  {/* Top section with icon and label */}
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/30 to-purple-800/20 border border-white/10 flex items-center justify-center mx-auto mb-3 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                      <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                    <p className="text-xs uppercase tracking-[0.2em] text-purple-300/90 font-medium">Experience</p>
                  </div>
                  {/* Bottom section with number and text */}
                  <div className="text-center pb-1">
                    <div className="text-4xl font-bold text-white font-display mb-3 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                      5<span className="text-purple-400">+</span>
                    </div>
                    <p className="text-white text-lg font-light tracking-wide mb-1.5">Years</p>
                    <p className="text-white/40 text-sm font-light">Leading digital innovation</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </SpotlightCard>
          
          {/* Projects Completed Card */}
          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
            <div className="relative p-[2px] bg-gradient-to-tr from-cyan-300 via-purple-400 to-pink-400 rounded-xl rounded-tr-[0.75rem]">
              <motion.div 
                className="relative overflow-hidden bg-gradient-to-br from-[#0e0b12]/95 to-[#1a1721]/95 backdrop-blur-md rounded-xl rounded-tr-[0.75rem] p-4 scroll-reveal scroll-reveal-up reveal-delay-200 border border-transparent shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 0 20px rgba(255,255,255,0.1), 0 0 30px rgba(168, 85, 247, 0.2)",
                  transition: { duration: 0.3 }
                }}
              >
                {/* Enhanced glow effects */}
                <div className="absolute top-0 right-0 w-3/4 h-1/4 bg-[radial-gradient(ellipse_at_center,rgba(156,60,183,0.2)_0%,transparent_70%)]" />
                <div className="absolute -bottom-4 -left-4 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(156,60,183,0.15)_0%,transparent_70%)]" />
                {/* White border lighting effect */}
                <div className="absolute inset-0 border border-white/10 rounded-xl rounded-tr-[0.75rem] opacity-80" />
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                {/* Glass effect */}
                <div className="absolute inset-0 bg-white/5 opacity-10" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  {/* Top section with icon and label */}
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/30 to-purple-800/20 border border-white/10 flex items-center justify-center mx-auto mb-3 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                      <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                    <p className="text-xs uppercase tracking-[0.2em] text-purple-300/90 font-medium">Projects</p>
                  </div>
                  {/* Bottom section with number and text */}
                  <div className="text-center pb-1">
                    <div className="text-4xl font-bold text-white font-display mb-3 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                      100<span className="text-purple-400">+</span>
                    </div>
                    <p className="text-white text-lg font-light tracking-wide mb-1.5">Completed</p>
                    <p className="text-white/40 text-sm font-light">With precision & excellence</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </SpotlightCard>
          
          {/* Happy Clients Card */}
          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
            <div className="relative p-[2px] bg-gradient-to-tr from-cyan-300 via-purple-400 to-pink-400 rounded-xl rounded-tr-[0.75rem]">
              <motion.div 
                className="relative overflow-hidden bg-gradient-to-br from-[#0e0b12]/95 to-[#1a1721]/95 backdrop-blur-md rounded-xl rounded-tr-[0.75rem] p-4 scroll-reveal scroll-reveal-up reveal-delay-300 border border-transparent shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 0 20px rgba(255,255,255,0.1), 0 0 30px rgba(168, 85, 247, 0.2)",
                  transition: { duration: 0.3 }
                }}
              >
                {/* Enhanced glow effects */}
                <div className="absolute top-0 left-0 w-3/4 h-1/4 bg-[radial-gradient(ellipse_at_center,rgba(156,60,183,0.2)_0%,transparent_70%)]" />
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(156,60,183,0.15)_0%,transparent_70%)]" />
                {/* White border lighting effect */}
                <div className="absolute inset-0 border border-white/10 rounded-xl rounded-tr-[0.75rem] opacity-80" />
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                {/* Glass effect */}
                <div className="absolute inset-0 bg-white/5 opacity-10" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  {/* Top section with icon and label */}
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/30 to-purple-800/20 border border-white/10 flex items-center justify-center mx-auto mb-3 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                      <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-xs uppercase tracking-[0.2em] text-purple-300/90 font-medium">Clients</p>
                  </div>
                  {/* Bottom section with number and text */}
                  <div className="text-center pb-1">
                    <div className="text-4xl font-bold text-white font-display mb-3 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                      50<span className="text-purple-400">+</span>
                    </div>
                    <p className="text-white text-lg font-light tracking-wide mb-1.5">Happy</p>
                    <p className="text-white/40 text-sm font-light">Across various industries</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </SpotlightCard>
          
          {/* Premium Support Card */}
          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
            <div className="relative p-[2px] bg-gradient-to-tr from-cyan-300 via-purple-400 to-pink-400 rounded-xl rounded-tr-[0.75rem]">
              <motion.div 
                className="relative overflow-hidden bg-gradient-to-br from-[#0e0b12]/95 to-[#1a1721]/95 backdrop-blur-md rounded-xl rounded-tr-[0.75rem] p-4 scroll-reveal scroll-reveal-up reveal-delay-400 border border-transparent shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 0 20px rgba(255,255,255,0.1), 0 0 30px rgba(168, 85, 247, 0.2)",
                  transition: { duration: 0.3 }
                }}
              >
                {/* Enhanced glow effects */}
                <div className="absolute top-0 right-0 w-3/4 h-1/4 bg-[radial-gradient(ellipse_at_center,rgba(156,60,183,0.2)_0%,transparent_70%)]" />
                <div className="absolute -bottom-4 -left-4 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(156,60,183,0.15)_0%,transparent_70%)]" />
                {/* White border lighting effect */}
                <div className="absolute inset-0 border border-white/10 rounded-xl rounded-tr-[0.75rem] opacity-80" />
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                {/* Glass effect */}
                <div className="absolute inset-0 bg-white/5 opacity-10" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  {/* Top section with icon and label */}
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/30 to-purple-800/20 border border-white/10 flex items-center justify-center mx-auto mb-3 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                      <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-xs uppercase tracking-[0.2em] text-purple-300/90 font-medium">Support</p>
                  </div>
                  {/* Bottom section with number and text */}
                  <div className="text-center pb-1">
                    <div className="text-4xl font-bold text-white font-display mb-3 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                      24<span className="text-purple-400">/7</span>
                    </div>
                    <p className="text-white text-lg font-light tracking-wide mb-1.5">Premium</p>
                    <p className="text-white/40 text-sm font-light">Always at your service</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>

    {/* Services Section */}
    <section id="services" className="py-20 relative">
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
            whileInView={{ y: [20, 0], opacity: [0, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
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
  <section id="testimonials" className="py-20 relative">
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
<section id="cta" className="py-20 relative">
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
      <div className="flex justify-center">
        <TiltedCard
          imageSrc="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          altText="Modern digital workspace"
          captionText="Premium web development"
          containerHeight="400px"
          containerWidth="500px"
          imageHeight="400px"
          imageWidth="500px"
          rotateAmplitude={10}
          scaleOnHover={1.05}
          showMobileWarning={false}
          showTooltip={false}
          displayOverlayContent={true}
          overlayContent={
            <div className="flex flex-col items-start justify-between h-full p-8">
              <h3 className="text-white text-3xl font-bold mb-4">Transform Your Digital Presence</h3>
              <p className="text-white/90 text-lg font-light leading-relaxed mb-6">
                Elevate your brand with cutting-edge web solutions that captivate your audience and drive results. Our expert team brings your vision to life with precision design and innovative technology.
              </p>
              <div className="mt-auto">
                <Link href="/contact" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-accent to-purple-500 shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-110">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          }
        />
      </div>
    </ScaleIn>
  </div>
</section>
    </Layout>
    </div>
  );
}
