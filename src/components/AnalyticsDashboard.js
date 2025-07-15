import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  UsersIcon, 
  ClockIcon, 
  HeartIcon,
  TrendingUpIcon,
  CalendarIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    activeSessions: 0,
    totalSessions: 0,
    averageSessionTime: 0,
    satisfactionRate: 0,
    monthlyGrowth: 0,
    topIssues: [],
    userDemographics: {},
    realTimeData: []
  });

  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate real-time data updates
  useEffect(() => {
    const generateMockData = () => {
      const baseUsers = 1247;
      const baseSessions = 89;
      
      return {
        totalUsers: baseUsers + Math.floor(Math.random() * 50),
        activeSessions: Math.floor(Math.random() * 20) + 5,
        totalSessions: baseSessions + Math.floor(Math.random() * 10),
        averageSessionTime: Math.floor(Math.random() * 30) + 45,
        satisfactionRate: Math.floor(Math.random() * 20) + 80,
        monthlyGrowth: Math.floor(Math.random() * 15) + 8,
        topIssues: [
          { name: 'Anxiety', count: Math.floor(Math.random() * 100) + 150, percentage: 35 },
          { name: 'Depression', count: Math.floor(Math.random() * 80) + 120, percentage: 28 },
          { name: 'Stress', count: Math.floor(Math.random() * 60) + 90, percentage: 22 },
          { name: 'Grief', count: Math.floor(Math.random() * 40) + 60, percentage: 15 }
        ],
        userDemographics: {
          ageGroups: {
            '18-25': Math.floor(Math.random() * 20) + 30,
            '26-35': Math.floor(Math.random() * 25) + 35,
            '36-45': Math.floor(Math.random() * 15) + 20,
            '46+': Math.floor(Math.random() * 10) + 15
          },
          gender: {
            'Female': Math.floor(Math.random() * 20) + 60,
            'Male': Math.floor(Math.random() * 15) + 25,
            'Other': Math.floor(Math.random() * 5) + 15
          }
        },
        realTimeData: Array.from({ length: 24 }, (_, i) => ({
          hour: i,
          sessions: Math.floor(Math.random() * 10) + 2,
          users: Math.floor(Math.random() * 20) + 5
        }))
      };
    };

    // Initial load
    setAnalytics(generateMockData());
    setIsLoading(false);

    // Real-time updates every 30 seconds
    const interval = setInterval(() => {
      setAnalytics(prev => ({
        ...prev,
        activeSessions: Math.floor(Math.random() * 20) + 5,
        realTimeData: prev.realTimeData.map(item => ({
          ...item,
          sessions: Math.floor(Math.random() * 10) + 2,
          users: Math.floor(Math.random() * 20) + 5
        }))
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, change }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <TrendingUpIcon className={`h-4 w-4 ${change > 0 ? 'text-success-500' : 'text-error-500'}`} />
              <span className={`text-sm ml-1 ${change > 0 ? 'text-success-600' : 'text-error-600'}`}>
                {change > 0 ? '+' : ''}{change}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  const ChartBar = ({ value, max, label, color }) => (
    <div className="flex items-center space-x-3 mb-4">
      <div className="w-24 text-sm text-gray-600">{label}</div>
      <div className="flex-1 bg-gray-200 rounded-full h-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`h-3 rounded-full ${color}`}
        />
      </div>
      <div className="w-16 text-sm font-medium text-gray-900">{value}</div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-3 text-gray-600">Loading analytics...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Real-time insights into support platform usage</p>
        </div>
        <div className="flex space-x-2">
          {['24h', '7d', '30d', '90d'].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedTimeframe === timeframe
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={analytics.totalUsers.toLocaleString()}
          icon={UsersIcon}
          color="bg-primary-500"
          change={analytics.monthlyGrowth}
        />
        <StatCard
          title="Active Sessions"
          value={analytics.activeSessions}
          icon={ClockIcon}
          color="bg-secondary-500"
        />
        <StatCard
          title="Total Sessions"
          value={analytics.totalSessions.toLocaleString()}
          icon={ChartBarIcon}
          color="bg-success-500"
        />
        <StatCard
          title="Satisfaction Rate"
          value={`${analytics.satisfactionRate}%`}
          icon={HeartIcon}
          color="bg-warning-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Issues Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Support Issues</h3>
          {analytics.topIssues.map((issue, index) => (
            <ChartBar
              key={issue.name}
              label={issue.name}
              value={issue.count}
              max={Math.max(...analytics.topIssues.map(i => i.count))}
              color={`bg-gradient-to-r ${index === 0 ? 'from-primary-500 to-primary-600' : 
                     index === 1 ? 'from-secondary-500 to-secondary-600' :
                     index === 2 ? 'from-success-500 to-success-600' :
                     'from-warning-500 to-warning-600'}`}
            />
          ))}
        </motion.div>

        {/* User Demographics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Demographics</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-3">Age Groups</h4>
              {Object.entries(analytics.userDemographics.ageGroups).map(([age, percentage]) => (
                <ChartBar
                  key={age}
                  label={age}
                  value={percentage}
                  max={100}
                  color="bg-primary-500"
                />
              ))}
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-3">Gender Distribution</h4>
              {Object.entries(analytics.userDemographics.gender).map(([gender, percentage]) => (
                <ChartBar
                  key={gender}
                  label={gender}
                  value={percentage}
                  max={100}
                  color="bg-secondary-500"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Real-time Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Real-time Activity (24h)</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Sessions</span>
            <div className="w-3 h-3 bg-secondary-500 rounded-full ml-4"></div>
            <span className="text-sm text-gray-600">Users</span>
          </div>
        </div>
        
        <div className="h-64 flex items-end space-x-2">
          {analytics.realTimeData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center space-y-2">
              <div className="flex flex-col space-y-1 w-full">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.sessions / 12) * 100}%` }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-primary-500 rounded-t"
                />
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.users / 25) * 100}%` }}
                  transition={{ duration: 0.5, delay: index * 0.05 + 0.1 }}
                  className="bg-secondary-500 rounded-t"
                />
              </div>
              <span className="text-xs text-gray-500">{data.hour}:00</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-6 text-white"
      >
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors">
            <CalendarIcon className="h-6 w-6" />
            <span>Schedule Report</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors">
            <GlobeAltIcon className="h-6 w-6" />
            <span>Export Data</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors">
            <DevicePhoneMobileIcon className="h-6 w-6" />
            <span>Mobile View</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;