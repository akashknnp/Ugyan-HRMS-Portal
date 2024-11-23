import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../Holidays.css';

const Holidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [activeDate, setActiveDate] = useState(new Date()); // Tracks the displayed month/year
  const [holidayName, setHolidayName] = useState('');
  const [holidayDate, setHolidayDate] = useState('');

  // Function to get the general holidays for the active year
  const getPredefinedHolidays = (year) => {
    return [
      { name: "New Year's Day", date: `${year}-01-01` },
      { name: 'Independence Day', date: `${year}-07-15` },
      { name: 'Christmas Day', date: `${year}-12-25` },
    ];
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}calender/holidays/`);
    const data = await response.json();
    setHolidays(data);
  };

  const addHoliday = async (event) => {
    event.preventDefault();
    const holidayData = {
      name: holidayName,
      date: holidayDate,
    };
    const response = await fetch(`${import.meta.env.VITE_API_URL}calender/holidays/add/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(holidayData),
    });

    if (response.ok) {
      fetchHolidays(); // Refresh the list of holidays
      setHolidayName('');
      setHolidayDate('');
    }
  };

  const deleteHoliday = async (holiday_id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}calender/holidays/delete/${holiday_id}/`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchHolidays(); // Refresh the list of holidays
    } else {
      alert('Failed to delete holiday');
    }
  };

  // Function to check if a date is a holiday by comparing the date strings (YYYY-MM-DD)
  const isHoliday = (date) => {
    // Format the date as 'YYYY-MM-DD' without time zone issues
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  
    // Check if the date is in the predefined holidays
    const predefinedHolidays = getPredefinedHolidays(date.getFullYear());
    const isPredefinedHoliday = predefinedHolidays.some(
      (holiday) => holiday.date === formattedDate
    );
  
    // Check if the date is in the user-defined holidays
    const isUserDefinedHoliday = holidays.some(
      (holiday) => holiday.date === formattedDate
    );
  
    return isPredefinedHoliday || isUserDefinedHoliday;
  };
  
  
  
  const tileClassName = ({ date }) => {
    return isHoliday(date) ? 'holiday' : null;
  };

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setActiveDate(activeStartDate);
  };

  const getHolidaysForMonth = () => {
    const month = activeDate.getMonth();
    const year = activeDate.getFullYear();

    // Get all holidays for the active year
    const predefinedHolidays = getPredefinedHolidays(year);
    const allHolidays = [...predefinedHolidays, ...holidays];
    return allHolidays.filter((holiday) => {
      const holidayDate = new Date(holiday.date);
      return holidayDate.getMonth() === month && holidayDate.getFullYear() === year;
    });
  };

  const activeMonthHolidays = getHolidaysForMonth();

  return (
    <div className='background-div-holidays'>
      <div className='calender-table'>
        <div className='calender-container-add-holiday'>
          {/* <h1>Holiday Calendar</h1> */}
          <form onSubmit={addHoliday} className='input-holiday-detail'>
            <h1>Add Holidays</h1>
            <input
              type="text"
              placeholder="Holiday Name"
              value={holidayName}
              onChange={(e) => setHolidayName(e.target.value)}
              required
            />
            <input
              type="date"
              value={holidayDate}
              onChange={(e) => setHolidayDate(e.target.value)}
              required
            />
            <button type="submit">Add Holiday</button>
          </form>
          <Calendar
            onChange={setActiveDate}
            onActiveStartDateChange={handleActiveStartDateChange}
            value={activeDate}
            tileClassName={tileClassName}
            className="Calendar-view"
          />
        </div>
        <div className='holiday-view-table'>
          <div className='month-holidays'>
            <h2>Holidays in {activeDate.toLocaleString('default', { month: 'long' })} {activeDate.getFullYear()}</h2>
            <h3>Total Holidays: {activeMonthHolidays.length}</h3>
            
            {/* Display Holidays in Table */}
            <table>
              <thead className='t-head-holiday'>
                <tr>
                  <th>Holiday Name</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {activeMonthHolidays.map((holiday) => (
                  <tr key={holiday.id}>
                    <td>{holiday.name}</td>
                    <td>{new Date(holiday.date).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => deleteHoliday(holiday.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr/>
          <div className='yearly-holidays'>
            <h2>Total Holidays in the Year</h2>
            <p>{holidays.length + getPredefinedHolidays(activeDate.getFullYear()).length} holiday(s) in total</p>
            
            {/* Display All Holidays in Table */}
            <table>
              <thead>
                <tr>
                  <th>Holiday Name</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {[...getPredefinedHolidays(activeDate.getFullYear()), ...holidays].map((holiday, index) => (
                  <tr key={index}>
                    <td>{holiday.name}</td>
                    <td>{new Date(holiday.date).toLocaleDateString()}</td>
                    <td>
                      {holiday.id && (
                        <button onClick={() => deleteHoliday(holiday.id)}>Delete</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Holidays;
