import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import {useTable} from 'react-table';
import {deleteExercise, getExercises, getExercisesForDate, postExercise} from "../../api";
import {formatJson, wrangleDate} from "../../helper";
import {json, useNavigate} from "react-router-dom";
import BackButton from "../BackButton/BackButton";
import Select from 'react-select'

const optionsOne = [
    {value: "Chest press", label: "Chest press"},
    {value: "Push-ups", label: "Push-ups"},
    {value: "Pull-ups", label: "Pull-ups"},
    {value: "Deadlift", label: "Deadlift"},
    {value: "Shoulder Press", label: "Shoulder Press"},
    {value: "Squats", label: "Squats"},
    {value: "Rowing Machine", label: "Rowing Machine"},
    {value: "Ellyptical", label: "Ellyptical"},
    {value: "Treadmill", label: "Treadmill"},
    ]

const optionsTwo = [
    {value: "Chest", label: "Chest"},
    {value: "Legs", label: "Legs"},
    {value: "Back", label: "Back"},
    {value: "Arms", label: "Arms"},
    {value: "Cardio", label: "Cardio"},
]

const optionsThree = [ {value: '1', label: "1"}]
const optionsFour = [
    {value: "6", label: "6"},
    {value: "7", label: "7"},
    {value: "8", label: "8"},
    {value: "9", label: "9"},
    {value: "10", label: "10"},
    {value: "11", label: "11"},
    {value: "12", label: "12"},
    {value: "13", label: "13"},
    {value: "14", label: "14"},
]
export const WorkoutPage = () => {
    // State to hold the workout data
    const [workoutData, setWorkoutData] = useState([]);
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false)
    const [isAddPopupOpen, setAddPopupOpen] = useState(false);
    const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
    const [exerciseName, setExerciseName] = useState("Chest press")
    const [muscleGroup, setMuscleGroup] = useState('Chest')
    const [setsNumber, setSetsNumber] = useState('1')
    const [repsNumber, setRepsNumber] = useState('6')

    let formattedExercises = [];
    const handleFinalise = () => {
        navigate("/dashboard")
    }


    // post exercise - working
    const handleConfirm = async () => {
        try {
            const exerciseData = {
                "exerciseName": exerciseName,
                "muscleGroup": muscleGroup,
                "setsNumber": setsNumber,
                "repsNumber": repsNumber
            }
            console.log("About to post " + exerciseData)
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
        handleAddClosePopup();
    };

    const handleConfirmDeletion = async () => {
        try {
            const exerciseData = {
                "exerciseName": exerciseName,
                "muscleGroup": muscleGroup,
                "setsNumber": setsNumber,
                "repsNumber": repsNumber,
            }
            console.log("About to post " + exerciseData)
            const token = localStorage.getItem("token")
            const response = await deleteExercise(wrangleDate(), exerciseData, token)
            if (response.ok){
                console.log("API call ok")
            }
            else {
                console.error("API call failed")
            }
        } catch (error) {
            console.error('Error making API call:', error);
        }
        handleDeleteClosePopup();
    }

    const handleAddOpenPopup = () => {
        setAddPopupOpen(true);
    }

    const handleAddClosePopup = () => {
        setAddPopupOpen(false);

    }

    const handleDeleteOpenPopup = () => {
        setDeletePopupOpen(true);
    }

    const handleDeleteClosePopup = () => {
        setDeletePopupOpen(false);
    }


    const handleExercise = (selectedOption) => {
        setExerciseName(selectedOption.value)
    }

    const handleGroup = (selectedOption) => {
        setMuscleGroup(selectedOption.value)
    }

    const handleSetsNumber = (selectedOption) => {
        setSetsNumber(selectedOption.value)
    }

    const handleRepsNumber = (selectedOption) => {
        setRepsNumber(selectedOption.value)
    }

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

            const exerciseData = {
                "exerciseName": exerciseName,
                "muscleGroup": muscleGroup,
                "setsNumber": setsNumber,
                "repsNumber": repsNumber
            }
            console.log(exerciseData)

            try {
                const access_token = localStorage.getItem("token");
                const workoutResponse = await getExercisesForDate(access_token, wrangleDate());
                const json_response = await workoutResponse.json()
                if (json_response.length > 0){
                    console.log(json_response)
                    setWorkoutData(formatJson(json_response))
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

    }, []);


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
                        <button onClick={handleAddOpenPopup} style={{ padding: '12px', background: 'green', marginBottom: '10px' }}>
                            Add exercise
                        </button>
                        <button onClick={handleDeleteOpenPopup} style={{ padding: '12px', background: 'red', marginBottom: '10px' }}>
                            Delete exercise
                        </button>
                        <button onClick={handleFinalise} style={{ padding: '12px', background: 'orange' }}>
                            Finalize workout
                        </button>
                    </div>
                </div>
            ) : (
                <p style={{ textAlign: 'center' }}>User is not authenticated</p>
            )}
            <Modal
                isOpen={isAddPopupOpen}
                onRequestClose={handleAddClosePopup}
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
                <h2>Add your exercise</h2>
                <div>
                    <form onSubmit={handleConfirm} style={{padding: '10px'}} >
                        <div>
                            <label htmlFor="select1">Exercise Name</label>
                            <Select placeholder={'ExerciseName'} className={"dropdown-box"} id='select1' options={optionsOne} onChange={handleExercise}> </Select>
                            <Select placeholder={'Muscle Group'} className={"dropdown-box"} id='select1' options={optionsTwo} onChange={handleGroup}> </Select>
                            <Select placeholder={'SetsNumber'} className={"dropdown-box"} id='select1' options={optionsThree} onChange={handleSetsNumber}> </Select>
                            <Select placeholder={'RepsNumber'} className={"dropdown-box"} id='select1' options={optionsFour} onChange={handleRepsNumber}> </Select>
                        </div>
                        <button type={'submit'} style={{  marginTop: '10px', padding: '10px', fontSize: '16px', backgroundColor: 'lightblue', border: 'none', cursor: 'pointer' }} >Confirm</button>
                    </form>

                </div>
                <button style={{  marginTop: '20px', padding: '10px', fontSize: '16px', backgroundColor: 'lightblue', border: 'none', cursor: 'pointer' }} onClick={handleAddClosePopup}>Close</button>
            </Modal>
            <Modal
                isOpen={isDeletePopupOpen}
                onRequestClose={handleDeleteClosePopup}
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
                <h2>Delete certain exercise</h2>
                <div>
                    <form onSubmit={handleConfirmDeletion} style={{padding: '10px'}}>
                        <div>
                            <label htmlFor="select1">Exercise Name</label>
                            <Select placeholder={'ExerciseName'} className={"dropdown-box"} id='select1' options={optionsOne} onChange={handleExercise}> </Select>
                            <Select placeholder={'Muscle Group'} className={"dropdown-box"} id='select1' options={optionsTwo} onChange={handleGroup}> </Select>
                            <Select placeholder={'SetsNumber'} className={"dropdown-box"} id='select1' options={optionsThree} onChange={handleSetsNumber}> </Select>
                            <Select placeholder={'RepsNumber'} className={"dropdown-box"} id='select1' options={optionsFour} onChange={handleRepsNumber}> </Select>
                        </div>
                        <button type={'submit'} style={{ marginTop: '10px', padding: '10px', fontSize: '16px', backgroundColor: 'red', border: 'none', cursor: 'pointer' }} >Confirm deletion</button>
                    </form>

                </div>
                <button style={{ marginTop: '20px', padding: '10px', fontSize: '16px', backgroundColor: 'lightblue', border: 'none', cursor: 'pointer' }} onClick={handleDeleteClosePopup}>Close</button>
            </Modal>
        </div>
    );
};