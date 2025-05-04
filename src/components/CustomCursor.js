import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handlePointerElements = () => {
      const allLinks = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
      
      // Check what element the cursor is over
      const handleMouseOver = () => setIsPointer(true);
      const handleMouseOut = () => setIsPointer(false);
      
      allLinks.forEach(link => {
        link.addEventListener('mouseover', handleMouseOver);
        link.addEventListener('mouseout', handleMouseOut);
      });
      
      return () => {
        allLinks.forEach(link => {
          link.removeEventListener('mouseover', handleMouseOver);
          link.removeEventListener('mouseout', handleMouseOut);
        });
      };
    };

    window.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    const cleanup = handlePointerElements();
    
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cleanup();
    };
  }, []);

  return (
    <>
      <div 
        className="cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isHidden ? 0 : 1,
          transform: `translate(-50%, -50%) scale(${isPointer ? 0.5 : 1})`,
        }}
      />
      <div 
        className="cursor-follower"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isHidden ? 0 : 0.5,
          width: isPointer ? '50px' : '40px',
          height: isPointer ? '50px' : '40px',
        }}
      />
    </>
  );
};

export default CustomCursor; 