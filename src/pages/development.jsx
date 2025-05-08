import React, { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Head from 'next/head';

const Development = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    budget: '$100,000',
    message: '',
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log(formData);
    setSubmitted(true);
  };
  
  return (
    <Layout>
      <Head>
        <title>Premium Development Services | Growmint</title>
        <meta name="description" content="Exclusive $100,000 development services for enterprises seeking exceptional digital products." />
      </Head>
      <div className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative py-20">
          <div className="absolute inset-0 bg-black" />
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
                <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl border border-white/10">
                  <div className="bg-black/50 backdrop-blur-md p-6 md:p-8">
                    <div className="mb-6 flex justify-between items-center">
                      <h3 className="text-2xl md:text-3xl font-bold text-glow font-merriweather">Premium Package</h3>
                      <div className="px-4 py-1 bg-accent/20 rounded-full border border-accent/30">
                        <span className="text-accent font-bold font-montserrat">$100,000</span>
                      </div>
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
                              required
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
                          <label htmlFor="budget" className="block text-sm font-medium text-white/70 mb-1">Budget</label>
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 focus:border-accent/50 rounded-lg text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition"
                          >
                            <option value="$100,000">$100,000 - Premium Package</option>
                            <option value="$150,000+">$150,000+ - Enterprise Package</option>
                            <option value="Custom">Custom Package - Let's Discuss</option>
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
                        
                        <button
                          type="submit"
                          className="w-full py-3 px-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 rounded-lg text-white font-semibold shadow-lg shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1"
                        >
                          Submit Premium Request
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
                  icon: "🔐"
                },
                {
                  title: "Bespoke Solutions",
                  description: "Fully customized development approach specifically tailored to your enterprise requirements.",
                  icon: "✨"
                },
                {
                  title: "Priority Treatment",
                  description: "Your project takes precedence with accelerated timelines and dedicated resources.",
                  icon: "⚡"
                }
              ].map((value, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 rounded-lg p-8 hover:border-accent/30 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-3 font-merriweather">{value.title}</h3>
                  <p className="text-white/70 font-montserrat">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-merriweather">Ready for Premium Development?</h2>
              <p className="text-xl text-white/80 mb-8 font-montserrat">
                Let's create an exceptional digital experience together.
              </p>
              <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full text-white font-semibold shadow-lg shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1 font-roboto">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Development;
