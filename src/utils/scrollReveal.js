// Utility for adding scroll reveal animations to elements with premium effects
export const initScrollReveal = () => {
  if (typeof window === 'undefined') return;

  // Track scroll direction
  let lastScrollTop = 0;
  let scrollDirection = 'down';

  // Update scroll direction on scroll
  const updateScrollDirection = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  };

  // Observer options for more refined detection
  const options = {
    root: null, // viewport is the root
    rootMargin: '0px',
    threshold: [0, 0.15, 0.3, 0.5, 0.75, 1] // Multiple thresholds for smoother transitions
  };

  // Create the intersection observer with enhanced capabilities
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Calculate how far into view the element is
      const intersectionRatio = entry.intersectionRatio;
      const element = entry.target;
      
      // Apply direction-specific classes
      if (entry.isIntersecting) {
        // Get animation direction from data attribute or default to standard
        const animType = element.dataset.animType || 'standard';
        
        // Add visible class with appropriate direction
        element.classList.add('scroll-visible');
        element.style.setProperty('--scroll-ratio', intersectionRatio.toString());
        
        // Set scroll direction as data attribute for CSS animations
        element.dataset.scrollDirection = scrollDirection;
        
        // Only unobserve if fully visible and we want one-time animation
        if (intersectionRatio > 0.9 && element.dataset.persistent !== 'true') {
          observer.unobserve(element);
        }
      } else if (element.dataset.persistent === 'true') {
        // For persistent animations, remove the visible class when out of view
        element.classList.remove('scroll-visible');
      }
    });
  }, options);

  // Listen for scroll events to track direction
  window.addEventListener('scroll', updateScrollDirection, { passive: true });

  // Observer all elements with scroll-reveal class
  const revealElements = document.querySelectorAll('.scroll-reveal');
  revealElements.forEach(element => {
    // Set initial state based on direction preference
    const preferredDirection = element.dataset.scrollDirection;
    if (preferredDirection) {
      element.dataset.initialDirection = preferredDirection;
    }
    
    observer.observe(element);
  });

  return {
    observer,
    cleanup: () => {
      window.removeEventListener('scroll', updateScrollDirection);
      observer.disconnect();
    }
  };
}; 