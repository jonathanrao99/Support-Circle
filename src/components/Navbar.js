import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  User, 
  Heart, 
  MessageCircle, 
  BookOpen, 
  Settings,
  Bell,
  Search,
  LogOut,
  ChevronDown
} from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', icon: Heart },
    { name: 'Dashboard', path: '/dashboard', icon: User },
    { name: 'Community', path: '/community', icon: MessageCircle },
    { name: 'Resources', path: '/resources', icon: BookOpen },
    { name: 'Profile', path: '/profile', icon: Settings }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav 
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <motion.div 
            className="logo-container"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart size={32} className="logo-icon" />
            <span className="logo-text">Support Circle</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-menu desktop">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                to={item.path} 
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
                {isActive(item.path) && (
                  <motion.div 
                    className="active-indicator"
                    layoutId="activeIndicator"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="nav-actions desktop">
          <motion.button 
            className="action-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Search size={20} />
          </motion.button>
          
          <motion.button 
            className="action-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </motion.button>
          
          <div className="user-menu">
            <motion.button 
              className="user-btn"
              onClick={() => setShowDropdown(!showDropdown)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="user-avatar">
                <span className="avatar-emoji">👤</span>
              </div>
              <span className="user-name">Alex</span>
              <ChevronDown size={16} />
            </motion.button>
            
            <AnimatePresence>
              {showDropdown && (
                <motion.div 
                  className="user-dropdown"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to="/profile" className="dropdown-item">
                    <User size={16} />
                    <span>Profile</span>
                  </Link>
                  <Link to="/settings" className="dropdown-item">
                    <Settings size={16} />
                    <span>Settings</span>
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item danger">
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button 
          className="mobile-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-nav-container">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link 
                    to={item.path} 
                    className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon size={24} />
                    <span>{item.name}</span>
                    {isActive(item.path) && (
                      <motion.div 
                        className="mobile-active-indicator"
                        layoutId="mobileActiveIndicator"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
              
              <div className="mobile-actions">
                <motion.button 
                  className="mobile-action-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search size={20} />
                  <span>Search</span>
                </motion.button>
                
                <motion.button 
                  className="mobile-action-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bell size={20} />
                  <span>Notifications</span>
                  <span className="mobile-notification-badge">3</span>
                </motion.button>
                
                <motion.button 
                  className="mobile-action-btn danger"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
