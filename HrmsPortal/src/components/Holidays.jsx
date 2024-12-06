import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../Holidays.css';
import { useNavigate } from 'react-router-dom';

const Holidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [activeDate, setActiveDate] = useState(new Date());
  const [holidayName, setHolidayName] = useState('');
  const [holidayDate, setHolidayDate] = useState('');
  const [userRole, setUserRole] = useState('');

  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    const loginFlag = localStorage.getItem("loginFlag");
    console.log("login flag in dashboard", loginFlag);
    if (loginFlag === "false") {
      navigate('/logout1');
    }
  }, [navigate]);

  // Fetch the user role from localStorage
  useEffect(() => {
    const role = localStorage.getItem('userRole');
    console.log('Fetched userRole from localStorage:', role);
    setUserRole(role);
  }, []);

  // Predefined holidays for the active year
  const getPredefinedHolidays = (year) => {
    return [
      { name: "New Year's Day", date: `${year}-01-01` },
      { name: 'Independence Day', date: `${year}-07-15` },
      { name: 'Christmas Day', date: `${year}-12-25` },
    ];
  };

  // Fetch holidays from the API
  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}calender/holidays/`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setHolidays(data);
      } else {
        console.error('Unexpected response format:', data);
        setHolidays([]);
      }
    } catch (error) {
      console.error('Error fetching holidays:', error);
      setHolidays([]);
    }
  };

  // Add a holiday
  const addHoliday = async (event) => {
    event.preventDefault();
    const holidayData = {
      name: holidayName,
      date: holidayDate,
    };
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}calender/holidays/add/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(holidayData),
      });

      if (response.ok) {
        fetchHolidays(); // Refresh holidays
        setHolidayName('');
        setHolidayDate('');
      }
    } catch (error) {
      console.error('Error adding holiday:', error);
    }
  };

  // Delete a holiday
  const deleteHoliday = async (holiday_id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}calender/holidays/delete/${holiday_id}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchHolidays(); // Refresh holidays
      } else {
        alert('Failed to delete holiday');
      }
    } catch (error) {
      console.error('Error deleting holiday:', error);
    }
  };

  // Check if a date is a holiday
  const isHoliday = (date) => {
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const predefinedHolidays = getPredefinedHolidays(date.getFullYear());
    const isPredefinedHoliday = predefinedHolidays.some(
      (holiday) => holiday.date === formattedDate
    );
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
    if (!Array.isArray(holidays)) {
      console.warn('holidays is not iterable:', holidays);
      return [];
    }
    const month = activeDate.getMonth();
    const year = activeDate.getFullYear();
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
          {userRole === 'HR' || userRole === 'ADMIN' ? (
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
          ) : null}

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
            <h2 className='display-num-holidays'>Holidays in {activeDate.toLocaleString('default', { month: 'long' })} {activeDate.getFullYear()}</h2>
            <h3 className='display-num-holidays'>Total Holidays: {activeMonthHolidays.length}</h3>

            {/* Display Holidays in Table */}
            <table className='calen-table'>
              <thead className='t-head-holiday'>
                <tr>
                  <th>Holiday Name</th>
                  <th>Date</th>
                  {userRole === 'HR' || userRole === 'ADMIN' ? <th>Action</th> : null}
                </tr>
              </thead>
              <tbody>
                {activeMonthHolidays.map((holiday, index) => (
                  <tr key={index}>
                    <td>{holiday.name}</td>
                    <td>{new Date(holiday.date).toLocaleDateString()}</td>
                    {userRole === 'HR' || userRole === 'ADMIN' ? (
                      <td>
                        {holiday.id && (
                          <button className="delete-btn" onClick={() => deleteHoliday(holiday.id)}>Delete</button>
                        )}
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr />
          <div className='yearly-holidays'>
            <h2 className='display-num-holidays'>Total Holidays in the Year</h2>
            <p className='display-num-holidays'>{holidays.length + getPredefinedHolidays(activeDate.getFullYear()).length} holiday(s) in total</p>

            {/* Display All Holidays in Table */}
            <table className="calen-table">
              <thead>
                <tr>
                  <th>Holiday Name</th>
                  <th>Date</th>
                  {userRole === 'HR' || userRole === 'ADMIN' ? <th>Action</th> : null}
                </tr>
              </thead>
              <tbody>
                {[...getPredefinedHolidays(activeDate.getFullYear()), ...holidays].map((holiday, index) => (
                  <tr key={index}>
                    <td>{holiday.name}</td>
                    <td>{new Date(holiday.date).toLocaleDateString()}</td>
                    {userRole === 'HR' || userRole === 'ADMIN' ? (
                      <td>
                        {holiday.id && (
                          <button className="delete-btn" onClick={() => deleteHoliday(holiday.id)}>Delete</button>
                        )}
                      </td>
                    ) : null}
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
