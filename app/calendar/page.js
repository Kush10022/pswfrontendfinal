"use client";
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styling
import "../../styling/calendar.css"; // Import custom CSS
import Cookies from 'js-cookie';

const PswAvailabilityCalendar = () => {
  const [bookOffDates, setBookOffDates] = useState([]);  // Booked off dates
  const [availableDays, setAvailableDays] = useState([]); // Available days from backend
  const [isSubmitVisible, setIsSubmitVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track submission

  // Convert date to a simpler string format (just day, month, year)
  const formatDate = (date) => {
    return date.toISOString().split('T')[0]; // This gives yyyy-mm-dd format without time
  };

  // Fetch available and booked-off dates from the backend when the component mounts
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/private/user/calendar`, { 
          method: 'GET', 
          headers: { 
            'Authorization': `JWT ${Cookies.get('authToken')}` 
          } 
        });
        const data = await response.json();
        // Set booked-off dates and available dates from the response
        setBookOffDates(data.bookOffDates || []);
        setAvailableDays(data.availableDays || []);
      } catch (error) {
        console.error('Error fetching booked-off dates:', error);
      }
    };

    fetchAvailability();
  }, []);

  // Show submit button if at least one date is selected
  useEffect(() => {
    setIsSubmitVisible(bookOffDates.length > 0);
  }, [bookOffDates]);

  // Handle selecting a new date
  const handleDateChange = (date) => {
    const dateString = formatDate(date);
    if (!bookOffDates.includes(dateString)) {
      setBookOffDates([...bookOffDates, dateString]);
      setAvailableDays(availableDays.filter((d) => d !== dateString)); // Remove the date from availableDays
    } else {
      alert('This day is already booked off.');
    }
  };

  // Handle removing a booked-off date
  const handleRemoveBookOffDate = (dateToRemove) => {
    if (!isSubmitted) { // Prevent removal if dates have been submitted
      setBookOffDates(bookOffDates.filter((date) => date !== dateToRemove));
      setAvailableDays([...availableDays, dateToRemove]); // Add the date back to availableDays
    }
  };

  // Handle submitting the booked-off dates to the backend
  const handleSubmit = async () => {
    console.log('Submitting available days:', availableDays);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/private/user/calendar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${Cookies.get('authToken')}`,
        },
        body: JSON.stringify({ availableDays }),
      });

      if (!response.ok) {
        throw new Error('Failed to update booked-off dates');
      } else {
        setIsSubmitted(true); // Set the submitted state to true
        alert('Dates successfully submitted.');
      }
    } catch (error) {
      console.error('Error updating booked-off dates:', error);
    }
  };

  // Disable past dates, already booked-off dates, and dates not available
  const disableTile = ({ date }) => {
    const today = formatDate(new Date());
    const oneMonthAhead = new Date();
    oneMonthAhead.setMonth(oneMonthAhead.getMonth() + 1);
    const dateString = formatDate(date);

    return (
      dateString < today || 
      dateString > formatDate(oneMonthAhead) || 
      bookOffDates.includes(dateString) ||  // Disable already booked-off dates
      !availableDays.includes(dateString)   // Disable days not available
    );
  };

  // Initialize calendar and populate available days within the current month
  const initializeCalendar = ({ activeStartDate }) => {
    const today = formatDate(new Date());
    let startOfMonth = new Date(activeStartDate);
    let endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);
    let tempAvailableDates = [];
    
    for (let d = startOfMonth; d <= endOfMonth; d.setDate(d.getDate() + 1)) {
      let dateString = formatDate(new Date(d));
      if (dateString >= today && !bookOffDates.includes(dateString)) {
        tempAvailableDates.push(dateString);
      }
    }
    
    setAvailableDays(tempAvailableDates);
  };

  useEffect(() => {
    const today = new Date();
    initializeCalendar({ activeStartDate: today });
  }, []);

  return (
    <div className="calendar-container">
      <h2 className="calendar-heading">Select Days to Book Off</h2>
      <Calendar
        onClickDay={handleDateChange}
        tileDisabled={disableTile}
        onActiveStartDateChange={initializeCalendar}
        minDetail="month"
        maxDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}
      />
      <h3 className="booked-off-heading">Booked Off Dates:</h3>
      <ul className="booked-off-list">
        {bookOffDates.length === 0 ? (
          <li className="booked-off-item">None</li>
        ) : (
          bookOffDates.map((date, index) => (
            <li key={index} className="booked-off-item">
              {date}
              <button
                className="remove-bookoff-btn"
                onClick={() => handleRemoveBookOffDate(date)}
                disabled={isSubmitted} // Disable remove button if dates are submitted
              >
                Remove
              </button>
            </li>
          ))
        )}
      </ul>

      {isSubmitVisible && (
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      )}
    </div>
  );
};

export default PswAvailabilityCalendar;
