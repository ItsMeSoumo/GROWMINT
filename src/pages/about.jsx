import React, { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import Head from 'next/head';

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

// Enhanced Card with glassmorphism and premium effects
const GlassCard = ({ title, description, icon, features = [], isLarge = false, delay = 0 }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const scale = useSpring(1, { stiffness: 300, damping: 30 });

  // Glassmorphism and luxury sizing
  const base = `relative rounded-3xl border bg-gradient-to-br from-white/10 to-purple-900/10 shadow-xl backdrop-blur-xl group transition-all duration-300 overflow-hidden`;
  const border = `border-purple-400/30 group-hover:border-purple-400/60`;
  const shadow = `shadow-[0_8px_32px_0_rgba(168,85,247,0.18)] group-hover:shadow-[0_8px_32px_0_rgba(168,85,247,0.35)]`;
  const glass = `before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-purple-400/10 before:opacity-60 before:rounded-3xl before:pointer-events-none`;
  const size = isLarge
    ? 'p-14 min-h-[340px] md:min-h-[420px]'
    : 'p-7 min-h-[180px]';

  return (
    <motion.div
      style={{ y, scale }}
      whileHover={{ scale: 1.05, boxShadow: '0 0 0 4px #a855f7, 0 8px 32px 0 rgba(168,85,247,0.25)' }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      className={`relative group ${base} ${border} ${shadow} ${glass} ${size} flex flex-col justify-between z-10 backdrop-blur-xl bg-white/20 border border-white/20`}
      tabIndex={0}
    >
      {/* Hover blur overlay for background only */}
      <span className="absolute inset-0 z-0 pointer-events-none transition-all duration-300 group-hover:backdrop-blur-md group-hover:bg-white/10 rounded-3xl" />
      <div className="flex items-center mb-4">
        <motion.span
          className="text-purple-400 text-3xl md:text-4xl mr-4"
        >
          {icon}
        </motion.span>
        <h3 className={`font-display font-bold tracking-tight ${isLarge ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'} text-purple-400`}>
          {title}
        </h3>
      </div>
      <p className={`text-purple-100/90 font-light leading-relaxed ${isLarge ? 'text-lg mb-8' : 'text-base'}`}>{description}</p>
      {features.length > 0 && (
        <ul className="space-y-3 mt-auto">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex items-center text-purple-100/80"
            >
              <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </motion.li>
          ))}
        </ul>
      )}
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
    </motion.div>
  );
};

