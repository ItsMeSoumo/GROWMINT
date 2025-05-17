import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { FadeIn, SlideIn } from '@/components/animations';
import { signIn, useSession } from 'next-auth/react';

export default function SignIn() {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [error, setError] = useState('');
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();
  
  // Redirect to home if already logged in
  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);
  
  const handleChange = (e) => {
     setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all the required fields');
      return;
    }
    
    if (activeTab === 'signup' && !formData.username) {
      setError('Please enter your username');
      return;
    }
    
    if (activeTab === 'login') {
      // Sign in with NextAuth
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password
      });
      
      if (result.error) {
        setError(result.error);
      } else {
        router.push('/');
      }
    } else {
      // Sign up - call your API endpoint
      try {
        // Use full URL to avoid any redirection issues
      const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://www.growmint.net';
      const response = await fetch(`${domain}/api/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            username: formData.username
          })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }
        
        // Auto login after signup
        const result = await signIn('credentials', {
          redirect: false,
          email: formData.email,
          password: formData.password
        });
        
        if (result.error) {
          setError(result.error);
        } else {
          router.push('/');
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <Layout>
      <Head>
        <title>{activeTab === 'login' ? 'Sign In' : 'Sign Up'} | Growmint</title>
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
                      <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
                      <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={formData.username}
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