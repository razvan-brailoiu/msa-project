import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import {useTable} from 'react-table';
import {getExercises, postExercise} from "../../api";
import {formatJson} from "../../helper";
import {json, useNavigate} from "react-router-dom";


export const WorkoutPage = () => {
    // State to hold the workout data
    const [workoutData, setWorkoutData] = useState([]);
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false)
    const [isPopupOpen, setPopupOpen] = useState(false)
    const [exerciseName, setExerciseName] = useState('')
    const [muscleGroup, setMuscleGroup] = useState('')
    const [setsNumber, setSetsNumber] = useState('')
    const [repsNumber, setRepsNumber] = useState('')
    let formattedExercises = [];

    const handleFinalise = () => {
        navigate("/dashboard")
    }


    const handleConfirm = async () => {
        try {
            const exerciseData = {
                "exerciseName": exerciseName,
                "muscleGroup": muscleGroup,
                "setsNumber": setsNumber,
                "repsNumber": repsNumber
            }
            const response = await postExercise(exerciseData)
            if (response.ok){
                console.log("API call ok")
            }
            else {
                console.error("API call failed")
            }
        } catch (error) {
            console.error('Error making API call:', error);
        }
        handleClosePopup();
    };

    const handleOpenPopup = () => {
        setPopupOpen(true);
    }

    const handleClosePopup = () => {
        setPopupOpen(false);
    }

    const checkAuthentication = () => {
        const authenticated = localStorage.getItem("authenticated") === "true";
        setIsAuthenticated(authenticated);
        if (authenticated)
            setToken(localStorage.getItem("token"))
        return token;
    };


    useEffect(() => {
        setLoading(true)


        const checkAuthentication = () => {
            const authenticated = localStorage.getItem("authenticated") === "true";
            setIsAuthenticated(authenticated);
            return authenticated;
        };

        if (!checkAuthentication()) {
            console.log("User is not authenticated");
            return;
        }

        // Fetch data from the API if the user is authenticated
        const fetchData = async () => {
            try {
                const access_token = localStorage.getItem("token");
                const workoutResponse = await getExercises(access_token);
                if (workoutResponse.length > 0 ){
                    setWorkoutData(formatJson(workoutResponse))
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        // Move the logic for formatting outside the useEffect
        if (workoutData.length > 0) {
            console.log(workoutData);
            formattedExercises = formatJson(workoutData);
            console.log(formattedExercises);
        }
    }, []);




    return (
        <div>
            {isAuthenticated ? (
                <div>
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
                        </table>
                    ) : (
                        <p style={{ textAlign: 'center' }}>No exercise data available</p>
                    )}
                    <button onClick={handleOpenPopup} style={{padding: '12px'}}>Add exercise</button>
                    <button onClick={handleFinalise}> Finalise workout </button>
                </div>
            ) : (
                <p style={{ textAlign: 'center' }}>User is not authenticated</p>
            )}

            <Modal
                isOpen={isPopupOpen}
                onRequestClose={handleClosePopup}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    content: {
                        width: '300px',
                        margin: 'auto',
                    },
                }}
            >
                <h2>Modal Content</h2>
                <div>
                    <select value={exerciseName} onChange={(e) => setExerciseName(e.target.value)}>
                        <option value="Chest press">Chest press</option>
                        <option value="Push-ups">Push-ups</option>
                        <option value="Pull-ups">Pull-ups</option>
                    </select>
                    <select value={muscleGroup} onChange={(e) => setMuscleGroup(e.target.value)}>
                        <option value="Chest"> Chest </option>
                        <option value="Legs"> Legs </option>
                        <option value="Back"> Back </option>
                    </select>
                    <select value = {setsNumber} onChange={(e) => setSetsNumber(e.target.value)}>
                        <option value="1"> 1 </option>
                        <option value="2"> 2 </option>
                        <option value="3"> 3 </option>
                        <option value="4"> 4 </option>
                        <option value="5"> 5 </option>
                        <option value="6"> 6 </option>
                    </select>
                    <select value = {repsNumber} onChange={(e) => setRepsNumber(e.target.value)}>
                        <option value="6"> 6 </option>
                        <option value="7"> 7 </option>
                        <option value="8"> 8 </option>
                        <option value="9"> 9 </option>
                        <option value="10"> 10 </option>
                        <option value="11"> 11 </option>
                        <option value="12"> 12 </option>
                        <option value="13"> 13 </option>
                        <option value="14"> 14 </option>
                    </select>
                </div>
                <button onClick={handleConfirm}>Confirm</button>
                <button onClick={handleClosePopup}>Close</button>
            </Modal>

        </div>
    );
};