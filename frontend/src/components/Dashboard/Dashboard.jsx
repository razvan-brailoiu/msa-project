// Dashboard.js

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {getExercises} from "../../api";

const Dashboard = () => {
    const [workoutData, setWorkoutData] = useState(null);

    useEffect(() => {
        const fetchWorkoutData = async () => {
            try {
                const response = await getExercises();
                setWorkoutData(response.data);
            } catch (error) {
                console.error('Error fetching workout data:', error);
            }
        };

        fetchWorkoutData();
    }, []); // Empty dependency array to ensure the effect runs once after mount

    const chartData = {
        labels: workoutData?.labels || [],
        datasets: [
            {
                label: 'Workout Data',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: workoutData?.data || [],
            },
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
                    <button onClick={() => console.log('Button 1 Clicked')}>Button 1</button>
                    <button onClick={() => console.log('Button 2 Clicked')}>Button 2</button>
                </>
            ) : (
                <p>Loading workout data...</p>
            )}
        </div>
    );
};

export default Dashboard;
