import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, List, MessageSquare, LogOut, CheckCircle, Clock, AlertCircle, Sparkles, Send } from 'lucide-react'
import { auth, db } from '../firebase'
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore'
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
      where('clientId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reqList = []
      snapshot.forEach((doc) => {
        reqList.push({ id: doc.id, ...doc.data() })
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
      'Pending': 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500',
      'Under Discussion': 'bg-blue-500/10 border-blue-500/30 text-blue-500',
      'Accepted': 'bg-primary/10 border-primary/30 text-primary',
      'In Progress': 'bg-accent/10 border-accent/30 text-accent',
      'Completed': 'bg-green-500/10 border-green-500/30 text-green-500'
    }
    return styles[status] || 'bg-gray-500/10 border-gray-500/30 text-gray-500'
  }

  return (
    <div className="bg-dark min-h-screen">
      <PageHeader 
        title="Client Dashboard" 
        subtitle={`Welcome, ${currentUser?.displayName || 'Client Partner'} | Manage requests & speak direct`}
        breadcrumb={[{ name: 'Dashboard' }]}
      />

      <section className="section py-8">
        {/* Profile bar and Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-dark-100 border border-dark-300 rounded-2xl p-6 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-xl border border-primary/20 flex items-center justify-center font-display font-semibold text-lg text-primary uppercase">
              {currentUser?.displayName?.[0] || 'C'}
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base leading-none mb-1">
                {currentUser?.displayName || 'Client Partner'}
              </h3>
              <p className="text-gray-500 text-xs font-mono">{currentUser?.email}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActivePanel(activePanel === 'list' ? 'submit' : 'list')}
              className="px-5 py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-xl transition-all duration-300 shadow-md shadow-primary/10 flex items-center gap-2"
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
              className="px-4 py-2.5 bg-dark-200 border border-dark-300 text-gray-400 hover:border-red-500/40 hover:text-red-500 text-xs font-bold rounded-xl transition-all duration-300 flex items-center gap-2"
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
                  className="card p-8 border-primary/25 relative"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                  
                  <h3 className="font-display font-bold text-xl text-white mb-2">Submit Project Requirements</h3>
                  <p className="text-gray-400 text-sm mb-6">Describe what you need us to build. An engineer will review it instantly.</p>

                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-4 rounded-xl text-xs flex items-center gap-3 mb-6"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
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
                      className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-xs flex items-center gap-2 mb-6"
                    >
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span>{submitError}</span>
                    </motion.div>
                  )}

                  <form onSubmit={handleCreateRequest} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Project Title</label>
                      <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleFormChange}
                        required
                        className="w-full bg-dark-200 border border-dark-300 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-all"
                        placeholder="e.g. Fintech Portfolio Analyzer"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Category</label>
                        <select
                          name="category"
                          value={form.category}
                          onChange={handleFormChange}
                          className="w-full bg-dark-200 border border-dark-300 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-all"
                        >
                          <option>Web Development</option>
                          <option>App Development</option>
                          <option>Video Editing</option>
                          <option>Digital Marketing</option>
                          <option>EdTech Platform</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Estimated Budget</label>
                        <select
                          name="budget"
                          value={form.budget}
                          onChange={handleFormChange}
                          className="w-full bg-dark-200 border border-dark-300 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-all"
                        >
                          <option>$500 - $1,500</option>
                          <option>$1,500 - $5,000</option>
                          <option>$5,000 - $15,000</option>
                          <option>$15,000+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Timeline</label>
                      <select
                        name="timeline"
                        value={form.timeline}
                        onChange={handleFormChange}
                        className="w-full bg-dark-200 border border-dark-300 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-all"
                      >
                        <option>1 - 2 Weeks</option>
                        <option>1 - 2 Months</option>
                        <option>3 - 6 Months</option>
                        <option>Flexible</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Core Requirements & Description</label>
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleFormChange}
                        required
                        rows={5}
                        className="w-full bg-dark-200 border border-dark-300 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary transition-all resize-none"
                        placeholder="Detail out what technologies, features, or design inspirations you want..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submitLoading}
                      className="w-full mt-4"
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
                  className="space-y-4"
                >
                  <h3 className="font-display font-bold text-xl text-white mb-2">My Direct Collaboration Requests</h3>
                  
                  {loading ? (
                    <div className="card p-12 text-center">
                      <svg className="animate-spin h-6 w-6 text-primary mx-auto" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    </div>
                  ) : requests.length === 0 ? (
                    <div className="card p-12 text-center">
                      <AlertCircle className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                      <h4 className="font-semibold text-white mb-1">No Active Project Requests</h4>
                      <p className="text-gray-400 text-sm max-w-sm mx-auto mb-6">You haven't submitted any direct work requests yet. Start your direct developer partnership now.</p>
                      <Button onClick={() => setActivePanel('submit')}>
                        Submit First Request
                      </Button>
                    </div>
                  ) : (
                    requests.map((req) => (
                      <div 
                        key={req.id}
                        onClick={() => setSelectedRequest(req)}
                        className={`card p-6 cursor-pointer border hover:border-primary/40 hover:shadow-lg transition-all duration-300 ${
                          selectedRequest?.id === req.id 
                            ? 'border-primary bg-primary/5 shadow-md shadow-primary/5' 
                            : 'border-dark-300'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                          <div>
                            <span className="text-[10px] text-primary uppercase font-bold tracking-wider">
                              {req.category}
                            </span>
                            <h4 className="font-display font-bold text-white text-lg mt-1 group-hover:text-primary transition-colors">
                              {req.title}
                            </h4>
                            <p className="text-gray-400 text-xs leading-relaxed mt-2 line-clamp-2">
                              {req.description}
                            </p>
                          </div>
                          
                          <div className="flex flex-col sm:items-end justify-between gap-3 flex-shrink-0">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusStyle(req.status)}`}>
                              {req.status}
                            </span>
                            <div className="flex items-center gap-2 text-gray-500 text-[10px] font-mono mt-1">
                              <Clock className="w-3.5 h-3.5" />
                              {req.createdAt ? new Date(req.createdAt.seconds * 1000).toLocaleDateString() : 'Syncing...'}
                            </div>
                          </div>
                        </div>

                        {/* Technology details */}
                        <div className="flex flex-wrap gap-6 border-t border-dark-300/40 pt-4 mt-4 text-[11px] text-gray-400">
                          <div>Budget: <span className="text-white font-semibold font-mono">{req.budget}</span></div>
                          <div>Timeline: <span className="text-white font-semibold font-mono">{req.timeline}</span></div>
                          
                          <div className="flex items-center gap-1.5 ml-auto text-primary hover:text-accent font-semibold">
                            <MessageSquare className="w-3.5 h-3.5 animate-pulse" />
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
              <PortalChat 
                requestId={selectedRequest.id}
                requestTitle={selectedRequest.title}
                userRole="client"
              />
            ) : (
              <div className="card p-12 bg-dark-100/50 border border-dark-300 border-dashed text-center flex flex-col items-center justify-center min-h-[300px]">
                <MessageSquare className="w-12 h-12 text-gray-600 mb-4 animate-bounce" />
                <h4 className="font-display font-semibold text-white mb-2">Direct Real-time Chatroom</h4>
                <p className="text-gray-400 text-xs max-w-[280px] mx-auto leading-relaxed">
                  Select an active project request from your feed list to immediately open a real-time secure chat channel with our development team.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
