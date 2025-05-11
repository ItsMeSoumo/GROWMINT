import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Head from 'next/head';
import axios from 'axios';

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

const Development = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    message: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Send data to backend API
      const response = await axios.post('/api/dev', formData);
      console.log("API Response:", response.data);
      
      if (response.status === 201) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          projectType: '',
          message: '',
        });
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to submit the form. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <Layout>
      <Head>
        <title>Premium Development Services | Growmint</title>
        <meta name="description" content="Exclusive $100,000 development services for enterprises seeking exceptional digital products." />
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
        
        <div className="pt-32 pb-20 relative z-10">
          {/* Hero Section */}
          <section className="relative py-20">
            <div className="absolute inset-0 opacity-5 bg-[url('/grid.svg')]" />
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(123,31,162,0.15)_0%,rgba(128,0,255,0.1)_25%,rgba(76,29,149,0.05)_50%,rgba(0,0,0,0)_100%)] blur-2xl"></div>
            </div>
            
            <div className="container mx-auto px-6 md:px-12 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-glow font-merriweather tracking-tight">Premium Development</h1>
                <p className="text-xl text-white/80 leading-relaxed mb-8 font-montserrat">
                  Exclusive development services for enterprises seeking exceptional digital products.
                </p>
              </div>
            </div>
          </section>
          
          {/* Premium Package Section */}
          <section className="py-20 relative">
            <div className="container mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 font-merriweather">Enterprise Development</h2>
                  <div className="h-1 w-24 bg-gradient-to-r from-accent to-purple-400 mb-8" />
                  <p className="text-white/80 mb-6 leading-relaxed font-montserrat">
                    Our premium development package is designed for businesses requiring the highest level of expertise, attention, and quality. For $100,000, you receive a comprehensive solution tailored to your enterprise needs.
                  </p>
                  <p className="text-white/80 mb-6 leading-relaxed font-montserrat">
                    This exclusive package includes full-scale development with multiple senior developers, dedicated project management, custom design, and a year of premium support and maintenance.
                  </p>
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-4 font-merriweather">Package Includes:</h3>
                    <ul className="space-y-3">
                      {[
                        { title: "Dedicated Development Team", desc: "A team of 5+ senior developers dedicated to your project" },
                        { title: "Executive Design Services", desc: "Premium UX/UI design with unlimited revisions" },
                        { title: "Custom Architecture", desc: "Enterprise-grade infrastructure and architecture" },
                        { title: "Performance Optimization", desc: "Advanced performance tuning and scalability planning" },
                        { title: "24/7 VIP Support", desc: "Priority support with guaranteed response times" },
                        { title: "Exclusive IP Rights", desc: "Full ownership of all code and assets" }
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start font-roboto"
                        >
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center mt-1">
                            <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <span className="text-white font-medium">{item.title}:</span> 
                            <span className="text-white/70 ml-1">{item.desc}</span>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -inset-10 bg-gradient-to-tr from-accent/10 via-purple-500/5 to-transparent blur-3xl opacity-30 rounded-full" />
                  <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl border-2 border-purple-500/50 neon-glow">
                    <style jsx>{`
                      .neon-glow {
                        box-shadow: 0 0 5px #bc13fe, 0 0 15px #bc13fe, 0 0 20px #bc13fe;
                        animation: neon-border-pulse 2s infinite alternate;
                      }
                      @keyframes neon-border-pulse {
                        from {
                          box-shadow: 0 0 5px #bc13fe, 0 0 15px #bc13fe;
                        }
                        to {
                          box-shadow: 0 0 10px #bc13fe, 0 0 25px #bc13fe, 0 0 30px #bc13fe;
                        }
                      }
                      .animate-pulse-slow {
                        animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                      }
                    `}</style>
                    <div className="bg-black/50 backdrop-blur-md p-6 md:p-8">
                      <div className="mb-6 flex justify-between items-center">
                        <h3 className="text-2xl md:text-3xl font-bold text-glow font-merriweather">Premium Package</h3>
                      </div>
                      
                      {submitted ? (
                        <div className="p-6 text-center font-montserrat">
                          <div className="w-16 h-16 rounded-full bg-green-500/20 mx-auto flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <h4 className="text-xl font-bold mb-2">Request Submitted!</h4>
                          <p className="text-white/70 mb-4">Thank you for your interest. A senior consultant will contact you within 24 hours.</p>
                          <button 
                            onClick={() => setSubmitted(false)}
                            className="text-accent underline hover:text-accent/80"
                          >
                            Submit another request
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-4 font-roboto">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-1">Full Name</label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full px-4 py-2 bg-white/5 border border-white/10 focus:border-accent/50 rounded-lg text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition"
                              placeholder="John Smith"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1">Email Address</label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full px-4 py-2 bg-white/5 border border-white/10 focus:border-accent/50 rounded-lg text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition"
                              placeholder="john@company.com"
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="company" className="block text-sm font-medium text-white/70 mb-1">Company</label>
                              <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-white/5 border border-white/10 focus:border-accent/50 rounded-lg text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition"
                                placeholder="Company Inc."
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="phone" className="block text-sm font-medium text-white/70 mb-1">Phone Number</label>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-white/5 border border-white/10 focus:border-accent/50 rounded-lg text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition"
                                placeholder="+1 (555) 000-0000"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="projectType" className="block text-sm font-medium text-white/70 mb-1">Project Type</label>
                            <select
                              id="projectType"
                              name="projectType"
                              value={formData.projectType}
                              onChange={handleChange}
                              className="w-full px-4 py-2 bg-white/5 border border-white/10 focus:border-accent/50 rounded-lg text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition"
                              style={{ WebkitAppearance: "none", MozAppearance: "none", backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"white\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/></svg>')", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center" }}
                              required
                            >
                              <option value="" disabled hidden className="bg-black/70 text-white">Select a project type</option>
                              <option value="Website" className="bg-black/70 text-white">Website</option>
                              <option value="Mobile App" className="bg-black/70 text-white">Mobile App</option>
                              <option value="Web Application" className="bg-black/70 text-white">Web Application</option>
                              <option value="E-commerce" className="bg-black/70 text-white">E-commerce</option>
                              <option value="Enterprise Software" className="bg-black/70 text-white">Enterprise Software</option>
                              <option value="Other" className="bg-black/70 text-white">Other</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-1">Project Details</label>
                            <textarea
                              id="message"
                              name="message"
                              rows="4"
                              value={formData.message}
                              onChange={handleChange}
                              className="w-full px-4 py-2 bg-white/5 border border-white/10 focus:border-accent/50 rounded-lg text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition"
                              placeholder="Tell us about your project goals and requirements..."
                            ></textarea>
                          </div>
                          
                          {error && (
                            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-white text-sm mb-4">
                              {error}
                            </div>
                          )}
                          
                          <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 rounded-lg text-white font-semibold shadow-lg shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
                          >
                            {loading ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                              </>
                            ) : (
                              "Submit Premium Request"
                            )}
                          </button>
                          
                          <p className="text-xs text-white/50 text-center mt-3">
                            By submitting this form, you'll be connected with a senior consultant to discuss your project.
                          </p>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Enterprise Benefits */}
          <section className="py-20 relative">
            <div className="container mx-auto px-6 md:px-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center font-merriweather">Why Choose Our Premium Service</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Exclusive Access",
                    description: "Direct access to our most senior developers and designers with decades of combined experience.",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    ),
                    features: ["Senior developers", "Expert designers", "Direct communication"]
                  },
                  {
                    title: "Bespoke Solutions",
                    description: "Fully customized development approach specifically tailored to your enterprise requirements.",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                      </svg>
                    ),
                    features: ["Custom architecture", "Tailored workflows", "Unique solutions"]
                  },
                  {
                    title: "Priority Treatment",
                    description: "Your project takes precedence with accelerated timelines and dedicated resources.",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    ),
                    features: ["Accelerated timelines", "Dedicated team", "VIP support"]
                  }
                ].map((value, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 hover:border-accent/30 transition-all duration-300 overflow-hidden group"
                  >
                    {/* Animated border glow */}
                    <motion.div
                      className="absolute inset-0 rounded-xl border-2 border-purple-400/20 pointer-events-none z-20"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    
                    {/* Hover blur overlay */}
                    <span className="absolute inset-0 z-0 pointer-events-none transition-all duration-300 group-hover:backdrop-blur-md group-hover:bg-white/10 rounded-xl" />
                    
                    <div className="flex items-center mb-4 relative z-10">
                      <span className="text-purple-400 p-3 rounded-xl bg-background/20 mr-4">{value.icon}</span>
                      <h3 className="text-2xl font-bold font-merriweather text-purple-400">{value.title}</h3>
                    </div>
                    
                    <p className="text-purple-100/90 font-light leading-relaxed mb-6 relative z-10">{value.description}</p>
                    
                    <ul className="space-y-3 relative z-10">
                      {value.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                          className="flex items-center text-purple-100/80"
                        >
                          <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Get in Touch Section */}
          <section className="py-20 relative">
            <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-merriweather">Get in Touch Today</h2>
                <p className="text-xl text-white/80 mb-8 font-montserrat">
                  Have questions about our development services? We're here to help.
                </p>
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full text-white font-semibold shadow-lg shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1 font-roboto">
                  Contact Us
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default Development;