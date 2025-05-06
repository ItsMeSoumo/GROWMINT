import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { initScrollReveal } from '@/utils/scrollReveal';

const PremiumAbout = () => {
  useEffect(() => {
    // Initialize scroll reveal animations
    const { cleanup } = initScrollReveal();
    return () => {
      cleanup();
    };
  }, []);

  return (
    <Layout>
      <Head>
        <title>About Growmint | Premium Web Development Studio</title>
        <meta name="description" content="Learn about Growmint's approach to creating exceptional digital experiences through premium web development services." />
      </Head>

      <div className="relative pt-32 pb-20">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(123,31,162,0.15)_0%,rgba(128,0,255,0.1)_25%,rgba(76,29,149,0.05)_50%,rgba(0,0,0,0)_100%)] blur-2xl"></div>
          <div className="absolute inset-0 opacity-30 bg-[url('/noise.png')] mix-blend-overlay" />
          <div className="absolute inset-0 opacity-5 bg-[url('/grid.svg')]" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <div className="text-center mb-16 scroll-reveal scroll-reveal-fade">
            <p className="premium-text text-accent mb-4 tracking-widest">OUR STORY</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 font-luxury tracking-tight leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-500 drop-shadow-[0_5px_15px_rgba(255,255,255,0.15)]">About</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-400 to-accent drop-shadow-[0_5px_15px_rgba(168,85,247,0.3)]">Growmint</span>
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-accent to-purple-400 mx-auto mb-10" />
            <p className="text-white/90 max-w-3xl mx-auto text-xl font-light tracking-wide">
              We blend technical expertise with creative vision to deliver exceptional digital experiences.
            </p>
          </div>

          {/* About content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div className="scroll-reveal scroll-reveal-left">
              <div className="relative rounded-2xl overflow-hidden aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-black/10"></div>
                <img 
                  src="/team.jpg" 
                  alt="Growmint Team" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
              </div>
            </div>

            <div className="scroll-reveal scroll-reveal-right">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display tracking-tight leading-tight text-white">Our Vision & Mission</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-accent to-purple-400 mb-8" />
              
              <p className="text-white/90 mb-6 text-lg leading-relaxed font-light">
                At Growmint, we believe that exceptional digital experiences are built at the intersection of stunning design and flawless functionality. Founded in 2018, our studio has evolved into a team of passionate creatives and technical experts dedicated to pushing the boundaries of what's possible on the web.
              </p>
              
              <p className="text-white/90 mb-8 text-lg leading-relaxed font-light">
                We approach each project with meticulous attention to detail, ensuring that every website we create not only meets but exceeds our clients' expectations. By staying at the forefront of emerging technologies and design trends, we deliver digital solutions that stand out in today's competitive landscape.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-2 rounded-full bg-purple-900/30 border border-purple-500/30 text-white">Innovation-Driven</span>
                <span className="px-4 py-2 rounded-full bg-purple-900/30 border border-purple-500/30 text-white">Client-Focused</span>
                <span className="px-4 py-2 rounded-full bg-purple-900/30 border border-purple-500/30 text-white">Quality-Obsessed</span>
              </div>
            </div>
          </div>
          
          {/* Team section */}
          <div className="text-center mb-16 scroll-reveal scroll-reveal-fade">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display tracking-tight leading-tight text-white">Meet Our Team</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-accent to-purple-400 mx-auto mb-10" />
            <p className="text-white/90 max-w-3xl mx-auto text-lg font-light tracking-wide mb-12">
              A collective of passionate designers, developers, and digital strategists committed to excellence.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Team member cards would go here */}
              {[
                {
                  name: "Alex Morgan",
                  role: "Creative Director",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                },
                {
                  name: "Sarah Chen",
                  role: "Lead Developer",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                },
                {
                  name: "Michael Reynolds",
                  role: "UX Designer",
                  image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                }
              ].map((member, index) => (
                <motion.div 
                  key={index}
                  className="relative bg-gradient-to-br from-[#1a1721]/90 to-[#0e0b12]/90 backdrop-blur-md rounded-2xl p-6 border border-[#2a2536]/50 scroll-reveal scroll-reveal-up"
                  style={{ transitionDelay: `${index * 100}ms` }}
                  whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.15)" }}
                >
                  {/* Glow effects */}
                  <div className="absolute top-0 left-0 w-3/4 h-1/4 bg-[radial-gradient(ellipse_at_center,rgba(156,60,183,0.15)_0%,transparent_70%)]" />
                  <div className="absolute -bottom-4 -right-4 w-3/4 h-3/4 bg-[radial-gradient(ellipse_at_center,rgba(156,60,183,0.1)_0%,transparent_70%)]" />
                  <div className="absolute inset-0 bg-white/5 opacity-10" />
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
                  
                  <div className="relative z-10">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-2 ring-purple-500/30">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-bold mb-1 text-white">{member.name}</h3>
                    <p className="text-purple-400 mb-4">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* CTA section */}
          <div className="mt-20 text-center">
            <div className="max-w-3xl mx-auto backdrop-blur-md bg-black/20 border border-purple-500/20 shadow-lg hover:shadow-purple-500/30 transition-all duration-500 rounded-3xl p-12 relative overflow-hidden scroll-reveal scroll-reveal-fade">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display tracking-tight leading-tight text-white">Ready to Work Together?</h2>
                <p className="text-white/90 max-w-xl mx-auto mb-8 text-lg font-light tracking-wide">
                  Let's collaborate to create a digital experience that elevates your brand and captivates your audience.
                </p>
                
                <Link href="/contact" className="bg-gradient-to-r from-accent to-purple-600 text-white px-10 py-4 rounded-full text-lg font-medium inline-flex items-center tracking-wide transition-all duration-150 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Start a Conversation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PremiumAbout; 