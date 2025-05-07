import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { FadeIn, SlideIn } from '@/components/animations';
import { useAuth } from './_app';
import ProtectedRoute from '@/components/ProtectedRoute';

const DashboardCard = ({ title, value, color, icon }) => (
  <div className={`bg-background border border-foreground/10 rounded-xl p-6 hover-scale`}>
    <div className={`text-${color} mb-4 text-4xl`}>{icon}</div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-4xl font-bold">{value}</p>
  </div>
);

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <ProtectedRoute>
      <Layout>
        <Head>
          <title>Dashboard | Growmint</title>
          <meta name="description" content="Your personal dashboard" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <section className="min-h-screen pt-32 pb-16 bg-background relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-12">
            <FadeIn>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    Welcome back, <span className="text-accent">{user?.name}</span>
                  </h1>
                  <p className="text-secondary">Here's an overview of your account</p>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <motion.button
                    className="px-6 py-2 bg-accent text-white rounded-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    New Project
                  </motion.button>
                </div>
              </div>
              
              <div className="mb-10">
                <div className="flex border-b border-foreground/10 mb-6">
                  <button 
                    className={`px-4 py-2 ${activeTab === 'overview' ? 'border-b-2 border-accent' : ''}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                  <button 
                    className={`px-4 py-2 ${activeTab === 'projects' ? 'border-b-2 border-accent' : ''}`}
                    onClick={() => setActiveTab('projects')}
                  >
                    Projects
                  </button>
                  <button 
                    className={`px-4 py-2 ${activeTab === 'settings' ? 'border-b-2 border-accent' : ''}`}
                    onClick={() => setActiveTab('settings')}
                  >
                    Settings
                  </button>
                </div>
                
                {activeTab === 'overview' && (
                  <SlideIn>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <DashboardCard 
                        title="Active Projects" 
                        value="3" 
                        color="accent"
                        icon={
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                          </svg>
                        } 
                      />
                      <DashboardCard 
                        title="Total Hours" 
                        value="42" 
                        color="success"
                        icon={
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                        } 
                      />
                      <DashboardCard 
                        title="Messages" 
                        value="7" 
                        color="warning"
                        icon={
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                          </svg>
                        } 
                      />
                    </div>
                    
                    <div className="mt-10">
                      <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                      <div className="bg-background border border-foreground/10 rounded-xl p-6">
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="w-2 h-2 mt-2 rounded-full bg-accent mr-4"></div>
                            <div>
                              <p className="font-medium">Website redesign project created</p>
                              <p className="text-sm text-secondary">2 days ago</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="w-2 h-2 mt-2 rounded-full bg-success mr-4"></div>
                            <div>
                              <p className="font-medium">Payment received for E-commerce project</p>
                              <p className="text-sm text-secondary">1 week ago</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="w-2 h-2 mt-2 rounded-full bg-warning mr-4"></div>
                            <div>
                              <p className="font-medium">New message from client</p>
                              <p className="text-sm text-secondary">3 weeks ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SlideIn>
                )}
                
                {activeTab === 'projects' && (
                  <SlideIn>
                    <div className="text-center py-10">
                      <h2 className="text-xl font-bold mb-2">Projects Coming Soon</h2>
                      <p className="text-secondary">This feature is under development</p>
                    </div>
                  </SlideIn>
                )}
                
                {activeTab === 'settings' && (
                  <SlideIn>
                    <div className="text-center py-10">
                      <h2 className="text-xl font-bold mb-2">Settings Coming Soon</h2>
                      <p className="text-secondary">This feature is under development</p>
                    </div>
                  </SlideIn>
                )}
              </div>
            </FadeIn>
          </div>
        </section>
      </Layout>
    </ProtectedRoute>
  );
} 