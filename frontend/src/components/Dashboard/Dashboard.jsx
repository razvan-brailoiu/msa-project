// Dashboard.js

import React, { useState, useEffect } from 'react';
import {getExercises, getStatistics} from "../../api";
import {useNavigate} from "react-router-dom";
import {formatList} from "../../helper";
import BarChart from "../BarChart/BarChart";
import {useAuth} from "../AuthProvider/AuthProvider";
import Cookies from "js-cookie";

const Dashboard = () => {
    const [workoutData, setWorkoutData] = useState([]);
    const [workoutCounts, setWorkoutCounts] = useState([])
    const navigate = useNavigate();
    const authContext = useAuth();
    const goToWorkout = () => navigate("/workout")
    const goToLogin = () => navigate("/login")
    const goToCalendar = () => navigate("/calendar")

    useEffect(() => {
        if (Cookies.get('jwtToken') === undefined){
            navigate("/login")
        }
        const fetchWorkoutData = async () => {
            try {
                const token = Cookies.get('jwtToken')
                console.log("TOken ", token)
                const response = await getStatistics(token)
                let result = formatList(response.data)
                setWorkoutData(result.workoutGroups)
                setWorkoutCounts(result.groupCounts)

            } catch (error) {
                console.error('Error fetching workout data:', error);
            }
        };

        fetchWorkoutData();
    }, []); // Empty dependency array to ensure the effect runs once after mount

    return (
        <div>
            <h2>Dashboard</h2>
            {Cookies.get('jwtToken') !== undefined && workoutData ? (
                <>
                    <BarChart workoutCounts={workoutCounts} workoutTypes={workoutData}/>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                        <button onClick={ goToWorkout } style={{ padding: '12px', background: 'green', marginBottom: '10px' }}>
                            Today's Workout
                        </button>
                        <button onClick={goToCalendar} style={{ padding: '12px', background: 'red' }}>
                            Past Workouts
                        </button>
                        <button onClick={goToLogin} style={{ padding: '12px', background: 'red' }}>
                            Log Out
                        </button>
                    </div>
                </>
            ) : (
                <p>Loading workout data...</p>
            )}
        </div>
    );
};

export default Dashboard;
