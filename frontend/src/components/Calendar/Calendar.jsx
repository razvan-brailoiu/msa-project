import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'


const CalendarComponent = () => {
    const [date, setDate] = useState(new Date());
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    return (
        <div className={'calendar-container'}>
            <Calendar onChange={handleDateChange} value={date} />
            <button onClick={openPopup} className={'open-modal-btn'}>Check out workout</button>
            <Modal isOpen={isPopupOpen} onRequestClose={closePopup} className='custom-modal'>
                <h2>Table for {date.toDateString()}</h2>
                {/* Add your table or other content here */}
                <button onClick={closePopup} className={'close-modal-btn'}>Close</button>
            </Modal>
        </div>
    );
};

export default CalendarComponent;
