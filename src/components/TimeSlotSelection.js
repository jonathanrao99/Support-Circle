import React, { useState } from 'react';

function TimeSlotSelection({ selectedDate, setSelectedTimeSlot, resetSelections }) {
  const [timeSlots, setTimeSlots] = useState([
    { id: 1, startTime: '10:00 AM', endTime: '11:30 AM' },
    { id: 2, startTime: '12:00 PM', endTime: '01:30 PM' },
    { id: 3, startTime: '03:00 PM', endTime: '04:30 PM' },
  ]);

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  return (
    <div className="time-slot-selection">
      <h2>Select a Time Slot</h2>
      <ul style={{ listStyle: 'none' }}>
        {timeSlots.map((timeSlot) => (
          <li
            key={timeSlot.id}
            onClick={() => handleTimeSlotSelect(timeSlot)}
            className={
              selectedDate &&
              selectedDate.startTime === timeSlot.startTime &&
              selectedDate.endTime === timeSlot.endTime
                ? 'selected'
                : ''
            }
          >
            {timeSlot.startTime} - {timeSlot.endTime}
          </li>
        ))}
      </ul>
      <button onClick={() => resetSelections()}>Back to Date Selection</button>
    </div>
  );
}

export default TimeSlotSelection;
