import { motion } from 'framer-motion'
import { Globe, Smartphone, Video, TrendingUp, GraduationCap, Code, Layout, Database, Server, CheckCircle, PenTool, Megaphone, Target, Search, BarChart3, Users, GraduationCap as Edu, BookOpen, Video as VideoIcon } from 'lucide-react'
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
    <div className="bg-dark">
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
          className={`section ${index % 2 === 0 ? 'bg-dark' : 'bg-dark-100'}`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Content */}
              <AnimatedSection className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-primary text-sm font-medium uppercase tracking-wider">
                    {service.subtitle}
                  </span>
                </div>
                
                <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
                  {service.title}
                </h2>
                
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  {service.description}
                </p>

                {service.comingSoon ? (
                  <div className="card p-6 bg-primary/5 border-primary/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-primary font-semibold">Coming Soon</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      We're working hard to bring you an exceptional learning experience. 
                      Stay tuned for the launch of CUROS Pathshala!
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Features */}
                    <div className="mb-8">
                      <h3 className="font-display font-semibold text-white mb-4">Key Features</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    {service.technologies && (
                      <div>
                        <h3 className="font-display font-semibold text-white mb-4">Technologies We Use</h3>
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.map((tech) => (
                            <span 
                              key={tech} 
                              className="bg-dark-200 text-gray-300 px-3 py-1.5 rounded-lg text-sm border border-dark-300"
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
                  <div className="card p-8 gradient-border text-center">
                    <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <GraduationCap className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-2xl text-white mb-3">
                      Something Big is Coming
                    </h3>
                    <p className="text-gray-400">
                      We're working hard to bring you an exceptional learning experience.
                    </p>
                  </div>
                ) : (
                  <div className="card p-8">
                    <h3 className="font-display font-semibold text-white mb-6">Our Process</h3>
                    <div className="space-y-6">
                      {service.process.map((step, stepIndex) => (
                        <motion.div 
                          key={step.title}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: stepIndex * 0.1 }}
                          className="flex gap-4"
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                            <span className="text-primary font-semibold text-sm">{stepIndex + 1}</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-white mb-1">{step.title}</h4>
                            <p className="text-gray-400 text-sm">{step.description}</p>
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
      <section className="section bg-dark-100">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
              Need a Custom Solution?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Let's discuss your project requirements and create a tailored solution for your business.
            </p>
            <a href="/contact" className="btn-primary inline-flex items-center gap-2">
              Get Free Consultation
              <TrendingUp className="w-4 h-4" />
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
