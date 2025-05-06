// Utility for adding lightweight, one-sided scroll reveal animations
export const initScrollReveal = () => {
  if (typeof window === 'undefined') return;

  // Observer options for simple detection
  const options = {
    root: null, // viewport is the root
    rootMargin: '0px',
    threshold: 0.15 // Reveal when 15% of the element is visible
  };

  // Create the intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const element = entry.target;
      if (entry.isIntersecting) {
        element.classList.add('scroll-visible');
        observer.unobserve(element); // Only animate once
      }
    });
  }, options);

  // Observe all elements with scroll-reveal class
  const revealElements = document.querySelectorAll('.scroll-reveal');
  revealElements.forEach(element => {
    observer.observe(element);
  });

  return {
    observer,
    cleanup: () => {
      observer.disconnect();
    }
  };
}; 