import Head from 'next/head';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { FadeIn, SlideIn, ScaleIn, Stagger, StaggerItem } from '@/components/animations';

// Dynamically import the 3D scene to avoid SSR issues
const Scene3D = dynamic(() => import('@/components/Scene3D'), { ssr: false });

// Service detail component
const ServiceDetail = ({ title, description, features, icon, alignment = "left", delay = 0 }) => (
  <div className={`grid grid-cols-1 md:grid-cols-5 gap-8 items-center my-20 ${alignment === "right" ? "md:text-right" : ""}`}>
    <div className={`md:col-span-3 ${alignment === "right" ? "md:order-2" : ""}`}>
      <SlideIn direction={alignment === "right" ? "right" : "left"} delay={delay}>
        <h3 className="text-2xl md:text-3xl font-bold mb-4">{title}</h3>
        <p className="text-secondary mb-6">{description}</p>
        
        <ul className={`space-y-3 ${alignment === "right" ? "ml-auto" : ""}`}>
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-accent mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </SlideIn>
    </div>
    
    <div className={`md:col-span-2 ${alignment === "right" ? "md:order-1" : ""}`}>
      <FadeIn delay={delay + 0.2}>
        <div className="bg-background/50 grid-background border border-foreground/10 rounded-xl p-6 aspect-square flex items-center justify-center">
          <div className="text-accent text-9xl">
            {icon}
          </div>
        </div>
      </FadeIn>
    </div>
  </div>
);

// Process step component
const ProcessStep = ({ number, title, description, delay = 0 }) => (
  <FadeIn delay={delay}>
    <div className="bg-background border border-foreground/10 rounded-xl p-8 hover-scale">
      <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white text-xl font-bold mb-6">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-secondary">{description}</p>
    </div>
  </FadeIn>
);

export default function Services() {
  return (
    <Layout>
      <Head>
        <title>Services | Growmint</title>
        <meta name="description" content="Professional web development services including interactive 3D experiences, responsive design, and modern UI/UX" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <SlideIn direction="up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Our <span className="text-accent">Services</span>
              </h1>
            </SlideIn>
            
            <FadeIn delay={0.2}>
              <p className="text-xl text-secondary mb-8">
                We provide cutting-edge web solutions using the latest technologies to help your business stand out in the digital landscape.
              </p>
            </FadeIn>
          </div>
        </div>
        
        <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-20 md:opacity-30">
          <Scene3D height="100%" interactive={false} />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <ServiceDetail 
            title="Web Development" 
            description="We build custom websites that are fast, secure, and optimized for all devices. Our development approach focuses on clean code, performance, and scalability to ensure your site can grow with your business."
            features={[
              "Custom websites built with React.js and Next.js",
              "Responsive design for all devices and screen sizes",
              "Performance optimization for fast load times",
              "SEO-friendly structure and semantic markup",
              "Integration with CMS and third-party APIs"
            ]}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            }
            alignment="left"
            delay={0.1}
          />
          
          <ServiceDetail 
            title="UI/UX Design" 
            description="We create intuitive and beautiful user interfaces that engage visitors and drive conversions. Our design process combines aesthetic appeal with functional considerations to deliver exceptional user experiences."
            features={[
              "User research and persona development",
              "Wireframing and prototyping",
              "Custom UI component design",
              "Interactive animations and transitions",
              "Usability testing and optimization"
            ]}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            }
            alignment="right"
            delay={0.1}
          />
          
          <ServiceDetail 
            title="3D Web Experiences" 
            description="We leverage Three.js and React Three Fiber to create immersive 3D experiences that make your website stand out. Our 3D elements are optimized for performance and enhance user engagement without sacrificing load times."
            features={[
              "Interactive 3D models and animations",
              "WebGL-powered visual effects",
              "3D product configurators and showcases",
              "Virtual environments and spaces",
              "Performance optimization for smooth experiences"
            ]}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
            }
            alignment="left"
            delay={0.1}
          />
          
          <ServiceDetail 
            title="E-commerce Solutions" 
            description="We build secure, scalable online stores that drive sales and provide excellent shopping experiences. Our e-commerce solutions are tailored to your specific business needs and integrate with your existing systems."
            features={[
              "Custom e-commerce websites",
              "Secure payment processing integration",
              "Inventory and order management systems",
              "Mobile-optimized shopping experiences",
              "Customer analytics and insights"
            ]}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            alignment="right"
            delay={0.1}
          />
          
          <ServiceDetail 
            title="Web Applications" 
            description="We develop custom web applications that solve complex business problems and optimize workflows. Our applications are secure, scalable, and built with modern technologies to ensure long-term performance."
            features={[
              "Custom business applications",
              "Admin dashboards and management systems",
              "SaaS platform development",
              "Real-time collaboration tools",
              "Database design and implementation"
            ]}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            }
            alignment="left"
            delay={0.1}
          />
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 bg-background/50 grid-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Process</h2>
              <p className="text-secondary max-w-3xl mx-auto">
                We follow a structured approach to deliver exceptional results for every project.
              </p>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProcessStep 
              number="1" 
              title="Discovery" 
              description="We begin by understanding your business, goals, target audience, and project requirements through in-depth research and consultation."
              delay={0.1}
            />
            
            <ProcessStep 
              number="2" 
              title="Strategy" 
              description="We create a comprehensive plan outlining the project scope, timeline, technical specifications, and design direction."
              delay={0.2}
            />
            
            <ProcessStep 
              number="3" 
              title="Development" 
              description="Our team brings your project to life using cutting-edge technologies, following best practices and rigorous quality standards."
              delay={0.3}
            />
            
            <ProcessStep 
              number="4" 
              title="Launch & Support" 
              description="We ensure a smooth deployment and provide ongoing support to keep your website performing optimally."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <SlideIn direction="left">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Technologies We Use</h2>
                <p className="text-secondary mb-6">
                  We stay at the forefront of web technology, using modern tools and frameworks to deliver exceptional results.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="text-accent mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>Next.js</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-accent mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>React.js</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-accent mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>Three.js</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-accent mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>React Three Fiber</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="text-accent mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>Tailwind CSS</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-accent mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>Framer Motion</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-accent mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>Node.js</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-accent mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>MongoDB</span>
                    </div>
                  </div>
                </div>
              </SlideIn>
            </div>
            
            <div className="relative h-96 grid-background rounded-xl overflow-hidden">
              <FadeIn delay={0.2}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl font-bold text-accent opacity-20">
                    &lt;/&gt;
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-1/3"></div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent text-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <ScaleIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your project?</h2>
            <p className="text-white/80 max-w-3xl mx-auto mb-10">
              Contact us today to discuss how we can help bring your vision to life with our expert web development services.
            </p>
            
            <Link href="/contact" className="inline-block px-8 py-3 bg-white text-accent rounded-full hover-scale">
              Get in Touch
            </Link>
          </ScaleIn>
        </div>
      </section>
    </Layout>
  );
} 