import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, ChevronRight } from 'lucide-react'

export default function PageHeader({ title, subtitle, breadcrumb = [] }) {
  return (
    <div className="pt-32 pb-16 md:pt-40 md:pb-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 dot-pattern opacity-40" />
      
      {/* Floating gradient blobs */}
      <div className="absolute top-20 left-[10%] w-72 h-72 bg-primary/15 rounded-full aurora-blob" />
      <div className="absolute bottom-10 right-[15%] w-56 h-56 bg-blue/10 rounded-full aurora-blob" style={{ animationDelay: '4s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 section-divider" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-1.5 text-sm text-gray-400 mb-6"
        >
          <Link to="/" className="hover:text-primary transition-colors glass-pill px-2.5 py-1 rounded-lg text-xs flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          {breadcrumb.map((item, index) => (
            <span key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-dark-300" />
              {item.link ? (
                <Link to={item.link} className="hover:text-primary transition-colors glass-pill px-2.5 py-1 rounded-lg text-xs">
                  {item.name}
                </Link>
              ) : (
                <span className="text-primary glass-pill px-2.5 py-1 rounded-lg text-xs font-medium">{item.name}</span>
              )}
            </span>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
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
