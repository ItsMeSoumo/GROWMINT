import { motion } from 'framer-motion';
import Link from 'next/link';

const SideNav = ({ isOpen, onClose, activeSection, onSectionChange }) => {
  const navItems = [
    { label: 'Effects Gallery', section: 'effects', icon: 'sparkles' },
    { label: 'Projects', section: 'projects', icon: 'squares' },
    { label: 'Statistics', section: 'stats', icon: 'chart' },
    { label: 'Resources', section: 'resources', icon: 'book' },
    { label: 'Settings', section: 'settings', icon: 'settings' },
  ];

  const icons = {
    sparkles: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v.01M12 21v.01M4.2 19.8v.01M19.8 19.8v.01M4.2 4.2v.01M19.8 4.2v.01"/>
        <path d="M7.5 12h.01M16.5 12h.01M12 7.5v.01M12 16.5v.01"/>
        <path d="M12 16.5V17M7.5 12h-1M12 7.5V7M16.5 12h1"/>
      </svg>
    ),
    squares: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    chart: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"/>
        <path d="M18 17V9"/>
        <path d="M13 17V5"/>
        <path d="M8 17v-3"/>
      </svg>
    ),
    book: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
      </svg>
    ),
    settings: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    )
  };

  return (
    <motion.aside
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed inset-y-0 left-0 w-64 bg-gray-900 bg-opacity-95 backdrop-blur-md border-r border-purple-900/30 shadow-xl z-40"
    >
      <div className="p-5">
        <div className="flex justify-between items-center mb-8">
          <motion.h2 
            className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Dashboard
          </motion.h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <nav>
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <motion.li
                key={item.section}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <button
                  onClick={() => {
                    onSectionChange(item.section);
                    if (window.innerWidth < 768) {
                      onClose();
                    }
                  }}
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
                    activeSection === item.section
                      ? 'bg-purple-500/20 text-purple-300 shadow-neon-purple-sm'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <span className="mr-3">
                    {icons[item.icon]}
                  </span>
                  <span>{item.label}</span>
                  
                  {activeSection === item.section && (
                    <motion.span 
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400"
                      layoutId="activeNavIndicator"
                    />
                  )}
                </button>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="p-4 rounded-lg bg-gray-800/50 border border-purple-900/20 backdrop-blur-sm">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm mr-3">
              G
            </div>
            <div>
              <div className="text-sm font-medium">Growmint</div>
              <div className="text-xs text-gray-400">Professional</div>
            </div>
          </div>
          <Link 
            href="/"
            className="block w-full text-center text-xs py-2 bg-purple-700 hover:bg-purple-600 rounded transition-colors text-white"
          >
            Back to Main Site
          </Link>
        </div>
      </div>
    </motion.aside>
  );
};

export default SideNav; 