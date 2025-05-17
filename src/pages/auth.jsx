import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { FadeIn, SlideIn } from '@/components/animations';
import { useAuth } from './_app';

export default function Auth() {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const { user, login, loading } = useAuth();
  const router = useRouter();
  
  // Redirect to home if already logged in
  useEffect(() => {
    if (user && !loading) {
      router.push('/');
    }
  }, [user, loading, router]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (activeTab === 'signup' && !formData.name) {
      setError('Please enter your name');
      return;
    }
    
    // Mock authentication
    try {
      // In a real app, this would be an API call
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email: formData.email,
        name: activeTab === 'signup' ? formData.name : 'User',
      };
      
      login(userData);
      router.push('/');
    } catch (error) {
      setError('Authentication failed. Please try again.');
    }
  };
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <Layout>
      <Head>
        <title>Authentication | Growmint</title>
        <meta name="description" content="Login or create an account at Growmint" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <section className="min-h-screen pt-32 pb-16 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 flex justify-center">
          <FadeIn>
            <div className="w-full max-w-md bg-background/50 backdrop-blur-lg p-8 rounded-lg border border-foreground/10 shadow-xl">
              <div className="flex mb-6 border-b border-foreground/10">
                <button 
                  className={`px-4 py-2 flex-1 text-center ${activeTab === 'login' ? 'border-b-2 border-accent' : ''}`}
                  onClick={() => setActiveTab('login')}
                >
                  Login
                </button>
                <button 
                  className={`px-4 py-2 flex-1 text-center ${activeTab === 'signup' ? 'border-b-2 border-accent' : ''}`}
                  onClick={() => setActiveTab('signup')}
                >
                  Sign Up
                </button>
              </div>
              
              {error && (
                <div className="bg-danger/10 border border-danger/30 text-danger p-3 rounded mb-4">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                {activeTab === 'signup' && (
                  <SlideIn direction="right">
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-background border border-foreground/20 focus:border-accent focus:outline-none"
                        required={activeTab === 'signup'}
                      />
                    </div>
                  </SlideIn>
                )}
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-background border border-foreground/20 focus:border-accent focus:outline-none"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-background border border-foreground/20 focus:border-accent focus:outline-none"
                    required
                  />
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full py-2 bg-accent text-white rounded hover:bg-accent/90"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {activeTab === 'login' ? 'Login' : 'Create Account'}
                </motion.button>
                
                <p className="text-center text-sm text-secondary mt-4">
                  <span className="cursor-pointer hover:text-accent" onClick={() => alert('Secret access: Triple-click on "Growmint" in the top-left corner!')}>
                    Need a hint?
                  </span>
                </p>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
} 