import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Add spring physics for smoother cursor movement
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      
      // Check if the cursor is over a clickable element
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'input' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.cursor-pointer')
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="cursor-dot fixed w-4 h-4 rounded-full bg-purple-500 pointer-events-none z-50 opacity-0 md:opacity-100"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          mixBlendMode: 'exclusion',
        }}
        animate={{
          scale: isActive ? 0.5 : 1,
          opacity: 1,
        }}
        transition={{ duration: 0.15 }}
      />
      
      {/* Cursor ring */}
      <motion.div
        className={`cursor-ring fixed rounded-full border-2 pointer-events-none z-50 opacity-0 md:opacity-70 ${
          isPointer ? 'border-purple-400' : 'border-gray-400'
        }`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: isPointer ? '40px' : '30px',
          height: isPointer ? '40px' : '30px',
          mixBlendMode: 'exclusion',
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isPointer ? 50 : isActive ? 20 : 30,
          height: isPointer ? 50 : isActive ? 20 : 30,
          opacity: 0.7,
          borderWidth: isPointer ? '2px' : '1px',
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
    </>
  );
};

export default Cursor; 