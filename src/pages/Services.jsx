import { motion } from 'framer-motion'
import { Globe, Smartphone, Video, TrendingUp, GraduationCap, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import AnimatedSection from '../components/AnimatedSection'

const services = [
  {
    id: 'web-development',
    icon: Globe,
    title: 'Web Development',
    subtitle: 'Creating powerful web experiences',
    description: 'We build stunning, high-performance websites and web applications that engage users and drive business growth. Our development process combines cutting-edge technologies with best practices to deliver exceptional results.',
    features: [
      'Custom Website Development',
      'Web Application Development',
      'E-commerce Solutions',
      'CMS Development',
      'API Integration',
      'Performance Optimization',
    ],
    technologies: ['React', 'Node.js', 'Python', 'PHP', 'MySQL', 'MongoDB', 'AWS'],
    process: [
      { title: 'Discovery', description: 'We analyze your requirements and business goals.' },
      { title: 'Design', description: 'Our team creates stunning UI/UX designs.' },
      { title: 'Development', description: 'We build robust and scalable solutions.' },
      { title: 'Testing', description: 'Rigorous testing ensures quality deliverables.' },
      { title: 'Deployment', description: 'We launch your project with full support.' },
    ],
  },
  {
    id: 'app-development',
    icon: Smartphone,
    title: 'App Development',
    subtitle: 'Building mobile experiences that matter',
    description: 'From concept to launch, we create intuitive and feature-rich mobile applications for iOS and Android platforms. Our apps are designed to deliver seamless user experiences and drive engagement.',
    features: [
      'Native iOS Development',
      'Native Android Development',
      'Cross-platform Apps',
      'App UI/UX Design',
      'API Development',
      'App Store Optimization',
    ],
    technologies: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'Firebase', 'AWS'],
    process: [
      { title: 'Requirements', description: 'We gather and analyze your app requirements.' },
      { title: 'UI/UX Design', description: 'Creating intuitive and beautiful interfaces.' },
      { title: 'Development', description: 'Building robust and scalable mobile apps.' },
      { title: 'Testing', description: 'Comprehensive testing across devices.' },
      { title: 'Launch', description: 'Deploying to App Store and Google Play.' },
    ],
  },
  {
    id: 'video-editing',
    icon: Video,
    title: 'Video Editing & Content Production',
    subtitle: 'Visual storytelling that captivates',
    description: 'Our professional video editing and content production services help brands tell their story effectively. From corporate videos to social media content, we create compelling visual narratives.',
    features: [
      'Corporate Video Production',
      'Commercial Ad Editing',
      'Social Media Content',
      'Motion Graphics',
      'Color Grading',
      'Sound Design',
    ],
    technologies: ['Adobe Premiere', 'After Effects', 'DaVinci Resolve', 'Final Cut Pro'],
    process: [
      { title: 'Brief', description: 'Understanding your vision and requirements.' },
      { title: 'Pre-production', description: 'Scripting, storyboarding, and planning.' },
      { title: 'Production', description: 'Filming and capturing your content.' },
      { title: 'Post-production', description: 'Editing, effects, and color grading.' },
      { title: 'Delivery', description: 'Final output in required formats.' },
    ],
  },
  {
    id: 'digital-marketing',
    icon: TrendingUp,
    title: 'Digital Marketing & Advertisement',
    subtitle: 'Growing your brand online',
    description: 'Our data-driven digital marketing strategies help businesses increase their online visibility, generate leads, and achieve measurable results. We tailor our approaches to meet your specific business objectives.',
    features: [
      'Search Engine Optimization',
      'Pay-Per-Click Advertising',
      'Social Media Marketing',
      'Content Marketing',
      'Email Marketing',
      'Analytics & Reporting',
    ],
    technologies: ['Google Ads', 'Facebook Ads', 'Google Analytics', 'SEO Tools', 'Mailchimp'],
    process: [
      { title: 'Analysis', description: 'Understanding your market and competitors.' },
      { title: 'Strategy', description: 'Developing customized marketing plans.' },
      { title: 'Execution', description: 'Implementing campaigns across channels.' },
      { title: 'Optimization', description: 'Continuous monitoring and improvements.' },
      { title: 'Reporting', description: 'Transparent performance reports.' },
    ],
  },
  {
    id: 'edtech',
    icon: GraduationCap,
    title: 'EdTech Platform - CUROS Pathshala',
    subtitle: 'Revolutionizing education through technology',
    description: 'CUROS Pathshala is our upcoming EdTech initiative aimed at making quality education accessible to everyone. We believe in the power of technology to transform learning experiences.',
    features: [
      'Interactive Video Lessons',
      'Live Classes',
      'Progress Tracking',
      'Certification',
      'Quiz & Assessments',
      'Mobile Learning',
    ],
    comingSoon: true,
  },
]

