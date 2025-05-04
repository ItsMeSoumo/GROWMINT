export const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80, // Account for the navbar height
      behavior: 'smooth'
    });
  }
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

export const useScrollDirection = () => {
  let lastScrollY = typeof window !== 'undefined' ? window.pageYOffset : 0;
  let ticking = false;
  let direction = 'up';

  const updateScrollDirection = () => {
    const scrollY = window.pageYOffset;
    direction = scrollY > lastScrollY ? 'down' : 'up';
    lastScrollY = scrollY > 0 ? scrollY : 0;
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollDirection);
      ticking = true;
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', onScroll);
  }

  return direction;
}; 