import { motion } from 'framer-motion'
import { Target, Eye, Lightbulb, Award, Users, Globe, TrendingUp, CheckCircle, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import AnimatedSection from '../components/AnimatedSection'

const stats = [
  { value: '50+', label: 'Projects Completed' },
  { value: '30+', label: 'Happy Clients' },
  { value: '5+', label: 'Years Experience' },
  { value: '24/7', label: 'Support' },
]

const focusAreas = [
  {
    icon: TrendingUp,
    title: 'Fintech',
    description: 'Engineering secure, scalable financial architectures that power the next generation of global commerce.',
  },
  {
    icon: Lightbulb,
    title: 'Education',
    description: 'Democratizing quality learning through AI-enhanced EdTech platforms designed for impact.',
  },
  {
    icon: Sparkles,
    title: 'Product Ecosystem',
    description: 'Building world-class AI tools and SaaS products that solve real-world professional challenges.',
  },
]

const values = [
  {
    icon: Target,
    title: 'Mission',
    description: 'To deliver high-impact digital solutions that accelerate business growth and foster innovation in a tech-driven landscape.',
  },
  {
    icon: Eye,
    title: 'Vision',
    description: 'To be the global catalyst for digital transformation, setting new standards in software excellence and creative innovation.',
  },
]

export default function About() {
  return (
    <div className="bg-dark min-h-screen overflow-hidden">
      <PageHeader 
        title="About Us" 
        subtitle="Architecting world-class digital ecosystems through technology, education, and AI."
        breadcrumb={[{ name: 'About' }]}
      />

      {/* Company Introduction */}
      <section className="section bg-dark relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.05),transparent_50%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 glass-pill text-primary text-xs font-semibold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                The CUROS Essence
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6">
                Architecting the Future of{' '}
                <span className="gradient-text">Digital Innovation</span>
              </h2>
              <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
                <p>
                  CUROS LLP is more than a digital agency; we are a <strong>strategic innovation powerhouse</strong> 
                  dedicated to building powerful digital ecosystems. We work <strong className="text-gray-300">directly with our clients</strong>, 
                  eliminating third-party agencies, middle-men, and translation layers.
                </p>
                <p>
                  We don't just build software; we architect customized experiences. By working directly with 
                  our core engineering team, our clients experience unparalleled transparency, direct communication 
                  with technical architects, and highly cost-optimized project execution.
                </p>
                <p>
                  From building world-class SaaS tools like <strong className="text-primary-light">CUROS Resume</strong> to executing bespoke enterprise Web 
                  & App developments, we partner with visionaries to turn disruptive ideas into market-ready realities.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-6 relative">
                {/* Decorative background for stats */}
                <div className="absolute inset-0 bg-primary/5 rounded-3xl rotate-3 scale-105 pointer-events-none border border-primary/10" />
                
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="card p-6 text-center group hover:bg-primary/5 transition-colors relative z-10 bg-dark/80 backdrop-blur-md"
                  >
                    <div className="font-display font-bold text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-blue mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-dark-100 relative">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="absolute left-0 top-1/2 w-96 h-96 bg-blue/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <div className="card p-8 md:p-10 h-full group hover:shadow-glow-sm">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-blue/15 rounded-2xl flex items-center justify-center mb-8 border border-primary/15 group-hover:bg-primary/20 transition-colors">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-3xl text-white mb-4">
                    Our {value.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="section bg-dark relative">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 glass-pill text-primary text-xs font-semibold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full">
              What We Focus On
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white">
              Strategic Focus Areas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {focusAreas.map((area, index) => (
              <AnimatedSection key={area.title} delay={index * 0.1}>
                <div className="card p-8 group hover:border-primary/30 transition-all duration-300 relative overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-dark-200 rounded-xl border border-dark-300 flex items-center justify-center mb-6 group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-300 shadow-glow-sm">
                      <area.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-primary-light transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm">
                      {area.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section bg-dark-100 relative overflow-hidden">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 glass-pill text-primary text-xs font-semibold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full">
              Leadership
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white">
              Meet Our Founder
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="card p-8 md:p-12 relative overflow-hidden gradient-border">
                {/* Background glow behind founder */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
                
                <div className="flex flex-col md:flex-row gap-10 items-center md:items-start relative z-10">
                  {/* Founder Image Placeholder */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-xl group-hover:bg-primary/30 transition-colors duration-500" />
                    <div className="w-48 h-48 md:w-56 md:h-56 bg-gradient-to-br from-dark-200 to-dark-100 rounded-3xl flex items-center justify-center flex-shrink-0 border border-primary/20 relative z-10 overflow-hidden">
                      {/* placeholder content */}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-300/80 to-transparent z-10" />
                      <Users className="w-24 h-24 text-primary/40 relative z-0" />
                    </div>
                  </div>
                  
                  <div className="text-center md:text-left pt-2">
                    <h3 className="font-display font-bold text-3xl text-white mb-2">
                      Abhishek Kushwaha
                    </h3>
                    <p className="inline-block bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-lg text-sm font-semibold mb-6 shadow-glow-sm">
                      CEO & Technical Architect
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg mb-6">
                      A visionary "Product Architect" and tech strategist, Abhishek founded CUROS with a singular mission: to democratize innovation through intelligent technology. With deep roots in Fintech and AI, he leads from the front—combining strategic foresight with a passion for building products that amplify human potential.
                    </p>
                    
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {focusAreas.map((area) => (
                        <span 
                          key={area.title}
                          className="glass-subtle text-gray-300 px-3 py-1.5 rounded-lg text-sm border border-dark-300"
                        >
                          {area.title} Expert
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-dark relative">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 glass-pill text-primary text-xs font-semibold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full">
              Our Values
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white">
              What Drives Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Innovation', desc: 'Constantly pushing boundaries to find better solutions.' },
              { title: 'Quality', desc: 'Uncompromising excellence in every line of code.' },
              { title: 'Integrity', desc: 'Radical transparency and honest partnerships.' },
              { title: 'Growth', desc: 'Committed to scaling alongside our clients.' },
            ].map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <div className="card p-8 text-center h-full group hover:border-primary/40 transition-colors">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-primary/10 group-hover:bg-primary/20 transition-colors">
                    <CheckCircle className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-dark-100 relative overflow-hidden">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Let's discuss how CUROS can help transform your business with innovative digital solutions.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-lg">
              Get In Touch
              <TrendingUp className="w-5 h-5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
