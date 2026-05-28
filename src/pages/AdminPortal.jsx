import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { List, MessageSquare, LogOut, CheckCircle, Clock, AlertCircle, RefreshCw, BarChart2, ShieldAlert } from 'lucide-react'
import { auth, db } from '../firebase'
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import PageHeader from '../components/PageHeader'
import PortalChat from '../components/PortalChat'

export default function AdminPortal() {
  const [currentUser, setCurrentUser] = useState(null)
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState(null)
  
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
      collection(db, 'requests'),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reqList = []
      let pendingCount = 0
      let activeCount = 0
      let completedCount = 0

      snapshot.forEach((doc) => {
        const data = doc.data()
        reqList.push({ id: doc.id, ...data })
        
        if (data.status === 'Pending') pendingCount++
        else if (data.status === 'Completed') completedCount++
        else activeCount++
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

  // Sync selectedRequest with fresh updates from requests list securely
  useEffect(() => {
    if (selectedRequest) {
      const updated = requests.find(r => r.id === selectedRequest.id)
      if (updated && JSON.stringify(updated) !== JSON.stringify(selectedRequest)) {
        setSelectedRequest(updated)
      }
    }
  }, [requests, selectedRequest])

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
      'Pending': 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
      'Under Discussion': 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      'Accepted': 'text-primary bg-primary/10 border-primary/20',
      'In Progress': 'text-accent bg-accent/10 border-accent/20',
      'Completed': 'text-green-500 bg-green-500/10 border-green-500/20'
    }
    return styles[status] || 'text-gray-400 bg-gray-500/10 border-gray-500/20'
  }

  return (
    <div className="bg-dark min-h-screen">
      <PageHeader 
        title="Admin Control Hub" 
        subtitle="Developer Command & Control | Review requests and speak direct in real-time"
        breadcrumb={[{ name: 'Admin Hub' }]}
      />

      <section className="section py-8">
        {/* Profile and Logout Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-dark-100 border border-dark-300 rounded-2xl p-6 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent/10 rounded-xl border border-accent/20 flex items-center justify-center font-display font-semibold text-lg text-accent uppercase">
              A
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base leading-none mb-1 flex items-center gap-2">
                CUROS Admin Panel
                <span className="text-[9px] font-mono tracking-widest text-primary bg-primary/10 border border-primary/20 rounded px-1.5 py-0.5 uppercase">SYSTEM</span>
              </h3>
              <p className="text-gray-500 text-xs font-mono">{currentUser?.email}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="px-4 py-2.5 bg-dark-200 border border-dark-300 text-gray-400 hover:border-red-500/40 hover:text-red-500 text-xs font-bold rounded-xl transition-all duration-300 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out Command
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Client Requests', value: metrics.total, color: 'text-white border-dark-300' },
            { label: 'Pending Assessment', value: metrics.pending, color: 'text-yellow-500 border-yellow-500/10' },
            { label: 'Active In-Progress', value: metrics.active, color: 'text-primary border-primary/10' },
            { label: 'Completed Deliveries', value: metrics.completed, color: 'text-green-500 border-green-500/10' }
          ].map((stat, i) => (
            <div key={i} className={`card p-6 bg-dark-100 border ${stat.color} flex flex-col justify-between`}>
              <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-2">{stat.label}</span>
              <span className="font-display font-bold text-3xl leading-none">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Admin Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Requests Administration */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-display font-bold text-xl text-white mb-2 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-primary" />
              Direct Client Pipeline
            </h3>

            {loading ? (
              <div className="card p-12 text-center">
                <svg className="animate-spin h-6 w-6 text-primary mx-auto" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </div>
            ) : requests.length === 0 ? (
              <div className="card p-12 text-center">
                <ShieldAlert className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                <h4 className="font-semibold text-white mb-1">Pipeline is Empty</h4>
                <p className="text-gray-400 text-sm max-w-sm mx-auto">No requests have been submitted by clients yet.</p>
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
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-[10px] text-accent uppercase font-bold tracking-wider">
                          {req.category}
                        </span>
                        <span className="text-dark-300">•</span>
                        <span className="text-[10px] text-gray-500">
                          By: <span className="text-white font-semibold">{req.clientName}</span> ({req.clientEmail})
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-white text-lg mt-1.5 group-hover:text-primary transition-colors">
                        {req.title}
                      </h4>
                      <p className="text-gray-400 text-xs leading-relaxed mt-2 line-clamp-2">
                        {req.description}
                      </p>
                    </div>

                    <div className="flex flex-col sm:items-end gap-3 flex-shrink-0 w-full sm:w-auto">
                      {/* Interactive Status Changer Dropdown */}
                      <select
                        value={req.status}
                        onClick={(e) => e.stopPropagation()} // Prevent selecting the card when using dropdown
                        onChange={(e) => handleStatusChange(req.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border outline-none cursor-pointer focus:ring-1 focus:ring-primary bg-dark-200 transition-colors ${getStatusColor(req.status)}`}
                      >
                        <option>Pending</option>
                        <option>Under Discussion</option>
                        <option>Accepted</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                      </select>
                      
                      <div className="flex items-center gap-1.5 text-gray-500 text-[10px] font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        {req.createdAt ? new Date(req.createdAt.seconds * 1000).toLocaleDateString() : 'Syncing...'}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 border-t border-dark-300/40 pt-4 mt-4 text-[11px] text-gray-400">
                    <div>Budget: <span className="text-white font-semibold font-mono">{req.budget}</span></div>
                    <div>Timeline: <span className="text-white font-semibold font-mono">{req.timeline}</span></div>
                    
                    <div className="flex items-center gap-1.5 ml-auto text-accent hover:text-primary font-semibold">
                      <MessageSquare className="w-3.5 h-3.5" />
                      Client Chatroom
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Real-time Central Admin Chat Feed */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            {selectedRequest ? (
              <PortalChat
                requestId={selectedRequest.id}
                requestTitle={`CONVERSATION WITH: ${String(selectedRequest.clientName || 'Client').toUpperCase()}`}
                userRole="admin"
              />
            ) : (
              <div className="card p-12 bg-dark-100/50 border border-dark-300 border-dashed text-center flex flex-col items-center justify-center min-h-[300px]">
                <MessageSquare className="w-12 h-12 text-gray-600 mb-4" />
                <h4 className="font-display font-semibold text-white mb-2">Central Real-time Chatroom</h4>
                <p className="text-gray-400 text-xs max-w-[280px] mx-auto leading-relaxed">
                  Select a client request card from the pipeline feed list to open a secure direct-sync conversation channel with that specific client.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
