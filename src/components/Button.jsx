import { motion } from 'framer-motion'

export default function Button({ children, variant = 'primary', className = '', onClick, type = 'button', disabled = false }) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold px-6 py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden'
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary via-primary-light to-blue text-white shadow-glow-sm hover:shadow-glow',
    secondary: 'border border-primary/30 text-primary hover:bg-primary hover:text-white hover:border-transparent hover:shadow-glow-sm bg-primary/5',
    outline: 'border border-dark-300 text-gray-300 hover:border-primary/40 hover:text-white bg-dark-200/30 backdrop-blur-sm',
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={variant === 'primary' ? { backgroundSize: '200% auto' } : {}}
    >
      {/* Shimmer overlay for primary */}
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 pointer-events-none" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  )
}
