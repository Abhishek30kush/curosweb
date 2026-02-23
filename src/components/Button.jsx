import { motion } from 'framer-motion'

export default function Button({ children, variant = 'primary', className = '', onClick, type = 'button', disabled = false }) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold px-6 py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-primary hover:bg-primary-light text-white hover:shadow-lg hover:shadow-primary/25 hover:scale-105',
    secondary: 'border border-primary text-primary hover:bg-primary hover:text-white',
    outline: 'border border-dark-300 text-gray-300 hover:border-primary hover:text-white bg-dark-200/50',
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </motion.button>
  )
}