export default function Services() {
  return (
    <div className="bg-dark overflow-hidden">
      <PageHeader 
        title="Our Services" 
        subtitle="Comprehensive digital solutions tailored to your business needs"
        breadcrumb={[{ name: 'Services' }]}
      />

      {/* Services Detail Sections */}
      {services.map((service, index) => (
        <section 
          key={service.id} 
          id={service.id}
          className={`section relative ${index % 2 === 0 ? 'bg-dark' : 'bg-dark-100'}`}
        >
          {/* Background effects */}
          {index % 2 === 0 && <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />}
          {index % 2 !== 0 && <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(124,58,237,0.05),transparent_50%)] pointer-events-none" />}
          {index !== 0 && <div className="section-divider absolute top-0 left-0 right-0" />}

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Content */}
              <AnimatedSection className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-blue/15 rounded-2xl flex items-center justify-center shadow-glow-sm border border-primary/15">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="inline-flex items-center gap-2 glass-pill text-primary text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full">
                    {service.subtitle}
                  </span>
                </div>
                
                <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6">
                  {service.title}
                </h2>
                
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  {service.description}
                </p>

                {service.comingSoon ? (
                  <div className="card p-6 bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20 shadow-glow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      </div>
                      <span className="text-white font-semibold text-lg">Coming Soon</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      We're working hard to bring you an exceptional learning experience. 
                      Stay tuned for the launch of CUROS Pathshala!
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Features */}
                    <div className="mb-8">
                      <h3 className="font-display font-semibold text-white mb-5 flex items-center gap-2">
                        Key Features
                        <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent ml-2" />
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-3 group">
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                              <CheckCircle className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    {service.technologies && (
                      <div>
                        <h3 className="font-display font-semibold text-white mb-5 flex items-center gap-2">
                          Technologies We Use
                          <div className="h-px flex-1 bg-gradient-to-r from-blue/30 to-transparent ml-2" />
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.map((tech) => (
                            <span 
                              key={tech} 
                              className="glass-subtle text-gray-300 px-3 py-1.5 rounded-lg text-sm border border-dark-300 hover:border-primary/30 hover:text-white transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </AnimatedSection>

              {/* Process or Image */}
              <AnimatedSection delay={0.2} className={index % 2 === 1 ? 'lg:order-1' : ''}>
                {service.comingSoon ? (
                  <div className="card p-12 gradient-border text-center shadow-2xl shadow-primary/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.1),transparent_70%)]" />
                    <div className="relative z-10">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-blue/15 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20 shadow-glow-sm">
                        <GraduationCap className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="font-display font-bold text-2xl text-white mb-3">
                        Something Big is Coming
                      </h3>
                      <p className="text-gray-400">
                        We're working hard to bring you an exceptional learning experience.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="card p-8 relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
                    <h3 className="font-display font-semibold text-white mb-8 text-xl">Our Process</h3>
                    <div className="space-y-6 relative z-10">
                      {service.process.map((step, stepIndex) => (
                        <motion.div 
                          key={step.title}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: stepIndex * 0.1 }}
                          className="flex gap-5 relative group"
                        >
                          {/* Timeline Line */}
                          {stepIndex !== service.process.length - 1 && (
                            <div className="absolute left-5 top-10 w-px h-[calc(100%+12px)] bg-gradient-to-b from-primary/30 to-transparent" />
                          )}
                          
                          <div className="flex-shrink-0 w-10 h-10 bg-dark-200 border border-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300 relative z-10">
                            <span className="text-primary font-bold text-sm">{stepIndex + 1}</span>
                          </div>
                          <div className="pt-2">
                            <h4 className="font-semibold text-white mb-1.5 group-hover:text-primary-light transition-colors">{step.title}</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </AnimatedSection>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="section bg-dark-100 relative overflow-hidden">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
              Need a Custom Solution?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Let's discuss your project requirements and create a tailored solution for your business.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-lg">
              Get Free Consultation
              <TrendingUp className="w-5 h-5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
