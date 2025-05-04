import { useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

// Card component with hover effect
const EffectCard = ({ title, description, icon, effect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const controls = useAnimation();

  // Different effects based on the card type
  const handleClick = () => {
    setIsClicked(true);
    
    if (effect === 'bounce') {
      controls.start({
        y: [0, -20, 0, -10, 0, -5, 0],
        transition: { duration: 0.6 }
      });
    } else if (effect === 'rotate') {
      controls.start({
        rotate: [0, 360],
        transition: { duration: 0.6 }
      });
    } else if (effect === 'pulse') {
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.5, times: [0, 0.5, 1] }
      });
    } else if (effect === 'shake') {
      controls.start({
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.4 }
      });
    }
    
    setTimeout(() => setIsClicked(false), 600);
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 shadow-lg hover:shadow-purple-500/20 transition-all"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -5, 
        boxShadow: '0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.04)',
        borderColor: 'rgba(139, 92, 246, 0.3)'
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="p-6">
        <motion.div 
          className="w-12 h-12 mb-4 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center"
          animate={controls}
        >
          {icon}
        </motion.div>
        
        <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
        
        <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
          <span className="text-xs text-gray-500">Click to trigger</span>
          
          <motion.div
            className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-500/20 text-purple-400"
            whileTap={{ scale: 0.9 }}
            animate={isClicked ? { scale: [1, 0.9, 1.1, 0.95, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </motion.div>
        </div>
      </div>
      
      {/* Rainbow gradient border on hover */}
      <motion.div 
        className="h-1 w-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// Loop Animation Card (continuously animating)
const LoopCard = ({ title, icon, loopType }) => {
  const loopVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop"
      }
    },
    rotate: {
      rotate: [0, 360],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear"
      }
    },
    bounce: {
      y: ["0%", "-15%", "0%"],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop"
      }
    },
    wave: {
      x: ["-5%", "5%", "-5%"],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all"
      whileHover={{ 
        y: -5, 
        boxShadow: '0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.04)',
        borderColor: 'rgba(139, 92, 246, 0.3)'
      }}
    >
      <motion.div 
        className="w-16 h-16 mb-4 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center"
        animate={loopVariants[loopType]}
      >
        {icon}
      </motion.div>
      
      <h3 className="text-lg font-semibold text-center mb-3 text-white">{title}</h3>
      <div className="text-center text-xs text-gray-500">Loop Animation</div>
    </motion.div>
  );
};

// The EffectsGrid component
const EffectsGrid = () => {
  const effectsData = [
    { 
      title: "Hover Effect", 
      description: "Elements respond to mouse hover with smooth transitions and visual feedback.", 
      effect: "bounce",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
          <path d="M18 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path>
        </svg>
      )
    },
    { 
      title: "Click Animation", 
      description: "Interactive elements provide feedback when clicked with satisfying animations.", 
      effect: "rotate",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    },
    { 
      title: "Pulse Effect", 
      description: "Elements pulse to draw attention to important features or calls to action.", 
      effect: "pulse",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      )
    },
    { 
      title: "Shake Effect", 
      description: "Elements shake to indicate errors or invalid inputs in forms and interactions.", 
      effect: "shake",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 4 23 10 17 10"></polyline>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
      )
    }
  ];

  const loopData = [
    { 
      title: "Pulsing Button", 
      loopType: "pulse",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14"></path>
          <path d="M5 12h14"></path>
        </svg>
      )
    },
    { 
      title: "Rotating Icon", 
      loopType: "rotate",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 2v6h-6"></path>
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
          <path d="M3 22v-6h6"></path>
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
        </svg>
      )
    },
    { 
      title: "Bouncing Element", 
      loopType: "bounce",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="m8 12 3 3 5-5"></path>
        </svg>
      )
    },
    { 
      title: "Wave Effect", 
      loopType: "wave",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12h1"></path>
          <path d="M7 12h1"></path>
          <path d="M12 12h1"></path>
          <path d="M17 12h1"></path>
          <path d="M22 12h1"></path>
          <path d="M6 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0Z"></path>
          <path d="M16 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0Z"></path>
          <path d="M11 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0Z"></path>
        </svg>
      )
    }
  ];

  // Drag Animation Demo
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  return (
    <div className="space-y-10">
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 text-white">Interactive Effects</h2>
          <p className="text-gray-400">Hover over or click on cards to see different animations</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {effectsData.map((effect, index) => (
            <EffectCard 
              key={index}
              title={effect.title}
              description={effect.description}
              icon={effect.icon}
              effect={effect.effect}
            />
          ))}
        </div>
      </section>
      
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 text-white">Loop Animations</h2>
          <p className="text-gray-400">Continuous animations that run in the background</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loopData.map((loop, index) => (
            <LoopCard 
              key={index}
              title={loop.title}
              icon={loop.icon}
              loopType={loop.loopType}
            />
          ))}
        </div>
      </section>
      
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 text-white">Drag Animation</h2>
          <p className="text-gray-400">Drag the element below to interact with it</p>
        </div>
        
        <div className="h-64 rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 overflow-hidden flex items-center justify-center relative">
          <motion.div 
            className="absolute w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl cursor-grab flex items-center justify-center text-white font-medium"
            drag
            dragConstraints={{ left: -150, right: 150, top: -75, bottom: 75 }}
            dragElastic={0.1}
            whileDrag={{ scale: 1.1, boxShadow: "0 0 15px rgba(147, 51, 234, 0.5)", cursor: "grabbing" }}
            style={{ x: dragPosition.x, y: dragPosition.y }}
            onDragEnd={(e, info) => setDragPosition({ x: info.point.x, y: info.point.y })}
          >
            DRAG ME
          </motion.div>
          
          <div className="text-gray-500 text-xs absolute bottom-4 left-0 right-0 text-center">
            Constrained to container boundaries
          </div>
        </div>
      </section>
    </div>
  );
};

export default EffectsGrid; 