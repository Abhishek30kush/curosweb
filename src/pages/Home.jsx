import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Globe, Smartphone, Video, TrendingUp, GraduationCap, CheckCircle, Zap, Clock, Award, Users } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import ServiceCard from '../components/ServiceCard'
import AnimatedSection from '../components/AnimatedSection'

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Custom websites and web applications built with cutting-edge technologies for your business needs.',
  },
  {
    icon: Smartphone,
    title: 'App Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
  },
  {
    icon: Video,
    title: 'Video Editing',
    description: 'Professional video editing and content production services to elevate your brand presence.',
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'Strategic SEO, social media marketing, and advertisement campaigns to grow your business.',
  },
  {
    icon: GraduationCap,
    title: 'EdTech Platform',
    description: 'CUROS Pathshala - Transforming education through innovative digital learning solutions.',
  },
]

const whyChooseUs = [
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Skilled professionals with years of experience in their respective domains.',
  },
  {
    icon: Zap,
    title: 'Innovative Solutions',
    description: 'Creative approaches to solve complex business challenges with technology.',
  },
  {
    icon: Clock,
    title: 'Timely Delivery',
    description: 'Committed to delivering projects on schedule without compromising quality.',
  },
  {
    icon: Award,
    title: 'Proven Results',
    description: 'Track record of successful projects and satisfied clients across industries.',
  },
]

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative bg-hero-gradient overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl floating"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl floating-delayed"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiMwMDY2RkYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-30"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              Multi-Sector Digital Innovation Company
            </motion.span>
            
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-7xl text-white mb-6 leading-tight">
              Building Digital Businesses with{' '}
              <span className="gradient-text">Technology, Education & Innovation</span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              CUROS transforms ideas into powerful digital solutions. From web development to EdTech, 
              we innovate across sectors to drive business growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-lg px-8 py-4"
                >
                  Get Free Consultation
                  <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/portfolio">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  View Our Work
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-primary rounded-full"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="section bg-dark">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            subtitle="Our Services"
            title="Comprehensive Digital Solutions"
            description="We offer end-to-end digital services tailored to your business needs, ensuring growth and innovation at every step."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose CUROS */}
      <section className="section bg-dark-100">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            subtitle="Why Choose CUROS"
            title="Excellence in Every Project"
            description="We combine technical expertise with creative innovation to deliver solutions that exceed expectations."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {whyChooseUs.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.1} className="card p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {feature.description}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* EdTech Coming Soon */}
      <section className="section bg-dark relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="text-primary text-sm font-medium uppercase tracking-wider mb-3 block">
                Coming Soon
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6">
                CUROS <span className="gradient-text">Pathshala</span>
              </h2>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                An innovative EdTech platform designed to transform the way people learn. 
                We believe education is the key to empowerment, and CUROS Pathshala aims to 
                make quality education accessible to everyone.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm">Interactive Learning</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm">Expert Instructors</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm">Certification</span>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2} className="card p-8 gradient-border">
              <div className="text-center">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="w-12 h-12 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-2xl text-white mb-3">
                  Something Big is Coming
                </h3>
                <p className="text-gray-400 mb-6">
                  We're working hard to bring you an exceptional learning experience. 
                  Stay tuned for the launch!
                </p>
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  Get Notified
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-dark-100">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Let's discuss your project and discover how CUROS can help you achieve your digital goals.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-10 py-4"
              >
                Start Your Project
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </motion.button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
