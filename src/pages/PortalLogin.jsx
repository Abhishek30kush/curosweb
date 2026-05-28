import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, LogIn, UserPlus, AlertCircle } from 'lucide-react'
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
    <div className="bg-dark min-h-screen">
      <PageHeader 
        title="Collaboration Portal" 
        subtitle="Sign in to submit work requests, view schedules, and chat in real-time with developers"
        breadcrumb={[{ name: 'Portal' }]}
      />

      <section className="section flex items-center justify-center py-12 md:py-20">
        <div className="w-full max-w-md">
          {/* Tab Selection */}
          <div className="flex bg-dark-100 rounded-xl p-1 mb-8 border border-dark-300">
            <button
              onClick={() => { setActiveTab('login'); setError(''); }}
              className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${
                activeTab === 'login'
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setActiveTab('register'); setError(''); }}
              className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${
                activeTab === 'register'
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Frosted Authentication Panel */}
          <motion.div
            layout
            className="card p-8 border-primary/20 relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <h3 className="font-display font-bold text-2xl text-white mb-2 text-center">
              {activeTab === 'login' ? 'Welcome Back' : 'Join CUROS Network'}
            </h3>
            <p className="text-gray-400 text-sm mb-6 text-center">
              {activeTab === 'login' 
                ? 'Access your custom workspace and chat direct' 
                : 'Initiate your direct-to-developer project partnership'
              }
            </p>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-xs flex items-center gap-2 mb-6"
              >
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleAuth} className="space-y-4">
              {activeTab === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-200 border border-dark-300 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-all"
                      placeholder="Abhishek Kushwaha"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-200 border border-dark-300 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-all"
                    placeholder="you@domain.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-200 border border-dark-300 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {activeTab === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-200 border border-dark-300 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-3.5 text-sm"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2 font-bold">
                    {activeTab === 'login' ? (
                      <>
                        <LogIn className="w-4 h-4" />
                        Sign In
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        Establish Space
                      </>
                    )}
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
