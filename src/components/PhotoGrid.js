import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ArrowRight, Users, Heart, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import 'react-lazy-load-image-component/src/effects/blur.css';

function PhotoGrid() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const services = [
    { 
      id: 1, 
      src: '1.jpg', 
      alt: 'Addiction & Recovery', 
      title: 'Addiction & Recovery',
      description: 'Professional support for addiction recovery with evidence-based approaches.',
      icon: Shield,
      url: '/addiction',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    { 
      id: 2, 
      src: '2.jpg', 
      alt: 'Cancer Support', 
      title: 'Cancer Support',
      description: 'Compassionate care and emotional support for cancer patients and families.',
      icon: Heart,
      url: '/cancer',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    { 
      id: 3, 
      src: '3.jpg', 
      alt: 'Self Harm Prevention', 
      title: 'Self Harm Prevention',
      description: 'Safe space for healing and developing healthy coping mechanisms.',
      icon: Shield,
      url: '/self-harm',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    { 
      id: 4, 
      src: '4.jpg', 
      alt: 'LGBTQ+ Community', 
      title: 'LGBTQ+ Community',
      description: 'Inclusive support groups and resources for the LGBTQ+ community.',
      icon: Users,
      url: '/lgbtq',
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    { 
      id: 5, 
      src: '5.jpg', 
      alt: 'Social Anxiety', 
      title: 'Social Anxiety',
      description: 'Overcome social anxiety with proven techniques and peer support.',
      icon: Heart,
      url: '/social-anxiety',
      color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    { 
      id: 6, 
      src: '6.jpg', 
      alt: 'Grief & Loss', 
      title: 'Grief & Loss',
      description: 'Navigate the difficult journey of grief with compassionate guidance.',
      icon: Heart,
      url: '/grief-loss',
      color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <motion.div 
      ref={ref}
      className="services-grid"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {services.map((service, index) => (
        <motion.div
          key={service.id}
          className="service-card"
          variants={itemVariants}
          whileHover={{ 
            y: -10,
            transition: { duration: 0.3 }
          }}
        >
          <Link to={service.url} className="service-link">
            <div className="service-image-container">
              <LazyLoadImage
                src={service.src}
                alt={service.alt}
                effect="blur"
                className="service-image"
                placeholderSrc={`${service.src}?w=50&h=50&blur=10`}
              />
              <div 
                className="service-overlay"
                style={{ background: service.color }}
              >
                <service.icon size={32} className="service-icon" />
              </div>
            </div>
            
            <div className="service-content">
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              
              <motion.div 
                className="service-cta"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span>Learn More</span>
                <ArrowRight size={16} />
              </motion.div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default PhotoGrid;