import { motion } from 'framer-motion'

export default function SectionTitle({ subtitle, title, description, align = 'center' }) {
  const alignment = {
    center: 'text-center',
    left: 'text-left',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`max-w-3xl mx-auto ${alignment[align]}`}
    >
      {subtitle && (
        <span className="text-primary text-sm font-medium uppercase tracking-wider mb-3 block">
          {subtitle}
        </span>
      )}
      <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-gray-400 text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  )
}
