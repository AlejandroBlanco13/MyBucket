import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const Projects = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description:
        'Plataforma completa de comercio electrónico con carrito de compras, sistema de pagos y panel de administración.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      github: 'https://github.com/tuusuario/ecommerce',
      demo: 'https://ecommerce-demo.com',
    },
    {
      title: 'Dashboard Analytics',
      description:
        'Dashboard interactivo para visualización de datos con gráficos en tiempo real y múltiples fuentes de datos.',
      technologies: ['React', 'TypeScript', 'Chart.js', 'API REST'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      github: 'https://github.com/tuusuario/dashboard',
      demo: 'https://dashboard-demo.com',
    },
    {
      title: 'Task Management App',
      description:
        'Aplicación de gestión de tareas con colaboración en tiempo real, notificaciones y múltiples vistas.',
      technologies: ['React', 'Firebase', 'Tailwind CSS', 'Framer Motion'],
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
      github: 'https://github.com/tuusuario/tasks',
      demo: 'https://tasks-demo.com',
    },
    {
      title: 'Social Media API',
      description:
        'API REST completa para red social con autenticación JWT, subida de archivos y sistema de notificaciones.',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'AWS S3'],
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
      github: 'https://github.com/tuusuario/social-api',
      demo: 'https://api-demo.com',
    },
    {
      title: 'Weather App',
      description:
        'Aplicación del clima con pronóstico extendido, mapas interactivos y alertas meteorológicas.',
      technologies: ['React', 'OpenWeather API', 'Leaflet', 'PWA'],
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800',
      github: 'https://github.com/tuusuario/weather',
      demo: 'https://weather-demo.com',
    },
    {
      title: 'Blog Platform',
      description:
        'Plataforma de blog moderna con editor markdown, comentarios y sistema de categorías.',
      technologies: ['Next.js', 'MDX', 'Prisma', 'Vercel'],
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800',
      github: 'https://github.com/tuusuario/blog',
      demo: 'https://blog-demo.com',
    },
  ]

  return (
    <section id="projects" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Mis <span className="text-gradient">Proyectos</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Algunos de los proyectos en los que he trabajado recientemente
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <FaGithub /> Código
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <FaExternalLinkAlt /> Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
