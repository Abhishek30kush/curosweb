import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, List, MessageSquare, LogOut, CheckCircle, Clock, AlertCircle, Sparkles } from 'lucide-react'
import { auth, db } from '../firebase'
import { collection, addDoc, query, where, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import PortalChat from '../components/PortalChat'

export default function ClientPortal() {
  const [currentUser, setCurrentUser] = useState(null)
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [activePanel, setActivePanel] = useState('list') // 'list' or 'submit'
  
  // Submit Form States
  const [form, setForm] = useState({
    title: '',
    category: 'Web Development',
    description: '',
    budget: '$500 - $1,500',
    timeline: '1 - 2 Months'
  })
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/portal/login')
      } else if (user.email === 'admin@curos.in') {
        navigate('/portal/admin')
      } else {
        setCurrentUser(user)
      }
    })
    return () => unsubscribe()
  }, [navigate])

  useEffect(() => {
    if (!currentUser) return

    setLoading(true)
    const q = query(
      collection(db, 'requests'),
      where('clientId', '==', currentUser.uid)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reqList = []
      snapshot.forEach((doc) => {
        reqList.push({ id: doc.id, ...doc.data() })
      })
      // Sort newest first (client-side to avoid composite index requirement)
      reqList.sort((a, b) => {
        const timeA = a.createdAt?.seconds || 0
        const timeB = b.createdAt?.seconds || 0
        return timeB - timeA
      })
      setRequests(reqList)
      setLoading(false)
    }, (error) => {
      console.error("Firestore requests listener error:", error)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [currentUser])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      navigate('/portal/login')
    } catch (err) {
      console.error("Error signing out:", err)
    }
  }

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleCreateRequest = async (e) => {
    e.preventDefault()
    if (!currentUser) return

    setSubmitLoading(true)
    setSubmitError('')
    setSubmitSuccess(false)

    try {
      await addDoc(collection(db, 'requests'), {
        clientId: currentUser.uid,
        clientName: currentUser.displayName || 'Client Partner',
        clientEmail: currentUser.email,
        title: form.title.trim(),
        category: form.category,
        description: form.description.trim(),
        budget: form.budget,
        timeline: form.timeline,
        status: 'Pending',
        createdAt: serverTimestamp()
      })

      setSubmitLoading(false)
      setSubmitSuccess(true)
      setForm({
        title: '',
        category: 'Web Development',
        description: '',
        budget: '$500 - $1,500',
        timeline: '1 - 2 Months'
      })

      // Go back to list panel after 2.5s
      setTimeout(() => {
        setSubmitSuccess(false)
        setActivePanel('list')
      }, 2500)

    } catch (err) {
      console.error("Failed to submit request:", err)
      setSubmitLoading(false)
      setSubmitError('Failed to submit request. Please try again.')
    }
  }

  const getStatusStyle = (status) => {
    const styles = {
      'Pending': 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400 shadow-glow-sm',
      'Under Discussion': 'bg-blue/10 border-blue/30 text-blue shadow-glow-sm',
      'Accepted': 'bg-primary/10 border-primary/30 text-primary shadow-glow-sm',
      'In Progress': 'bg-accent/10 border-accent/30 text-accent shadow-glow-sm',
      'Completed': 'bg-green-500/10 border-green-500/30 text-green-400 shadow-glow-sm'
    }
    return styles[status] || 'bg-gray-500/10 border-gray-500/30 text-gray-400'
  }

  return (
    <div className="bg-dark min-h-screen overflow-hidden">
      <PageHeader 
        title="Client Dashboard" 
        subtitle={`Welcome, ${currentUser?.displayName || 'Client Partner'} | Manage requests & speak direct`}
        breadcrumb={[{ name: 'Dashboard' }]}
      />

      <section className="section py-8 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.05),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Profile bar and Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 card p-6 mb-8 relative overflow-hidden gradient-border">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-blue/20 rounded-xl border border-primary/20 flex items-center justify-center font-display font-bold text-2xl text-white shadow-glow-sm">
                {currentUser?.displayName?.[0] || 'C'}
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-xl leading-none mb-1.5">
                  {currentUser?.displayName || 'Client Partner'}
                </h3>
                <p className="text-gray-400 text-sm font-mono">{currentUser?.email}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 relative z-10">
              <button
                onClick={() => setActivePanel(activePanel === 'list' ? 'submit' : 'list')}
                className="px-5 py-2.5 bg-gradient-to-r from-primary to-blue hover:from-primary-light hover:to-primary text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-glow flex items-center gap-2"
              >
                {activePanel === 'list' ? (
                  <>
                    <Plus className="w-4 h-4" />
                    Submit New Request
                  </>
                ) : (
                  <>
                    <List className="w-4 h-4" />
                    View Active Requests
                  </>
                )}
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2.5 bg-dark-200 border border-dark-300 text-gray-400 hover:border-red-500/40 hover:text-red-500 hover:bg-red-500/5 text-sm font-bold rounded-xl transition-all duration-300 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Dashboard Workspaces */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {activePanel === 'submit' ? (
                  /* Submit Request Form */
                  <motion.div
                    key="submitForm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="card p-8 border-primary/25 relative overflow-hidden gradient-border"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
                    
                    <h3 className="font-display font-bold text-2xl text-white mb-2 relative z-10">Submit Project Requirements</h3>
                    <p className="text-gray-400 text-sm mb-8 relative z-10">Describe what you need us to build. An engineer will review it instantly.</p>

                    {submitSuccess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-500/10 border border-green-500/20 text-green-400 px-5 py-4 rounded-xl text-sm flex items-center gap-3 mb-6 shadow-glow-sm relative z-10"
                      >
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-white">Project Request Sent!</h4>
                          <p className="text-gray-400 mt-1">Redirecting you to request feed now...</p>
                        </div>
                      </motion.div>
                    )}

                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2 mb-6 relative z-10"
                      >
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <span>{submitError}</span>
                      </motion.div>
                    )}

                    <form onSubmit={handleCreateRequest} className="space-y-5 relative z-10">
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Project Title</label>
                        <input
                          type="text"
                          name="title"
                          value={form.title}
                          onChange={handleFormChange}
                          required
                          className="w-full bg-dark-200 border border-dark-300 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
                          placeholder="e.g. Fintech Portfolio Analyzer"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Category</label>
                          <select
                            name="category"
                            value={form.category}
                            onChange={handleFormChange}
                            className="w-full bg-dark-200 border border-dark-300 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all shadow-inner appearance-none cursor-pointer"
                          >
                            <option>Web Development</option>
                            <option>App Development</option>
                            <option>Video Editing</option>
                            <option>Digital Marketing</option>
                            <option>EdTech Platform</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Estimated Budget</label>
                          <select
                            name="budget"
                            value={form.budget}
                            onChange={handleFormChange}
                            className="w-full bg-dark-200 border border-dark-300 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all shadow-inner appearance-none cursor-pointer"
                          >
                            <option>$500 - $1,500</option>
                            <option>$1,500 - $5,000</option>
                            <option>$5,000 - $15,000</option>
                            <option>$15,000+</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Timeline</label>
                        <select
                          name="timeline"
                          value={form.timeline}
                          onChange={handleFormChange}
                          className="w-full bg-dark-200 border border-dark-300 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all shadow-inner appearance-none cursor-pointer"
                        >
                          <option>1 - 2 Weeks</option>
                          <option>1 - 2 Months</option>
                          <option>3 - 6 Months</option>
                          <option>Flexible</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Core Requirements & Description</label>
                        <textarea
                          name="description"
                          value={form.description}
                          onChange={handleFormChange}
                          required
                          rows={6}
                          className="w-full bg-dark-200 border border-dark-300 rounded-xl px-4 py-3.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none shadow-inner"
                          placeholder="Detail out what technologies, features, or design inspirations you want..."
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={submitLoading}
                        className="w-full mt-6 py-4 text-base"
                      >
                        {submitLoading ? 'Sending...' : 'Send Request Direct'}
                      </Button>
                    </form>
                  </motion.div>
                ) : (
                  /* Requests Feed List */
                  <motion.div
                    key="requestsList"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <h3 className="font-display font-bold text-2xl text-white mb-4">My Direct Collaboration Requests</h3>
                    
                    {loading ? (
                      <div className="card p-12 text-center">
                        <svg className="animate-spin h-8 w-8 text-primary mx-auto" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      </div>
                    ) : requests.length === 0 ? (
                      <div className="card p-12 text-center border-dashed border-dark-300">
                        <div className="w-16 h-16 bg-dark-200 rounded-full flex items-center justify-center mx-auto mb-4 border border-dark-300">
                          <Sparkles className="w-8 h-8 text-gray-500" />
                        </div>
                        <h4 className="font-display font-semibold text-white mb-2 text-xl">No Active Project Requests</h4>
                        <p className="text-gray-400 text-sm max-w-sm mx-auto mb-8 leading-relaxed">You haven't submitted any direct work requests yet. Start your direct developer partnership now to bring your ideas to life.</p>
                        <Button onClick={() => setActivePanel('submit')}>
                          Submit First Request
                        </Button>
                      </div>
                    ) : (
                      requests.map((req) => (
                        <div 
                          key={req.id}
                          onClick={() => setSelectedRequest(req)}
                          className={`card p-6 cursor-pointer border transition-all duration-300 group ${
                            selectedRequest?.id === req.id 
                              ? 'border-primary bg-primary/5 shadow-glow ring-1 ring-primary/20' 
                              : 'border-dark-300 hover:border-primary/40 hover:bg-dark-200/50'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                            <div className="min-w-0 pr-4">
                              <span className="text-[10px] text-primary uppercase font-bold tracking-widest bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-md">
                                {req.category}
                              </span>
                              <h4 className="font-display font-bold text-white text-xl mt-3 group-hover:text-primary transition-colors">
                                {req.title}
                              </h4>
                              <p className="text-gray-400 text-sm leading-relaxed mt-2 line-clamp-2">
                                {req.description}
                              </p>
                            </div>
                            
                            <div className="flex flex-col sm:items-end justify-between gap-3 flex-shrink-0 mt-2 sm:mt-0">
                              <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${getStatusStyle(req.status)}`}>
                                {req.status}
                              </span>
                              <div className="flex items-center gap-1.5 text-gray-500 text-[11px] font-mono mt-1 bg-dark-200 px-2 py-1 rounded border border-dark-300">
                                <Clock className="w-3.5 h-3.5 text-primary/70" />
                                {req.createdAt ? new Date(req.createdAt.seconds * 1000).toLocaleDateString() : 'Syncing...'}
                              </div>
                            </div>
                          </div>

                          {/* Technology details */}
                          <div className="flex flex-wrap gap-6 border-t border-dark-300/50 pt-4 mt-5 text-xs text-gray-400">
                            <div>Budget: <span className="text-white font-semibold font-mono bg-dark-200 px-2 py-1 rounded border border-dark-300 ml-1">{req.budget}</span></div>
                            <div>Timeline: <span className="text-white font-semibold font-mono bg-dark-200 px-2 py-1 rounded border border-dark-300 ml-1">{req.timeline}</span></div>
                            
                            <div className={`flex items-center gap-1.5 ml-auto font-semibold transition-colors px-3 py-1.5 rounded-lg border ${
                              selectedRequest?.id === req.id 
                                ? 'bg-primary text-white border-primary shadow-glow-sm' 
                                : 'text-primary border-primary/30 hover:bg-primary hover:text-white hover:border-primary'
                            }`}>
                              <MessageSquare className="w-4 h-4" />
                              Open Chatroom
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Realtime Chatbox Panel */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              {selectedRequest ? (
                <div className="card border-primary/30 shadow-glow overflow-hidden">
                  <div className="bg-gradient-to-r from-primary/10 to-blue/10 border-b border-primary/20 p-4 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <h4 className="font-display font-bold text-white text-sm">SECURE CHAT CHANNEL</h4>
                  </div>
                  <PortalChat 
                    requestId={selectedRequest.id}
                    requestTitle={selectedRequest.title}
                    userRole="client"
                  />
                </div>
              ) : (
                <div className="card p-12 bg-dark-100/50 border border-dark-300 border-dashed text-center flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.05),transparent_60%)] group-hover:opacity-100 opacity-50 transition-opacity duration-500" />
                  <div className="w-20 h-20 bg-dark-200 rounded-full flex items-center justify-center mb-6 relative z-10 border border-dark-300 group-hover:border-primary/30 transition-colors duration-300 shadow-inner">
                    <MessageSquare className="w-10 h-10 text-gray-500 group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <h4 className="font-display font-bold text-white mb-3 text-xl relative z-10">Direct Real-time Chatroom</h4>
                  <p className="text-gray-400 text-sm max-w-[280px] mx-auto leading-relaxed relative z-10">
                    Select an active project request from your feed list to immediately open a real-time secure chat channel with our development team.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
