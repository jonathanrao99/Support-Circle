import React, { useState, useEffect } from 'react';

function DateSelection({ selectedDate, setSelectedDate, resetSelections }) {
  const [dates, setDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated API call to fetch available dates
  useEffect(() => {
    // Replace with actual API call to fetch dates
    // Example API call: axios.get('/api/available-dates')
    const fetchData = async () => {
      try {
        // Simulate a delay to mimic network latency
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Replace with actual data fetched from the API
        const fetchedDates = [
          { id: 1, date: '2023-10-10' },
          { id: 2, date: '2023-10-11' },
          { id: 3, date: '2023-10-12' },
        ];

        setDates(fetchedDates);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dates:', error);
      }
    };

    fetchData();
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="date-selection">
      <h2>Select a Date</h2>
      
      {isLoading ? (
        <p>Loading dates...</p>
      ) : (
        <ul style={{ listStyle: 'none' }}>
          {dates.map((date) => (
            <li
              key={date.id}
              className={selectedDate === date ? 'selected' : ''}
              onClick={() => handleDateSelect(date)}
            >
              {date.date}
            </li>
          ))}
        </ul>
      )}

      <button onClick={resetSelections}>Back</button>
    </div>
  );
}

export default DateSelection;

