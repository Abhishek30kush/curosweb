import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function PageHeader({ title, subtitle, breadcrumb = [] }) {
  return (
    <div className="pt-32 pb-16 md:pt-40 md:pb-20 px-4 md:px-8 bg-gradient-to-b from-dark-100 to-dark">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-sm text-gray-400 mb-4"
        >
          <Link to="/" className="hover:text-primary transition-colors">
            <Home className="w-4 h-4" />
          </Link>
          {breadcrumb.map((item, index) => (
            <span key={index} className="flex items-center gap-2">
              <span className="text-dark-300">/</span>
              {item.link ? (
                <Link to={item.link} className="hover:text-primary transition-colors">
                  {item.name}
                </Link>
              ) : (
                <span className="text-primary">{item.name}</span>
              )}
            </span>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  )
}
