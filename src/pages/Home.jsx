import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Globe, Smartphone, Video, TrendingUp, GraduationCap, CheckCircle, Zap, Clock, Award, Users, ShieldCheck, XCircle, Code2, HeartHandshake } from 'lucide-react'
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
    <div className="bg-dark overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-hero-gradient" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-[15%] w-96 h-96 bg-primary/20 rounded-full aurora-blob"></div>
          <div className="absolute bottom-1/3 right-[15%] w-80 h-80 bg-blue/15 rounded-full aurora-blob" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-2/3 left-[40%] w-64 h-64 bg-accent/10 rounded-full aurora-blob" style={{ animationDelay: '8s' }}></div>
        </div>

        {/* Dot Pattern */}
        <div className="absolute inset-0 dot-pattern opacity-30"></div>

        {/* Radial center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-4xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 glass-pill text-primary px-5 py-2.5 rounded-full text-sm font-medium mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
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
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary text-lg px-8 py-4"
                >
                  Get Free Consultation
                  <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/portfolio">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
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
            className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-primary rounded-full"></div>
          </motion.div>
        </motion.div>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />
      </section>

      {/* Services Section */}
      <section className="section relative">
        <div className="absolute inset-0 mesh-gradient opacity-50" />
        <div className="max-w-7xl mx-auto relative z-10">
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

      <div className="section-divider" />

      {/* Why Choose CUROS */}
      <section className="section relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionTitle
            subtitle="Why Choose CUROS"
            title="Excellence in Every Project"
            description="We combine technical expertise with creative innovation to deliver solutions that exceed expectations."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {whyChooseUs.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.1} className="card p-6 group">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/15 to-blue/10 rounded-xl flex items-center justify-center mb-4 border border-primary/10 group-hover:shadow-glow-sm transition-all duration-500">
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

      <div className="section-divider" />

      {/* The Direct-to-Client Advantage Section */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.06),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionTitle
            subtitle="The Direct Advantage"
            title="Why Direct-to-Client Collaboration Wins"
            description="We build directly with our clients. No outsourcing, no layers of miscommunication, and absolutely zero agency markups."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            {/* Standard Agency Bloat */}
            <AnimatedSection className="card p-8 border-red-500/10 hover:border-red-500/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center border border-red-500/10">
                  <XCircle className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="font-display font-bold text-xl text-white">Traditional Bloated Agencies</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { title: "Outsourced Templates", desc: "Using cheap, pre-built templates or third-party freelancers, leaving you with brittle, unoptimized code." },
                  { title: "Project Manager Layers", desc: "Your direct requests are translated across sales reps and project managers, leading to costly communication gaps." },
                  { title: "Double-Marked Pricing", desc: "Paying premium agency markup fees to cover administrative bloat rather than active coding hours." },
                  { title: "Opaque Timelines", desc: "Limited insight into the codebase, milestones, or real progress until it is far too late to iterate." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 border-b border-dark-300/30 pb-4 last:border-0 last:pb-0">
                    <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-300 text-sm">{item.title}</h4>
                      <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* The CUROS Way */}
            <AnimatedSection delay={0.2} className="card p-8 border-primary/15 hover:border-primary/30 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/15 transition-all duration-300"></div>
              
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-blue/15 rounded-xl flex items-center justify-center shadow-glow-sm border border-primary/15">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl text-white">The CUROS Direct Partnership</h3>
              </div>
              
              <div className="space-y-4 relative z-10">
                {[
                  { title: "100% Bespoke Engineering", desc: "Clean-sheet codebases tailored precisely for your scale, security protocols, and operational goals." },
                  { title: "Direct Architect Interface", desc: "Speak directly with lead developers and CEO Abhishek Kushwaha. Instant updates, zero translations." },
                  { title: "Transparent Pricing Model", desc: "Every single rupee goes directly into top-tier design and engineering. Maximize your return on investment." },
                  { title: "Agile Daily Commits & Staging", desc: "Watch your project build live. Daily deployments, transparent Git commits, and complete staging environments." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 border-b border-primary/8 pb-4 last:border-0 last:pb-0">
                    <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2 shadow-glow-sm"></div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                      <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* CUROS Resume Featured Section */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-[20%] w-64 h-64 bg-blue/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection className="order-2 lg:order-1 card p-8 gradient-border shadow-2xl shadow-primary/5">
              <div className="text-center relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-blue/15 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 hover:rotate-0 transition-transform duration-300 border border-primary/15 shadow-glow-sm">
                  <Zap className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-2xl text-white mb-3">
                  AI-Powered Results
                </h3>
                <p className="text-gray-400 mb-6 italic">
                  "Build your dream career with professional, data-backed resume templates designed for modern recruitment."
                </p>
                <a 
                  href="https://curos-resume-2lq3w00wb-curos.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 w-full justify-center"
                >
                  Create Your Resume Now
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 glass-pill text-primary text-xs font-semibold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Featured Product
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6">
                CUROS <span className="gradient-text">Resume</span>
              </h2>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                Elevate your professional profile with our AI-powered resume builder. 
                Designed for speed and impact, CUROS Resume helps you land your dream job 
                with professionally crafted templates that beat the ATS systems.
              </p>
              <div className="space-y-4">
                {['Modern AI-Optimized Templates', 'ATS-Friendly PDF Downloads', 'Instant Professional Formatting'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-gray-300">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-glow-sm"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* EdTech Coming Soon */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 glass-pill text-primary text-xs font-semibold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
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
                {['Interactive Learning', 'Expert Instructors', 'Certification'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2} className="card p-8 gradient-border">
              <div className="text-center relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/15">
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

      <div className="section-divider" />

      {/* CTA Section */}
      <section className="section relative">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Let's discuss your project and discover how CUROS can help you achieve your digital goals.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
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
