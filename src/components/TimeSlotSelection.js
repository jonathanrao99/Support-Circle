import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClockIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

function TimeSlotSelection({ selectedDate, selectedTimeSlot, setSelectedTimeSlot, resetSelections }) {
  const [timeSlots, setTimeSlots] = useState([
    { id: 1, startTime: '09:00', endTime: '10:30', displayStart: '9:00 AM', displayEnd: '10:30 AM' },
    { id: 2, startTime: '11:00', endTime: '12:30', displayStart: '11:00 AM', displayEnd: '12:30 PM' },
    { id: 3, startTime: '14:00', endTime: '15:30', displayStart: '2:00 PM', displayEnd: '3:30 PM' },
    { id: 4, startTime: '16:00', endTime: '17:30', displayStart: '4:00 PM', displayEnd: '5:30 PM' },
    { id: 5, startTime: '18:00', endTime: '19:30', displayStart: '6:00 PM', displayEnd: '7:30 PM' },
  ]);

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    toast.success(`Selected ${timeSlot.displayStart} - ${timeSlot.displayEnd}`);
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return '';
    return `${selectedDate.dayName}, ${selectedDate.month} ${selectedDate.dayNumber}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card max-w-2xl mx-auto"
    >
      <div className="flex items-center justify-center mb-6">
        <ClockIcon className="h-6 w-6 text-primary-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900 font-display">
          Select a Time Slot
        </h2>
      </div>

      {selectedDate && (
        <div className="mb-6 p-4 bg-primary-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Selected Date:</p>
          <p className="text-lg font-semibold text-primary-700">
            {formatSelectedDate()}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {timeSlots.map((timeSlot) => (
          <motion.button
            key={timeSlot.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleTimeSlotSelect(timeSlot)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
              selectedTimeSlot && selectedTimeSlot.id === timeSlot.id
                ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-md'
                : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-25 text-gray-700'
            }`}
          >
            <div className="text-lg font-semibold">
              {timeSlot.displayStart}
            </div>
            <div className="text-sm text-gray-500">to</div>
            <div className="text-lg font-semibold">
              {timeSlot.displayEnd}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {timeSlot.endTime - timeSlot.startTime} hour session
            </div>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={resetSelections}
          className="btn-outline"
        >
          Back to Date Selection
        </button>
      </div>
    </motion.div>
  );
}

export default TimeSlotSelection;
