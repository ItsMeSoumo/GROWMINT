/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        accent: 'var(--accent)',
        secondary: 'var(--secondary)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slow-delay': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite 2s',
        'float': 'float 12s ease-in-out infinite',
        'text-shimmer': 'text-shimmer 2.5s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'text-shimmer': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      },
      container: {
        center: true,
        padding: '1rem',
      },
      boxShadow: {
        'neon-purple': '0 0 15px rgba(147, 51, 234, 0.5)',
        'neon-purple-sm': '0 0 10px rgba(147, 51, 234, 0.3)',
        'neon-blue': '0 0 15px rgba(59, 130, 246, 0.5)',
      },
      backgroundImage: {
        'grid': 'linear-gradient(to right, rgba(75, 85, 99, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(75, 85, 99, 0.1) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '20px 20px',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-purple-500/20',
    'bg-blue-500/20',
    'bg-green-500/20',
    'bg-orange-500/20',
    'text-purple-400',
    'text-blue-400',
    'text-green-400',
    'text-orange-400',
    'border-purple-500/30',
    'border-blue-500/30',
    'border-green-500/30',
    'border-orange-500/30',
    'shadow-neon-purple',
    'shadow-neon-purple-sm',
    'shadow-neon-blue',
  ],
}; 