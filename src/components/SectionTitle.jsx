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
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`max-w-3xl mx-auto ${alignment[align]}`}
    >
      {subtitle && (
        <span className="inline-flex items-center gap-2 glass-pill text-primary text-xs font-semibold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
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
      {/* Decorative underline */}
      <div className={`mt-6 flex ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
        <div className="flex items-center gap-1">
          <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-primary/0 rounded-full" />
          <div className="w-2 h-2 rounded-full bg-primary/60" />
          <div className="w-8 h-0.5 bg-gradient-to-l from-blue to-blue/0 rounded-full" />
        </div>
      </div>
    </motion.div>
  )
}
