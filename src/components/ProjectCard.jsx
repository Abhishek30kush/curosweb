import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react'

export default function ProjectCard({ 
  title, 
  description, 
  category, 
  link = '#', 
  index, 
  comingSoon = false,
  tags = [],
  metric = ''
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="card overflow-hidden group flex flex-col justify-between h-full transition-all duration-500"
    >
      <div>
        {/* Developer Mockup / Browser Frame */}
        <div className="h-44 bg-gradient-to-br from-primary/8 via-blue/5 to-accent/3 relative overflow-hidden border-b border-primary/8 flex flex-col justify-between p-3 select-none">
          {/* Header Bar */}
          <div className="flex items-center justify-between w-full z-10">
            {/* Window controls */}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/60"></span>
            </div>
            
            {/* Address Bar */}
            <div className="bg-dark-300/40 border border-dark-400/40 rounded-md text-[10px] text-gray-500 px-3 py-0.5 max-w-[140px] truncate font-mono">
              curos://work/{title.toLowerCase().replace(/\s+/g, '-')}
            </div>

            {/* Shield Check Badge */}
            <div className="flex items-center gap-1 text-[10px] text-primary bg-primary/10 border border-primary/15 px-2 py-0.5 rounded-full font-medium">
              <ShieldCheck className="w-3 h-3" />
              Direct
            </div>
          </div>

          {/* Central Visual / Code Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.06),transparent_70%)]"></div>
          <div className="absolute inset-0 dot-pattern opacity-30"></div>
          
          {/* Key Metric Highlight */}
          {metric && (
            <div className="self-center z-10 mb-2 transform group-hover:scale-105 transition-transform duration-300">
              <div className="glass-subtle text-accent font-display font-semibold text-xs py-1.5 px-4 rounded-full shadow-lg shadow-black/40 flex items-center gap-1.5 border border-accent/15">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                {metric}
              </div>
            </div>
          )}

          {comingSoon && (
            <div className="absolute inset-0 bg-dark/70 backdrop-blur-[2px] flex items-center justify-center z-20">
              <span className="bg-primary/20 border border-primary/40 text-primary px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase shadow-lg shadow-black/30">
                Coming Soon
              </span>
            </div>
          )}
        </div>
        
        {/* Project Content */}
        <div className="p-6 md:p-8">
          <span className="text-primary text-xs font-semibold uppercase tracking-wider bg-primary/10 border border-primary/15 px-2.5 py-0.5 rounded-md">
            {category}
          </span>
          
          <h3 className="font-display font-bold text-xl text-white mt-4 mb-3 group-hover:text-primary-light transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            {description}
          </p>

          {/* Technology Badges */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {tags.map((tag) => (
                <span 
                  key={tag}
                  className="text-[10px] font-medium bg-dark-300/50 border border-dark-400/30 text-gray-400 px-2 py-0.5 rounded backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-6 md:px-8 pb-6 md:pb-8">
        {!comingSoon && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-accent group-hover:gap-3 transition-all duration-300"
          >
            Launch Project
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
        
        {comingSoon && (
          <span className="inline-flex items-center gap-2 text-gray-500 font-semibold text-sm">
            Stay Tuned
            <ArrowRight className="w-4 h-4" />
          </span>
        )}
      </div>
    </motion.div>
  )
}
