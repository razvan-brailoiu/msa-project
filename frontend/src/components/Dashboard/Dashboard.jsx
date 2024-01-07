// Dashboard.js

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {getExercises, getStatistics} from "../../api";
import {useNavigate} from "react-router-dom";
import {formatList} from "../../helper";

const Dashboard = () => {
    const [workoutData, setWorkoutData] = useState(null);
    const navigate = useNavigate();
    const goToWorkout = () => navigate("/workout")
    const goToLogin = () => navigate("/login")
    const goToCalendar = () => navigate("calendar")

    useEffect(() => {
        const fetchWorkoutData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await getStatistics(token)
                console.log(response)
                setWorkoutData(formatList(response));
            } catch (error) {
                console.error('Error fetching workout data:', error);
            }
        };

        fetchWorkoutData();
    }, []); // Empty dependency array to ensure the effect runs once after mount

    const chartData = {
        labels: workoutData?.workoutGroups || [],
        datasets: [
            {
                label: 'Workout Data',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: workoutData?.groupCounts || [],
            }

        ],
    };

    const chartOptions = {
        scales: {
            x: { title: { display: true, text: 'Workout Type' } },
            y: { title: { display: true, text: 'Count' }, beginAtZero: true },
        },
    };

    return (
        <div>
            <h2>Dashboard</h2>
            {workoutData ? (
                <>
                    <Bar data={chartData} options={chartOptions} />
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