const About = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Layout>
      <Head>
        <title>About | Growmint</title>
        <meta name="description" content="We're a team of passionate professionals who believe in the power of digital innovation to drive real business growth — helping brands not just look great online but perform better too." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ParticleBackground />

      <main className="bg-black text-white min-h-screen">
        {/* Full page background image - same as services page */}
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

        {/* Hero Section */}
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
                About Us
              </h1>
              <p className={`text-xl md:text-2xl text-purple-100/80 mb-12 max-w-3xl mx-auto`}>
                We're a team of passionate developers and designers creating exceptional digital experiences.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                <Link 
                  href="/contact"
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Get in Touch
                </Link>
                <Link 
                  href="/services"
                  className="px-8 py-3 rounded-full border border-purple-500/30 text-purple-400 font-medium hover:bg-purple-500/10 transition-all duration-300"
                >
                  Our Services
                </Link>
              </div>
            </div>
          </div>
          
          {/* Radial gradient for depth */}
          <div className="absolute inset-0 bg-radial-gradient pointer-events-none z-10"></div>
        </section>

        {/* Main Content Section */}
        <section className="w-full relative py-16 px-4 md:px-8 overflow-hidden z-10">
          {/* Animated grid background */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-8 z-0 pointer-events-none"></div>
          
          <div className="container mx-auto px-6 py-12 relative z-10">
            {/* Our Mission Section */}
            <AnimatedSection>
              <div className="mb-12 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-purple-400 mb-4">
                  About Us
                </h2>
                <p className={`text-xl text-purple-100/80 max-w-2xl mx-auto`}>
                  At <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">Growmint</Link>, we provide end-to-end digital solutions with a strong focus on both development and marketing.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-8 md:gap-12">
                {/* Combined Services Card */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl transition-all duration-300 group-hover:backdrop-blur-xl"></div>
                  <div className="relative rounded-3xl border border-purple-400/30 group-hover:border-purple-400/60 bg-gradient-to-br from-white/10 to-purple-900/10 shadow-xl backdrop-blur-xl p-10 z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Development Services */}
                      <div>
                        <div className="flex items-center mb-4">
                          <span className="text-purple-400 text-3xl md:text-4xl mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                          </span>
                          <h3 className="font-display font-bold tracking-tight text-xl md:text-2xl text-purple-400">
                            Development Services
                          </h3>
                        </div>
                        <p className={`text-purple-100/90 font-light leading-relaxed mb-4`}>
                          Comprehensive digital development solutions to power your online presence.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-center text-purple-100/80">
                            <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Web and app development
                          </li>
                          <li className="flex items-center text-purple-100/80">
                            <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            UI/UX design
                          </li>
                          <li className="flex items-center text-purple-100/80">
                            <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Custom digital products
                          </li>
                        </ul>
                      </div>
                      
                      {/* Marketing Services */}
                      <div>
                        <div className="flex items-center mb-4">
                          <span className="text-purple-400 text-3xl md:text-4xl mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                            </svg>
                          </span>
                          <h3 className="font-display font-bold tracking-tight text-xl md:text-2xl text-purple-400">
                            Marketing Services
                          </h3>
                        </div>
                        <p className={`text-purple-100/90 font-light leading-relaxed mb-4`}>
                          Strategic marketing solutions to grow your brand and drive engagement.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-center text-purple-100/80">
                            <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Branding
                          </li>
                          <li className="flex items-center text-purple-100/80">
                            <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Paid advertising
                          </li>
                          <li className="flex items-center text-purple-100/80">
                            <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            SEO & Content strategy
                          </li>
                        </ul>
                      </div>
                      
                      {/* Our Philosophy */}
                      <div>
                        <div className="flex items-center mb-4">
                          <span className="text-purple-400 text-3xl md:text-4xl mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </span>
                          <h3 className="font-display font-bold tracking-tight text-xl md:text-2xl text-purple-400">
                            Our Philosophy
                          </h3>
                        </div>
                        <p className={`text-purple-100/90 font-light leading-relaxed mb-4`}>
                          We're a team of passionate professionals who believe in the power of digital innovation to drive real business growth.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-center text-purple-100/80">
                            <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Innovation-driven approach
                          </li>
                          <li className="flex items-center text-purple-100/80">
                            <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Results-focused strategies
                          </li>
                          <li className="flex items-center text-purple-100/80">
                            <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Client-centered solutions
                          </li>
                        </ul>
                      </div>
                    </div>
                    
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
          
          {/* Team Values */}
            <AnimatedSection delay={0.2}>
              <div className="mt-24 mb-12 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-purple-400 mb-4">
                  Our Values
                </h2>
                <p className={`text-xl text-purple-100/80 max-w-2xl mx-auto`}>
                  The core principles that guide our work and relationships.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
                {/* Value 1 */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl transition-all duration-300 group-hover:backdrop-blur-xl"></div>
                  <div className="relative rounded-3xl border border-purple-400/30 group-hover:border-purple-400/60 bg-gradient-to-br from-white/10 to-purple-900/10 backdrop-blur-xl p-10 z-10 h-full">
                    <div className="flex items-center mb-4">
                      <span className="text-purple-400 text-3xl md:text-4xl mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </span>
                      <h3 className="font-display font-bold tracking-tight text-xl md:text-2xl text-purple-400">
                        Innovation
                      </h3>
                    </div>
                    <p className={`text-purple-100/90 font-light leading-relaxed mb-4`}>
                      We're constantly exploring new technologies and approaches to deliver cutting-edge solutions.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-purple-100/80">
                        <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Cutting-edge technologies
                      </li>
                      <li className="flex items-center text-purple-100/80">
                        <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Creative problem solving
                      </li>
                      <li className="flex items-center text-purple-100/80">
                        <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Forward-thinking solutions
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
                
                {/* Value 2 */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl transition-all duration-300 group-hover:backdrop-blur-xl"></div>
                  <div className="relative rounded-3xl border border-purple-400/30 group-hover:border-purple-400/60 bg-gradient-to-br from-white/10 to-purple-900/10 backdrop-blur-xl p-10 z-10 h-full">
                    <div className="flex items-center mb-4">
                      <span className="text-purple-400 text-3xl md:text-4xl mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <h3 className="font-display font-bold tracking-tight text-xl md:text-2xl text-purple-400">
                        Quality
                      </h3>
                    </div>
                    <p className={`text-purple-100/90 font-light leading-relaxed mb-4`}>
                      We're committed to delivering top-notch quality—whether it's clean, high-performing development or impactful, result-driven marketing.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-purple-100/80">
                        <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Meticulous execution
                      </li>
                      <li className="flex items-center text-purple-100/80">
                        <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Rigorous testing
                      </li>
                      <li className="flex items-center text-purple-100/80">
                        <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Continuous improvement
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
                
                {/* Value 3 */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl transition-all duration-300 group-hover:backdrop-blur-xl"></div>
                  <div className="relative rounded-3xl border border-purple-400/30 group-hover:border-purple-400/60 bg-gradient-to-br from-white/10 to-purple-900/10 backdrop-blur-xl p-10 z-10 h-full">
                    <div className="flex items-center mb-4">
                      <span className="text-purple-400 text-3xl md:text-4xl mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </span>
                      <h3 className="font-display font-bold tracking-tight text-xl md:text-2xl text-purple-400">
                        Collaboration
                      </h3>
                    </div>
                    <p className={`text-purple-100/90 font-light leading-relaxed mb-4`}>
                      We collaborate closely with our clients at every step to ensure their vision is brought to life with precision, creativity, and purpose.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-purple-100/80">
                        <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Client-centric approach
                      </li>
                      <li className="flex items-center text-purple-100/80">
                        <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Open communication
                      </li>
                      <li className="flex items-center text-purple-100/80">
                        <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Partnership mentality
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
                  Ready to work with us?
                </h2>
                <p className={`text-purple-100/80 text-lg max-w-2xl mx-auto mb-8 relative z-10`}>
                  Let's create something amazing together.
                </p>
                <Link
                  href="/contact"
                  className="px-8 py-4 inline-block bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors font-semibold shadow-lg text-lg relative overflow-hidden group z-10"
                >
                  <span className="relative z-10">Get in Touch</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>
            </AnimatedSection>
            </div>
          </section>
      </main>
    </Layout>
  );
};

export default About;