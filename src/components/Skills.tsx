import { motion } from 'framer-motion'
import {
  FaReact,
  FaNode,
  FaPython,
  FaJs,
  FaGitAlt,
  FaDocker,
  FaAws,
  FaDatabase,
} from 'react-icons/fa'
import { SiTypescript, SiTailwindcss, SiMongodb, SiPostgresql } from 'react-icons/si'

const Skills = () => {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        { name: 'React', icon: FaReact, level: 90 },
        { name: 'TypeScript', icon: SiTypescript, level: 85 },
        { name: 'JavaScript', icon: FaJs, level: 90 },
        { name: 'Tailwind CSS', icon: SiTailwindcss, level: 88 },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', icon: FaNode, level: 85 },
        { name: 'Python', icon: FaPython, level: 80 },
        { name: 'MongoDB', icon: SiMongodb, level: 82 },
        { name: 'PostgreSQL', icon: SiPostgresql, level: 78 },
      ],
    },
    {
      category: 'Herramientas',
      skills: [
        { name: 'Git', icon: FaGitAlt, level: 90 },
        { name: 'Docker', icon: FaDocker, level: 75 },
        { name: 'AWS', icon: FaAws, level: 70 },
        { name: 'Database', icon: FaDatabase, level: 85 },
      ],
    },
  ]

  return (
    <section id="skills" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Mis <span className="text-gradient">Habilidades</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tecnologías y herramientas que utilizo para crear soluciones increíbles
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.2 }}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg"
            >
              <h3 className="text-2xl font-bold mb-6 text-center">{category.category}</h3>
              <div className="space-y-6">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.2 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <skill.icon className="text-2xl text-primary-600 dark:text-primary-400" />
                        <span className="font-semibold">{skill.name}</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: categoryIndex * 0.2 + index * 0.1 }}
                        className="bg-gradient-to-r from-primary-500 to-purple-600 h-2 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
