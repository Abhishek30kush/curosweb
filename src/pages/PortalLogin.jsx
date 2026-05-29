import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, User, LogIn, UserPlus, AlertCircle, Sparkles } from 'lucide-react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from 'firebase/auth'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'

export default function PortalLogin() {
  const [activeTab, setActiveTab] = useState('login') // 'login' or 'register'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // If already logged in, redirect immediately to corresponding dashboard
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.email === 'admin@curos.in') {
          navigate('/portal/admin')
        } else {
          navigate('/portal/client')
        }
      }
    })
    return () => unsubscribe()
  }, [navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleAuth = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const emailTrim = formData.email.trim().toLowerCase()
    const password = formData.password

    try {
      if (activeTab === 'login') {
        // Sign In
        const userCredential = await signInWithEmailAndPassword(auth, emailTrim, password)
        const user = userCredential.user
        
        if (user.email === 'admin@curos.in') {
          navigate('/portal/admin')
        } else {
          navigate('/portal/client')
        }
      } else {
        // Create Account
        if (password.length < 6) {
          setError('Password must be at least 6 characters.')
          setLoading(false)
          return
        }

        if (password !== formData.confirmPassword) {
          setError('Passwords do not match.')
          setLoading(false)
          return
        }

        if (emailTrim === 'admin@curos.in') {
          setError('Cannot register the admin email via this portal.')
          setLoading(false)
          return
        }

        const userCredential = await createUserWithEmailAndPassword(auth, emailTrim, password)
        const user = userCredential.user
        
        // Update profile displayName
        await updateProfile(user, {
          displayName: formData.name.trim() || 'Client Partner'
        })
        
        navigate('/portal/client')
      }
    } catch (err) {
      console.error('Authentication Error:', err)
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password.')
      } else if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered.')
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.')
      } else {
        setError(err.message.replace('Firebase:', '').trim())
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-dark min-h-screen overflow-hidden">
      <PageHeader 
        title="Collaboration Portal" 
        subtitle="Sign in to submit work requests, view schedules, and chat in real-time with developers"
        breadcrumb={[{ name: 'Portal' }]}
      />

      <section className="section flex items-center justify-center py-12 md:py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.05),transparent_50%)]" />
        <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
        
        <div className="w-full max-w-md relative z-10">
          {/* Tab Selection */}
          <div className="flex bg-dark-100 rounded-xl p-1 mb-8 border border-dark-300 relative overflow-hidden shadow-glow-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue/5 pointer-events-none" />
            
            <button
              onClick={() => { setActiveTab('login'); setError(''); }}
              className={`flex-1 py-3.5 text-sm font-semibold rounded-lg transition-all duration-300 relative z-10 ${
                activeTab === 'login'
                  ? 'bg-gradient-to-r from-primary to-blue text-white shadow-lg shadow-primary/25'
                  : 'text-gray-400 hover:text-white hover:bg-dark-200'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setActiveTab('register'); setError(''); }}
              className={`flex-1 py-3.5 text-sm font-semibold rounded-lg transition-all duration-300 relative z-10 ${
                activeTab === 'register'
                  ? 'bg-gradient-to-r from-primary to-blue text-white shadow-lg shadow-primary/25'
                  : 'text-gray-400 hover:text-white hover:bg-dark-200'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Frosted Authentication Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="card p-8 md:p-10 border-primary/20 relative overflow-hidden gradient-border shadow-2xl shadow-primary/10"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[60px] pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue/10 rounded-full blur-[60px] pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20 shadow-glow-sm">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="font-display font-bold text-3xl text-white mb-2 text-center">
                  {activeTab === 'login' ? 'Welcome Back' : 'Join CUROS'}
                </h3>
                <p className="text-gray-400 text-sm mb-8 text-center leading-relaxed">
                  {activeTab === 'login' 
                    ? 'Access your custom workspace and chat direct' 
                    : 'Initiate your direct-to-developer project partnership'
                  }
                </p>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3.5 rounded-xl text-sm flex items-center gap-3 mb-6 shadow-glow-sm"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <form onSubmit={handleAuth} className="space-y-5">
                  <AnimatePresence>
                    {activeTab === 'register' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 20 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="overflow-hidden"
                      >
                        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                          Your Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/70" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required={activeTab === 'register'}
                            className="w-full bg-dark-200 border border-dark-300 rounded-xl pl-12 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
                            placeholder="Abhishek Kushwaha"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/70" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-dark-200 border border-dark-300 rounded-xl pl-12 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
                        placeholder="you@domain.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/70" />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full bg-dark-200 border border-dark-300 rounded-xl pl-12 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <AnimatePresence>
                    {activeTab === 'register' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 20 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="overflow-hidden"
                      >
                        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/70" />
                          <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required={activeTab === 'register'}
                            className="w-full bg-dark-200 border border-dark-300 rounded-xl pl-12 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
                            placeholder="••••••••"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-8 py-4 text-base"
                  >
                    {loading ? (
                      <span className="flex items-center gap-3">
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 font-bold">
                        {activeTab === 'login' ? (
                          <>
                            <LogIn className="w-5 h-5" />
                            Sign In to Portal
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-5 h-5" />
                            Establish Workspace
                          </>
                        )}
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
