import { FaHeart } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-400 py-8 px-4">
      <div className="container mx-auto text-center">
        <p className="flex items-center justify-center gap-2">
          Hecho con <FaHeart className="text-red-500" /> por{' '}
          <span className="text-white font-semibold">Luis Alejandro Blanco Barrett</span>
        </p>
        <p className="mt-2 text-sm">
          © {currentYear} Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer
