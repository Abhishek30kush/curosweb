import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { List, MessageSquare, LogOut, Clock, BarChart2, ShieldAlert } from 'lucide-react'
import { auth, db } from '../firebase'
import { collection, query, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import PageHeader from '../components/PageHeader'
import PortalChat from '../components/PortalChat'

export default function AdminPortal() {
  const [currentUser, setCurrentUser] = useState(null)
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRequestId, setSelectedRequestId] = useState(null)
  const [expandedClients, setExpandedClients] = useState({})
  
  // Dashboard Metrics
  const [metrics, setMetrics] = useState({
    total: 0,
    pending: 0,
    active: 0,
    completed: 0
  })

  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/portal/login')
      } else if (user.email !== 'admin@curos.in') {
        navigate('/portal/client')
      } else {
        setCurrentUser(user)
      }
    })
    return () => unsubscribe()
  }, [navigate])

  useEffect(() => {
    setLoading(true)
    const q = query(
      collection(db, 'requests')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reqList = []
      let pendingCount = 0
      let activeCount = 0
      let completedCount = 0

      snapshot.forEach((docSnap) => {
        const data = docSnap.data()
        reqList.push({ id: docSnap.id, ...data })
        
        if (data.status === 'Pending') pendingCount++
        else if (data.status === 'Completed') completedCount++
        else activeCount++
      })

      // Sort newest first (client-side to avoid composite index requirement)
      reqList.sort((a, b) => {
        const timeA = a.createdAt?.seconds || 0
        const timeB = b.createdAt?.seconds || 0
        return timeB - timeA
      })

      setRequests(reqList)
      setMetrics({
        total: reqList.length,
        pending: pendingCount,
        active: activeCount,
        completed: completedCount
      })
      
      setLoading(false)
    }, (error) => {
      console.error("Firestore global requests listener error:", error)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      navigate('/portal/login')
    } catch (err) {
      console.error("Error signing out:", err)
    }
  }

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      const reqRef = doc(db, 'requests', requestId)
      await updateDoc(reqRef, {
        status: newStatus
      })
    } catch (err) {
      console.error("Failed to update status in Firestore:", err)
    }
  }

  const getStatusColor = (status) => {
    const styles = {
      'Pending': 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20 shadow-glow-sm',
      'Under Discussion': 'text-blue text-blue/10 border-blue/20 shadow-glow-sm',
      'Accepted': 'text-primary bg-primary/10 border-primary/20 shadow-glow-sm',
      'In Progress': 'text-accent bg-accent/10 border-accent/20 shadow-glow-sm',
      'Completed': 'text-green-500 bg-green-500/10 border-green-500/20 shadow-glow-sm'
    }
    return styles[status] || 'text-gray-400 bg-gray-500/10 border-gray-500/20'
  }

  // Group requests by clientEmail (unique client identifier)
  const groupedClients = requests.reduce((acc, req) => {
    const key = req.clientEmail || 'unknown'
    if (!acc[key]) {
      acc[key] = {
        clientName: req.clientName || 'Unknown Client',
        clientEmail: req.clientEmail || 'N/A',
        clientId: req.clientId || req.userId || req.uid || req.clientEmail || key,
        requests: []
      }
    }
    acc[key].requests.push(req)
    return acc
  }, {})

  const clientList = Object.values(groupedClients)

  const toggleClient = (email) => {
    setExpandedClients(prev => ({
      ...prev,
      [email]: !prev[email]
    }))
  }

  const getInitials = (name) => {
    if (!name) return '?'
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
  }

  const getClientStatusSummary = (reqs) => {
    const pending = reqs.filter(r => r.status === 'Pending').length
    const completed = reqs.filter(r => r.status === 'Completed').length
    const active = reqs.length - pending - completed
    return { pending, completed, active }
  }

  return (
    <div className="bg-dark min-h-screen overflow-hidden">
      <PageHeader 
        title="Admin Control Hub" 
        subtitle="Developer Command & Control | Review requests and speak direct in real-time"
        breadcrumb={[{ name: 'Admin Hub' }]}
      />

      <section className="section py-8 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.05),transparent_50%)]" />
        <div className="relative z-10">
          {/* Profile and Logout Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 card p-6 mb-8 relative overflow-hidden gradient-border">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-blue/20 rounded-xl border border-primary/20 flex items-center justify-center font-display font-bold text-xl text-white shadow-glow-sm">
                A
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-lg leading-none mb-1.5 flex items-center gap-2">
                  CUROS Admin Panel
                  <span className="text-[9px] font-mono tracking-widest text-primary bg-primary/10 border border-primary/20 rounded px-1.5 py-0.5 uppercase shadow-glow-sm">SYSTEM</span>
                </h3>
                <p className="text-gray-500 text-xs font-mono">{currentUser?.email}</p>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="px-4 py-2.5 bg-dark-200 border border-dark-300 text-gray-400 hover:border-red-500/40 hover:text-red-500 hover:bg-red-500/5 text-xs font-bold rounded-xl transition-all duration-300 flex items-center gap-2 relative z-10"
            >
              <LogOut className="w-4 h-4" />
              Sign Out Command
            </button>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Total Client Requests', value: metrics.total, color: 'text-white', glow: 'shadow-none' },
              { label: 'Pending Assessment', value: metrics.pending, color: 'text-yellow-500', glow: 'shadow-glow-sm' },
              { label: 'Active In-Progress', value: metrics.active, color: 'text-primary', glow: 'shadow-glow-sm' },
              { label: 'Completed Deliveries', value: metrics.completed, color: 'text-accent', glow: 'shadow-glow-sm' }
            ].map((stat, i) => (
              <div key={i} className="card p-6 flex flex-col justify-between hover:border-primary/20 transition-colors">
                <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-3">{stat.label}</span>
                <span className={`font-display font-bold text-4xl leading-none ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Admin Workspace Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Requests grouped by Client */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-display font-bold text-xl text-white mb-4 flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-primary" />
                Client Pipeline
                <span className="text-xs font-mono text-gray-500 ml-1 bg-dark-200 px-2 py-0.5 rounded border border-dark-300">({clientList.length} clients)</span>
              </h3>

              {loading ? (
                <div className="card p-12 text-center">
                  <svg className="animate-spin h-8 w-8 text-primary mx-auto" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                </div>
              ) : clientList.length === 0 ? (
                <div className="card p-12 text-center">
                  <ShieldAlert className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <h4 className="font-display font-semibold text-white mb-2 text-xl">Pipeline is Empty</h4>
                  <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">No requests have been submitted by clients yet. When they do, they will appear here organized by client.</p>
                </div>
              ) : (
                clientList.map((client) => {
                  const isOpen = !!expandedClients[client.clientEmail]
                  const summary = getClientStatusSummary(client.requests)

                  return (
                    <div
                      key={client.clientEmail}
                      className={`card overflow-hidden transition-all duration-300 ${
                        isOpen ? 'border-primary/40 shadow-lg shadow-primary/5 ring-1 ring-primary/20' : 'hover:border-primary/20'
                      }`}
                    >
                      {/* ── Client Header Row (clickable) ── */}
                      <div
                        onClick={() => toggleClient(client.clientEmail)}
                        className={`flex items-center justify-between gap-4 p-5 cursor-pointer transition-all duration-200 group relative overflow-hidden ${
                          isOpen ? 'bg-primary/5' : 'hover:bg-dark-200/50'
                        }`}
                      >
                        {isOpen && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-blue" />}
                        
                        <div className="flex items-center gap-4 min-w-0 relative z-10">
                          {/* Avatar */}
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-blue/20 border border-primary/20 flex items-center justify-center font-display font-bold text-sm text-white flex-shrink-0 transition-transform duration-300 ${isOpen ? 'scale-110 shadow-glow-sm' : ''}`}>
                            {getInitials(client.clientName)}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="font-display font-bold text-white text-base group-hover:text-primary transition-colors">
                                {client.clientName}
                              </span>
                              <span className="text-[10px] font-mono text-gray-400 bg-dark-300/80 border border-dark-300 rounded px-1.5 py-0.5 max-w-[200px] truncate">
                                ID: {client.clientId}
                              </span>
                            </div>
                            <p className="text-gray-500 text-xs font-mono truncate">{client.clientEmail}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 flex-shrink-0 relative z-10">
                          {/* Status summary badges */}
                          <div className="hidden sm:flex items-center gap-2">
                            {summary.pending > 0 && (
                              <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 shadow-glow-sm">
                                {summary.pending} Pending
                              </span>
                            )}
                            {summary.active > 0 && (
                              <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 shadow-glow-sm">
                                {summary.active} Active
                              </span>
                            )}
                            {summary.completed > 0 && (
                              <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-accent/10 text-accent border border-accent/20 shadow-glow-sm">
                                {summary.completed} Done
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5 text-white font-medium text-xs bg-dark-200 border border-dark-300 px-3 py-1.5 rounded-lg shadow-inner">
                            <List className="w-3.5 h-3.5 text-primary" />
                            {client.requests.length}
                          </div>

                          {/* Chevron */}
                          <div className={`w-8 h-8 rounded-xl bg-dark-200 border border-dark-300 flex items-center justify-center transition-all duration-300 ${isOpen ? 'rotate-180 border-primary/30 bg-primary/10 shadow-glow-sm' : ''}`}>
                            <svg className={`w-4 h-4 transition-colors ${isOpen ? 'text-primary' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* ── Expanded: Individual Requests ── */}
                      {isOpen && (
                        <div className="border-t border-dark-300/50 divide-y divide-dark-300/30 bg-dark-100/30">
                          {client.requests.map((req) => (
                            <div
                              key={req.id}
                              onClick={() => setSelectedRequestId(req.id)}
                              className={`p-6 cursor-pointer transition-all duration-200 relative group ${
                                selectedRequestId === req.id
                                  ? 'bg-primary/5'
                                  : 'hover:bg-dark-200/50'
                              }`}
                            >
                              {selectedRequestId === req.id && (
                                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />
                              )}
                              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                <div className="min-w-0 pr-4">
                                  <span className="text-[10px] text-primary uppercase font-bold tracking-widest bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                                    {req.category}
                                  </span>
                                  <h4 className="font-display font-bold text-white text-base mt-2.5 leading-snug group-hover:text-primary-light transition-colors">
                                    {req.title}
                                  </h4>
                                  <p className="text-gray-400 text-sm leading-relaxed mt-2 line-clamp-2">
                                    {req.description}
                                  </p>
                                </div>

                                <div className="flex flex-col sm:items-end gap-3 flex-shrink-0 w-full sm:w-auto">
                                  <select
                                    value={req.status}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => handleStatusChange(req.id, e.target.value)}
                                    className={`px-3 py-2 rounded-xl text-xs font-bold border outline-none cursor-pointer focus:ring-2 focus:ring-primary/50 bg-dark-200 transition-colors ${getStatusColor(req.status)}`}
                                  >
                                    <option>Pending</option>
                                    <option>Under Discussion</option>
                                    <option>Accepted</option>
                                    <option>In Progress</option>
                                    <option>Completed</option>
                                  </select>

                                  <div className="flex items-center gap-1.5 text-gray-500 text-xs font-mono">
                                    <Clock className="w-3.5 h-3.5" />
                                    {req.createdAt ? new Date(req.createdAt.seconds * 1000).toLocaleDateString() : 'Syncing...'}
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-6 border-t border-dark-300/50 pt-4 mt-4 text-xs text-gray-400">
                                <div>Budget: <span className="text-white font-semibold font-mono bg-dark-200 px-2 py-1 rounded border border-dark-300 ml-1">{req.budget}</span></div>
                                <div>Timeline: <span className="text-white font-semibold font-mono bg-dark-200 px-2 py-1 rounded border border-dark-300 ml-1">{req.timeline}</span></div>
                                <div className={`flex items-center gap-1.5 ml-auto font-semibold transition-colors px-3 py-1 rounded-lg border ${
                                  selectedRequestId === req.id 
                                    ? 'bg-primary text-white border-primary shadow-glow-sm' 
                                    : 'text-primary border-primary/30 hover:bg-primary hover:text-white hover:border-primary'
                                }`}>
                                  <MessageSquare className="w-4 h-4" />
                                  Open Chat
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>

            {/* Real-time Central Admin Chat Feed */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              {selectedRequestId && requests.find(r => r.id === selectedRequestId) ? (
                <div className="card border-primary/30 shadow-glow overflow-hidden">
                  <div className="bg-gradient-to-r from-primary/10 to-blue/10 border-b border-primary/20 p-4 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <h4 className="font-display font-bold text-white text-sm">SECURE CHAT CHANNEL</h4>
                  </div>
                  <PortalChat
                    requestId={selectedRequestId}
                    requestTitle={`CONVERSATION WITH: ${String(requests.find(r => r.id === selectedRequestId)?.clientName || 'Client').toUpperCase()}`}
                    userRole="admin"
                  />
                </div>
              ) : (
                <div className="card p-12 border border-dark-300 border-dashed text-center flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.05),transparent_60%)] group-hover:opacity-100 opacity-50 transition-opacity duration-500" />
                  <div className="w-20 h-20 bg-dark-200 rounded-full flex items-center justify-center mb-6 relative z-10 border border-dark-300 group-hover:border-primary/30 transition-colors duration-300 shadow-inner">
                    <MessageSquare className="w-10 h-10 text-gray-500 group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <h4 className="font-display font-bold text-white mb-3 text-xl relative z-10">Central Real-time Chatroom</h4>
                  <p className="text-gray-400 text-sm max-w-[280px] mx-auto leading-relaxed relative z-10">
                    Select a client request card from the pipeline feed list to open a secure direct-sync conversation channel with that specific client.
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
