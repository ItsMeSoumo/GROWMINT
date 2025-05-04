import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Premium easing options
const PREMIUM_EASING = [0.16, 1, 0.3, 1]; // cubic-bezier(0.16, 1, 0.3, 1)
const SPRING_CONFIG = { 
  stiffness: 100, 
  damping: 20, 
  mass: 1 
};

export const FadeIn = ({ children, delay = 0, duration = 0.7, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration,
        delay,
        ease: PREMIUM_EASING,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const SlideIn = ({ children, direction = 'left', delay = 0, duration = 0.7, ...props }) => {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -70 : direction === 'right' ? 70 : 0,
      y: direction === 'up' ? 70 : direction === 'down' ? -70 : 0,
      filter: 'blur(5px)'
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)'
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{
        duration,
        delay,
        ease: PREMIUM_EASING,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const ScaleIn = ({ children, delay = 0, duration = 0.7, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, filter: 'blur(5px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{
        duration,
        delay,
        ease: PREMIUM_EASING,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const Stagger = ({ children, staggerChildren = 0.1, delayChildren = 0, ...props }) => {
  return (
    <motion.div
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren,
            delayChildren
          }
        }
      }}
      initial="hidden"
      animate="show"
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, ...props }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, filter: 'blur(5px)' },
        show: { opacity: 1, y: 0, filter: 'blur(0px)' }
      }}
      transition={{ duration: 0.7, ease: PREMIUM_EASING }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const TextReveal = ({ children, delay = 0, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      style={{ position: 'relative', overflow: 'hidden' }}
      {...props}
    >
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: 0 }}
        transition={{ 
          duration: 0.7, 
          delay, 
          ease: PREMIUM_EASING 
        }}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'var(--background)',
          zIndex: 10
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 0.3, 
          delay: delay + 0.5 
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export const MouseTracker = ({ children, factor = 0.1, ...props }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const smoothX = useSpring(x, SPRING_CONFIG);
  const smoothY = useSpring(y, SPRING_CONFIG);
  
  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    const xPos = clientX - (left + width / 2);
    const yPos = clientY - (top + height / 2);
    
    x.set(xPos * factor);
    y.set(yPos * factor);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{
        x: smoothX,
        y: smoothY,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// New component for scroll-linked animations
export const ScrollAnimate = ({ 
  children, 
  threshold = 0.1, 
  duration = 0.7, 
  bidirectional = true, 
  effect = 'fade',
  ...props 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: !bidirectional, threshold });
  const [scrollDirection, setScrollDirection] = useState('down');
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Track scroll direction
  useEffect(() => {
    if (typeof window === 'undefined' || !bidirectional) return;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, bidirectional]);
  
  // Define variants for different effects
  const getVariants = () => {
    const directionFactor = scrollDirection === 'down' ? 1 : -1;
    
    const variants = {
      fade: {
        hidden: { opacity: 0, y: 20 * directionFactor, filter: 'blur(5px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
      },
      slide: {
        hidden: { 
          opacity: 0, 
          x: effect === 'slideLeft' ? -70 * directionFactor : 
              effect === 'slideRight' ? 70 * directionFactor : 0,
          y: effect === 'slideUp' ? 70 * directionFactor : 
              effect === 'slideDown' ? -70 * directionFactor : 0,
          filter: 'blur(5px)'
        },
        visible: { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }
      },
      scale: {
        hidden: { opacity: 0, scale: 0.85, filter: 'blur(5px)' },
        visible: { opacity: 1, scale: 1, filter: 'blur(0px)' }
      },
      flip: {
        hidden: { 
          opacity: 0, 
          rotateY: 30 * directionFactor, 
          perspective: 1000,
          filter: 'blur(5px)'
        },
        visible: { 
          opacity: 1, 
          rotateY: 0, 
          perspective: 1000,
          filter: 'blur(0px)'
        }
      },
      rotate: {
        hidden: { 
          opacity: 0, 
          rotate: 10 * directionFactor, 
          scale: 0.9, 
          filter: 'blur(5px)' 
        },
        visible: { 
          opacity: 1, 
          rotate: 0, 
          scale: 1, 
          filter: 'blur(0px)' 
        }
      }
    };
    
    // Map effect to variant
    if (effect === 'fade' || effect === 'fadeIn') return variants.fade;
    if (['slideLeft', 'slideRight', 'slideUp', 'slideDown'].includes(effect)) return variants.slide;
    if (effect === 'scale') return variants.scale;
    if (effect === 'flip') return variants.flip;
    if (effect === 'rotate') return variants.rotate;
    
    return variants.fade; // Default
  };
  
  const variants = getVariants();
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration, ease: PREMIUM_EASING }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Parallax scroll component for premium effect
export const ParallaxScroll = ({ children, speed = 0.5, ...props }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const y = useTransform(smoothProgress, [0, 1], [speed * 100, -speed * 100]);
  
  return (
    <motion.div
      ref={ref}
      style={{ y }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// 3D Rotation on Scroll
export const Rotate3D = ({ children, xFactor = 10, yFactor = 5, ...props }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [xFactor, 0, -xFactor]);
  const rotateY = useTransform(smoothProgress, [0, 0.5, 1], [yFactor, 0, -yFactor]);
  
  return (
    <motion.div
      ref={ref}
      style={{ 
        rotateX, 
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Blur on scroll
export const BlurOnScroll = ({ children, maxBlur = 5, ...props }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const blurAmount = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [maxBlur, 0, maxBlur]
  );
  
  const blur = useTransform(blurAmount, v => `blur(${v}px)`);
  
  return (
    <motion.div
      ref={ref}
      style={{ filter: blur }}
      {...props}
    >
      {children}
    </motion.div>
  );
}; 