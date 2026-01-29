import { motion } from 'framer-motion'
import { FaCode, FaRocket, FaHeart } from 'react-icons/fa'

const About = () => {
  const features = [
    {
      icon: FaCode,
      title: 'Código Limpio',
      description: 'Escribo código mantenible y bien estructurado siguiendo las mejores prácticas.',
    },
    {
      icon: FaRocket,
      title: 'Rendimiento',
      description: 'Optimizo aplicaciones para obtener el mejor rendimiento y experiencia de usuario.',
    },
    {
      icon: FaHeart,
      title: 'Pasión',
      description: 'Amo lo que hago y siempre estoy aprendiendo nuevas tecnologías y técnicas.',
    },
  ]

  return (
    <section id="about" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Sobre <span className="text-gradient">Mí</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto mb-6"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-6">Desarrollador Full Stack</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Soy un desarrollador apasionado con experiencia en tecnologías modernas de desarrollo web.
              Me especializo en crear aplicaciones escalables y eficientes que brindan excelentes
              experiencias de usuario.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Mi enfoque se centra en escribir código limpio, seguir las mejores prácticas de la
              industria y mantenerme actualizado con las últimas tendencias tecnológicas.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Cuando no estoy programando, disfruto contribuyendo a proyectos open source,
              aprendiendo nuevas tecnologías y compartiendo conocimiento con la comunidad.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { label: 'Proyectos Completados', value: '50+' },
              { label: 'Años de Experiencia', value: '3+' },
              { label: 'Tecnologías', value: '15+' },
              { label: 'Clientes Satisfechos', value: '30+' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg text-center"
              >
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl text-primary-600 dark:text-primary-400 mb-4">
                <feature.icon />
              </div>
              <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
