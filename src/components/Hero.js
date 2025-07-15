import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { 
  Heart, 
  Users, 
  Shield, 
  Clock, 
  ArrowRight, 
  Play,
  Star,
  MessageCircle
} from 'lucide-react';
import PhotoGrid from './PhotoGrid';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const stats = [
    { icon: Users, number: "10K+", label: "Community Members" },
    { icon: Heart, number: "95%", label: "Success Rate" },
    { icon: Shield, number: "24/7", label: "Support Available" },
    { icon: Clock, number: "500+", label: "Hours of Therapy" }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      text: "Support Circle changed my life. The community is incredibly supportive.",
      rating: 5
    },
    {
      name: "Michael R.",
      text: "Professional, caring, and effective. Highly recommend!",
      rating: 5
    },
    {
      name: "Emma L.",
      text: "Found hope and strength through this amazing platform.",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="hero-container">
      {/* Hero Section */}
      <motion.section 
        className="hero"
        style={{ y, opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="hero-title">
              Your Journey to Recovery
              <span className="gradient-text"> Starts Here</span>
            </h1>
            <p className="hero-subtitle">
              Join thousands of people who have found hope, support, and healing 
              through our compassionate community and professional therapy services.
            </p>
            
            <div className="hero-actions">
              <motion.button 
                className="cta-button primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Today
                <ArrowRight size={20} />
              </motion.button>
              
              <motion.button 
                className="cta-button secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={20} />
                Watch Our Story
              </motion.button>
            </div>

            <div className="hero-stats">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <stat.icon size={24} className="stat-icon" />
                  <div className="stat-content">
                    <span className="stat-number">{stat.number}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="hero-image-container">
              <LazyLoadImage
                src="/hero-image.jpg"
                alt="Support Circle Community"
                effect="blur"
                className="hero-image"
                placeholderSrc="/hero-image-placeholder.jpg"
              />
              <div className="floating-card">
                <div className="card-content">
                  <Users size={20} />
                  <span>Join 10K+ members</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        ref={ref}
        className="testimonials-section"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            What Our Community Says
          </motion.h2>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={`testimonial-card ${index === currentSlide ? 'active' : ''}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <div className="testimonial-content">
                  <div className="stars">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="gold" />
                    ))}
                  </div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <MessageCircle size={16} />
                    <span>{testimonial.name}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Grid */}
      <motion.section 
        className="services-section"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Support Services
          </motion.h2>
          <PhotoGrid />
        </div>
      </motion.section>
    </div>
  );
}

export default Hero;