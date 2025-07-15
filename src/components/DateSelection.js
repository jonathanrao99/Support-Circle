import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

function DateSelection({ selectedDate, setSelectedDate, resetSelections }) {
  const [dates, setDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate available dates for the next 30 days
  const generateAvailableDates = () => {
    const availableDates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends (Saturday = 6, Sunday = 0)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        availableDates.push({
          id: i,
          date: date.toISOString().split('T')[0],
          dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
          dayNumber: date.getDate(),
          month: date.toLocaleDateString('en-US', { month: 'short' }),
          fullDate: date
        });
      }
    }
    
    return availableDates;
  };

  // Simulated API call to fetch available dates
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Simulate a delay to mimic network latency
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        const fetchedDates = generateAvailableDates();
        setDates(fetchedDates);
      } catch (error) {
        console.error('Error fetching dates:', error);
        toast.error('Failed to load available dates. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    toast.success(`Selected ${date.dayName}, ${date.month} ${date.dayNumber}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="card max-w-2xl mx-auto">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-3 text-gray-600">Loading available dates...</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card max-w-2xl mx-auto"
    >
      <div className="flex items-center justify-center mb-6">
        <CalendarIcon className="h-6 w-6 text-primary-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900 font-display">
          Select a Date
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {dates.map((date) => (
          <motion.button
            key={date.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleDateSelect(date)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
              selectedDate && selectedDate.id === date.id
                ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-md'
                : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-25 text-gray-700'
            }`}
          >
            <div className="text-sm font-medium text-gray-500 mb-1">
              {date.dayName}
            </div>
            <div className="text-xl font-bold">
              {date.dayNumber}
            </div>
            <div className="text-sm text-gray-600">
              {date.month}
            </div>
          </motion.button>
        ))}
      </div>

      {dates.length === 0 && (
        <div className="text-center py-8">
          <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No available dates found.</p>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          onClick={resetSelections}
          className="btn-outline"
        >
          Back
        </button>
      </div>
    </motion.div>
  );
}

export default DateSelection;

