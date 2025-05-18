import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiDollarSign, 
  FiCreditCard, 
  FiRefreshCw, 
  FiTrendingUp, 
  FiTrendingDown, 
  FiUser, 
  FiPieChart, 
  FiBarChart2, 
  FiActivity, 
  FiCalendar, 
  FiClock, 
  FiCheckCircle, 
  FiXCircle, 
  FiTarget, 
  FiBookOpen, 
  FiPlusCircle, 
  FiMinusCircle, 
  FiAlertCircle,
  FiSettings,
  FiEdit3
} from 'react-icons/fi';
import { BiMoney, BiTrendingUp, BiTrendingDown, BiHappy, BiSad, BiMeh } from 'react-icons/bi';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // New state for enhanced features
  const [activeTab, setActiveTab] = useState('overview');
  const [showTradePanel, setShowTradePanel] = useState(false);
  const [tradeAmount, setTradeAmount] = useState('');
  const [tradeType, setTradeType] = useState('buy');
  const [tradeNote, setTradeNote] = useState('');
  const [journalEntries, setJournalEntries] = useState([]);
  const [journalMood, setJournalMood] = useState('neutral');
  const [journalNote, setJournalNote] = useState('');
  const [portfolioData, setPortfolioData] = useState({
    assets: [
      { name: 'Bitcoin', value: 35, color: '#F7931A' },
      { name: 'Ethereum', value: 25, color: '#627EEA' },
      { name: 'Stocks', value: 20, color: '#4CAF50' },
      { name: 'Commodities', value: 10, color: '#FFC107' },
      { name: 'Cash', value: 10, color: '#2196F3' },
    ],
    recentTransactions: [
      { id: 1, type: 'buy', asset: 'Bitcoin', amount: 0.05, value: 1500, date: new Date(Date.now() - 86400000 * 2), status: 'completed' },
      { id: 2, type: 'sell', asset: 'Ethereum', amount: 2, value: 3200, date: new Date(Date.now() - 86400000 * 5), status: 'completed' },
      { id: 3, type: 'buy', asset: 'Stocks', amount: 10, value: 500, date: new Date(Date.now() - 86400000 * 7), status: 'pending' },
    ]
  });
  
  // Mock data for sparkline charts
  const [performanceData, setPerformanceData] = useState({
    dailyROI: 2.5,
    weeklyROI: -1.2,
    monthlyROI: 15.8,
    winRate: 68,
    avgProfit: 320,
    totalTrades: 24,
    winningTrades: 16,
    losingTrades: 8
  });
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === 'unauthenticated') {
      router.replace('/login');
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
  
  // Helper functions for new features
  const handleTradeSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would send this to your API
    const newTransaction = {
      id: Date.now(),
      type: tradeType,
      asset: 'Bitcoin', // This would be selected by the user in a real app
      amount: parseFloat(tradeAmount),
      value: parseFloat(tradeAmount) * 100, // Mock conversion rate
      date: new Date(),
      status: 'completed',
      note: tradeNote
    };
    
    // Update portfolio data
    setPortfolioData(prev => ({
      ...prev,
      recentTransactions: [newTransaction, ...prev.recentTransactions]
    }));
    
    // Reset form
    setTradeAmount('');
    setTradeNote('');
    setShowTradePanel(false);
    
    // In a real app, you would also update the user's balance
    if (userData) {
      const updatedMoney = tradeType === 'buy' 
        ? userData.money - parseFloat(tradeAmount) 
        : userData.money + parseFloat(tradeAmount);
      
      setUserData({
        ...userData,
        money: updatedMoney
      });
    }
  };
  
  const addJournalEntry = () => {
    if (!journalNote.trim()) return;
    
    const newEntry = {
      id: Date.now(),
      date: new Date(),
      mood: journalMood,
      note: journalNote
    };
    
    setJournalEntries([newEntry, ...journalEntries]);
    setJournalNote('');
    setJournalMood('neutral');
  };
  
  const getMoodIcon = (mood) => {
    switch (mood) {
      case 'positive': return <BiHappy className="text-green-400" />;
      case 'negative': return <BiSad className="text-red-400" />;
      default: return <BiMeh className="text-yellow-400" />;
    }
  };
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  // Generate sparkline data (mock data for visualization)
  const generateSparklineData = (trend = 'up', points = 7) => {
    const baseValue = 100;
    const variance = 15;
    let result = [];
    
    for (let i = 0; i < points; i++) {
      const randomVariance = Math.random() * variance - (trend === 'up' ? variance / 3 : variance / 1.5);
      const value = baseValue + randomVariance + (trend === 'up' ? i * 5 : -i * 5);
      result.push(Math.max(0, value));
    }
    
    return result;
  };
  
  // Function to render a simple sparkline
  const renderSparkline = (data, color, height = 30) => {
    if (!data || data.length === 0) return null;
    
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 100; // width in percentage
    
    return (
      <div className="w-full h-[30px] flex items-end">
        {data.map((value, index) => {
          const heightPercent = ((value - min) / range) * 100;
          return (
            <div 
              key={index}
              className="flex-1 mx-px"
              style={{
                height: `${Math.max(5, heightPercent)}%`,
                backgroundColor: color,
                opacity: 0.7 + (index / data.length) * 0.3
              }}
            />
          );
        })}
      </div>
    );
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
      
      <section className="pt-24 pb-12 min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-6">
          <div className="space-y-8">

            {/* User Profile Information Card */}
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome, {userData?.username || 'User'}</h2>
                    <div className="flex items-center gap-2">
                      <FiUser className="text-indigo-300" />
                      <span className="text-indigo-200">{userData?.email || 'Loading...'}</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="bg-white/5 px-5 py-3 rounded-xl border border-white/10">
                      <p className="text-sm text-indigo-200 mb-1">Verification Status</p>
                      <div className="flex items-center">
                        <div className={`w-2.5 h-2.5 rounded-full mr-2 ${userData?.isVerified ? 'bg-green-400' : 'bg-amber-400'} animate-pulse`}></div>
                        <span className="font-medium text-white">{userData?.isVerified ? 'Verified' : 'Pending'}</span>
                      </div>
                    </div>
                    <div className="bg-white/5 px-5 py-3 rounded-xl border border-white/10">
                      <p className="text-sm text-indigo-200 mb-1">Member Since</p>
                      <p className="font-medium text-white">
                        {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        }) : 'Loading...'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Refresh data button */}
            <div className="flex justify-end">
              <motion.button 
                onClick={refreshData} 
                disabled={isRefreshing}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-70"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FiRefreshCw className={`${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'Refreshing...' : 'Refresh Data'}</span>
              </motion.button>
            </div>
            
            {/* Financial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Profit */}
              <motion.div 
                className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/10 overflow-hidden relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)' }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-50"></div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-indigo-200 font-medium mb-1">Total Profit</p>
                    <h3 className="text-3xl font-bold text-white flex items-center gap-2">
                      ${userData?.profit?.toFixed(2) || '0.00'}
                    </h3>
                  </div>
                  <div className="bg-green-400/10 p-4 rounded-full">
                    <FiDollarSign className="text-green-400 text-2xl" />
                  </div>
                </div>
                
                {/* Sparkline chart */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  {renderSparkline(generateSparklineData('up'), '#4ADE80')}
                  <div className="flex justify-between text-xs text-indigo-200 mt-2">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
                
                {/* Expandable details (shown on hover) */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/80 to-purple-900/80 backdrop-blur-sm flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                  <h4 className="text-xl font-bold text-white mb-2">Profit Breakdown</h4>
                  <div className="w-full space-y-2">
                    <div className="flex justify-between">
                      <span className="text-indigo-200">Today</span>
                      <span className="text-green-400">+$120.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-indigo-200">This Week</span>
                      <span className="text-green-400">+$450.75</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-indigo-200">This Month</span>
                      <span className="text-green-400">+$1,250.25</span>
                    </div>
                  </div>
                  <button className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-300">
                    View Details
                  </button>
                </div>
              </motion.div>
              
              {/* Account Balance */}
              <motion.div 
                className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/10 overflow-hidden relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)' }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"></div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-indigo-200 font-medium mb-1">Account Balance</p>
                    <h3 className="text-3xl font-bold text-white">${userData?.money?.toFixed(2) || '0.00'}</h3>
                  </div>
                  <div className="bg-blue-400/10 p-4 rounded-full">
                    <FiCreditCard className="text-blue-400 text-2xl" />
                  </div>
                </div>
                
                {/* Sparkline chart */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  {renderSparkline(generateSparklineData('up'), '#60A5FA')}
                  <div className="flex justify-between text-xs text-indigo-200 mt-2">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
                
                {/* Expandable details (shown on hover) */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/80 to-purple-900/80 backdrop-blur-sm flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                  <h4 className="text-xl font-bold text-white mb-2">Balance History</h4>
                  <div className="w-full space-y-2">
                    <div className="flex justify-between">
                      <span className="text-indigo-200">Deposits</span>
                      <span className="text-green-400">+$5,000.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-indigo-200">Withdrawals</span>
                      <span className="text-red-400">-$1,200.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-indigo-200">Net Change</span>
                      <span className="text-blue-400">+$3,800.00</span>
                    </div>
                  </div>
                  <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300">
                    Manage Funds
                  </button>
                </div>
              </motion.div>
              
              {/* Present Money */}
              <motion.div 
                className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/10 overflow-hidden relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)' }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50"></div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-indigo-200 font-medium mb-1">Present Value</p>
                    <div className="flex items-center gap-2">
                      <h3 className="text-3xl font-bold text-white">${userData?.presentmoney?.toFixed(2) || '0.00'}</h3>
                      {userData?.money > 0 && userData?.presentmoney !== userData?.money && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${userData?.presentmoney > userData?.money ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'}`}>
                          {userData?.presentmoney > userData?.money ? '+' : ''}
                          {((userData?.presentmoney - userData?.money) / userData?.money * 100).toFixed(2)}%
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="bg-purple-400/10 p-4 rounded-full">
                    <FiDollarSign className="text-purple-400 text-2xl" />
                  </div>
                </div>
                
                {/* Sparkline chart */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  {renderSparkline(generateSparklineData(userData?.presentmoney >= userData?.money ? 'up' : 'down'), userData?.presentmoney >= userData?.money ? '#A78BFA' : '#F87171')}
                  <div className="flex justify-between text-xs text-indigo-200 mt-2">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
                
                {/* Expandable details (shown on hover) */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/80 to-purple-900/80 backdrop-blur-sm flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                  <h4 className="text-xl font-bold text-white mb-2">Value Analysis</h4>
                  <div className="w-full space-y-2">
                    <div className="flex justify-between">
                      <span className="text-indigo-200">Initial Investment</span>
                      <span className="text-white">${userData?.money?.toFixed(2) || '0.00'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-indigo-200">Current Value</span>
                      <span className="text-white">${userData?.presentmoney?.toFixed(2) || '0.00'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-indigo-200">Change</span>
                      <span className={userData?.presentmoney >= userData?.money ? 'text-green-400' : 'text-red-400'}>
                        {userData?.presentmoney >= userData?.money ? '+' : ''}
                        ${Math.abs((userData?.presentmoney || 0) - (userData?.money || 0)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-300">
                    View Analytics
                  </button>
                </div>
              </motion.div>
            </div>
            
            {/* Trading Performance Dashboard */}
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center mb-4">
                <h3 className="text-xl font-bold text-white">Trading Performance</h3>
                <div className="ml-4 h-px flex-grow bg-white/10"></div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/10">
                {userData?.money > 0 && (
                  <div className="p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1">Performance Analysis</h4>
                        <p className="text-indigo-200 text-sm">Advanced metrics to track your trading success</p>
                      </div>
                      <div className="flex gap-2">
                        <div className={`px-4 py-2 rounded-full ${performanceData.monthlyROI >= 0 ? 'bg-green-400/20 border border-green-400/20' : 'bg-red-400/20 border border-red-400/20'}`}>
                          <span className={`font-medium ${performanceData.monthlyROI >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {performanceData.monthlyROI >= 0 ? '+' : ''}{performanceData.monthlyROI}% Monthly
                          </span>
                        </div>
                        <div className="px-4 py-2 rounded-full bg-blue-400/20 border border-blue-400/20">
                          <span className="font-medium text-blue-400">
                            {performanceData.winRate}% Win Rate
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* ROI Metrics */}
                    <div className="mb-8">
                      <h5 className="text-white font-medium mb-4 flex items-center">
                        <FiActivity className="mr-2 text-indigo-300" />
                        Return on Investment
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className={`p-5 rounded-xl border ${performanceData.dailyROI >= 0 ? 'bg-green-400/5 border-green-400/20' : 'bg-red-400/5 border-red-400/20'}`}>
                          <p className="text-indigo-200 text-sm mb-2">Daily ROI</p>
                          <div className="flex items-center">
                            {performanceData.dailyROI >= 0 ? (
                              <FiTrendingUp className="text-green-400 mr-3 text-xl" />
                            ) : (
                              <FiTrendingDown className="text-red-400 mr-3 text-xl" />
                            )}
                            <p className={`text-2xl font-bold ${performanceData.dailyROI >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {performanceData.dailyROI >= 0 ? '+' : ''}{performanceData.dailyROI}%
                            </p>
                          </div>
                        </div>
                        <div className={`p-5 rounded-xl border ${performanceData.weeklyROI >= 0 ? 'bg-green-400/5 border-green-400/20' : 'bg-red-400/5 border-red-400/20'}`}>
                          <p className="text-indigo-200 text-sm mb-2">Weekly ROI</p>
                          <div className="flex items-center">
                            {performanceData.weeklyROI >= 0 ? (
                              <FiTrendingUp className="text-green-400 mr-3 text-xl" />
                            ) : (
                              <FiTrendingDown className="text-red-400 mr-3 text-xl" />
                            )}
                            <p className={`text-2xl font-bold ${performanceData.weeklyROI >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {performanceData.weeklyROI >= 0 ? '+' : ''}{performanceData.weeklyROI}%
                            </p>
                          </div>
                        </div>
                        <div className={`p-5 rounded-xl border ${performanceData.monthlyROI >= 0 ? 'bg-green-400/5 border-green-400/20' : 'bg-red-400/5 border-red-400/20'}`}>
                          <p className="text-indigo-200 text-sm mb-2">Monthly ROI</p>
                          <div className="flex items-center">
                            {performanceData.monthlyROI >= 0 ? (
                              <FiTrendingUp className="text-green-400 mr-3 text-xl" />
                            ) : (
                              <FiTrendingDown className="text-red-400 mr-3 text-xl" />
                            )}
                            <p className={`text-2xl font-bold ${performanceData.monthlyROI >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {performanceData.monthlyROI >= 0 ? '+' : ''}{performanceData.monthlyROI}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Trade Metrics */}
                    <div>
                      <h5 className="text-white font-medium mb-4 flex items-center">
                        <FiBarChart2 className="mr-2 text-indigo-300" />
                        Trade Performance
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                          <p className="text-indigo-200 text-sm mb-2">Total Trades</p>
                          <p className="text-2xl font-bold text-white">{performanceData.totalTrades}</p>
                        </div>
                        <div className="bg-green-400/5 p-5 rounded-xl border border-green-400/20">
                          <p className="text-indigo-200 text-sm mb-2">Winning Trades</p>
                          <p className="text-2xl font-bold text-green-400">{performanceData.winningTrades}</p>
                        </div>
                        <div className="bg-red-400/5 p-5 rounded-xl border border-red-400/20">
                          <p className="text-indigo-200 text-sm mb-2">Losing Trades</p>
                          <p className="text-2xl font-bold text-red-400">{performanceData.losingTrades}</p>
                        </div>
                        <div className="bg-blue-400/5 p-5 rounded-xl border border-blue-400/20">
                          <p className="text-indigo-200 text-sm mb-2">Avg. Profit/Trade</p>
                          <p className="text-2xl font-bold text-blue-400">${performanceData.avgProfit}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {(!userData?.money || userData?.money <= 0) && (
                  <div className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/20 mb-4">
                      <FiBarChart2 className="text-indigo-400 text-2xl" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">No Trading Data</h4>
                    <p className="text-indigo-200 max-w-md mx-auto">You haven't made any trades yet. Once you start trading, you'll see your performance metrics here.</p>
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Quick Trade Panel & Portfolio Visualization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              {/* Quick Trade Panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-bold text-white">Quick Trade</h3>
                  <div className="ml-4 h-px flex-grow bg-white/10"></div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/10 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-lg font-bold text-white">Execute Trade</h4>
                    <div className="flex gap-2">
                      <button 
                        className={`px-4 py-2 rounded-lg transition-colors ${tradeType === 'buy' ? 'bg-green-500 text-white' : 'bg-white/5 text-green-400 hover:bg-green-500/20'}`}
                        onClick={() => setTradeType('buy')}
                      >
                        Buy
                      </button>
                      <button 
                        className={`px-4 py-2 rounded-lg transition-colors ${tradeType === 'sell' ? 'bg-red-500 text-white' : 'bg-white/5 text-red-400 hover:bg-red-500/20'}`}
                        onClick={() => setTradeType('sell')}
                      >
                        Sell
                      </button>
                    </div>
                  </div>
                  
                  <form onSubmit={handleTradeSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-indigo-200">Asset</label>
                      <select className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none text-white">
                        <option value="bitcoin">Bitcoin (BTC)</option>
                        <option value="ethereum">Ethereum (ETH)</option>
                        <option value="stocks">Stocks</option>
                        <option value="commodities">Commodities</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-indigo-200">Amount ($)</label>
                      <input 
                        type="number" 
                        value={tradeAmount}
                        onChange={(e) => setTradeAmount(e.target.value)}
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none text-white"
                        placeholder="Enter amount"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-indigo-200">Note (Optional)</label>
                      <input 
                        type="text" 
                        value={tradeNote}
                        onChange={(e) => setTradeNote(e.target.value)}
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none text-white"
                        placeholder="Add a note about this trade"
                      />
                    </div>
                    
                    <div className="pt-2">
                      <button 
                        type="submit"
                        className={`w-full py-3 rounded-xl text-white font-medium transition-colors ${tradeType === 'buy' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                      >
                        {tradeType === 'buy' ? 'Buy Now' : 'Sell Now'}
                      </button>
                    </div>
                    
                    <div className="flex justify-between text-xs text-indigo-200 pt-2">
                      <span>Available: ${userData?.money?.toFixed(2) || '0.00'}</span>
                      <span>Estimated Value: ${tradeAmount ? (parseFloat(tradeAmount) * 100).toFixed(2) : '0.00'}</span>
                    </div>
                  </form>
                </div>
              </motion.div>
              
              {/* Portfolio Visualization */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-bold text-white">Portfolio</h3>
                  <div className="ml-4 h-px flex-grow bg-white/10"></div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/10 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-lg font-bold text-white">Asset Allocation</h4>
                    <button className="text-indigo-300 hover:text-white transition-colors">
                      <FiSettings className="text-xl" />
                    </button>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Pie Chart Visualization */}
                    <div className="relative w-48 h-48">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        {portfolioData.assets.map((asset, index) => {
                          // Calculate the slice position
                          let cumulativePercent = portfolioData.assets
                            .slice(0, index)
                            .reduce((sum, a) => sum + a.value, 0);
                          const startAngle = (cumulativePercent / 100) * 360;
                          const endAngle = ((cumulativePercent + asset.value) / 100) * 360;
                          
                          // Convert angles to radians and calculate coordinates
                          const startRad = (startAngle - 90) * (Math.PI / 180);
                          const endRad = (endAngle - 90) * (Math.PI / 180);
                          
                          const x1 = 50 + 40 * Math.cos(startRad);
                          const y1 = 50 + 40 * Math.sin(startRad);
                          const x2 = 50 + 40 * Math.cos(endRad);
                          const y2 = 50 + 40 * Math.sin(endRad);
                          
                          // Determine if the arc should be drawn as a large arc
                          const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
                          
                          // Create the SVG arc path
                          const pathData = [
                            `M 50 50`,
                            `L ${x1} ${y1}`,
                            `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                            `Z`
                          ].join(' ');
                          
                          return (
                            <path 
                              key={asset.name} 
                              d={pathData} 
                              fill={asset.color} 
                              stroke="rgba(255,255,255,0.1)" 
                              strokeWidth="0.5"
                            />
                          );
                        })}
                        <circle cx="50" cy="50" r="25" fill="rgba(0,0,0,0.2)" />
                      </svg>
                    </div>
                    
                    {/* Legend */}
                    <div className="flex-1 space-y-2">
                      {portfolioData.assets.map(asset => (
                        <div key={asset.name} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: asset.color }}></div>
                            <span className="text-white">{asset.name}</span>
                          </div>
                          <span className="text-indigo-200">{asset.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h5 className="text-white font-medium mb-3">Recent Transactions</h5>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {portfolioData.recentTransactions.map(transaction => (
                        <div key={transaction.id} className="flex items-center justify-between bg-white/5 p-2 rounded-lg">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-lg mr-3 ${transaction.type === 'buy' ? 'bg-green-400/10' : 'bg-red-400/10'}`}>
                              {transaction.type === 'buy' ? (
                                <FiPlusCircle className="text-green-400" />
                              ) : (
                                <FiMinusCircle className="text-red-400" />
                              )}
                            </div>
                            <div>
                              <p className="text-white font-medium">{transaction.asset}</p>
                              <p className="text-xs text-indigo-200">
                                {new Date(transaction.date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={transaction.type === 'buy' ? 'text-green-400' : 'text-red-400'}>
                              {transaction.type === 'buy' ? '+' : '-'}{transaction.amount} units
                            </p>
                            <p className="text-xs text-indigo-200">${transaction.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Trading Journal */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="flex items-center mb-4">
                <h3 className="text-xl font-bold text-white">Trading Journal</h3>
                <div className="ml-4 h-px flex-grow bg-white/10"></div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/10 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-lg font-bold text-white">Record Your Insights</h4>
                  <div className="flex gap-2">
                    <button 
                      className={`p-2 rounded-lg transition-colors ${journalMood === 'positive' ? 'bg-green-500 text-white' : 'bg-white/5 text-green-400 hover:bg-green-500/20'}`}
                      onClick={() => setJournalMood('positive')}
                      title="Positive"
                    >
                      <BiHappy className="text-xl" />
                    </button>
                    <button 
                      className={`p-2 rounded-lg transition-colors ${journalMood === 'neutral' ? 'bg-yellow-500 text-white' : 'bg-white/5 text-yellow-400 hover:bg-yellow-500/20'}`}
                      onClick={() => setJournalMood('neutral')}
                      title="Neutral"
                    >
                      <BiMeh className="text-xl" />
                    </button>
                    <button 
                      className={`p-2 rounded-lg transition-colors ${journalMood === 'negative' ? 'bg-red-500 text-white' : 'bg-white/5 text-red-400 hover:bg-red-500/20'}`}
                      onClick={() => setJournalMood('negative')}
                      title="Negative"
                    >
                      <BiSad className="text-xl" />
                    </button>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <textarea
                    value={journalNote}
                    onChange={(e) => setJournalNote(e.target.value)}
                    className="flex-1 p-3 h-24 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none text-white resize-none"
                    placeholder="Record your trading thoughts, strategies, and lessons learned..."
                  ></textarea>
                  <button 
                    onClick={addJournalEntry}
                    className="px-4 py-2 h-fit bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors self-end"
                  >
                    Save Entry
                  </button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h5 className="text-white font-medium mb-3">Journal Entries</h5>
                  {journalEntries.length > 0 ? (
                    <div className="space-y-4 max-h-60 overflow-y-auto">
                      {journalEntries.map(entry => (
                        <div key={entry.id} className="bg-white/5 p-4 rounded-xl border border-white/10">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              {getMoodIcon(entry.mood)}
                              <span className="text-white font-medium ml-2">
                                {new Date(entry.date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                            <span className="text-xs text-indigo-200">
                              {new Date(entry.date).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          <p className="text-indigo-100">{entry.note}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FiBookOpen className="text-indigo-300 text-3xl mx-auto mb-2" />
                      <p className="text-indigo-200">No journal entries yet. Start recording your trading journey!</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
