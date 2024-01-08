import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ workoutTypes, workoutCounts }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        // Check if the chartRef is not null
        if (chartRef.current) {
            // Destroy the previous chart instance if it exists
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');

            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: workoutTypes,
                    datasets: [
                        {
                            label: 'Workout Counts',
                            data: workoutCounts,
                            backgroundColor: 'rgba(75,130,192,0.2)', // Adjust color as needed
                            borderColor: 'rgb(29,110,187)', // Adjust color as needed
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 5.0
                        },
                    },
                },
            });
        }

        // Cleanup function to destroy the chart when the component unmounts
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [workoutTypes, workoutCounts]);

    return <canvas ref={chartRef} />;
};

export default BarChart;
