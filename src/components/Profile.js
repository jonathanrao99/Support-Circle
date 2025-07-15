import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Download, 
  Upload,
  Edit3,
  Camera,
  Save,
  X,
  Check,
  Award,
  Target,
  Calendar,
  Heart,
  Activity,
  TrendingUp,
  Moon,
  Sun,
  Palette,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Smartphone,
  Mail,
  MapPin,
  Clock,
  Star,
  Users,
  BookOpen,
  MessageCircle,
  ArrowRight
} from 'lucide-react';

function Profile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [userProfile, setUserProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    avatar: "👤",
    bio: "On a journey of recovery and growth. Every day is a new opportunity to become stronger.",
    location: "New York, NY",
    joinDate: "2023-06-15",
    recoveryStreak: 45,
    totalSessions: 23,
    communitySupport: 127,
    goalsAchieved: 8
  });

  const [editForm, setEditForm] = useState(userProfile);

  const achievements = [
    { 
      id: 1, 
      name: "First Step", 
      description: "Completed first therapy session", 
      icon: Award, 
      earned: true, 
      date: "2023-06-20",
      color: "#10b981"
    },
    { 
      id: 2, 
      name: "Community Helper", 
      description: "Helped 5 other members", 
      icon: Heart, 
      earned: true, 
      date: "2023-07-15",
      color: "#3b82f6"
    },
    { 
      id: 3, 
      name: "Consistency", 
      description: "30-day streak", 
      icon: Activity, 
      earned: true, 
      date: "2023-08-10",
      color: "#8b5cf6"
    },
    { 
      id: 4, 
      name: "Milestone", 
      description: "100 days sober", 
      icon: Target, 
      earned: false, 
      date: null,
      color: "#f59e0b"
    },
    { 
      id: 5, 
      name: "Mentor", 
      description: "Become a peer mentor", 
      icon: Users, 
      earned: false, 
      date: null,
      color: "#ef4444"
    }
  ];

  const recentActivity = [
    { 
      type: "therapy", 
      text: "Completed session with Dr. Smith", 
      time: "2 hours ago",
      icon: Calendar
    },
    { 
      type: "community", 
      text: "Replied to Sarah's post", 
      time: "4 hours ago",
      icon: MessageCircle
    },
    { 
      type: "goal", 
      text: "Achieved daily meditation goal", 
      time: "1 day ago",
      icon: Target
    },
    { 
      type: "resource", 
      text: "Read article on coping strategies", 
      time: "2 days ago",
      icon: BookOpen
    }
  ];

  const settings = [
    {
      category: "Account",
      items: [
        { name: "Personal Information", icon: User, action: () => setActiveTab('account') },
        { name: "Privacy Settings", icon: Shield, action: () => setActiveTab('privacy') },
        { name: "Notification Preferences", icon: Bell, action: () => setActiveTab('notifications') }
      ]
    },
    {
      category: "Appearance",
      items: [
        { name: "Dark Mode", icon: darkMode ? Moon : Sun, action: () => setDarkMode(!darkMode), toggle: true, value: darkMode },
        { name: "Theme Colors", icon: Palette, action: () => setActiveTab('appearance') },
        { name: "Sound Effects", icon: notifications ? Volume2 : VolumeX, action: () => setNotifications(!notifications), toggle: true, value: notifications }
      ]
    },
    {
      category: "Data",
      items: [
        { name: "Export Data", icon: Download, action: () => console.log('Export data') },
        { name: "Import Data", icon: Upload, action: () => console.log('Import data') },
        { name: "Delete Account", icon: X, action: () => console.log('Delete account'), danger: true }
      ]
    }
  ];

  const handleSaveProfile = () => {
    setUserProfile(editForm);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditForm(userProfile);
    setIsEditing(false);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'therapy': return <Calendar size={16} />;
      case 'community': return <MessageCircle size={16} />;
      case 'goal': return <Target size={16} />;
      case 'resource': return <BookOpen size={16} />;
      default: return <Activity size={16} />;
    }
  };

  return (
    <motion.div 
      className="profile-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="profile-header">
        <motion.h1 
          className="profile-title"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Profile & Settings
        </motion.h1>
        <p className="profile-subtitle">
          Manage your account, track progress, and customize your experience
        </p>
      </div>

      <div className="profile-content">
        {/* Profile Overview */}
        <motion.div 
          className="profile-overview"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="profile-card">
            <div className="profile-header-section">
              <div className="profile-avatar-section">
                <div className="profile-avatar">
                  <span className="avatar-emoji">{userProfile.avatar}</span>
                  <motion.button 
                    className="avatar-edit-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Camera size={16} />
                  </motion.button>
                </div>
                <div className="profile-info">
                  <h2 className="profile-name">{userProfile.name}</h2>
                  <p className="profile-email">{userProfile.email}</p>
                  <div className="profile-meta">
                    <span><MapPin size={14} /> {userProfile.location}</span>
                    <span><Calendar size={14} /> Joined {new Date(userProfile.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="profile-actions">
                {isEditing ? (
                  <div className="edit-actions">
                    <motion.button 
                      className="action-btn primary"
                      onClick={handleSaveProfile}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Save size={16} />
                      Save
                    </motion.button>
                    <motion.button 
                      className="action-btn secondary"
                      onClick={handleCancelEdit}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X size={16} />
                      Cancel
                    </motion.button>
                  </div>
                ) : (
                  <motion.button 
                    className="action-btn primary"
                    onClick={() => setIsEditing(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Edit3 size={16} />
                    Edit Profile
                  </motion.button>
                )}
              </div>
            </div>

            {isEditing ? (
              <motion.div 
                className="edit-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                    className="form-textarea"
                    rows="3"
                  />
                </div>
              </motion.div>
            ) : (
              <div className="profile-bio">
                <p>{userProfile.bio}</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="stats-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="section-title">Your Progress</h2>
          <div className="stats-grid">
            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="stat-icon" style={{ backgroundColor: '#10b98120' }}>
                <TrendingUp size={24} color="#10b981" />
              </div>
              <div className="stat-content">
                <h3 className="stat-title">Recovery Streak</h3>
                <div className="stat-value">{userProfile.recoveryStreak} days</div>
                <div className="stat-change positive">+12% this month</div>
              </div>
            </motion.div>

            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="stat-icon" style={{ backgroundColor: '#3b82f620' }}>
                <Calendar size={24} color="#3b82f6" />
              </div>
              <div className="stat-content">
                <h3 className="stat-title">Therapy Sessions</h3>
                <div className="stat-value">{userProfile.totalSessions}</div>
                <div className="stat-change positive">+3 this month</div>
              </div>
            </motion.div>

            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="stat-icon" style={{ backgroundColor: '#8b5cf620' }}>
                <Users size={24} color="#8b5cf6" />
              </div>
              <div className="stat-content">
                <h3 className="stat-title">Community Support</h3>
                <div className="stat-value">{userProfile.communitySupport}</div>
                <div className="stat-change positive">+8% this month</div>
              </div>
            </motion.div>

            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="stat-icon" style={{ backgroundColor: '#f59e0b20' }}>
                <Target size={24} color="#f59e0b" />
              </div>
              <div className="stat-content">
                <h3 className="stat-title">Goals Achieved</h3>
                <div className="stat-value">{userProfile.goalsAchieved}/12</div>
                <div className="stat-change positive">+2 this month</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Achievements and Activity */}
        <div className="profile-bottom">
          <motion.div 
            className="achievements-section"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="section-title">Achievements</h2>
            <div className="achievements-grid">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="achievement-icon" style={{ backgroundColor: achievement.color + '20' }}>
                    <achievement.icon size={24} color={achievement.color} />
                  </div>
                  <div className="achievement-content">
                    <h3 className="achievement-name">{achievement.name}</h3>
                    <p className="achievement-description">{achievement.description}</p>
                    {achievement.earned && (
                      <span className="achievement-date">
                        <Calendar size={12} />
                        {new Date(achievement.date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  {achievement.earned && (
                    <div className="achievement-badge">
                      <Check size={16} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="activity-section"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="section-title">Recent Activity</h2>
            <div className="activity-list">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  className="activity-item"
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <div className={`activity-icon ${activity.type}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="activity-content">
                    <p className="activity-text">{activity.text}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Settings */}
        <motion.div 
          ref={ref}
          className="settings-section"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Settings</h2>
          <div className="settings-grid">
            {settings.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                className="settings-category"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + categoryIndex * 0.1 }}
              >
                <h3 className="category-title">{category.category}</h3>
                <div className="settings-list">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.name}
                      className="setting-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.7 + categoryIndex * 0.1 + itemIndex * 0.05 }}
                      whileHover={{ backgroundColor: 'rgba(102, 126, 234, 0.1)' }}
                    >
                      <div className="setting-info">
                        <item.icon size={20} />
                        <span className="setting-name">{item.name}</span>
                      </div>
                      <div className="setting-action">
                        {item.toggle ? (
                          <motion.button
                            className={`toggle-switch ${item.value ? 'active' : ''}`}
                            onClick={item.action}
                            whileTap={{ scale: 0.9 }}
                          >
                            <motion.div
                              className="toggle-slider"
                              animate={{ x: item.value ? 20 : 0 }}
                              transition={{ duration: 0.2 }}
                            />
                          </motion.button>
                        ) : (
                          <motion.button
                            className={`setting-btn ${item.danger ? 'danger' : ''}`}
                            onClick={item.action}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {item.danger ? <X size={16} /> : <ArrowRight size={16} />}
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Profile;