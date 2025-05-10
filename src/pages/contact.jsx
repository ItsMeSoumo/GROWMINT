import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
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
                Got a project in mind? You can easily request your desired service through our services section.
                If you're curious to learn more about what we offer, feel free to reach out to us. We would love to hear from you!
              </p>
              
              <Link href="/services" className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full hover:opacity-90 transition text-lg font-medium">
                Explore Our Services
              </Link>
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
                  Fill out the form below and we'll get back to you as soon as possible.
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
                  Feel free to reach out to us through any of the following channels. We're here to answer your questions and guide you through the next steps to bring your vision to life.
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
                      <p className="text-secondary">+60 17-561 1262</p>
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
                      <p className="text-secondary">business@growmint.net</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                  <div className="flex gap-4">
                    <a href="https://x.com/IGrowmint" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent hover-scale">
                      <span className="sr-only">X</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
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
                    <a href="https://www.instagram.com/growmint_ltd/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent hover-scale">
                      <span className="sr-only">Instagram</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a href="https://discord.gg/S6rd9j7J8E" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent hover-scale">
                      <span className="sr-only">Discord</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </SlideIn>
            </div>
          </div>
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