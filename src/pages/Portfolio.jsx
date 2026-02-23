import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight, TrendingUp } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import ProjectCard from '../components/ProjectCard'
import AnimatedSection from '../components/AnimatedSection'

const projects = [
  {
    title: 'CUROS Investing',
    description: 'A comprehensive fintech investment platform enabling users to manage portfolios, track investments, and access market insights with real-time data visualization.',
    category: 'Fintech',
    link: 'https://curosinvesting.com',
  },
  {
    title: 'CUROS Pathshala',
    description: 'Our upcoming EdTech platform designed to revolutionize learning through interactive courses, live classes, and personalized learning paths.',
    category: 'EdTech',
    comingSoon: true,
  },
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured online store with advanced product management, secure payment integration, and seamless user experience.',
    category: 'Web Development',
    comingSoon: false,
  },
  {
    title: 'Healthcare App',
    description: 'Mobile application for patient management, appointment scheduling, and telemedicine features for healthcare providers.',
    category: 'Mobile App',
    comingSoon: false,
  },
  {
    title: 'Corporate Brand Video',
    description: 'Professional video production including scriptwriting, filming, editing, and post-production for a leading corporate client.',
    category: 'Video Production',
    comingSoon: false,
  },
  {
    title: 'Digital Marketing Campaign',
    description: 'Comprehensive digital marketing strategy resulting in 300% increase in leads and 150% ROI for a B2B client.',
    category: 'Digital Marketing',
    comingSoon: false,
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
  return (
    <div className="bg-dark">
      <PageHeader 
        title="Our Portfolio" 
        subtitle="Showcasing our work across industries"
        breadcrumb={[{ name: 'Portfolio' }]}
      />

      {/* Featured Projects */}
      <section className="section bg-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-medium uppercase tracking-wider mb-3 block">
              Our Work
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
              Featured Projects
            </h2>
            <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
              Explore our diverse portfolio showcasing innovative solutions across fintech, 
              education, healthcare, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                category={project.category}
                link={project.link}
                index={index}
                comingSoon={project.comingSoon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-dark-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '50+', label: 'Projects Completed' },
              { value: '30+', label: 'Happy Clients' },
              { value: '95%', label: 'Client Satisfaction' },
              { value: '5+', label: 'Years Experience' },
            ].map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <div className="font-display font-bold text-4xl md:text-5xl text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="section bg-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-medium uppercase tracking-wider mb-3 block">
              Trusted By
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
              Our Clients
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {clientLogos.map((client, index) => (
              <AnimatedSection key={client.name} delay={index * 0.05}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="card p-6 flex items-center justify-center h-24"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-dark-300 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-gray-400 text-sm">{client.name}</span>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-dark-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-medium uppercase tracking-wider mb-3 block">
              Testimonials
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="card p-8 h-full">
                  <div className="text-primary text-4xl mb-4">"</div>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {testimonial.quote}
                  </p>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-gray-500 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-dark">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
              Have a Project in Mind?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Let's discuss your project requirements and create something amazing together.
            </p>
            <a href="/contact" className="btn-primary inline-flex items-center gap-2">
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
