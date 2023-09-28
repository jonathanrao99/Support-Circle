import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import DateSelection from './DateSelection';
import TimeSlotSelection from './TimeSlotSelection';

function Drug() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  // Initialize useNavigate to get the navigate function
  const navigate = useNavigate();

  const resetSelections = () => {
    setSelectedDate(null);
    setSelectedTimeSlot(null);
  };

  const handleBook = () => {
    // Perform the booking action here (e.g., API request to book the appointment).

    // After booking is confirmed, navigate to the next page.
    navigate('/Confirmation?room=DrugAddict'); // Replace '/Confirmation' with the actual path to the confirmation page.
  };

  return (
    <div className="booking-page">
      <h1>Book Your Appointment</h1>

      <DateSelection
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        resetSelections={resetSelections}
      />

      {selectedDate && (
        <TimeSlotSelection
          selectedDate={selectedDate}
          selectedTimeSlot={selectedTimeSlot}
          setSelectedTimeSlot={setSelectedTimeSlot}
          resetSelections={resetSelections}
        />
      )}

      {selectedTimeSlot && (
        <button onClick={handleBook} className="book-button">
          Book Now
        </button>
      )}
    </div>
  );
}

export default Drug;
