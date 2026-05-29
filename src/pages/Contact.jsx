import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, MessageCircle, Send, Clock, Zap, ExternalLink } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import ContactForm from '../components/ContactForm'
import AnimatedSection from '../components/AnimatedSection'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    description: 'Send us an email anytime',
    value: 'curos673@gmail.com',
    link: 'mailto:curos673@gmail.com',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    description: 'Chat with us on WhatsApp',
    value: 'Click to Chat',
    link: 'https://wa.me/8808481400',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    description: 'We\'re available',
    value: '24/7 Support',
    link: null,
  },
  {
    icon: MapPin,
    title: 'Address',
    description: 'Visit our office',
    value: '244f/2 Harwara, dhoomanganj, Allahabad, UP, 211011.',
    link: null,
  },
]

export default function Contact() {
  return (
    <div className="bg-dark overflow-hidden">
      <PageHeader 
        title="Contact Us" 
        subtitle="Let's discuss your project and bring your ideas to life"
        breadcrumb={[{ name: 'Contact' }]}
      />

      {/* Contact Section */}
      <section className="section bg-dark relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.05),transparent_50%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <AnimatedSection>
              <div>
                <span className="inline-flex items-center gap-2 glass-pill text-primary text-xs font-semibold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Get In Touch
                </span>
                <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
                  Let's Start a <span className="gradient-text">Conversation</span>
                </h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  Have a project in mind? We'd love to hear from you. Fill out the form below 
                  and we'll get back to you within 24 hours.
                </p>
                
                <ContactForm />
              </div>
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection delay={0.2} className="lg:pt-20">
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="card p-6 group hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 bg-dark-200 border border-dark-300 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300 shadow-glow-sm">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">{info.title}</h3>
                        <p className="text-gray-400 text-sm mb-2">{info.description}</p>
                        {info.link ? (
                          <a 
                            href={info.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-primary hover:text-primary-light transition-colors font-medium text-sm"
                          >
                            {info.value}
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span className="text-white font-medium text-sm">{info.value}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Additional Info Card */}
              <div className="card p-8 mt-8 gradient-border relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex items-start gap-5 relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-blue/15 rounded-xl flex items-center justify-center flex-shrink-0 shadow-glow-sm border border-primary/20">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white mb-2 text-xl">Why Choose CUROS?</h3>
                    <ul className="text-gray-400 text-sm space-y-3 mt-4">
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-glow-sm" />
                        Expert team with years of experience
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-glow-sm" />
                        Custom solutions tailored to your needs
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-glow-sm" />
                        Timely delivery and 24/7 support
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-glow-sm" />
                        Direct-to-client transparent engineering
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section bg-dark-100 relative overflow-hidden">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection>
            <div className="card p-8 md:p-12 relative overflow-hidden gradient-border shadow-2xl shadow-primary/10">
              {/* Background decorations */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/15 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue/15 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.1),transparent_70%)] pointer-events-none" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
                    Ready to Transform Your Business?
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Let's discuss your project and discover how CUROS can help you achieve 
                    your digital goals. Our team is ready to bring your vision to life.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
                  <a 
                    href="mailto:curos673@gmail.com"
                    className="btn-primary inline-flex items-center justify-center gap-2 px-8"
                  >
                    <Mail className="w-5 h-5" />
                    Email Us
                  </a>
                  <a 
                    href="https://wa.me/8808481400"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary inline-flex items-center justify-center gap-2 px-8"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-dark relative">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 glass-pill text-primary text-xs font-semibold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full">
              FAQ
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'What services does CUROS offer?',
                a: 'CUROS offers a comprehensive range of digital services including web development, mobile app development, video editing & content production, digital marketing, and our upcoming EdTech platform CUROS Pathshala.',
              },
              {
                q: 'How long does it take to complete a project?',
                a: 'Project timelines vary based on complexity. A typical website takes 4-8 weeks, while complex web applications may take 2-4 months. We provide detailed timelines during the project planning phase.',
              },
              {
                q: 'Do you offer post-launch support?',
                a: 'Yes, we offer comprehensive post-launch support including maintenance, updates, and technical support. We have flexible support packages to meet your ongoing needs.',
              },
              {
                q: 'How do I get a quote for my project?',
                a: 'Simply fill out the contact form above or email us at curos673@gmail.com. Our team will get back to you within 24 hours to discuss your project requirements.',
              },
            ].map((faq, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="card p-6 md:p-8 hover:border-primary/30 transition-colors">
                  <h3 className="font-semibold text-white mb-3 text-lg flex items-start gap-3">
                    <span className="text-primary mt-1">Q.</span>
                    {faq.q}
                  </h3>
                  <p className="text-gray-400 leading-relaxed pl-7">
                    {faq.a}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
