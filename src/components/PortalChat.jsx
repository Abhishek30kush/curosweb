import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Send, User, MessageSquare } from 'lucide-react'
import { db, auth } from '../firebase'
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore'

export default function PortalChat({ requestId, requestTitle, userRole }) {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (!requestId) return

    setLoading(true)
    // Query messages belonging to this requestId ordered by time
    const q = query(
      collection(db, 'messages'),
      where('requestId', '==', requestId),
      orderBy('createdAt', 'asc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = []
      snapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() })
      })
      setMessages(msgs)
      setLoading(false)
    }, (error) => {
      console.error("Firestore message listener error:", error)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [requestId])

  useEffect(() => {
    // Scroll to bottom whenever messages list updates
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !auth.currentUser) return

    const messageText = newMessage.trim()
    setNewMessage('')

    try {
      await addDoc(collection(db, 'messages'), {
        requestId,
        senderId: auth.currentUser.uid,
        senderName: userRole === 'admin' ? 'CUROS Team' : (auth.currentUser.displayName || 'Client Partner'),
        senderRole: userRole,
        text: messageText,
        createdAt: serverTimestamp()
      })
    } catch (err) {
      console.error("Failed to send message to Firestore:", err)
    }
  }

  return (
    <div className="flex flex-col h-[500px] bg-dark-50 border border-dark-300 rounded-2xl overflow-hidden shadow-2xl relative">
      {/* Header bar */}
      <div className="bg-dark-100 border-b border-dark-300 px-6 py-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h4 className="font-display font-semibold text-white text-sm">{requestTitle}</h4>
          <p className="text-[10px] text-accent flex items-center gap-1 font-mono uppercase tracking-wider mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
            Real-time Direct Sync
          </p>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <svg className="animate-spin h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <MessageSquare className="w-10 h-10 text-gray-600 mb-3" />
            <p className="text-gray-400 text-sm font-medium">No messages yet.</p>
            <p className="text-gray-500 text-xs mt-1 max-w-[200px]">Send a message to initiate direct discussion with developers.</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isMe = msg.senderId === auth.currentUser?.uid
            return (
              <div 
                key={msg.id || index}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[10px] text-gray-500 mb-1 px-1 flex items-center gap-1">
                  {!isMe && <User className="w-2.5 h-2.5" />}
                  {msg.senderName}
                </span>
                
                <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-lg ${
                  isMe 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-dark-200 border border-dark-300 text-gray-200 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
                
                <span className="text-[9px] text-gray-600 mt-1 px-1 font-mono">
                  {msg.createdAt ? new Date(msg.createdAt.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Syncing...'}
                </span>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Footer */}
      <form onSubmit={handleSendMessage} className="bg-dark-100 border-t border-dark-300 p-4 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          className="flex-1 bg-dark-200 border border-dark-300 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
        />
        
        <button
          type="submit"
          className="w-12 h-12 bg-primary hover:bg-primary-light text-white rounded-xl flex items-center justify-center transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  )
}
