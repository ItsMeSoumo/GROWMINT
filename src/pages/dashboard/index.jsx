import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { FadeIn } from '@/components/animations';
import { FiDollarSign, FiCreditCard, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === 'unauthenticated') {
      router.replace('/sign-in');
    }
    
    // Initialize userData with session values if available
    if (session?.user) {
      setUserData(prevData => ({
        ...prevData,
        money: session.user.money || 0,
        presentmoney: session.user.presentmoney || 0,
        profit: session.user.profit || 0
      }));
    }
    
    // Fetch user data when session is available
    if (session?.user?.id) {
      fetchUserData();
    }
  }, [session, status, router]);
  
  const fetchUserData = async () => {
    try {
      setIsRefreshing(true);
      
      // Initialize with session data immediately
      if (session?.user) {
        setUserData(prevData => ({
          ...prevData,
          id: session.user.id,
          email: session.user.email,
          username: session.user.username,
          isVerified: session.user.isVerified,
          money: session.user.money || 0,
          presentmoney: session.user.presentmoney || 0,
          profit: session.user.profit || 0,
          createdAt: session.user.createdAt
        }));
      }
      
      // Then fetch latest data from the API
      const response = await fetch('/api/user/update-finances');
      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };
  
  const refreshData = async () => {
    await fetchUserData();
  };
  
  if (status === 'loading') {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-xl">Loading...</div>
        </div>
      </Layout>
    );
  }
  
  if (!session) {
    return null; // This will be handled by the redirect in useEffect
  }
  
  return (
    <Layout>
      <Head>
        <title>Dashboard | GROWMINT</title>
      </Head>
      
      <section className="pt-24 pb-6" style={{ backgroundColor: '#2D1B69', minHeight: '100vh', color: '#fff' }}>
        <div className="container mx-auto px-4">
          <FadeIn>

            {/* User Profile Information Card */}
            <div className="bg-purple-900/40 rounded-xl shadow-lg mb-8 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-1">Dashboard</h2>
                    <p className="text-purple-200 text-lg">Financial Overview</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{userData?.username || 'User'}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-purple-200">{userData?.email || 'Loading...'}</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="bg-purple-800/50 px-4 py-2 rounded-lg">
                      <p className="text-sm text-purple-200">Verification Status</p>
                      <div className="flex items-center mt-1">
                        <div className={`w-3 h-3 rounded-full mr-2 ${userData?.isVerified ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                        <span className="font-medium text-white">{userData?.isVerified ? 'Verified' : 'Pending'}</span>
                      </div>
                    </div>
                    <div className="bg-purple-800/50 px-4 py-2 rounded-lg">
                      <p className="text-sm text-purple-200">Member Since</p>
                      <p className="font-medium text-white">
                        {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        }) : 'Loading...'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Refresh data button */}
            <div className="flex justify-end mb-6">
              <button 
                onClick={refreshData} 
                disabled={isRefreshing}
                className="flex items-center space-x-2 bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-lg shadow-md transition-all duration-300 disabled:opacity-70"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{isRefreshing ? 'Refreshing...' : 'Refresh Data'}</span>
              </button>
            </div>
            
            {/* Financial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Total Profit */}
              <div className="bg-purple-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-green-500">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-purple-200 font-medium mb-1">Total Profit</p>
                    <h3 className="text-2xl font-bold text-white">${userData?.profit?.toFixed(2) || '0.00'}</h3>
                  </div>
                  <div className="bg-green-500/30 p-4 rounded-full shadow-inner">
                    <FiDollarSign className="text-green-400 text-2xl" />
                  </div>
                </div>
              </div>
              
              {/* Account Balance */}
              <div className="bg-purple-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-cyan-500">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-purple-200 font-medium mb-1">Account Balance</p>
                    <h3 className="text-2xl font-bold text-white">${userData?.money?.toFixed(2) || '0.00'}</h3>
                  </div>
                  <div className="bg-cyan-500/30 p-4 rounded-full shadow-inner">
                    <FiCreditCard className="text-cyan-400 text-2xl" />
                  </div>
                </div>
              </div>
              
              {/* Present Money */}
              <div className="bg-purple-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-purple-500">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-purple-200 font-medium mb-1">Present Money</p>
                    <div className="flex items-center">
                      <h3 className="text-2xl font-bold text-white">${userData?.presentmoney?.toFixed(2) || '0.00'}</h3>
                      {userData?.money > 0 && userData?.presentmoney !== userData?.money && (
                        <span className={`ml-2 text-sm font-medium ${userData?.presentmoney > userData?.money ? 'text-green-500' : 'text-red-500'}`}>
                          {userData?.presentmoney > userData?.money ? '+' : ''}
                          {((userData?.presentmoney - userData?.money) / userData?.money * 100).toFixed(2)}%
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="bg-purple-500/30 p-4 rounded-full shadow-inner">
                    <FiDollarSign className="text-purple-400 text-2xl" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Profit/Loss Box */}
            <div className="mt-8 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Profit/Loss Overview</h3>
              <div className="bg-purple-800/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-purple-700/50">
                {userData?.money > 0 && (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-white">Investment Performance</h4>
                        <p className="text-sm text-purple-200">Based on your initial investment</p>
                      </div>
                      <div className={`px-4 py-2 rounded-full ${userData?.presentmoney >= userData?.money ? 'bg-green-500/30' : 'bg-red-500/30'}`}>
                        <span className={`font-medium ${userData?.presentmoney >= userData?.money ? 'text-green-400' : 'text-red-400'}`}>
                          {userData?.presentmoney >= userData?.money ? 'Profit' : 'Loss'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-purple-700/30 p-4 rounded-lg">
                        <p className="text-sm text-purple-200 mb-1">Initial Investment</p>
                        <p className="text-xl font-bold text-white">${userData?.money?.toFixed(2)}</p>
                      </div>
                      <div className="bg-purple-700/30 p-4 rounded-lg">
                        <p className="text-sm text-purple-200 mb-1">Current Value</p>
                        <p className="text-xl font-bold text-white">${userData?.presentmoney?.toFixed(2)}</p>
                      </div>
                      <div className={`p-4 rounded-lg ${userData?.presentmoney >= userData?.money ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                        <p className="text-sm text-purple-200 mb-1">{userData?.presentmoney >= userData?.money ? 'Profit' : 'Loss'}</p>
                        <div className="flex items-center">
                          {userData?.presentmoney >= userData?.money ? (
                            <FiTrendingUp className="text-green-400 mr-2 text-xl" />
                          ) : (
                            <FiTrendingDown className="text-red-400 mr-2 text-xl" />
                          )}
                          <p className={`text-xl font-bold ${userData?.presentmoney >= userData?.money ? 'text-green-400' : 'text-red-400'}`}>
                            {userData?.presentmoney >= userData?.money ? '+' : ''}${Math.abs(userData?.presentmoney - userData?.money).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                    

                  </div>
                )}
                {(!userData?.money || userData?.money <= 0) && (
                  <div className="p-6 text-center">
                    <p className="text-purple-200">No investment data available</p>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
