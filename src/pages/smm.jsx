import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import axios from 'axios';
import Link from 'next/link';

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

export default function SMM() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    platforms: [],
    goals: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'platforms') {
      // Handle checkboxes for platforms
      if (checked) {
        setFormData(prev => ({
          ...prev,
          platforms: [...prev.platforms, value]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          platforms: prev.platforms.filter(platform => platform !== value)
        }));
      }
    } else {
      // Handle other inputs
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Send data to backend API
      const response = await axios.post('/api/smm', formData);
      console.log("API Response:", response.data);
      
      if (response.status === 201) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          platforms: [],
          goals: '',
          message: ''
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
        <title>Social Media Marketing | Growmint</title>
        <meta name="description" content="Professional social media marketing services to grow your brand's online presence." />
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
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-glow font-merriweather tracking-tight">Social Media Marketing</h1>
                <p className="text-xl text-white/80 leading-relaxed mb-8 font-montserrat">
                  Grow your brand's online presence with our professional social media marketing services.
                </p>
              </div>
            </div>
          </section>
          
          {/* Form Section */}
          <section className="py-20 relative">
            <div className="container mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 font-merriweather">Boost Your Social Media Presence</h2>
                  <div className="h-1 w-24 bg-gradient-to-r from-accent to-purple-400 mb-8" />
                  <p className="text-white/80 mb-6 leading-relaxed font-montserrat">
                    Our social media marketing services are designed to help businesses of all sizes establish a strong online presence, engage with their audience, and drive growth through strategic content and campaigns.
                  </p>
                  <p className="text-white/80 mb-6 leading-relaxed font-montserrat">
                    Fill out the form to discuss how we can help you achieve your social media goals.
                  </p>
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-4 font-merriweather">Our Services Include:</h3>
                    <ul className="space-y-3">
                      {[
                        { title: "Content Creation", desc: "Engaging posts, graphics, and videos tailored to your brand" },
                        { title: "Community Management", desc: "Active engagement with your audience and community building" },
                        { title: "Paid Advertising", desc: "Strategic ad campaigns to reach your target audience" },
                        { title: "Analytics & Reporting", desc: "Detailed insights and performance tracking" },
                        { title: "Strategy Development", desc: "Custom social media strategies aligned with your goals" },
                        { title: "Influencer Partnerships", desc: "Collaborations with relevant influencers in your industry" }
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
                        <h3 className="text-2xl md:text-3xl font-bold text-glow font-merriweather">Get Started</h3>
                      </div>
                      
                      {submitted ? (
                        <div className="p-6 text-center font-montserrat">
                          <div className="w-16 h-16 rounded-full bg-green-500/20 mx-auto flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <h4 className="text-xl font-bold mb-2">Request Submitted!</h4>
                          <p className="text-white/70 mb-4">Thank you for your interest. Our social media team will contact you shortly.</p>
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
                            <label className="block text-sm font-medium text-white/70 mb-2">Platforms of Interest</label>
                            <div className="grid grid-cols-2 gap-2">
                              {['Instagram', 'Facebook', 'X', 'LinkedIn', 'Threads', 'YouTube'].map(platform => (
                                <div key={platform} className="flex items-center">
                                  <input
                                    type="checkbox"
                                    id={platform.toLowerCase()}
                                    name="platforms"
                                    value={platform}
                                    checked={formData.platforms.includes(platform)}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-accent focus:ring-accent/25 border-white/30 rounded bg-white/5"
                                  />
                                  <label htmlFor={platform.toLowerCase()} className="ml-2 text-sm text-white/70">
                                    {platform}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="goals" className="block text-sm font-medium text-white/70 mb-1">Your Social Media Goals</label>
                            <select
                              id="goals"
                              name="goals"
                              value={formData.goals}
                              onChange={handleChange}
                              className="w-full px-4 py-2 bg-white/5 border border-white/10 focus:border-accent/50 rounded-lg text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition"
                              style={{ WebkitAppearance: "none", MozAppearance: "none", backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"white\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/></svg>')", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center" }}
                            >
                              <option value="" disabled hidden className="bg-black/70 text-white">Select your primary goal</option>
                              <option value="Brand Awareness" className="bg-black/70 text-white">Increase Brand Awareness</option>
                              <option value="Lead Generation" className="bg-black/70 text-white">Generate Leads</option>
                              <option value="Community Building" className="bg-black/70 text-white">Build Community</option>
                              <option value="Sales" className="bg-black/70 text-white">Drive Sales</option>
                              <option value="Customer Service" className="bg-black/70 text-white">Improve Customer Service</option>
                              <option value="Other" className="bg-black/70 text-white">Other</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-1">Additional Information</label>
                            <textarea
                              id="message"
                              name="message"
                              rows="4"
                              value={formData.message}
                              onChange={handleChange}
                              className="w-full px-4 py-2 bg-white/5 border border-white/10 focus:border-accent/50 rounded-lg text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition"
                              placeholder="Tell us about your current social media presence and specific needs..."
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
                              "Submit Request"
                            )}
                          </button>
                          
                          <p className="text-xs text-white/50 text-center mt-3">
                            Your information is secure and will not be shared with third parties.
                          </p>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Social Media Marketing Benefits */}
          <section className="py-20 relative">
            <div className="container mx-auto px-6 md:px-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center font-merriweather">Why Choose Our Premium Service</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Expert Strategists",
                    description: "Work directly with our senior social media strategists who understand your industry and audience.",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    ),
                    features: ["Industry specialists", "Data-driven approach", "Audience insights"]
                  },
                  {
                    title: "Custom Content",
                    description: "Tailored content strategy and creative assets designed specifically for your brand voice and goals.",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    ),
                    features: ["Brand-aligned visuals", "Engaging copywriting", "Consistent voice"]
                  },
                  {
                    title: "Growth Focused",
                    description: "Strategies designed to deliver measurable growth with regular reporting and optimization.",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    ),
                    features: ["Performance tracking", "Conversion optimization", "ROI focus"]
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
                  Have questions about our social media services? We're here to help.
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
}