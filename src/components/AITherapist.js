import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperAirplaneIcon, SparklesIcon, UserIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

const AITherapist = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm here to support you today. How are you feeling?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionStart] = useState(new Date());
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI Response Generator (simulated)
  const generateAIResponse = async (userMessage) => {
    const responses = {
      greeting: [
        "I understand you're reaching out. That's a brave first step.",
        "Thank you for sharing that with me. I'm here to listen.",
        "I hear you, and I want you to know that your feelings are valid."
      ],
      anxiety: [
        "Anxiety can feel overwhelming. Let's take a moment to breathe together.",
        "It sounds like you're experiencing some anxiety. Can you tell me more about what's triggering these feelings?",
        "Anxiety is your body's way of trying to protect you. Let's work on some coping strategies."
      ],
      depression: [
        "Depression can make everything feel heavy and hopeless. You're not alone in this.",
        "I hear the pain in your words. It takes strength to talk about these feelings.",
        "Depression lies to you. It tells you things that aren't true. Let's challenge those thoughts together."
      ],
      stress: [
        "Stress can be incredibly overwhelming. What's been the most challenging part for you?",
        "It sounds like you're under a lot of pressure. Let's identify what's within your control.",
        "Stress affects us all differently. How has it been impacting your daily life?"
      ],
      default: [
        "I'm here to listen. Can you tell me more about what's on your mind?",
        "That sounds really challenging. How long have you been feeling this way?",
        "I want to understand better. What would be most helpful for you right now?"
      ]
    };

    // Simple keyword detection
    const lowerMessage = userMessage.toLowerCase();
    let category = 'default';
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      category = 'greeting';
    } else if (lowerMessage.includes('anxiety') || lowerMessage.includes('anxious') || lowerMessage.includes('worry')) {
      category = 'anxiety';
    } else if (lowerMessage.includes('depression') || lowerMessage.includes('sad') || lowerMessage.includes('hopeless')) {
      category = 'depression';
    } else if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('pressure')) {
      category = 'stress';
    }

    const possibleResponses = responses[category];
    const randomResponse = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
    
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    return randomResponse;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(inputMessage);
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast.error('Sorry, I encountered an error. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getSessionDuration = () => {
    const duration = new Date() - sessionStart;
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <SparklesIcon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display">AI Support Companion</h2>
              <p className="text-primary-100 text-sm">Always here to listen and support</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-primary-100">Session Time</div>
            <div className="text-lg font-mono">{getSessionDuration()}</div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'user' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-800 shadow-sm border'
              }`}>
                <div className="flex items-start space-x-2">
                  {message.type === 'ai' && (
                    <SparklesIcon className="h-4 w-4 text-primary-600 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-primary-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                  {message.type === 'user' && (
                    <UserIcon className="h-4 w-4 text-primary-100 mt-0.5 flex-shrink-0" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white text-gray-800 shadow-sm border px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <SparklesIcon className="h-4 w-4 text-primary-600" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your mind..."
            className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            rows="2"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          This is a supportive AI companion. For professional help, please contact a licensed therapist.
        </p>
      </div>
    </motion.div>
  );
};

export default AITherapist;