import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Project Card Component
const ProjectCard = ({ project, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 shadow-lg hover:shadow-purple-500/20 transition-all cursor-pointer"
      whileHover={{ 
        y: -5, 
        boxShadow: '0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.04)',
        borderColor: 'rgba(139, 92, 246, 0.3)'
      }}
      layoutId={`project-card-${project.id}`}
      onClick={() => onSelect(project)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Project image */}
      <div className="h-40 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${project.image})` }}
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
        />
        
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-gray-900 to-transparent z-20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-300">Click to view details</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </motion.div>
      </div>
      
      {/* Project info */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          <span className={`text-xs px-2 py-1 rounded ${project.status === 'Completed' ? 'bg-green-500/20 text-green-400' : project.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
            {project.status}
          </span>
        </div>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex justify-between items-center text-xs text-gray-500">
          <div>{project.date}</div>
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {project.time}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Project Detail Modal
const ProjectDetail = ({ project, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-gray-800 rounded-xl border border-gray-700 shadow-2xl max-w-2xl w-full overflow-hidden"
        layoutId={`project-card-${project.id}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-60 relative">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          
          <div className="absolute top-4 right-4">
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">{project.title}</h2>
              <span className={`text-xs px-2 py-1 rounded ${project.status === 'Completed' ? 'bg-green-500/20 text-green-400' : project.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                {project.status}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-gray-300 mb-6">{project.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-900/50 p-3 rounded">
              <div className="text-xs text-gray-500 mb-1">Client</div>
              <div className="text-white">{project.client}</div>
            </div>
            <div className="bg-gray-900/50 p-3 rounded">
              <div className="text-xs text-gray-500 mb-1">Timeline</div>
              <div className="text-white">{project.time}</div>
            </div>
            <div className="bg-gray-900/50 p-3 rounded">
              <div className="text-xs text-gray-500 mb-1">Start Date</div>
              <div className="text-white">{project.date}</div>
            </div>
            <div className="bg-gray-900/50 p-3 rounded">
              <div className="text-xs text-gray-500 mb-1">Category</div>
              <div className="text-white">{project.category}</div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <motion.button
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
            >
              Close
            </motion.button>
            <motion.button
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Project
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// The ProjectsGrid component
const ProjectsGrid = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  
  const projectsData = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A modern e-commerce platform with product catalog, cart, and payment gateway integration. Responsive design with dark mode support.",
      status: "Completed",
      date: "Oct 2023",
      time: "8 weeks",
      client: "Retail Solutions Inc.",
      category: "Web Development",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
      id: 2,
      title: "Finance Dashboard",
      description: "Interactive financial dashboard with real-time data visualization, advanced filtering, and reporting features.",
      status: "In Progress",
      date: "Jan 2024",
      time: "10 weeks",
      client: "FinTech Solutions",
      category: "Dashboard UI",
      technologies: ["Vue.js", "D3.js", "Express", "PostgreSQL", "Docker"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
      id: 3,
      title: "Healthcare Portal",
      description: "Secure healthcare patient portal with appointment scheduling, medical records, and doctor-patient messaging system.",
      status: "Planning",
      date: "Mar 2024",
      time: "16 weeks",
      client: "MediCare Systems",
      category: "Web Application",
      technologies: ["Angular", "TypeScript", "Firebase", "HIPAA Compliance", "OAuth"],
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
      id: 4,
      title: "Real Estate App",
      description: "Mobile-first real estate application with property listings, virtual tours, and mortgage calculator features.",
      status: "Completed",
      date: "Dec 2023",
      time: "12 weeks",
      client: "HomeFind Properties",
      category: "Mobile Application",
      technologies: ["React Native", "GraphQL", "AWS", "Google Maps API", "Cloudinary"],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
      id: 5,
      title: "Learning Management System",
      description: "Educational platform with course creation, student management, assessment tools, and progress tracking.",
      status: "In Progress",
      date: "Feb 2024",
      time: "14 weeks",
      client: "EduTech Institute",
      category: "Educational Software",
      technologies: ["Next.js", "Python", "Django", "PostgreSQL", "WebRTC"],
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
      id: 6,
      title: "Inventory Management System",
      description: "Comprehensive inventory tracking solution with barcode scanning, supplier management, and reporting features.",
      status: "Completed",
      date: "Nov 2023",
      time: "6 weeks",
      client: "Supply Chain Solutions",
      category: "Enterprise Software",
      technologies: ["PHP", "Laravel", "MySQL", "Alpine.js", "Barcode API"],
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    }
  ];
  
  // Filter projects based on status
  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => 
        project.status.toLowerCase() === filter.toLowerCase()
      );

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-white">Projects Portfolio</h2>
          <p className="text-gray-400">Browse through recent projects and case studies</p>
        </div>
        
        <div className="flex space-x-2 bg-gray-800 p-1 rounded-lg">
          <button 
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-sm rounded ${filter === 'all' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 text-sm rounded ${filter === 'completed' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Completed
          </button>
          <button 
            onClick={() => setFilter('in progress')}
            className={`px-3 py-1.5 text-sm rounded ${filter === 'in progress' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            In Progress
          </button>
          <button 
            onClick={() => setFilter('planning')}
            className={`px-3 py-1.5 text-sm rounded ${filter === 'planning' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Planning
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id}
              project={project}
              onSelect={setSelectedProject}
            />
          ))}
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsGrid; 