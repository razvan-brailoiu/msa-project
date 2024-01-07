import React, {useState} from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'
import {getExercises, getExercisesForDate} from "../../api";
import {formatJson} from "../../helper";
import BackButton from "../BackButton/BackButton";


function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

const CalendarComponent = () => {
    const [date, setDate] = useState(new Date());
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [workoutData, setWorkoutData] = useState([])

    const openPopup = async () => {
        setIsPopupOpen(true);
        // add API request per dates
        try {
            const access_token = localStorage.getItem("token");
            const workoutResponse = await getExercisesForDate(access_token, formatDate(date));
            if (workoutResponse.length > 0) {
                setWorkoutData(formatJson(workoutResponse))
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        }

    }

    const closePopup = () => setIsPopupOpen(false);

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    return (
        <div className={'calendar-container'}>
            <BackButton destination={'/dashboard'}/>
            {isAuthenticated ? (
                <div>
                    <Calendar onChange={handleDateChange} value={date} />
                    <button onClick={openPopup} className={'open-modal-btn'}>Check out workout</button>
                    <Modal isOpen={isPopupOpen} onRequestClose={closePopup} className='custom-modal'>
                        <h2>Table for {date.toDateString()}</h2>
                        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Exercise Data</h2>
                        {workoutData.length > 0 ? (
                                <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                    <thead style={{ backgroundColor: '#f2f2f2' }}>
                                    <tr>
                                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Exercise Name</th>
                                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Sets number</th>
                                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Reps number</th>
                                        {/* Add more table headers based on your data structure */}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {workoutData.map((exercise, index) => (
                                        <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                                            <td style={{ padding: '12px', textAlign: 'left' }}>{exercise.exerciseName}</td>
                                            <td style={{ padding: '12px', textAlign: 'left' }}>{exercise.setsNumber}</td>
                                            <td style={{ padding: '12px', textAlign: 'left' }}>{exercise.repsNumber}</td>
                                            {/* Add more table cells based on your data structure */}
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>) : (
                                <p style={{ textAlign: 'center' }}>No exercise data available</p>
                            )}
                        <button onClick={closePopup} className={'close-modal-btn'}>Close</button>
                    </Modal>
                </div>
            ) : (<p style={{ textAlign: 'center' }}>User is not authenticated</p>)}
        </div>
    );
};

export default CalendarComponent;
