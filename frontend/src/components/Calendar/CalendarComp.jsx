import React, {useState, useEffect} from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'
import {getExercises, getExercisesForDate} from "../../api";
import {formatJson} from "../../helper";
import BackButton from "../BackButton/BackButton";
import {useAuth} from "../AuthProvider/AuthProvider";
import Cookies from "js-cookie";


function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

const CalendarComp = () => {
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState(new Date());
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [workoutData, setWorkoutData] = useState([])
    const authContext = useAuth();

    // useEffect = (() => {
    //
    //     setLoading(true)
    //     console.log("In UseEffect")
    //     const checkAuthentication = () => {
    //         const authenticated = localStorage.getItem("authenticated") === "true";
    //         setIsAuthenticated(authenticated);
    //         return authenticated;
    //     };
    //
    //     if (!checkAuthentication()) {
    //         console.log("User is not authenticated");
    //         return;
    //     }
    //
    // }, [])

    const openPopup = async () => {
        setIsPopupOpen(true);
        // add API request per dates
        try {
            const access_token = Cookies.get('jwtToken')
            const workoutResponse = await getExercisesForDate(access_token, formatDate(date));
            const json_response = await workoutResponse.json()
            console.log('Calendar json response', json_response)
            if (json_response.length > 0){
                console.log(json_response)
                setWorkoutData(formatJson(json_response))
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        }

    }

    const closePopup = () => {
        setWorkoutData([]);
        setIsPopupOpen(false);
    }

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };



    return (
        <div className={'calendar-container'}>
            <BackButton destination={'/dashboard'}/>
            <h2> Explore your past workouts </h2>
            {Cookies.get('jwtToken') !== undefined ? (
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

export default CalendarComp;
