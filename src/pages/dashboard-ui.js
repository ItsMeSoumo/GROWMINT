import { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

// Custom components for the dashboard
import SideNav from '@/components/dashboard/SideNav';
import EffectsGrid from '@/components/dashboard/EffectsGrid';
import ProjectsGrid from '@/components/dashboard/ProjectsGrid';
import StatsGrid from '@/components/dashboard/StatsGrid';
import Cursor from '@/components/dashboard/Cursor';

export default function DashboardUI() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('effects');
  const router = useRouter();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const sections = {
    effects: <EffectsGrid />,
    projects: <ProjectsGrid />,
    stats: <StatsGrid />,
  };

  return (
    <>
      <Head>
        <title>Dashboard UI | Growmint</title>
        <meta name="description" content="Interactive dashboard UI with animations" />
      </Head>

      <div className="dark-theme min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-gray-100 relative overflow-hidden">
        
        {/* Background grid pattern with glow */}
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
        
        {/* Glassmorphism glow effects */}
        <div className="absolute top-20 -left-40 w-80 h-80 bg-blue-500 rounded-full filter blur-[120px] opacity-20"></div>
        <div className="absolute bottom-20 -right-40 w-80 h-80 bg-purple-500 rounded-full filter blur-[120px] opacity-20"></div>
        
        {/* Navigation toggle button */}
        <button 
          onClick={toggleNav}
          className="fixed top-6 left-6 z-50 p-3 bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-full shadow-neon-purple"
        >
          <motion.div 
            animate={{ rotate: isNavOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isNavOpen ? (
                <path d="M18 6L6 18M6 6l12 12"></path>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </motion.div>
        </button>
        
        {/* Side Navigation */}
        <AnimatePresence>
          {isNavOpen && (
            <SideNav 
              isOpen={isNavOpen} 
              onClose={toggleNav}
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          )}
        </AnimatePresence>
        
        {/* Main content */}
        <main className="container mx-auto pt-20 px-6 pb-12">
          {/* Header */}
          <div className="mb-12 flex justify-between items-center">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Interactive Dashboard
            </motion.h1>
            
            <motion.div 
              className="flex space-x-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Section tabs */}
              <button 
                onClick={() => setActiveSection('effects')}
                className={`px-4 py-2 rounded-md transition-all ${activeSection === 'effects' 
                  ? 'bg-purple-500 text-white shadow-neon-purple' 
                  : 'bg-gray-800 bg-opacity-50 hover:bg-gray-700'}`}
              >
                Effects
              </button>
              <button 
                onClick={() => setActiveSection('projects')}
                className={`px-4 py-2 rounded-md transition-all ${activeSection === 'projects' 
                  ? 'bg-purple-500 text-white shadow-neon-purple' 
                  : 'bg-gray-800 bg-opacity-50 hover:bg-gray-700'}`}
              >
                Projects
              </button>
              <button 
                onClick={() => setActiveSection('stats')}
                className={`px-4 py-2 rounded-md transition-all ${activeSection === 'stats' 
                  ? 'bg-purple-500 text-white shadow-neon-purple' 
                  : 'bg-gray-800 bg-opacity-50 hover:bg-gray-700'}`}
              >
                Stats
              </button>
            </motion.div>
          </div>
          
          {/* Section content with page transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {sections[activeSection]}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      
      {/* Custom cursor effects for the dashboard */}
      <Cursor />
    </>
  );
} 