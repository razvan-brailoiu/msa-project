import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import {useTable} from 'react-table';
import {getExercises, postExercise} from "../../api";
import {formatJson} from "../../helper";
import {json, useNavigate} from "react-router-dom";
import BackButton from "../BackButton/BackButton";


export const WorkoutPage = () => {
    // State to hold the workout data
    const [workoutData, setWorkoutData] = useState([]);
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false)
    const [isPopupOpen, setPopupOpen] = useState(false)
    const [exerciseName, setExerciseName] = useState("Chest press")
    const [muscleGroup, setMuscleGroup] = useState('Chest')
    const [setsNumber, setSetsNumber] = useState('1')
    const [repsNumber, setRepsNumber] = useState('1')
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
            const token = localStorage.getItem("token")
            console.log(token)
            const response = await postExercise(exerciseData, token)
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


    function handleGoBack() {
        navigate("/dashboard")
    }

    return (
        <div>
            <BackButton destination={'/dashboard'}/>
            {isAuthenticated ? (
                <div>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Exercise Data</h2>
                    {workoutData.length > 0 ? (
                        <table style={{ width: '100%', padding: "12px",  borderCollapse: 'collapse', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
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
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                        <button onClick={handleOpenPopup} style={{ padding: '12px', background: 'green', marginBottom: '10px' }}>
                            Add exercise
                        </button>
                        <button onClick={handleFinalise} style={{ padding: '12px', background: 'red' }}>
                            Finalize workout
                        </button>
                    </div>
                </div>
            ) : (
                <p style={{ textAlign: 'center' }}>User is not authenticated</p>
            )}

            <Modal
                isOpen={isPopupOpen}
                onRequestClose={handleClosePopup}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(173, 216, 230, 0.75)',
                    },
                    content: {
                        padding: '20px',
                        top: '25%',
                        left: '25%',
                        alignItems: 'center',
                        position: 'absolute'
                    },
                }}
            >
                <h2>Modal Content</h2>
                <div>
                    <form onSubmit={handleConfirm}>
                        <div>
                            <select style={{ marginBottom: '10px', padding: '5px', fontSize: '14px', width: "100%" }} value={exerciseName} onChange={(e) => setExerciseName(e.target.value)}>
                                <option value="Chest press">Chest press</option>
                                <option value="Push-ups">Push-ups</option>
                                <option value="Pull-ups">Pull-ups</option>
                            </select>
                        </div>

                        <div>
                            <select style={{ marginBottom: '10px', padding: '5px', fontSize: '14px' }} value={muscleGroup} onChange={(e) => setMuscleGroup(e.target.value)}>
                                <option value="Chest"> Chest </option>
                                <option value="Legs"> Legs </option>
                                <option value="Back"> Back </option>
                            </select>
                        </div>
                        <div>
                            <select style={{ marginBottom: '10px', padding: '5px', fontSize: '14px' }} value = {setsNumber} onChange={(e) => setSetsNumber(e.target.value)}>
                                <option value="1"> 1 </option>
                                <option value="2"> 2 </option>
                                <option value="3"> 3 </option>
                                <option value="4"> 4 </option>
                                <option value="5"> 5 </option>
                                <option value="6"> 6 </option>
                            </select>
                        </div>
                        <div>
                            <select style={{ marginBottom: '10px', padding: '5px', fontSize: '14px' }} value = {repsNumber} onChange={(e) => setRepsNumber(e.target.value)}>
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
                        <button type={'submit'} style={{ padding: '10px', fontSize: '16px', backgroundColor: 'lightblue', border: 'none', cursor: 'pointer' }} >Confirm</button>
                    </form>

                </div>
                <button style={{ padding: '10px', fontSize: '16px', backgroundColor: 'lightblue', border: 'none', cursor: 'pointer' }} onClick={handleClosePopup}>Close</button>
            </Modal>

        </div>
    );
};