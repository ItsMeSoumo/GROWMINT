import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import { signIn, useSession } from 'next-auth/react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  
  // Redirect to home if already logged in
  if (session) {
    router.push('/');
    return null;
  }
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simple validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all the required fields');
      setIsLoading(false);
      return;
    }
    
    // Sign in with NextAuth
    try {
      console.log('Attempting login with:', { email: formData.email });
      
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password
      });
      
      if (result.error) {
        console.log('Login error:', result.error);
        setError(result.error);
        setIsLoading(false);
      } else {
        console.log('Login successful, redirecting...');
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Login exception:', err);
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };
  
  return (
    <Layout>
      <Head>
        <title>Login | Growmint</title>
        <meta name="description" content="Login to your Growmint account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <section className="min-h-screen pt-32 pb-16 bg-gradient-to-b from-indigo-900 via-purple-800 to-purple-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-3xl opacity-60 animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-3xl opacity-60 animate-pulse-slow-delay"></div>
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-pink-500/10 blur-2xl opacity-40 animate-float"></div>
          <div className="absolute bottom-1/3 right-1/4 w-[250px] h-[250px] rounded-full bg-blue-500/10 blur-2xl opacity-40 animate-float-delay"></div>
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full animate-float-particle"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 10}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gODAgMCBMIDAgMCAwIDgwIiBmaWxsPSJub25lIiBzdHJva2U9IiMyMDIzMzgiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-[0.15]"></div>
        </div>
        
        <div className="container mx-auto px-6 md:px-12 flex justify-center items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            {/* Card with glassmorphism effect */}
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
              {/* Card highlights */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent"></div>
              <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-indigo-400/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"></div>
              <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-transparent to-purple-400/30"></div>
              
              {/* Logo and branding */}
              <div className="flex justify-center mb-8">
                <motion.div 
                  className="text-4xl font-bold"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                </motion.div>
              </div>
              
              {/* Error message */}
              <AnimatePresence>
                {error && (
                  <motion.div 
                    className="bg-red-400/10 border border-red-400/30 text-red-400 p-4 rounded-xl mb-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {error}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-indigo-200">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none text-white placeholder-white/40 transition-all duration-300"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                {/* Password field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-2 text-indigo-200">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none text-white placeholder-white/40 transition-all duration-300"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-70"
                    whileHover={{ scale: isLoading ? 1 : 1.02, boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.5)' }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </div>
                    ) : 'Login'}
                  </motion.button>
                </div>
                
                {/* Security note */}
                <motion.p
                  className="text-center text-indigo-200/70 text-sm mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Secure login • Protected by encryption
                </motion.p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}