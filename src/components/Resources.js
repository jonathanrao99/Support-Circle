import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Play, 
  Download, 
  Heart, 
  Share2, 
  Clock,
  Star,
  Users,
  Calendar,
  ArrowRight,
  Bookmark,
  Tag,
  Eye,
  ThumbsUp
} from 'lucide-react';

function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [favorites, setFavorites] = useState([]);
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const categories = [
    { id: 'all', name: 'All Categories', icon: '📚' },
    { id: 'addiction', name: 'Addiction Recovery', icon: '🫂' },
    { id: 'anxiety', name: 'Anxiety & Stress', icon: '🧘' },
    { id: 'depression', name: 'Depression', icon: '💙' },
    { id: 'grief', name: 'Grief & Loss', icon: '🕊️' },
    { id: 'mindfulness', name: 'Mindfulness', icon: '🌿' },
    { id: 'relationships', name: 'Relationships', icon: '💕' },
    { id: 'self-care', name: 'Self-Care', icon: '✨' }
  ];

  const resourceTypes = [
    { id: 'all', name: 'All Types', icon: '📄' },
    { id: 'article', name: 'Articles', icon: '📖' },
    { id: 'video', name: 'Videos', icon: '🎥' },
    { id: 'podcast', name: 'Podcasts', icon: '🎧' },
    { id: 'worksheet', name: 'Worksheets', icon: '📝' },
    { id: 'meditation', name: 'Meditations', icon: '🧘‍♀️' }
  ];

  const resources = [
    {
      id: 1,
      title: "Understanding Addiction: A Comprehensive Guide",
      description: "Learn about the science behind addiction, common triggers, and evidence-based recovery strategies.",
      category: "addiction",
      type: "article",
      duration: "15 min read",
      rating: 4.8,
      views: 1247,
      likes: 89,
      author: "Dr. Sarah Johnson",
      date: "2024-01-15",
      tags: ["addiction", "recovery", "science"],
      image: "📚",
      featured: true
    },
    {
      id: 2,
      title: "Mindfulness Meditation for Beginners",
      description: "A step-by-step guide to starting your mindfulness practice with guided meditations.",
      category: "mindfulness",
      type: "meditation",
      duration: "20 min",
      rating: 4.9,
      views: 2156,
      likes: 156,
      author: "Emma Davis",
      date: "2024-01-12",
      tags: ["mindfulness", "meditation", "beginners"],
      image: "🧘‍♀️",
      featured: true
    },
    {
      id: 3,
      title: "Coping with Anxiety: Practical Strategies",
      description: "Discover effective techniques to manage anxiety in daily life with real-world examples.",
      category: "anxiety",
      type: "video",
      duration: "12 min",
      rating: 4.7,
      views: 1893,
      likes: 134,
      author: "Dr. Michael Chen",
      date: "2024-01-10",
      tags: ["anxiety", "coping", "strategies"],
      image: "🎥",
      featured: false
    },
    {
      id: 4,
      title: "Building Healthy Relationships",
      description: "Learn communication skills and boundary-setting techniques for healthier relationships.",
      category: "relationships",
      type: "article",
      duration: "10 min read",
      rating: 4.6,
      views: 987,
      likes: 67,
      author: "Dr. Lisa Rodriguez",
      date: "2024-01-08",
      tags: ["relationships", "communication", "boundaries"],
      image: "📖",
      featured: false
    },
    {
      id: 5,
      title: "Daily Self-Care Checklist",
      description: "A printable worksheet to track your daily self-care activities and build healthy habits.",
      category: "self-care",
      type: "worksheet",
      duration: "5 min",
      rating: 4.5,
      views: 756,
      likes: 45,
      author: "Wellness Team",
      date: "2024-01-05",
      tags: ["self-care", "worksheet", "habits"],
      image: "📝",
      featured: false
    },
    {
      id: 6,
      title: "The Science of Happiness",
      description: "Explore the psychology behind happiness and learn evidence-based practices to increase joy.",
      category: "mindfulness",
      type: "podcast",
      duration: "45 min",
      rating: 4.8,
      views: 3421,
      likes: 234,
      author: "Dr. James Wilson",
      date: "2024-01-03",
      tags: ["happiness", "psychology", "science"],
      image: "🎧",
      featured: true
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const sortedResources = [...filteredResources].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.date) - new Date(a.date);
      case 'popular':
        return b.views - a.views;
      case 'rating':
        return b.rating - a.rating;
      case 'duration':
        return a.duration.localeCompare(b.duration);
      default:
        return 0;
    }
  });

  const toggleFavorite = (resourceId) => {
    setFavorites(prev => 
      prev.includes(resourceId) 
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'video': return <Play size={20} />;
      case 'podcast': return <Play size={20} />;
      case 'meditation': return <Play size={20} />;
      case 'worksheet': return <Download size={20} />;
      default: return <BookOpen size={20} />;
    }
  };

  return (
    <motion.div 
      className="resources-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="resources-header">
        <motion.h1 
          className="resources-title"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Educational Resources
        </motion.h1>
        <p className="resources-subtitle">
          Discover evidence-based articles, videos, and tools to support your recovery journey
        </p>
      </div>

      {/* Search and Filters */}
      <motion.div 
        className="search-filters-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="search-container">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-container">
          <div className="filter-group">
            <label>Category:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Type:</label>
            <select 
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              {resourceTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.icon} {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="duration">Duration</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Featured Resources */}
      {searchTerm === '' && selectedCategory === 'all' && selectedType === 'all' && (
        <motion.section 
          className="featured-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="section-title">Featured Resources</h2>
          <div className="featured-grid">
            {resources.filter(r => r.featured).map((resource, index) => (
              <motion.div
                key={resource.id}
                className="featured-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="featured-image">
                  <span className="resource-emoji">{resource.image}</span>
                  <div className="featured-badge">Featured</div>
                </div>
                <div className="featured-content">
                  <div className="resource-meta">
                    <span className="resource-category">{resource.category}</span>
                    <span className="resource-duration">{resource.duration}</span>
                  </div>
                  <h3 className="resource-title">{resource.title}</h3>
                  <p className="resource-description">{resource.description}</p>
                  <div className="resource-stats">
                    <span><Star size={16} fill="gold" /> {resource.rating}</span>
                    <span><Eye size={16} /> {resource.views}</span>
                    <span><ThumbsUp size={16} /> {resource.likes}</span>
                  </div>
                  <div className="resource-actions">
                    <motion.button 
                      className="action-btn primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {getResourceIcon(resource.type)}
                      Start Learning
                    </motion.button>
                    <motion.button 
                      className={`action-btn ${favorites.includes(resource.id) ? 'favorited' : ''}`}
                      onClick={() => toggleFavorite(resource.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* All Resources */}
      <motion.section 
        ref={ref}
        className="resources-section"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="section-header">
          <h2 className="section-title">
            {searchTerm ? `Search Results (${sortedResources.length})` : 'All Resources'}
          </h2>
          <span className="results-count">{sortedResources.length} resources found</span>
        </div>

        <div className="resources-grid">
          <AnimatePresence>
            {sortedResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                className="resource-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="resource-header">
                  <div className="resource-type-icon">
                    {getResourceIcon(resource.type)}
                  </div>
                  <div className="resource-meta">
                    <span className="resource-category">{resource.category}</span>
                    <span className="resource-duration">{resource.duration}</span>
                  </div>
                  <motion.button 
                    className={`favorite-btn ${favorites.includes(resource.id) ? 'favorited' : ''}`}
                    onClick={() => toggleFavorite(resource.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart size={16} />
                  </motion.button>
                </div>

                <div className="resource-content">
                  <h3 className="resource-title">{resource.title}</h3>
                  <p className="resource-description">{resource.description}</p>
                  
                  <div className="resource-tags">
                    {resource.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span key={tagIndex} className="resource-tag">
                        <Tag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="resource-stats">
                    <span><Star size={14} fill="gold" /> {resource.rating}</span>
                    <span><Eye size={14} /> {resource.views}</span>
                    <span><ThumbsUp size={14} /> {resource.likes}</span>
                  </div>

                  <div className="resource-footer">
                    <div className="resource-author">
                      <span>By {resource.author}</span>
                      <span className="resource-date">
                        <Calendar size={12} />
                        {new Date(resource.date).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="resource-actions">
                      <motion.button 
                        className="action-btn primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {getResourceIcon(resource.type)}
                        Start
                      </motion.button>
                      <motion.button 
                        className="action-btn secondary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Share2 size={16} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {sortedResources.length === 0 && (
          <motion.div 
            className="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BookOpen size={64} />
            <h3>No resources found</h3>
            <p>Try adjusting your search terms or filters</p>
          </motion.div>
        )}
      </motion.section>
    </motion.div>
  );
}

export default Resources;