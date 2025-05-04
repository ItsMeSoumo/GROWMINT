import Head from 'next/head';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { FadeIn, SlideIn, ScaleIn, Stagger, StaggerItem } from '@/components/animations';

// Dynamically import the 3D scene to avoid SSR issues
const Scene3D = dynamic(() => import('@/components/Scene3D'), { ssr: false });

// Team member component
const TeamMember = ({ name, role, image, delay = 0 }) => (
  <FadeIn delay={delay}>
    <div className="text-center">
      <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 bg-accent/10 flex items-center justify-center text-6xl text-accent">
        {name[0]}
      </div>
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-secondary">{role}</p>
    </div>
  </FadeIn>
);

// Timeline item component
const TimelineItem = ({ year, title, description, right = false }) => (
  <div className={`flex ${right ? 'justify-end' : ''}`}>
    <div className={`relative ${right ? 'text-right' : ''} max-w-md`}>
      <div className="absolute w-3 h-3 bg-accent rounded-full mt-1.5" style={{ [right ? 'right' : 'left']: '-1.5rem' }}></div>
      <p className="text-accent font-bold">{year}</p>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-secondary">{description}</p>
    </div>
  </div>
);

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About Us | Growmint</title>
        <meta name="description" content="Learn about Growmint - a passionate team of web developers creating exceptional digital experiences" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <SlideIn direction="up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                About <span className="text-accent">Growmint</span>
              </h1>
            </SlideIn>
            
            <FadeIn delay={0.2}>
              <p className="text-xl text-secondary mb-8">
                We're a team of passionate developers, designers, and digital strategists dedicated to creating exceptional web experiences.
              </p>
            </FadeIn>
          </div>
        </div>
        
        <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-20 md:opacity-30">
          <Scene3D height="100%" interactive={false} />
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <FadeIn>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
                <p className="text-secondary mb-4">
                  Founded in 2018, Growmint began with a simple mission: to create websites that don't just look good, but also deliver real results for our clients.
                </p>
                <p className="text-secondary mb-4">
                  What started as a small team of three developers working from a tiny office has grown into a thriving agency with a reputation for technical excellence and creative innovation.
                </p>
                <p className="text-secondary">
                  Today, we're proud to work with clients ranging from ambitious startups to established enterprises, helping them leverage the latest web technologies to grow their businesses and connect with their audiences.
                </p>
              </FadeIn>
            </div>
            
            <div className="relative h-96 grid-background rounded-xl overflow-hidden">
              <FadeIn delay={0.2}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl font-bold text-accent opacity-20">2018</div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-1/3"></div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-background/50 grid-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Values</h2>
              <p className="text-secondary max-w-3xl mx-auto">
                These core principles guide everything we do, from how we approach projects to how we build our team.
              </p>
            </FadeIn>
          </div>
          
          <Stagger>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StaggerItem>
                <div className="glass hover-scale rounded-xl p-8">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 neon-text">Excellence</h3>
                  <p className="text-secondary">
                    We're committed to delivering work of the highest quality, paying attention to every detail and constantly refining our craft.
                  </p>
                </div>
              </StaggerItem>
              
              <StaggerItem>
                <div className="glass hover-scale rounded-xl p-8">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 neon-text">Innovation</h3>
                  <p className="text-secondary">
                    We stay at the cutting edge of web technology, constantly exploring new tools and techniques to push the boundaries of what's possible.
                  </p>
                </div>
              </StaggerItem>
              
              <StaggerItem>
                <div className="glass hover-scale rounded-xl p-8">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 neon-text">Collaboration</h3>
                  <p className="text-secondary">
                    We believe the best work happens when we partner closely with our clients, understanding their goals and working together to achieve them.
                  </p>
                </div>
              </StaggerItem>
            </div>
          </Stagger>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Journey</h2>
              <p className="text-secondary max-w-3xl mx-auto">
                The key moments that shaped Growmint's growth and evolution.
              </p>
            </FadeIn>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-1/2 -ml-px h-full w-0.5 bg-foreground/10"></div>
            
            <div className="space-y-16">
              <div className="relative">
                <TimelineItem 
                  year="2018" 
                  title="The Beginning" 
                  description="Growmint was founded by three developers with a shared vision for creating exceptional web experiences."
                />
              </div>
              
              <div className="relative">
                <TimelineItem 
                  year="2019" 
                  title="First Major Client" 
                  description="Secured our first enterprise client and expanded our team to include dedicated designers."
                  right
                />
              </div>
              
              <div className="relative">
                <TimelineItem 
                  year="2020" 
                  title="Remote Transition" 
                  description="Successfully transitioned to a fully remote team, expanding our talent pool globally."
                />
              </div>
              
              <div className="relative">
                <TimelineItem 
                  year="2021" 
                  title="3D Web Innovation" 
                  description="Began pioneering the use of 3D web technologies, establishing ourselves as leaders in immersive web experiences."
                  right
                />
              </div>
              
              <div className="relative">
                <TimelineItem 
                  year="2022" 
                  title="Industry Recognition" 
                  description="Received multiple awards for our innovative approach to web development and design."
                />
              </div>
              
              <div className="relative">
                <TimelineItem 
                  year="2023" 
                  title="Global Expansion" 
                  description="Expanded our client base to include companies from across Europe, Asia, and Australia."
                  right
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background/50 grid-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Team</h2>
              <p className="text-secondary max-w-3xl mx-auto">
                The talented individuals who make the magic happen.
              </p>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <TeamMember 
              name="Alex Morgan" 
              role="Founder & CEO" 
              delay={0.1}
            />
            
            <TeamMember 
              name="Jamie Chen" 
              role="Lead Developer" 
              delay={0.2}
            />
            
            <TeamMember 
              name="Taylor Kim" 
              role="UI/UX Director" 
              delay={0.3}
            />
            
            <TeamMember 
              name="Jordan Smith" 
              role="3D Specialist" 
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent text-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <ScaleIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to work with us?</h2>
            <p className="text-white/80 max-w-3xl mx-auto mb-10">
              Let's collaborate to bring your vision to life with the latest web technologies.
            </p>
            
            <a href="/contact" className="inline-block px-8 py-3 bg-white text-accent rounded-full hover-scale">
              Get in Touch
            </a>
          </ScaleIn>
        </div>
      </section>
    </Layout>
  );
} 