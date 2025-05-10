import Head from 'next/head';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Layout from '@/components/Layout';

// Particle background component
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 75; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    init();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
      style={{ opacity: 0.4 }}
    />
  );
};

// Animated section component
const AnimatedSection = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay }}
      className="relative"
    >
      {children}
    </motion.div>
  );
};

const ServicesPage = () => {
  // For the header animations
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Layout>
      <Head>
        <title>Our Services | GROWMINT</title>
        <meta name="description" content="Explore our comprehensive web development and social media marketing services designed to grow your business." />
      </Head>

      <ParticleBackground />

      <main className="bg-black text-white min-h-screen">
        {/* Full page background image */}
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
          <img
            src="https://images.unsplash.com/photo-1698847626251-efac0f7517cc?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Page background"
            className="w-full h-full object-cover object-center select-none pointer-events-none fixed inset-0"
            draggable="false"
            style={{ userSelect: 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#181022]/90 via-[#181022]/90 to-purple-900/70"></div>
        </div>

        {/* Animated Header Section */}
        <section className="relative pt-32 pb-24 px-8 overflow-hidden z-10">
          {/* Animated grid background */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-8 z-10 pointer-events-none"></div>
          
          <div className="container mx-auto relative z-20">
            {/* Header Content */}
            <div
              className={`text-center max-w-4xl mx-auto transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                Our Services
              </h1>
              <p className="text-xl md:text-2xl text-purple-100/80 mb-12 max-w-3xl mx-auto">
                Innovative digital solutions crafted to elevate your online presence and drive measurable results.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                <a
                  href="#contact"
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Get Started
                </a>
                <a
                  href="#testimonials"
                  className="px-8 py-3 rounded-full border border-purple-500/30 text-purple-400 font-medium hover:bg-purple-500/10 transition-all duration-300"
                >
                  View Our Work
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <div className="container mx-auto px-6 py-12 relative z-10">
          {/* Web Development Section */}
          <AnimatedSection>
            <div className="mb-12 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-purple-400 mb-4">
                Web Development
              </h2>
              <p className="text-xl text-purple-100/80 max-w-2xl mx-auto">
                Custom websites crafted with cutting-edge technologies, focused on performance and exceptional user experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Main Card 1 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl transition-all duration-300 group-hover:backdrop-blur-xl"></div>
                <div className="relative rounded-3xl border border-purple-400/30 group-hover:border-purple-400/60 bg-gradient-to-br from-white/10 to-purple-900/10 shadow-xl backdrop-blur-xl p-10 z-10">
                  <div className="flex items-center mb-4">
                    <span className="text-purple-400 text-3xl md:text-4xl mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </span>
                    <h3 className="font-display font-bold tracking-tight text-xl md:text-2xl text-purple-400">
                      Frontend Development
                    </h3>
                  </div>
                  <p className="text-purple-100/90 font-light leading-relaxed mb-4">
                    Custom-built React and Next.js interfaces with animated UI elements and responsive Tailwind CSS styling.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Mobile-first responsive design
                    </li>
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Animated UI components
                    </li>
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Modern UI/UX implementation
                    </li>
                  </ul>
                  
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-purple-400/20 pointer-events-none z-20"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Subtle animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/10 via-transparent to-purple-700/10 pointer-events-none z-0"
                    animate={{ opacity: [0.7, 0.9, 0.7] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </div>
              
              {/* Main Card 2 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl transition-all duration-300 group-hover:backdrop-blur-xl"></div>
                <div className="relative rounded-3xl border border-purple-400/30 group-hover:border-purple-400/60 bg-gradient-to-br from-white/10 to-purple-900/10 shadow-xl backdrop-blur-xl p-10 z-10">
                  <div className="flex items-center mb-4">
                    <span className="text-purple-400 text-3xl md:text-4xl mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                    </span>
                    <h3 className="font-display font-bold tracking-tight text-xl md:text-2xl text-purple-400">
                      Backend Development
                    </h3>
                  </div>
                  <p className="text-purple-100/90 font-light leading-relaxed mb-4">
                    Powerful Node.js and Express backends with optimized API endpoints and secure authentication systems.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Custom API development
                    </li>
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Secure JWT authentication
                    </li>
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Real-time data processing
                    </li>
                  </ul>
                  
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-purple-400/20 pointer-events-none z-20"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Subtle animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/10 via-transparent to-purple-700/10 pointer-events-none z-0"
                    animate={{ opacity: [0.7, 0.9, 0.7] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </div>
              
              {/* Main Card 3 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl transition-all duration-300 group-hover:backdrop-blur-xl"></div>
                <div className="relative rounded-3xl border border-purple-400/30 group-hover:border-purple-400/60 bg-gradient-to-br from-white/10 to-purple-900/10 shadow-xl backdrop-blur-xl p-10 z-10">
                  <div className="flex items-center mb-4">
                    <span className="text-purple-400 text-3xl md:text-4xl mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    <h3 className="font-display font-bold tracking-tight text-xl md:text-2xl text-purple-400">
                      Website Maintenance
                    </h3>
                  </div>
                  <p className="text-purple-100/90 font-light leading-relaxed mb-4">
                    Comprehensive website care packages ensuring your site stays fast, secure, and continuously updated.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Weekly backups & monitoring
                    </li>
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Security patches & updates
                    </li>
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Content & design refreshes
                    </li>
                  </ul>
                  
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-purple-400/20 pointer-events-none z-20"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Subtle animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/10 via-transparent to-purple-700/10 pointer-events-none z-0"
                    animate={{ opacity: [0.7, 0.9, 0.7] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </div>
            </div>
            
            {/* Additional Web Dev Services */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-12">
              {/* Additional Card 1 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl transition-all duration-300 group-hover:backdrop-blur-xl"></div>
                <div className="relative rounded-3xl border border-purple-400/30 group-hover:border-purple-400/60 bg-gradient-to-br from-white/10 to-purple-900/10 shadow-xl backdrop-blur-xl p-10 z-10">
                  <div className="flex items-center mb-4">
                    <span className="text-purple-400 text-3xl md:text-4xl mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                      </svg>
                    </span>
                    <h3 className="font-display font-bold tracking-tight text-xl md:text-2xl text-purple-400">
                      Database Solutions
                    </h3>
                  </div>
                  <p className="text-purple-100/90 font-light leading-relaxed mb-4">
                    Custom MongoDB and PostgreSQL database solutions with cloud-based architecture for scalability.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Optimized query performance
                    </li>
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Data security & encryption
                    </li>
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Scalable architecture
                    </li>
                  </ul>
                  
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-purple-400/20 pointer-events-none z-20"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Subtle animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/10 via-transparent to-purple-700/10 pointer-events-none z-0"
                    animate={{ opacity: [0.7, 0.9, 0.7] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </div>
              
              {/* Additional Card 2 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl transition-all duration-300 group-hover:backdrop-blur-xl"></div>
                <div className="relative rounded-3xl border border-purple-400/30 group-hover:border-purple-400/60 bg-gradient-to-br from-white/10 to-purple-900/10 shadow-xl backdrop-blur-xl p-10 z-10">
                  <div className="flex items-center mb-4">
                    <span className="text-purple-400 text-3xl md:text-4xl mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </span>
                    <h3 className="font-display font-bold tracking-tight text-xl md:text-2xl text-purple-400">
                      Web Design
                    </h3>
                  </div>
                  <p className="text-purple-100/90 font-light leading-relaxed mb-4">
                    Stunning, conversion-focused designs featuring gradients, glass effects, and animated UI elements.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Modern glassmorphic UI
                    </li>
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Gradient and glow effects
                    </li>
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Interactive motion design
                    </li>
                  </ul>
                  
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-purple-400/20 pointer-events-none z-20"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Subtle animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/10 via-transparent to-purple-700/10 pointer-events-none z-0"
                    animate={{ opacity: [0.7, 0.9, 0.7] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </div>
              
              {/* Additional Card 3 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl transition-all duration-300 group-hover:backdrop-blur-xl"></div>
                <div className="relative rounded-3xl border border-purple-400/30 group-hover:border-purple-400/60 bg-gradient-to-br from-white/10 to-purple-900/10 shadow-xl backdrop-blur-xl p-10 z-10">
                  <div className="flex items-center mb-4">
                    <span className="text-purple-400 text-3xl md:text-4xl mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    </span>
                    <h3 className="font-display font-bold tracking-tight text-xl md:text-2xl text-purple-400">
                      Hosting & Deployment
                    </h3>
                  </div>
                  <p className="text-purple-100/90 font-light leading-relaxed mb-4">
                    Fast, secure cloud hosting with Vercel, Netlify, or AWS with advanced CDN and edge deployment.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Global CDN distribution
                    </li>
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      CI/CD pipeline integration
                    </li>
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      SSL & DDoS protection
                    </li>
                  </ul>
                  
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-purple-400/20 pointer-events-none z-20"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Subtle animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/10 via-transparent to-purple-700/10 pointer-events-none z-0"
                    animate={{ opacity: [0.7, 0.9, 0.7] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Social Media Marketing Section */}
          <AnimatedSection delay={0.2}>
            <div className="mb-12 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-purple-400 mb-4">
                Social Media Marketing
              </h2>
              <p className="text-xl text-purple-100/80 max-w-2xl mx-auto">
                Strategic social media solutions to grow your brand, increase engagement, and drive measurable results.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Main Card 1 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl transition-all duration-300 group-hover:backdrop-blur-xl"></div>
                <div className="relative rounded-3xl border border-purple-400/30 group-hover:border-purple-400/60 bg-gradient-to-br from-white/10 to-purple-900/10 shadow-xl backdrop-blur-xl p-10 z-10">
                  <div className="flex items-center mb-4">
                    <span className="text-purple-400 text-3xl md:text-4xl mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                      </svg>
                    </span>
                    <h3 className="font-display font-bold tracking-tight text-xl md:text-2xl text-purple-400">
                      Paid Advertising
                    </h3>
                  </div>
                  <p className="text-purple-100/90 font-light leading-relaxed mb-4">
                    High-converting ad campaigns across Facebook, Instagram, TikTok, and LinkedIn with advanced targeting.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Custom audience creation
                    </li>
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Performance-based bidding
                    </li>
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      ROAS optimization
                    </li>
                  </ul>
                  
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-purple-400/20 pointer-events-none z-20"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Subtle animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/10 via-transparent to-purple-700/10 pointer-events-none z-0"
                    animate={{ opacity: [0.7, 0.9, 0.7] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </div>
              
              {/* Main Card 2 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl transition-all duration-300 group-hover:backdrop-blur-xl"></div>
                <div className="relative rounded-3xl border border-purple-400/30 group-hover:border-purple-400/60 bg-gradient-to-br from-white/10 to-purple-900/10 shadow-xl backdrop-blur-xl p-10 z-10">
                  <div className="flex items-center mb-4">
                    <span className="text-purple-400 text-3xl md:text-4xl mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </span>
                    <h3 className="font-display font-bold tracking-tight text-xl md:text-2xl text-purple-400">
                      Content Strategy
                    </h3>
                  </div>
                  <p className="text-purple-100/90 font-light leading-relaxed mb-4">
                    Data-driven content strategies with scheduled posts and analytics-based optimization.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Platform-specific strategies
                    </li>
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Content calendar automation
                    </li>
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Trend-based planning
                    </li>
                  </ul>
                  
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-purple-400/20 pointer-events-none z-20"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Subtle animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/10 via-transparent to-purple-700/10 pointer-events-none z-0"
                    animate={{ opacity: [0.7, 0.9, 0.7] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </div>
              
              {/* Main Card 3 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl transition-all duration-300 group-hover:backdrop-blur-xl"></div>
                <div className="relative rounded-3xl border border-purple-400/30 group-hover:border-purple-400/60 bg-gradient-to-br from-white/10 to-purple-900/10 shadow-xl backdrop-blur-xl p-10 z-10">
                  <div className="flex items-center mb-4">
                    <span className="text-purple-400 text-3xl md:text-4xl mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <h3 className="font-display font-bold tracking-tight text-xl md:text-2xl text-purple-400">
                      Content Creation
                    </h3>
                  </div>
                  <p className="text-purple-100/90 font-light leading-relaxed mb-4">
                    Eye-catching social media assets with modern aesthetics, animations, and platform-optimized formats.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Custom graphic design
                    </li>
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Branded short-form video
                    </li>
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Engagement-focused captions
                    </li>
                  </ul>
                  
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-purple-400/20 pointer-events-none z-20"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Subtle animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/10 via-transparent to-purple-700/10 pointer-events-none z-0"
                    animate={{ opacity: [0.7, 0.9, 0.7] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </div>
            </div>
            
            {/* Additional SMM Services */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-12">
              {/* Additional Card 1 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl transition-all duration-300 group-hover:backdrop-blur-xl"></div>
                <div className="relative rounded-3xl border border-purple-400/30 group-hover:border-purple-400/60 bg-gradient-to-br from-white/10 to-purple-900/10 shadow-xl backdrop-blur-xl p-10 z-10">
                  <div className="flex items-center mb-4">
                    <span className="text-purple-400 text-3xl md:text-4xl mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </span>
                    <h3 className="font-display font-bold tracking-tight text-xl md:text-2xl text-purple-400">
                      Community Management
                    </h3>
                  </div>
                  <p className="text-purple-100/90 font-light leading-relaxed mb-4">
                    Proactive community engagement strategies with personalized responses and audience growth tactics.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      24/7 response management
                    </li>
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Brand sentiment monitoring
                    </li>
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Follower growth campaigns
                    </li>
                  </ul>
                  
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-purple-400/20 pointer-events-none z-20"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Subtle animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/10 via-transparent to-purple-700/10 pointer-events-none z-0"
                    animate={{ opacity: [0.7, 0.9, 0.7] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </div>
              
              {/* Additional Card 2 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl transition-all duration-300 group-hover:backdrop-blur-xl"></div>
                <div className="relative rounded-3xl border border-purple-400/30 group-hover:border-purple-400/60 bg-gradient-to-br from-white/10 to-purple-900/10 shadow-xl backdrop-blur-xl p-10 z-10">
                  <div className="flex items-center mb-4">
                    <span className="text-purple-400 text-3xl md:text-4xl mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <h3 className="font-display font-bold tracking-tight text-xl md:text-2xl text-purple-400">
                      Influencer Marketing
                    </h3>
                  </div>
                  <p className="text-purple-100/90 font-light leading-relaxed mb-4">
                    Targeted micro and macro influencer collaborations that authentically promote your brand to ideal audiences.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Strategic partner selection
                    </li>
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Campaign coordination
                    </li>
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Performance analysis
                    </li>
                  </ul>
                  
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-purple-400/20 pointer-events-none z-20"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Subtle animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/10 via-transparent to-purple-700/10 pointer-events-none z-0"
                    animate={{ opacity: [0.7, 0.9, 0.7] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </div>
              
              {/* Additional Card 3 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl transition-all duration-300 group-hover:backdrop-blur-xl"></div>
                <div className="relative rounded-3xl border border-purple-400/30 group-hover:border-purple-400/60 bg-gradient-to-br from-white/10 to-purple-900/10 shadow-xl backdrop-blur-xl p-10 z-10">
                  <div className="flex items-center mb-4">
                    <span className="text-purple-400 text-3xl md:text-4xl mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </span>
                    <h3 className="font-display font-bold tracking-tight text-xl md:text-2xl text-purple-400">
                      Social Media Audits
                    </h3>
                  </div>
                  <p className="text-purple-100/90 font-light leading-relaxed mb-4">
                    Data-powered social media analysis using advanced analytics tools to identify growth opportunities.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Performance benchmarking
                    </li>
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Audience insights
                    </li>
                    <li className="flex items-center text-purple-100/80">
                      <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Growth strategy roadmap
                    </li>
                  </ul>
                  
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-purple-400/20 pointer-events-none z-20"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Subtle animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/10 via-transparent to-purple-700/10 pointer-events-none z-0"
                    animate={{ opacity: [0.7, 0.9, 0.7] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Get in Touch Section */}
          <AnimatedSection delay={0.4}>
            <div className="mt-20 text-center relative rounded-3xl border border-purple-500/30 bg-gradient-to-br from-white/10 to-purple-900/10 shadow-xl backdrop-blur-xl p-10">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-purple-400/10 opacity-60 pointer-events-none"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-purple-400 mb-6 relative z-10">
                Ready to Transform Your Digital Presence?
              </h2>
              <p className="text-purple-100/80 text-lg max-w-2xl mx-auto mb-8 relative z-10">
                Let's discuss how we can help you achieve your business goals with our comprehensive digital solutions.
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors font-semibold shadow-lg text-lg relative overflow-hidden group z-10"
                >
                  <span className="relative z-10">Get in Touch</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    animate={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </main>
    </Layout>
  );
};

export default ServicesPage;