import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { FadeIn, ScaleIn } from '@/components/animations';

export default function Custom404() {
  return (
    <Layout>
      <Head>
        <title>Page Not Found | Growmint</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <ScaleIn>
            <h1 className="text-6xl md:text-9xl font-bold text-accent mb-4">404</h1>
          </ScaleIn>
          
          <FadeIn delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Page Not Found</h2>
            <p className="text-secondary max-w-md mx-auto mb-10">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <Link href="/" className="inline-block px-8 py-3 bg-accent text-white rounded-full hover-scale">
              Back to Home
            </Link>
          </FadeIn>
          
          <motion.div 
            className="mt-16 max-w-sm mx-auto opacity-30"
            animate={{ 
              rotateZ: [0, 5, -5, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
            </svg>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
} 