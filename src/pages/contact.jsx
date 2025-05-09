import { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { FadeIn, SlideIn, ScaleIn } from '@/components/animations';
import axios from 'axios'

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: '',
    loading: false
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: '',
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const projectTypes = [
    { value: 'web-dev', label: 'Website Development' },
    { value: 'app-dev', label: 'App Development' },
    { value: 'seo', label: 'SEO Optimization' },
    { value: 'smm', label: 'Social Media Marketing' },
    { value: 'branding', label: 'Branding & Design' },
    { value: 'other', label: 'Other Services' }
  ];

  // Budget ranges removed as requested

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState({ ...formState, loading: true });
    
    // Prepare form data, ensuring all fields are included
    const formData = {
      name: formState.name,
      email: formState.email,
      phone: formState.phone || '',
      company: formState.company || '',
      projectType: formState.projectType || '',
      message: formState.message || ''
    };
    
    // Debug: Log the form data being sent
    console.log('Submitting form data:', formData);
    
    try {
      // Send data to backend API
      const response = await axios.post('/api/contact', formData);
      console.log("API Response:", response.data);
      
      if (response.data.success) {
        setFormStatus({ 
          submitted: true, 
          error: false, 
          message: "Thanks for your message! We'll get back to you soon."
        });
        setFormState({
          name: "",
          email: "",
          company: "",
          projectType: "",
          message: "",
          loading: false
        });
      } else {
        setFormStatus({ 
          submitted: true, 
          error: true, 
          message: response.data.message || "Failed to submit the form" 
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus({ 
        submitted: true, 
        error: true, 
        message: "Unable to connect to the server. Please try again later." 
      });
    }
  };

  return (
    <Layout>
      <Head>
        <title>Contact Us | Growmint</title>
        <meta name="description" content="Get in touch with Growmint for your web development needs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <SlideIn direction="up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Get In <span className="text-accent">Touch</span>
              </h1>
            </SlideIn>
            
            <FadeIn delay={0.2}>
              <p className="text-xl text-secondary mb-8">
                Have a project in mind or want to learn more about our services? We'd love to hear from you.
              </p>
            </FadeIn>
          </div>
        </div>
        
        
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <SlideIn direction="left">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Send Us a Message</h2>
                <p className="text-secondary mb-8">
                  Fill out the form below and we'll get back to you as soon as possible. We're excited to learn about your project and how we can help bring your vision to life.
                </p>
                
                {formStatus.submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-6">
                      {/* Success Icon (Checkmark) */}
                      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-purple-400"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Message Sent Successfully!</h3>
                    <p className="text-gray-300 mb-8 max-w-md">{formStatus.message}</p>
                    <button 
                      onClick={() => {
                        setFormStatus({ submitted: false, error: false, message: '' });
                        setFormState({
                          name: '',
                          email: '',
                          company: '',
                          projectType: '',
                          budget: '',
                          message: '',
                          loading: false
                        });
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center gap-2 hover:opacity-90 transition"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* Name Field */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                        <div className="relative">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formState.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition placeholder:text-gray-500"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>
                      {/* Email Field */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition placeholder:text-gray-500"
                          placeholder="john@example.com"
                        />
                      </div>
                      {/* Phone Field (Optional) */}
                      <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone Number (Optional)</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition placeholder:text-gray-500"
                          placeholder="+1 (123) 456-7890"
                        />
                      </div>
                      {/* Company Field */}
                      <div className="space-y-2">
                        <label htmlFor="company" className="block text-sm font-medium text-gray-300">Company (Optional)</label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formState.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition placeholder:text-gray-500"
                          placeholder="Your Company"
                        />
                      </div>
                      {/* Project Type Field */}
                      <div className="space-y-2">
                        <label htmlFor="projectType" className="block text-sm font-medium text-gray-300">What do you need help with?</label>
                        <select
                          id="projectType"
                          name="projectType"
                          required
                          value={formState.projectType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-gray-300"
                        >
                          <option value="" disabled className="text-gray-500">Select service type</option>
                          {projectTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                          ))}
                        </select>
                      </div>
                      {/* Message Field */}
                      <div className="space-y-2 md:col-span-2">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300">Tell us about your project</label>
                        <textarea
                          id="message"
                          name="message"
                          rows="4"
                          required
                          value={formState.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition placeholder:text-gray-500"
                          placeholder="Share some details about your project goals and timeline..."
                        ></textarea>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="text-sm text-gray-400">
                        We'll get back to you within 24 hours
                      </div>
                      <button
                        type="submit"
                        className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50"
                        disabled={formState.loading}
                      >
                        {formState.loading ? (
                          <span>Sending...</span>
                        ) : (
                          <>
                            <span>Send Message</span>
                            {/* Paper plane icon */}
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13" /><path strokeLinecap="round" strokeLinejoin="round" d="M22 2L15 22l-4-9-9-4 22-7z" /></svg>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </SlideIn>
            </div>
            <div>
              <SlideIn direction="right">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Information</h2>
                <p className="text-secondary mb-8">
                  Feel free to reach out to us through any of the following channels. We're here to help and answer any questions you may have.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Phone</h3>
                      <p className="text-secondary">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Email</h3>
                      <p className="text-secondary">hello@growmint.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Office</h3>
                      <p className="text-secondary">
                        123 Tech Street<br />
                        Suite 456<br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                  <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent hover-scale">
                      <span className="sr-only">Twitter</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent hover-scale">
                      <span className="sr-only">LinkedIn</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent hover-scale">
                      <span className="sr-only">Instagram</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent hover-scale">
                      <span className="sr-only">GitHub</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </SlideIn>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-background/50 grid-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Visit Our Office</h2>
              <p className="text-secondary max-w-3xl mx-auto">
                We're located in the heart of San Francisco's tech district.
              </p>
            </FadeIn>
          </div>
          
          <ScaleIn>
            <div className="w-full h-96 rounded-xl overflow-hidden border border-foreground/10">
              {/* In a real app, you would use Google Maps or similar */}
              <div className="w-full h-full bg-background/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-accent/20 flex items-center justify-center text-accent mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-xl font-bold">Growmint HQ</p>
                  <p className="text-secondary">123 Tech Street, San Francisco</p>
                </div>
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
              <p className="text-secondary max-w-3xl mx-auto">
                Find answers to common questions about our services and process.
              </p>
            </FadeIn>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <FaqItem 
                question="What is your typical project timeline?"
                answer="Project timelines vary based on scope and complexity. A simple website may take 4-6 weeks, while more complex applications can take 3-6 months. We'll provide a detailed timeline during our initial consultation."
                delay={0.1}
              />
              
              <FaqItem 
                question="Do you offer ongoing maintenance and support?"
                answer="Yes, we offer ongoing maintenance and support packages to ensure your website remains secure, up-to-date, and performing optimally. These can be tailored to your specific needs."
                delay={0.2}
              />
              
              <FaqItem 
                question="How much does a typical website cost?"
                answer="Our pricing is customized based on your specific needs and project requirements. We provide detailed quotes after understanding your project scope. Contact us for a free consultation and estimate."
                delay={0.3}
              />
              
              <FaqItem 
                question="What information do you need to start a project?"
                answer="To get started, we typically need your business goals, target audience information, brand guidelines (if available), content requirements, and any specific functionality needs. We'll guide you through this process during our discovery phase."
                delay={0.4}
              />
              
              <FaqItem 
                question="Do you help with content creation?"
                answer="While our primary focus is on design and development, we can provide guidance on content strategy and structure. We also have partnerships with content creators and can recommend resources if needed."
                delay={0.5}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

const FaqItem = ({ question, answer, delay = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <FadeIn delay={delay}>
      <div className="border border-foreground/10 rounded-xl overflow-hidden">
        <button
          className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3 className="text-xl font-bold">{question}</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="p-6 pt-0 text-secondary">
            {answer}
          </div>
        </motion.div>
      </div>
    </FadeIn>
  );
}; 