import { motion } from 'framer-motion'
import { Target, Eye, Lightbulb, Award, Users, Globe, TrendingUp, CheckCircle, Sparkles } from 'lucide-react'
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
    description: 'Revolutionizing financial services through innovative digital solutions.',
  },
  {
    icon: Lightbulb,
    title: 'Education',
    description: 'Transforming learning experiences with technology-driven platforms.',
  },
  {
    icon: Sparkles,
    title: 'Artificial Intelligence',
    description: 'Leveraging AI to create intelligent and adaptive solutions.',
  },
]

const values = [
  {
    icon: Target,
    title: 'Mission',
    description: 'To empower businesses with cutting-edge digital solutions that drive growth, efficiency, and innovation across all sectors.',
  },
  {
    icon: Eye,
    title: 'Vision',
    description: 'To be a global leader in digital transformation, creating meaningful impact through technology, education, and innovation.',
  },
]

export default function About() {
  return (
    <div className="bg-dark">
      <PageHeader 
        title="About Us" 
        subtitle="Pioneering digital innovation across multiple sectors"
        breadcrumb={[{ name: 'About' }]}
      />

      {/* Company Introduction */}
      <section className="section bg-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection>
              <span className="text-primary text-sm font-medium uppercase tracking-wider mb-3 block">
                Who We Are
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6">
                Transforming Ideas Into{' '}
                <span className="gradient-text">Digital Reality</span>
              </h2>
              <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
                <p>
                  CUROS LLP is a multi-sector digital innovation company dedicated to building 
                  powerful digital businesses through technology, education, and innovation.
                </p>
                <p>
                  We specialize in delivering comprehensive digital solutions that help businesses 
                  navigate the ever-evolving technological landscape. From web development to 
                  mobile applications, from content production to digital marketing, we offer 
                  end-to-end services designed to elevate your digital presence.
                </p>
                <p>
                  Our team of experts combines technical prowess with creative thinking to 
                  deliver solutions that not only meet but exceed expectations. We believe in 
                  building long-term partnerships with our clients through transparency, 
                  reliability, and exceptional results.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="card p-6 text-center"
                  >
                    <div className="font-display font-bold text-4xl text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-dark-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <div className="card p-8 h-full">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white mb-4">
                    Our {value.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="section bg-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-medium uppercase tracking-wider mb-3 block">
              What We Focus On
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
              Our Strategic Focus Areas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {focusAreas.map((area, index) => (
              <AnimatedSection key={area.title} delay={index * 0.1}>
                <div className="card p-8 group hover:border-primary/50">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <area.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-white mb-3">
                    {area.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section bg-dark-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-medium uppercase tracking-wider mb-3 block">
              Leadership
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
              Meet Our Founder
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <div className="card p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  {/* Founder Image Placeholder */}
                  <div className="w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-20 h-20 text-white/50" />
                  </div>
                  
                  <div className="text-center md:text-left">
                    <h3 className="font-display font-bold text-2xl text-white mb-2">
                      Abhishek Kushwaha
                    </h3>
                    <p className="text-primary font-medium mb-4">
                      CEO, CUROS LLP
                    </p>
                    <p className="text-gray-400 leading-relaxed">
                      A visionary leader with deep expertise in fintech, education, and artificial 
                      intelligence. Abhishek founded CUROS with a mission to transform businesses 
                      through innovative digital solutions. His strategic vision and commitment to 
                      excellence have guided CUROS to become a trusted partner for businesses seeking 
                      digital transformation.
                    </p>
                    
                    <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                      {focusAreas.map((area) => (
                        <span 
                          key={area.title}
                          className="bg-dark-200 text-gray-300 px-3 py-1.5 rounded-lg text-sm border border-dark-300"
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
      <section className="section bg-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-medium uppercase tracking-wider mb-3 block">
              Our Values
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
              What Drives Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Innovation', desc: 'Constantly pushing boundaries' },
              { title: 'Quality', desc: 'Excellence in everything we do' },
              { title: 'Integrity', desc: 'Transparent and honest partnerships' },
              { title: 'Growth', desc: 'Committed to your success' },
            ].map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <div className="card p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {value.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-dark-100">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Let's discuss how CUROS can help transform your business with innovative digital solutions.
            </p>
            <a href="/contact" className="btn-primary inline-flex items-center gap-2">
              Get In Touch
              <TrendingUp className="w-4 h-4" />
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
