import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight } from 'lucide-react'

export default function ProjectCard({ title, description, category, link = '#', index, comingSoon = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="card overflow-hidden group"
    >
      {/* Project Image Placeholder */}
      <div className="h-48 md:h-56 bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiMwMDY2RkYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-50"></div>
        
        {/* Floating shapes */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-primary/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-accent/30 rounded-full blur-2xl"></div>
        
        {comingSoon && (
          <div className="absolute inset-0 bg-dark/60 flex items-center justify-center">
            <span className="bg-primary/20 border border-primary/50 text-primary px-4 py-2 rounded-full text-sm font-medium">
              Coming Soon
            </span>
          </div>
        )}
      </div>
      
      {/* Project Content */}
      <div className="p-6 md:p-8">
        <span className="text-primary text-xs font-medium uppercase tracking-wider">
          {category}
        </span>
        <h3 className="font-display font-semibold text-xl text-white mt-2 mb-3 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {description}
        </p>
        
        {!comingSoon && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all duration-300"
          >
            View Project
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
        
        {comingSoon && (
          <span className="inline-flex items-center gap-2 text-gray-500 font-medium text-sm">
            Stay Tuned
            <ArrowRight className="w-4 h-4" />
          </span>
        )}
      </div>
    </motion.div>
  )
}
