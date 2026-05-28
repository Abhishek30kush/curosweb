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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:glow-primary transition-all duration-300">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-white">
            CUROS<span className="text-primary">LLP</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                location.pathname === link.path ? 'text-primary' : 'text-gray-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {user && (
            <Link
              to={getWorkspacePath()}
              className={`text-sm font-medium transition-colors duration-200 hover:text-primary flex items-center gap-1.5 ${
                location.pathname.startsWith('/portal') ? 'text-primary' : 'text-gray-300'
              }`}
            >
              <Layout className="w-4 h-4" />
              {user.email === 'admin@curos.in' ? 'Admin Hub' : 'My Workspace'}
            </Link>
          )}
        </div>

        {/* Desktop CTA / Login Button */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <Link
              to={getWorkspacePath()}
              className="btn-primary text-sm flex items-center gap-2"
            >
              <Layout className="w-4 h-4" />
              Open Portal
            </Link>
          ) : (
            <>
              <Link
                to="/portal/login"
                className="text-gray-300 hover:text-white text-sm font-semibold px-4 py-2 border border-dark-300 hover:border-primary/45 rounded-xl transition-all flex items-center gap-2"
              >
                <LogIn className="w-4 h-4 text-primary" />
                Client Sign In
              </Link>
              <Link
                to="/contact"
                className="btn-primary text-sm"
              >
                Consultation
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass mt-2 mx-4 rounded-2xl overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block py-3 px-4 rounded-xl text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.path
                      ? 'bg-primary/20 text-primary'
                      : 'text-gray-300 hover:bg-dark-200 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {user && (
                <Link
                  to={getWorkspacePath()}
                  className={`block py-3 px-4 rounded-xl text-sm font-medium transition-colors duration-200 ${
                    location.pathname.startsWith('/portal')
                      ? 'bg-primary/20 text-primary'
                      : 'text-gray-300 hover:bg-dark-200 hover:text-white'
                  }`}
                >
                  {user.email === 'admin@curos.in' ? '🔑 Admin Workspace' : '💼 My Client Workspace'}
                </Link>
              )}

              {user ? (
                <Link
                  to={getWorkspacePath()}
                  className="block text-center btn-primary mt-4"
                >
                  Go to Portal
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Link
                    to="/portal/login"
                    className="text-center text-gray-300 font-semibold py-3 border border-dark-300 rounded-xl text-sm"
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
