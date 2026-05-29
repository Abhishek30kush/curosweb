import { useState, useEffect, useRef } from 'react'
import { Send, User, MessageSquare } from 'lucide-react'
import { db, auth } from '../firebase'
import { collection, addDoc, query, where, onSnapshot, serverTimestamp } from 'firebase/firestore'

export default function PortalChat({ requestId, requestTitle, userRole }) {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef(null)
  // Track optimistic messages that haven't been confirmed by Firestore yet
  const [pendingMessages, setPendingMessages] = useState([])

  useEffect(() => {
    if (!requestId) return

    setLoading(true)
    setPendingMessages([]) // Clear pending when switching requests

    const q = query(
      collection(db, 'messages'),
      where('requestId', '==', requestId)
    )

    const unsubscribe = onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
      const msgs = []
      snapshot.forEach((docSnap) => {
        const data = docSnap.data()
        msgs.push({
          id: docSnap.id,
          ...data,
          // Use a numeric timestamp for reliable sorting
          _sortTime: data.createdAt?.seconds ?? (Date.now() / 1000)
        })
      })

      // Sort chronologically
      msgs.sort((a, b) => a._sortTime - b._sortTime)

      setMessages(msgs)
      setLoading(false)

      // Remove pending messages that now appear in the confirmed snapshot
      setPendingMessages((prev) =>
        prev.filter((pm) => !msgs.some((m) => m.text === pm.text && m.senderId === pm.senderId))
      )
    }, (error) => {
      console.error("Firestore message listener error:", error)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [requestId])

  // Combined list: confirmed messages + any still-pending optimistic messages
  const allMessages = [
    ...messages,
    ...pendingMessages
  ]

  useEffect(() => {
    // Scroll to bottom whenever messages list updates
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [allMessages.length])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !auth.currentUser) return

    const messageText = newMessage.trim()
    setNewMessage('')

    // Optimistic: immediately add the message to the local feed
    const optimisticMsg = {
      id: `pending_${Date.now()}`,
      requestId,
      senderId: auth.currentUser.uid,
      senderName: userRole === 'admin' ? 'CUROS Team' : (auth.currentUser.displayName || 'Client Partner'),
      senderRole: userRole,
      text: messageText,
      createdAt: null,
      _sortTime: Date.now() / 1000,
      _isPending: true
    }
    setPendingMessages((prev) => [...prev, optimisticMsg])

    try {
      await addDoc(collection(db, 'messages'), {
        requestId,
        senderId: auth.currentUser.uid,
        senderName: userRole === 'admin' ? 'CUROS Team' : (auth.currentUser.displayName || 'Client Partner'),
        senderRole: userRole,
        text: messageText,
        createdAt: serverTimestamp()
      })
      // Once Firestore confirms, onSnapshot will deliver the message and we clear it from pending
    } catch (err) {
      console.error("Failed to send message to Firestore:", err)
      // Remove failed optimistic message
      setPendingMessages((prev) => prev.filter((m) => m.id !== optimisticMsg.id))
    }
  }

  return (
    <div className="flex flex-col h-[600px] bg-dark border border-dark-300 rounded-2xl overflow-hidden shadow-2xl relative">
      {/* Header bar */}
      <div className="bg-dark-100/80 backdrop-blur-md border-b border-dark-300 px-6 py-5 flex items-center gap-4 relative z-10">
        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-blue/20 rounded-xl flex items-center justify-center border border-primary/20 shadow-glow-sm">
          <MessageSquare className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h4 className="font-display font-semibold text-white text-base">{requestTitle}</h4>
          <p className="text-xs text-primary-light flex items-center gap-1.5 font-mono uppercase tracking-wider mt-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-glow-sm"></span>
            Real-time Direct Sync
          </p>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.03),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 dot-pattern opacity-10 pointer-events-none" />
        
        {loading ? (
          <div className="h-full flex items-center justify-center relative z-10">
            <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : allMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4 relative z-10">
            <div className="w-16 h-16 bg-dark-200 border border-dark-300 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-gray-300 text-base font-medium">No messages yet.</p>
            <p className="text-gray-500 text-sm mt-2 max-w-[250px] leading-relaxed">Send a message to initiate direct discussion with developers.</p>
          </div>
        ) : (
          <div className="relative z-10 space-y-6">
            {allMessages.map((msg, index) => {
              const isMe = msg.senderId === auth.currentUser?.uid
              return (
                <div 
                  key={msg.id || index}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[11px] text-gray-400 mb-1.5 px-2 flex items-center gap-1.5 font-medium">
                    {!isMe && <User className="w-3 h-3 text-primary/70" />}
                    {msg.senderName}
                  </span>
                  
                  <div className={`max-w-[80%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-lg ${
                    isMe 
                      ? 'bg-gradient-to-br from-primary to-blue text-white rounded-tr-sm shadow-primary/10' 
                      : 'bg-dark-200 border border-dark-300 text-gray-200 rounded-tl-sm'
                  } ${msg._isPending ? 'opacity-70' : ''}`}>
                    {msg.text}
                  </div>
                  
                  <span className="text-[10px] text-gray-500 mt-1.5 px-2 font-mono">
                    {msg._isPending
                      ? 'Sending...'
                      : msg.createdAt
                        ? new Date(msg.createdAt.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                        : 'Syncing...'}
                  </span>
                </div>
              )
            })}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Footer */}
      <form onSubmit={handleSendMessage} className="bg-dark-100/80 backdrop-blur-md border-t border-dark-300 p-5 flex gap-3 relative z-10">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          className="flex-1 bg-dark-200 border border-dark-300 rounded-xl px-5 py-3.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
        />
        
        <button
          type="submit"
          disabled={!newMessage.trim()}
          className="w-14 h-14 bg-gradient-to-r from-primary to-blue hover:from-primary-light hover:to-primary text-white rounded-xl flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-glow-sm"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  )
}
