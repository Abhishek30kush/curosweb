import { Link } from 'react-router-dom'
import { Zap, Mail, MapPin, Phone, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Contact', path: '/contact' },
  { name: 'Study Planner Privacy', path: '/study-planner-privacy-policy' },
  { name: 'S.S. Point Privacy Policy', path: '/sspoint-privacy-policy' },
  { name: 'Vidyasparsh Privacy Policy', path: '/vidyasparsh-privacy-policy' },
]

const services = [
  { name: 'Web Development', path: '/services' },
  { name: 'App Development', path: '/services' },
  { name: 'Video Editing', path: '/services' },
  { name: 'Digital Marketing', path: '/services' },
  { name: 'EdTech Platform', path: '/services' },
]

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="relative bg-dark-100 overflow-hidden">
      {/* Top gradient divider */}
      <div className="section-divider" />
      
      {/* Background decoration */}
      <div className="absolute bottom-0 left-[10%] w-72 h-72 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-20 right-[5%] w-56 h-56 bg-blue/5 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue rounded-xl flex items-center justify-center group-hover:shadow-glow-sm transition-all duration-500 border border-primary/20">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                CUROS <span className="gradient-text">Enterprises LLP</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              CUROS is a multi-sector digital innovation company focused on building 
              digital businesses with technology, education & innovation.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 bg-dark-200/50 border border-dark-300/40 hover:border-primary/30 hover:bg-primary/10 hover:shadow-glow-sm"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary transition-all duration-200 text-sm inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-primary transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-white mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-gray-400 hover:text-primary transition-all duration-200 text-sm inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-primary transition-all duration-300" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-semibold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-primary/10">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <a 
                  href="mailto:curos673@gmail.com" 
                  className="text-gray-400 hover:text-primary transition-colors duration-200 text-sm mt-1.5"
                >
                  curos673@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-primary/10">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="text-gray-400 text-sm mt-1.5 leading-relaxed">
                  244f/2 Harwara, dhoomanganj,<br/>Allahabad, UP, 211011.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="section-divider absolute left-0 right-0" style={{ marginTop: '-2rem' }} />
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} CUROS Enterprises LLP. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-primary text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-primary text-sm transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
