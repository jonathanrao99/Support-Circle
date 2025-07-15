import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  TrendingUp,
  Users,
  Calendar,
  Target,
  Award,
  Activity,
  Heart,
  Clock
} from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 50]);
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const stats = [
    { 
      title: "Recovery Streak", 
      value: "45 days", 
      icon: TrendingUp, 
      color: "#10b981",
      change: "+12%"
    },
    { 
      title: "Community Support", 
      value: "127", 
      icon: Users, 
      color: "#3b82f6",
      change: "+8%"
    },
    { 
      title: "Therapy Sessions", 
      value: "23", 
      icon: Calendar, 
      color: "#8b5cf6",
      change: "+15%"
    },
    { 
      title: "Goals Achieved", 
      value: "8/12", 
      icon: Target, 
      color: "#f59e0b",
      change: "+3"
    }
  ];

  const progressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Mood Score',
        data: [65, 72, 68, 75, 82, 88],
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Anxiety Level',
        data: [45, 38, 42, 35, 28, 22],
        borderColor: '#f093fb',
        backgroundColor: 'rgba(240, 147, 251, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const achievements = [
    { name: "First Step", description: "Completed first therapy session", icon: Award, earned: true },
    { name: "Community Helper", description: "Helped 5 other members", icon: Heart, earned: true },
    { name: "Consistency", description: "30-day streak", icon: Activity, earned: true },
    { name: "Milestone", description: "100 days sober", icon: Target, earned: false },
    { name: "Mentor", description: "Become a peer mentor", icon: Users, earned: false }
  ];

  const recentActivity = [
    { type: "therapy", text: "Completed session with Dr. Smith", time: "2 hours ago" },
    { type: "community", text: "Replied to Sarah's post", time: "4 hours ago" },
    { type: "goal", text: "Achieved daily meditation goal", time: "1 day ago" },
    { type: "resource", text: "Read article on coping strategies", time: "2 days ago" }
  ];

  return (
    <motion.div 
      className="dashboard-container"
      style={{ y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="dashboard-header">
        <motion.h1 
          className="dashboard-title"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Your Recovery Dashboard
        </motion.h1>
        <p className="dashboard-subtitle">
          Track your progress, celebrate achievements, and stay motivated on your journey
        </p>
      </div>

      {/* Stats Grid */}
      <motion.div 
        className="stats-grid"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="stat-icon" style={{ backgroundColor: stat.color + '20' }}>
              <stat.icon size={24} color={stat.color} />
            </div>
            <div className="stat-content">
              <h3 className="stat-title">{stat.title}</h3>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-change positive">{stat.change}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Progress Chart */}
      <motion.div 
        ref={ref}
        className="chart-section"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">Progress Overview</h2>
        <div className="chart-container" style={{ height: '300px' }}>
          <Line data={progressData} options={chartOptions} />
        </div>
      </motion.div>

      {/* Achievements and Activity */}
      <div className="dashboard-bottom">
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
                key={index}
                className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div className="achievement-icon">
                  <achievement.icon size={24} />
                </div>
                <div className="achievement-content">
                  <h3 className="achievement-name">{achievement.name}</h3>
                  <p className="achievement-description">{achievement.description}</p>
                </div>
                {achievement.earned && (
                  <div className="achievement-badge">
                    <Award size={16} />
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
                  {activity.type === 'therapy' && <Calendar size={16} />}
                  {activity.type === 'community' && <Users size={16} />}
                  {activity.type === 'goal' && <Target size={16} />}
                  {activity.type === 'resource' && <Activity size={16} />}
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
    </motion.div>
  );
}

export default Dashboard;