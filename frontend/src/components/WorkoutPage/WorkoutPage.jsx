import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import {useTable} from 'react-table';
import {getExercises, postExercise} from "../../api";
import {formatJson} from "../../helper";
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
    const [isPopupOpen, setPopupOpen] = useState(false)
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
        handleClosePopup();
    };

    const handleOpenPopup = () => {
        setPopupOpen(true);
    }

    const handleClosePopup = () => {
        setPopupOpen(false);

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
                const workoutResponse = await getExercises(access_token);
                console.log(workoutResponse)
                if (workoutResponse.data.length > 0 ){
                    console.log(workoutResponse)
                    setWorkoutData(formatJson(workoutResponse.data))
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
                <h2>Add your exercise</h2>
                <div>
                    <form onSubmit={handleConfirm}>
                        <div>
                            <label htmlFor="select1">Exercise Name</label>
                            <Select placeholder={'ExerciseName'} className={"dropdown-box"} id='select1' options={optionsOne} onChange={handleExercise}> </Select>
                            <Select placeholder={'Muscle Group'} className={"dropdown-box"} id='select1' options={optionsTwo} onChange={handleGroup}> </Select>
                            <Select placeholder={'SetsNumber'} className={"dropdown-box"} id='select1' options={optionsThree} onChange={handleSetsNumber}> </Select>
                            <Select placeholder={'RepsNumber'} className={"dropdown-box"} id='select1' options={optionsFour} onChange={handleRepsNumber}> </Select>

                        {/*    <select id={'ename'} style={{ marginBottom: '10px', padding: '5px', fontSize: '14px', width: "100%" }} value={exerciseName} onChange={(e) => setExerciseName(e.target.value)}>*/}
                        {/*        <option value="Chest press">Chest press</option>*/}
                        {/*        <option value="Push-ups">Push-ups</option>*/}
                        {/*        <option value="Pull-ups">Pull-ups</option>*/}
                        {/*        <option value="Deadlift">Deadlift</option>*/}
                        {/*        <option value="Shoulder Press">Shoulder Press</option>*/}
                        {/*        <option value="Squats">Squats</option>*/}
                        {/*        <option value="Rowing Machine">Rowing Machine</option>*/}
                        {/*        <option value="Ellyptical">Ellyptical</option>*/}
                        {/*        <option value="Treadmill">Treadmill</option>*/}
                        {/*    </select>*/}
                        {/*</div>*/}

                        {/*<div>*/}
                        {/*    <select name={"Muscle Group"} style={{ marginBottom: '10px', padding: '5px', fontSize: '14px' }} value={muscleGroup} onChange={(e) => setMuscleGroup(e.target.value)}>*/}
                        {/*        <option value="Chest">Chest</option>*/}
                        {/*        <option value="Legs">Legs</option>*/}
                        {/*        <option value="Back">Back</option>*/}
                        {/*        <option value="Arms">Arms</option>*/}
                        {/*        <option value={"Cardio"}>Cardio</option>*/}
                        {/*    </select>*/}
                        {/*</div>*/}
                        {/*<div>*/}
                        {/*    <select name = "Sets" style={{ marginBottom: '10px', padding: '5px', fontSize: '14px' }} value = {setsNumber} onChange={(e) => setSetsNumber(e.target.value)}>*/}
                        {/*        <option value="1">1</option>*/}
                        {/*    </select>*/}
                        {/*</div>*/}
                        {/*<div>*/}
                        {/*    <select name="Reps" style={{ marginBottom: '10px', padding: '5px', fontSize: '14px' }} value = {repsNumber} onChange={(e) => setRepsNumber(e.target.value)}>*/}
                        {/*        <option value="6">6</option>*/}
                        {/*        <option value="7">7</option>*/}
                        {/*        <option value="8">8</option>*/}
                        {/*        <option value="9">9</option>*/}
                        {/*        <option value="10">10</option>*/}
                        {/*        <option value="11">11</option>*/}
                        {/*        <option value="12">12</option>*/}
                        {/*        <option value="13">13</option>*/}
                        {/*        <option value="14">14</option>*/}
                        {/*    </select>*/}
                        </div>
                        <button type={'submit'} style={{ padding: '10px', fontSize: '16px', backgroundColor: 'lightblue', border: 'none', cursor: 'pointer' }} >Confirm</button>
                    </form>

                </div>
                <button style={{ padding: '10px', fontSize: '16px', backgroundColor: 'lightblue', border: 'none', cursor: 'pointer' }} onClick={handleClosePopup}>Close</button>
            </Modal>

        </div>
    );
};