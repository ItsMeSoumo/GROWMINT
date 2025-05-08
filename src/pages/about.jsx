import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <Layout>
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
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-glow font-display tracking-tight">About Growmint</h1>
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                We're a team of passionate developers and designers creating exceptional digital experiences.
              </p>
            </div>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">Our Mission</h2>
                <div className="h-1 w-24 bg-gradient-to-r from-accent to-purple-400 mb-8" />
                <p className="text-white/80 mb-6 leading-relaxed">
                  At Growmint, we blend technical expertise with innovative design thinking to deliver premium web solutions that exceed expectations. Our team of elite developers and designers create websites that not only look exceptional but perform flawlessly.
                </p>
                <p className="text-white/80 mb-6 leading-relaxed">
                  We remain at the forefront of web technology, utilizing advanced tools like React, Three.js, and Framer Motion to create immersive, interactive experiences that captivate users and drive measurable results.
                </p>
              </div>
              <div className="relative">
                <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl border border-white/10">
                  <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-purple-900/40 to-black/80 flex items-center justify-center">
                    <div className="p-12 text-center">
                      <div className="text-5xl mb-4">🚀</div>
                      <h3 className="text-2xl font-bold mb-2">Innovation First</h3>
                      <p className="text-white/70">Pushing boundaries with creative solutions</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -z-10 inset-0 blur-xl bg-purple-600/10 rounded-full animate-blob"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Values */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center font-display">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovation",
                  description: "We're constantly exploring new technologies and approaches to deliver cutting-edge solutions.",
                  icon: "💡"
                },
                {
                  title: "Quality",
                  description: "We're committed to excellence in every pixel, line of code, and interaction.",
                  icon: "✨"
                },
                {
                  title: "Collaboration",
                  description: "We work closely with our clients to ensure their vision comes to life.",
                  icon: "🤝"
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
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-white/70">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">Ready to work with us?</h2>
              <p className="text-xl text-white/80 mb-8">
                Let's create something amazing together.
              </p>
              <Link href="/contact" className="btn btn-accent btn-lg">
                Get in touch
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
