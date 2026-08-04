import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ArrowRight, TrendingUp, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ProjectCard from '../components/ProjectCard'
import AnimatedSection from '../components/AnimatedSection'

const projects = [
  {
    title: 'CUROS Resume',
    description: 'A premium AI-powered resume builder helping professionals create stunning, ATS-friendly resumes in minutes with modern, customizable templates.',
    category: 'Products',
    tags: ['React.js', 'Node.js', 'Firebase', 'Tailwind CSS', 'AI Templates'],
    link: 'https://curos-resume-2lq3w00wb-curos.vercel.app/',
    metric: '100% ATS Friendly'
  },
  {
    title: 'CUROS Investing',
    description: 'A comprehensive fintech investment platform enabling users to manage portfolios, track investments, and access market insights with real-time data visualization.',
    category: 'Products',
    tags: ['React.js', 'D3.js Visualization', 'Tailwind', 'Real-time APIs', 'Fintech Security'],
    link: 'https://curosinvesting.com',
    metric: 'Real-time Sync'
  },
  {
    title: 'CUROS Pathshala',
    description: 'Our upcoming EdTech platform designed to revolutionize learning through interactive courses, live classes, and personalized learning paths.',
    category: 'Products',
    tags: ['EdTech Platform', 'Live Coding SDK', 'Vite', 'React.js', 'MongoDB'],
    comingSoon: true,
    metric: 'Launch Phase Q3'
  },
  {
    title: 'CaughtOn',
    description: 'A modern and interactive web application tailored for engaging user experiences and seamless interactions.',
    category: 'Software',
    tags: ['React.js', 'Web App', 'UI/UX'],
    link: 'https://caughton.vercel.app',
    comingSoon: false,
    metric: 'High Engagement'
  },
  {
    title: 'Fevysis Technology',
    description: 'Corporate website for a technology solutions provider, highlighting their digital services, expertise, and company portfolio.',
    category: 'Software',
    tags: ['Corporate Web', 'React.js', 'Tailwind CSS'],
    link: 'https://fevysis-technology.vercel.app',
    comingSoon: false,
    metric: 'Brand Presence'
  },
  {
    title: 'Homco Media',
    description: 'A sleek media and entertainment platform showcasing high-quality content, digital portfolios, and creative services.',
    category: 'Creative',
    tags: ['Media', 'Portfolio', 'Creative Agency'],
    link: 'https://homco-media.vercel.app',
    comingSoon: false,
    metric: 'Content Showcase'
  },
]

const clientLogos = [
  { name: 'FinTech Corp', placeholder: true },
  { name: 'HealthPlus', placeholder: true },
  { name: 'EduTech', placeholder: true },
  { name: 'RetailHub', placeholder: true },
  { name: 'TechStart', placeholder: true },
  { name: 'GlobalCorp', placeholder: true },
]

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter)

  return (
    <div className="bg-dark overflow-hidden">
      <PageHeader 
        title="Our Portfolio" 
        subtitle="Showcasing our work across industries"
        breadcrumb={[{ name: 'Portfolio' }]}
      />

      {/* Featured Projects */}
      <section className="section bg-dark relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(59,130,246,0.05),transparent_50%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 glass-pill text-primary text-xs font-semibold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
              Our Work
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto mb-10 leading-relaxed">
              Explore our diverse portfolio showcasing innovative solutions across fintech, 
              education, healthcare, and more. Built with precision and care.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-16 relative z-20">
            {[
              { id: 'all', name: 'All Projects' },
              { id: 'Products', name: 'CUROS Products' },
              { id: 'Software', name: 'Bespoke Software' },
              { id: 'Creative', name: 'Creative & Marketing' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                  activeFilter === cat.id
                    ? 'bg-gradient-to-r from-primary to-blue text-white shadow-glow-sm border-transparent'
                    : 'bg-dark-200/50 backdrop-blur-sm border-dark-300 text-gray-400 hover:border-primary/50 hover:text-white hover:bg-dark-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  category={project.category}
                  link={project.link}
                  index={index}
                  comingSoon={project.comingSoon}
                  tags={project.tags}
                  metric={project.metric}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-dark-100 relative">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '50+', label: 'Projects Completed' },
              { value: '30+', label: 'Happy Clients' },
              { value: '95%', label: 'Client Satisfaction' },
              { value: '5+', label: 'Years Experience' },
            ].map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.1}>
                <div className="card p-8 text-center h-full flex flex-col justify-center items-center group hover:border-primary/30 transition-colors">
                  <div className="font-display font-bold text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue to-accent mb-3 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="section bg-dark relative">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 glass-pill text-primary text-xs font-semibold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full">
              Trusted By
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white">
              Our Partner <span className="gradient-text">Ecosystem</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {clientLogos.map((client, index) => (
              <AnimatedSection key={client.name} delay={index * 0.05}>
                <div className="card p-6 flex items-center justify-center h-32 group hover:bg-primary/5 transition-colors cursor-default">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-dark-200 border border-dark-300 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-300 shadow-glow-sm">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-gray-400 text-sm font-medium group-hover:text-white transition-colors">{client.name}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-dark-100 relative">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="absolute right-0 top-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 glass-pill text-primary text-xs font-semibold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full">
              Testimonials
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "CUROS transformed our business with their innovative digital solutions. Their team's expertise in fintech helped us build a platform that exceeded our expectations.",
                name: 'Rahul Sharma',
                role: 'CEO, TechFin Solutions',
              },
              {
                quote: "The team at CUROS delivered our project on time and beyond our expectations. Their attention to detail and technical expertise is outstanding.",
                name: 'Priya Patel',
                role: 'Founder, EduLearn',
              },
              {
                quote: "Working with CUROS was a great experience. They understood our requirements perfectly and delivered a solution that helped us achieve our business goals.",
                name: 'Amit Kumar',
                role: 'Director, HealthPlus',
              },
            ].map((testimonial, index) => (
              <AnimatedSection key={testimonial.name} delay={index * 0.1}>
                <div className="card p-8 h-full relative group hover:border-primary/30 transition-all duration-300">
                  <div className="absolute top-0 left-8 w-12 h-1 bg-gradient-to-r from-primary to-blue" />
                  <div className="text-primary text-6xl mb-4 opacity-20 font-serif leading-none mt-2">"</div>
                  <p className="text-gray-300 mb-8 leading-relaxed relative z-10 text-lg italic">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-dark-200 border border-dark-300 rounded-full flex items-center justify-center text-primary font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-gray-500 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-dark relative overflow-hidden">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
              Have a Project in Mind?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Let's discuss your project requirements and create something amazing together.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-lg">
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
