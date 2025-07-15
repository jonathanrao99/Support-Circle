import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  MessageCircle, 
  Users, 
  Heart, 
  Send, 
  MoreVertical, 
  Search,
  Filter,
  Plus,
  Video,
  Phone,
  Smile,
  Paperclip,
  Mic,
  Shield,
  Star,
  Clock
} from 'lucide-react';

function Community() {
  const [activeTab, setActiveTab] = useState('chats');
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const supportGroups = [
    {
      id: 1,
      name: "Addiction Recovery",
      members: 156,
      online: 23,
      lastMessage: "Great session today everyone!",
      lastTime: "2 min ago",
      unread: 3,
      avatar: "🫂"
    },
    {
      id: 2,
      name: "Anxiety Support",
      members: 89,
      online: 12,
      lastMessage: "Remember to breathe deeply",
      lastTime: "15 min ago",
      unread: 0,
      avatar: "🧘"
    },
    {
      id: 3,
      name: "Depression Warriors",
      members: 234,
      online: 45,
      lastMessage: "You're not alone in this journey",
      lastTime: "1 hour ago",
      unread: 7,
      avatar: "💪"
    },
    {
      id: 4,
      name: "Grief & Loss",
      members: 67,
      online: 8,
      lastMessage: "Sharing memories helps heal",
      lastTime: "3 hours ago",
      unread: 1,
      avatar: "🕊️"
    }
  ];

  const directMessages = [
    {
      id: 1,
      name: "Sarah Johnson",
      status: "online",
      lastMessage: "How are you feeling today?",
      lastTime: "5 min ago",
      unread: 2,
      avatar: "👩‍⚕️"
    },
    {
      id: 2,
      name: "Mike Chen",
      status: "away",
      lastMessage: "Thanks for the support yesterday",
      lastTime: "1 hour ago",
      unread: 0,
      avatar: "👨‍💼"
    },
    {
      id: 3,
      name: "Emma Davis",
      status: "offline",
      lastMessage: "See you in group therapy",
      lastTime: "2 hours ago",
      unread: 1,
      avatar: "👩‍🎓"
    }
  ];

  const mockMessages = [
    {
      id: 1,
      sender: "Sarah Johnson",
      message: "Welcome everyone to today's support session! How is everyone feeling?",
      time: "10:00 AM",
      type: "text",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      message: "Feeling a bit anxious today, but grateful to be here with everyone",
      time: "10:02 AM",
      type: "text",
      isOwn: true
    },
    {
      id: 3,
      sender: "Mike Chen",
      message: "I can relate to that feeling. Remember, it's okay to feel anxious",
      time: "10:03 AM",
      type: "text",
      isOwn: false
    },
    {
      id: 4,
      sender: "Emma Davis",
      message: "💙 Sending virtual hugs to everyone",
      time: "10:04 AM",
      type: "text",
      isOwn: false
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [mockMessages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add message logic here
      setMessage('');
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <motion.div 
      className="community-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="community-header">
        <motion.h1 
          className="community-title"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Community Support
        </motion.h1>
        <p className="community-subtitle">
          Connect, share, and grow with others on similar journeys
        </p>
      </div>

      <div className="community-content">
        {/* Sidebar */}
        <motion.div 
          className="community-sidebar"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="sidebar-header">
            <div className="search-container">
              <Search size={20} />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="search-input"
              />
            </div>
            <motion.button 
              className="new-chat-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={20} />
            </motion.button>
          </div>

          <div className="sidebar-tabs">
            <motion.button
              className={`tab-btn ${activeTab === 'chats' ? 'active' : ''}`}
              onClick={() => setActiveTab('chats')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle size={20} />
              Direct Messages
            </motion.button>
            <motion.button
              className={`tab-btn ${activeTab === 'groups' ? 'active' : ''}`}
              onClick={() => setActiveTab('groups')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Users size={20} />
              Support Groups
            </motion.button>
          </div>

          <div className="conversations-list">
            <AnimatePresence mode="wait">
              {activeTab === 'chats' ? (
                <motion.div
                  key="chats"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {directMessages.map((chat, index) => (
                    <motion.div
                      key={chat.id}
                      className={`conversation-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
                      onClick={() => setSelectedChat(chat)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ backgroundColor: 'rgba(102, 126, 234, 0.1)' }}
                    >
                      <div className="conversation-avatar">
                        <span className="avatar-emoji">{chat.avatar}</span>
                        <div className={`status-indicator ${chat.status}`}></div>
                      </div>
                      <div className="conversation-content">
                        <div className="conversation-header">
                          <h3 className="conversation-name">{chat.name}</h3>
                          <span className="conversation-time">{chat.lastTime}</span>
                        </div>
                        <p className="conversation-preview">{chat.lastMessage}</p>
                      </div>
                      {chat.unread > 0 && (
                        <div className="unread-badge">{chat.unread}</div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="groups"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {supportGroups.map((group, index) => (
                    <motion.div
                      key={group.id}
                      className={`conversation-item group ${selectedChat?.id === group.id ? 'active' : ''}`}
                      onClick={() => setSelectedChat(group)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ backgroundColor: 'rgba(102, 126, 234, 0.1)' }}
                    >
                      <div className="conversation-avatar">
                        <span className="avatar-emoji">{group.avatar}</span>
                        <div className="online-indicator">
                          <span>{group.online}</span>
                        </div>
                      </div>
                      <div className="conversation-content">
                        <div className="conversation-header">
                          <h3 className="conversation-name">{group.name}</h3>
                          <span className="conversation-time">{group.lastTime}</span>
                        </div>
                        <p className="conversation-preview">{group.lastMessage}</p>
                        <div className="group-stats">
                          <span>{group.members} members</span>
                          <span>•</span>
                          <span>{group.online} online</span>
                        </div>
                      </div>
                      {group.unread > 0 && (
                        <div className="unread-badge">{group.unread}</div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Chat Area */}
        <motion.div 
          className="chat-area"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {selectedChat ? (
            <>
              <div className="chat-header">
                <div className="chat-info">
                  <div className="chat-avatar">
                    <span className="avatar-emoji">{selectedChat.avatar}</span>
                    {selectedChat.status && (
                      <div className={`status-indicator ${selectedChat.status}`}></div>
                    )}
                  </div>
                  <div className="chat-details">
                    <h2 className="chat-name">{selectedChat.name}</h2>
                    {selectedChat.online && (
                      <span className="online-status">{selectedChat.online} online</span>
                    )}
                  </div>
                </div>
                <div className="chat-actions">
                  <motion.button 
                    className="action-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Video size={20} />
                  </motion.button>
                  <motion.button 
                    className="action-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Phone size={20} />
                  </motion.button>
                  <motion.button 
                    className="action-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MoreVertical size={20} />
                  </motion.button>
                </div>
              </div>

              <div className="messages-container">
                <div className="messages-list">
                  {mockMessages.map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      className={`message ${msg.isOwn ? 'own' : 'other'}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {!msg.isOwn && (
                        <div className="message-avatar">
                          <span className="avatar-emoji">👤</span>
                        </div>
                      )}
                      <div className="message-content">
                        {!msg.isOwn && (
                          <span className="message-sender">{msg.sender}</span>
                        )}
                        <div className="message-bubble">
                          <p>{msg.message}</p>
                        </div>
                        <span className="message-time">{msg.time}</span>
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div 
                      className="typing-indicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <span>Someone is typing...</span>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="message-input-container">
                <div className="input-actions">
                  <motion.button 
                    className="input-action-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Paperclip size={20} />
                  </motion.button>
                  <motion.button 
                    className="input-action-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Smile size={20} />
                  </motion.button>
                </div>
                <div className="message-input-wrapper">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={() => setIsTyping(true)}
                    onBlur={() => setIsTyping(false)}
                    placeholder="Type your message..."
                    className="message-input"
                    rows="1"
                  />
                </div>
                <motion.button 
                  className="send-btn"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </>
          ) : (
            <div className="no-chat-selected">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <MessageCircle size={64} className="no-chat-icon" />
                <h2>Select a conversation</h2>
                <p>Choose a chat or support group to start connecting</p>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Community;