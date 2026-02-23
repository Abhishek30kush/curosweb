import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, MessageCircle, Send, Clock, Zap } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import ContactForm from '../components/ContactForm'
import AnimatedSection from '../components/AnimatedSection'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    description: 'Send us an email anytime',
    value: 'curos673@gmail.com',
    link: 'mailto:curosenterprisesllp@gmail.com',
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
]

export default function Contact() {
  return (
    <div className="bg-dark">
      <PageHeader 
        title="Contact Us" 
        subtitle="Let's discuss your project and bring your ideas to life"
        breadcrumb={[{ name: 'Contact' }]}
      />

      {/* Contact Section */}
      <section className="section bg-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <AnimatedSection>
              <div>
                <span className="text-primary text-sm font-medium uppercase tracking-wider mb-3 block">
                  Get In Touch
                </span>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
                  Let's Start a Conversation
                </h2>
                <p className="text-gray-400 text-lg mb-8">
                  Have a project in mind? We'd love to hear from you. Fill out the form below 
                  and we'll get back to you within 24 hours.
                </p>
                
                <ContactForm />
              </div>
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection delay={0.2}>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="card p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
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
                            className="text-primary hover:text-primary-light transition-colors font-medium"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <span className="text-primary font-medium">{info.value}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Additional Info Card */}
              <div className="card p-6 mt-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Why Choose CUROS?</h3>
                    <ul className="text-gray-400 text-sm space-y-2 mt-3">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Expert team with years of experience
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Custom solutions tailored to your needs
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Timely delivery and 24/7 support
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Competitive pricing
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
      <section className="section bg-dark-100">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="card p-8 md:p-12 bg-gradient-to-r from-primary/20 via-secondary to-primary/20 border-primary/30 relative overflow-hidden">
              {/* Background decorations */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">
                    Ready to Transform Your Business?
                  </h2>
                  <p className="text-gray-300">
                    Let's discuss your project and discover how CUROS can help you achieve 
                    your digital goals. Our team is ready to bring your vision to life.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
                  <a 
                    href="mailto:curosenterprisesllp@gmail.com"
                    className="btn-primary inline-flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Email Us
                  </a>
                  <a 
                    href="https://wa.me/8808481400"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary inline-flex items-center justify-center gap-2"
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
      <section className="section bg-dark">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-medium uppercase tracking-wider mb-3 block">
              FAQ
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
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
                a: 'Simply fill out the contact form above or email us at curosenterprisesllp@gmail.com. Our team will get back to you within 24 hours to discuss your project requirements.',
              },
            ].map((faq, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="card p-6">
                  <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-gray-400 text-sm">{faq.a}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
