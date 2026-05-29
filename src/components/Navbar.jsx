import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Zap, LogIn, Layout } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  useEffect(() => {
    // Listen to Firebase Auth state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  const getWorkspacePath = () => {
    if (!user) return '/portal/login'
    return user.email === 'admin@curos.in' ? '/portal/admin' : '/portal/client'
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      {/* Scrolled glass background */}
      {isScrolled && (
        <div className="absolute inset-0 bg-dark/80 backdrop-blur-2xl border-b border-primary/5" />
      )}
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between relative z-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue rounded-xl flex items-center justify-center group-hover:shadow-glow-sm transition-all duration-500 border border-primary/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-white">
            CUROS<span className="gradient-text">LLP</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
                location.pathname === link.path 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {location.pathname === link.path && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-primary/10 border border-primary/15 rounded-lg"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </Link>
          ))}
          
          {user && (
            <Link
              to={getWorkspacePath()}
              className={`relative text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-1.5 ${
                location.pathname.startsWith('/portal') 
                  ? 'text-white bg-primary/10 border border-primary/15' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layout className="w-4 h-4" />
              {user.email === 'admin@curos.in' ? 'Admin Hub' : 'My Workspace'}
            </Link>
          )}
        </div>

        {/* Desktop CTA / Login Button */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Link
              to={getWorkspacePath()}
              className="btn-primary text-sm flex items-center gap-2 !py-2.5"
            >
              <Layout className="w-4 h-4" />
              Open Portal
            </Link>
          ) : (
            <>
              <Link
                to="/portal/login"
                className="text-gray-300 hover:text-white text-sm font-semibold px-4 py-2.5 border border-dark-300/50 hover:border-primary/30 rounded-xl transition-all flex items-center gap-2 bg-dark-200/30 backdrop-blur-sm"
              >
                <LogIn className="w-4 h-4 text-primary" />
                Client Sign In
              </Link>
              <Link
                to="/contact"
                className="btn-primary text-sm !py-2.5"
              >
                Consultation
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 rounded-lg hover:bg-dark-300/30 transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden mt-2 mx-4 rounded-2xl overflow-hidden border border-primary/10"
            style={{ background: 'rgba(10, 1, 24, 0.95)', backdropFilter: 'blur(24px)' }}
          >
            <div className="p-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`block py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                      location.pathname === link.path
                        ? 'bg-primary/15 text-primary border border-primary/15'
                        : 'text-gray-300 hover:bg-dark-300/30 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {user && (
                <Link
                  to={getWorkspacePath()}
                  className={`block py-3 px-4 rounded-xl text-sm font-medium transition-colors duration-200 ${
                    location.pathname.startsWith('/portal')
                      ? 'bg-primary/15 text-primary border border-primary/15'
                      : 'text-gray-300 hover:bg-dark-300/30 hover:text-white'
                  }`}
                >
                  {user.email === 'admin@curos.in' ? '🔑 Admin Workspace' : '💼 My Client Workspace'}
                </Link>
              )}

              <div className="pt-3 border-t border-dark-300/30">
                {user ? (
                  <Link
                    to={getWorkspacePath()}
                    className="block text-center btn-primary mt-2"
                  >
                    Go to Portal
                  </Link>
                ) : (
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <Link
                      to="/portal/login"
                      className="text-center text-gray-300 font-semibold py-3 border border-dark-300/40 rounded-xl text-sm bg-dark-200/30"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/contact"
                      className="text-center btn-primary text-sm"
                    >
                      Consultation
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
