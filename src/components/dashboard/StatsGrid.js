import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Animated Counter component
const AnimatedCounter = ({ value, duration = 2, decimals = 0 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    
    // Make sure we don't exceed the value
    if (start === end) return;
    
    // Calculate step rate as a factor of the desired duration
    const totalMilSecDur = duration * 1000;
    const incrementTime = totalMilSecDur / end;
    
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);
    
    // Cleanup interval on component unmount
    return () => {
      clearInterval(timer);
    };
  }, [value, duration]);
  
  return (
    <span>
      {count.toLocaleString('en-US', { maximumFractionDigits: decimals })}
    </span>
  );
};

// Simple Bar Chart component
const BarChart = ({ data, height = 140 }) => {
  // Find the maximum value for scaling
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="w-full">
      <div className="flex h-[140px] items-end space-x-2">
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 100;
          
          return (
            <motion.div 
              key={index}
              className="relative flex-1 bg-gray-800 rounded-t-md group"
              initial={{ height: 0 }}
              animate={{ height: `${barHeight}%` }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-purple-600 to-cyan-500 opacity-70 rounded-t-md"
                whileHover={{ opacity: 1 }}
              />
              
              {/* Tooltip */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-gray-800 text-white text-xs py-1 px-2 rounded shadow">
                  {item.value}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="flex justify-between mt-2">
        {data.map((item, index) => (
          <div key={index} className="text-xs text-gray-500 text-center flex-1">
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

// Progress Ring component
const ProgressRing = ({ value, size = 120, strokeWidth = 8, color = "purple" }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  
  const colors = {
    purple: "from-purple-500 to-indigo-600",
    blue: "from-blue-500 to-cyan-400",
    green: "from-green-500 to-emerald-400",
    orange: "from-orange-500 to-yellow-400"
  };
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg width={size} height={size} className="absolute">
        <circle
          className="text-gray-700"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      
      {/* Progress circle */}
      <svg width={size} height={size} className="absolute transform -rotate-90">
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className={`stop-color-start-${color}`} />
            <stop offset="100%" className={`stop-color-end-${color}`} />
          </linearGradient>
        </defs>
        <motion.circle
          className={`stroke-current text-${color}-500`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          stroke={`url(#gradient-${color})`}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ strokeDashoffset: offset, strokeDasharray: circumference }}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </svg>
      
      {/* Text in the center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold">{value}%</span>
      </div>
    </div>
  );
};

// Stat Card component
const StatCard = ({ title, value, icon, growth, color = "purple" }) => {
  const colors = {
    purple: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    blue: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    green: "bg-green-500/20 text-green-400 border-green-500/30",
    orange: "bg-orange-500/20 text-orange-400 border-orange-500/30"
  };
  
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -5, 
        boxShadow: '0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.04)',
        borderColor: 'rgba(139, 92, 246, 0.3)'
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <div className="text-3xl font-bold text-white">
            <AnimatedCounter value={value} />
          </div>
        </div>
        
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colors[color]}`}>
          {icon}
        </div>
      </div>
      
      <div className="flex items-center">
        <div className={`flex items-center ${growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={growth >= 0 ? '' : 'transform rotate-180'}
          >
            <path d="m5 12 7-7 7 7"/>
            <path d="M19 12v7H5v-7"/>
          </svg>
          <span className="ml-1">{Math.abs(growth)}%</span>
        </div>
        <span className="text-gray-500 text-sm ml-2">vs. last month</span>
      </div>
    </motion.div>
  );
};

// Chart Card component
const ChartCard = ({ title, subtitle, chart }) => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 shadow-lg col-span-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      whileHover={{ 
        boxShadow: '0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.04)',
        borderColor: 'rgba(139, 92, 246, 0.3)'
      }}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>
      </div>
      
      {chart}
    </motion.div>
  );
};

// Progress Card component
const ProgressCard = ({ title, items }) => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      whileHover={{ 
        boxShadow: '0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.04)',
        borderColor: 'rgba(139, 92, 246, 0.3)'
      }}
    >
      <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-300">{item.label}</span>
              <span className="text-sm text-gray-400">{item.value}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-1">
              <motion.div 
                className={`h-2.5 rounded-full ${item.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${item.value}%` }}
                transition={{ duration: 1, delay: 0.3 + (index * 0.1) }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// The StatsGrid component
const StatsGrid = () => {
  const monthlyRevenueData = [
    { label: 'Jan', value: 12500 },
    { label: 'Feb', value: 18200 },
    { label: 'Mar', value: 15800 },
    { label: 'Apr', value: 22000 },
    { label: 'May', value: 19500 },
    { label: 'Jun', value: 27800 },
    { label: 'Jul', value: 32400 },
  ];
  
  const projectProgressItems = [
    { label: 'Web Development', value: 85, color: 'bg-purple-500' },
    { label: 'Mobile App', value: 62, color: 'bg-blue-500' },
    { label: 'UI/UX Design', value: 78, color: 'bg-cyan-500' },
    { label: 'Marketing', value: 45, color: 'bg-green-500' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Customers" 
          value="1,485" 
          growth={12.5}
          color="purple"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          }
        />
        
        <StatCard 
          title="Total Revenue" 
          value="$148,250" 
          growth={8.2}
          color="green"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          }
        />
        
        <StatCard 
          title="Active Projects" 
          value="32" 
          growth={-4.8}
          color="blue"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
          }
        />
        
        <StatCard 
          title="Task Completion" 
          value="78%" 
          growth={5.3}
          color="orange"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
            </svg>
          }
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard 
          title="Monthly Revenue"
          subtitle="Revenue generated over the last 7 months"
          chart={<BarChart data={monthlyRevenueData} />}
        />
        
        <ProgressCard 
          title="Project Progress"
          items={projectProgressItems}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 shadow-lg flex flex-col items-center"
          whileHover={{ 
            y: -5,
            boxShadow: '0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.04)',
            borderColor: 'rgba(139, 92, 246, 0.3)'
          }}
        >
          <h3 className="text-lg font-semibold text-white mb-4 self-start">Development</h3>
          <ProgressRing value={78} color="purple" />
          <p className="text-gray-400 text-sm mt-4">Overall completion</p>
        </motion.div>
        
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 shadow-lg flex flex-col items-center"
          whileHover={{ 
            y: -5,
            boxShadow: '0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.04)',
            borderColor: 'rgba(139, 92, 246, 0.3)'
          }}
        >
          <h3 className="text-lg font-semibold text-white mb-4 self-start">Design</h3>
          <ProgressRing value={92} color="blue" />
          <p className="text-gray-400 text-sm mt-4">Overall completion</p>
        </motion.div>
        
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 shadow-lg flex flex-col items-center"
          whileHover={{ 
            y: -5,
            boxShadow: '0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.04)',
            borderColor: 'rgba(139, 92, 246, 0.3)'
          }}
        >
          <h3 className="text-lg font-semibold text-white mb-4 self-start">Marketing</h3>
          <ProgressRing value={45} color="green" />
          <p className="text-gray-400 text-sm mt-4">Overall completion</p>
        </motion.div>
        
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 shadow-lg flex flex-col items-center"
          whileHover={{ 
            y: -5,
            boxShadow: '0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.04)',
            borderColor: 'rgba(139, 92, 246, 0.3)'
          }}
        >
          <h3 className="text-lg font-semibold text-white mb-4 self-start">Testing</h3>
          <ProgressRing value={63} color="orange" />
          <p className="text-gray-400 text-sm mt-4">Overall completion</p>
        </motion.div>
      </div>
    </div>
  );
};

export default StatsGrid; 