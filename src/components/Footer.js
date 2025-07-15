import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  ArrowUp,
  Shield,
  Users,
  Award,
  Clock
} from 'lucide-react';

function Footer() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: "Support Services",
      links: [
        { name: "Addiction Recovery", path: "/addiction" },
        { name: "Mental Health", path: "/mental-health" },
        { name: "Anxiety & Depression", path: "/anxiety" },
        { name: "Grief & Loss", path: "/grief" },
        { name: "LGBTQ+ Support", path: "/lgbtq" },
        { name: "Crisis Help", path: "/crisis" }
      ]
    },
    {
      title: "Community",
      links: [
        { name: "Support Groups", path: "/community" },
        { name: "Peer Mentoring", path: "/mentoring" },
        { name: "Success Stories", path: "/stories" },
        { name: "Events & Workshops", path: "/events" },
        { name: "Volunteer", path: "/volunteer" },
        { name: "Donate", path: "/donate" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Educational Articles", path: "/resources" },
        { name: "Self-Help Tools", path: "/tools" },
        { name: "Meditation Library", path: "/meditation" },
        { name: "Crisis Resources", path: "/crisis-resources" },
        { name: "Professional Directory", path: "/directory" },
        { name: "Research & Studies", path: "/research" }
      ]
    },
    {
      title: "About Us",
      links: [
        { name: "Our Mission", path: "/mission" },
        { name: "Team", path: "/team" },
        { name: "Partners", path: "/partners" },
        { name: "Careers", path: "/careers" },
        { name: "Press", path: "/press" },
        { name: "Contact", path: "/contact" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "https://facebook.com" },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com" },
    { name: "Instagram", icon: Instagram, url: "https://instagram.com" },
    { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com" },
    { name: "YouTube", icon: Youtube, url: "https://youtube.com" }
  ];

  const stats = [
    { icon: Users, number: "10K+", label: "Community Members" },
    { icon: Heart, number: "95%", label: "Success Rate" },
    { icon: Shield, number: "24/7", label: "Support Available" },
    { icon: Clock, number: "500+", label: "Hours of Therapy" }
  ];

  return (
    <footer className="footer" ref={ref}>
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          {/* Brand Section */}
          <motion.div 
            className="footer-brand"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="brand-info">
              <div className="brand-logo">
                <Heart size={32} className="logo-icon" />
                <span className="brand-name">Support Circle</span>
              </div>
              <p className="brand-description">
                Empowering individuals on their journey to recovery and mental wellness through 
                compassionate support, evidence-based resources, and a caring community.
              </p>
              
              <div className="brand-stats">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="brand-stat"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <stat.icon size={20} className="stat-icon" />
                    <div className="stat-content">
                      <span className="stat-number">{stat.number}</span>
                      <span className="stat-label">{stat.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Footer Links */}
          <div className="footer-links">
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                className="footer-section"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + sectionIndex * 0.1 }}
              >
                <h3 className="section-title">{section.title}</h3>
                <ul className="section-links">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + sectionIndex * 0.1 + linkIndex * 0.05 }}
                    >
                      <Link to={link.path} className="footer-link">
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact & Social Section */}
      <motion.div 
        className="footer-contact"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="contact-container">
          <div className="contact-info">
            <h3 className="contact-title">Get in Touch</h3>
            <div className="contact-details">
              <div className="contact-item">
                <Mail size={20} />
                <span>support@supportcircle.com</span>
              </div>
              <div className="contact-item">
                <Phone size={20} />
                <span>1-800-SUPPORT (1-800-787-7678)</span>
              </div>
              <div className="contact-item">
                <MapPin size={20} />
                <span>123 Recovery Street, Wellness City, WC 12345</span>
              </div>
            </div>
          </div>

          <div className="social-section">
            <h3 className="social-title">Follow Us</h3>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Footer */}
      <motion.div 
        className="footer-bottom"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="bottom-container">
          <div className="bottom-left">
            <p className="copyright">
              © 2024 Support Circle. All rights reserved.
            </p>
            <div className="legal-links">
              <Link to="/privacy" className="legal-link">Privacy Policy</Link>
              <Link to="/terms" className="legal-link">Terms of Service</Link>
              <Link to="/cookies" className="legal-link">Cookie Policy</Link>
              <Link to="/accessibility" className="legal-link">Accessibility</Link>
            </div>
          </div>

          <div className="bottom-right">
            <div className="trust-badges">
              <div className="trust-badge">
                <Shield size={16} />
                <span>HIPAA Compliant</span>
              </div>
              <div className="trust-badge">
                <Award size={16} />
                <span>Licensed Therapists</span>
              </div>
              <div className="trust-badge">
                <Users size={16} />
                <span>Peer Reviewed</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll to Top Button */}
      <motion.button
        className="scroll-to-top"
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowUp size={20} />
      </motion.button>

      {/* Crisis Help Banner */}
      <motion.div 
        className="crisis-banner"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <div className="crisis-content">
          <div className="crisis-info">
            <h3>Need Immediate Help?</h3>
            <p>If you're in crisis, call the National Suicide Prevention Lifeline at 988 or text HOME to 741741</p>
          </div>
          <motion.button 
            className="crisis-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Help Now
          </motion.button>
        </div>
      </motion.div>
    </footer>
  );
}

export default Footer;