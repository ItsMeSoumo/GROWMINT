# Growmint - Modern Web Development Agency Website

Growmint is a modern, professional website built with Next.js, React Three Fiber, Three.js, Tailwind CSS, and Framer Motion. It showcases a web development services company with interactive 3D elements, smooth animations, and a responsive design.

![Growmint Screenshot](./public/screenshot.png)

## Features

- Modern UI with Tailwind CSS
- Interactive 3D elements with React Three Fiber and Three.js
- Smooth animations and transitions with Framer Motion
- Responsive design for all devices
- Custom cursor effects
- Optimized performance
- Dark/light mode support

## Pages

- **Home**: Showcase of services and company overview
- **About**: Team information and company history
- **Services**: Detailed service offerings
- **Contact**: Contact form and information

## Technologies Used

- **Next.js**: React framework for server-rendered applications
- **React**: JavaScript library for building user interfaces
- **Three.js**: JavaScript 3D library
- **React Three Fiber**: React renderer for Three.js
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/growmint.git
cd growmint
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
growmint/
├── public/            # Static files
├── src/               # Source files
│   ├── components/    # React components
│   │   ├── animations/  # Animation components
│   │   └── ...
│   ├── pages/         # Next.js pages
│   ├── styles/        # Global styles
│   └── utils/         # Utility functions
├── package.json       # Dependencies and scripts
└── README.md          # Project documentation
```

## Customization

### Styling

The project uses Tailwind CSS for styling. You can customize the theme in the `tailwind.config.js` file.

### Content

Update the content in the respective page files under the `src/pages` directory.

### 3D Elements

The 3D elements are created using React Three Fiber. You can modify or add new 3D models in the `src/components/Scene3D.js` file.

## Deployment

You can deploy this application to any platform that supports Next.js, such as Vercel or Netlify.

### Deploy to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

```bash
npm run build
# or
yarn build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber)
- [Three.js](https://threejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
