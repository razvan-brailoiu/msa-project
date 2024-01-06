import axios from 'axios';
const BASE_URL = 'http://54.90.209.204:8080'

// 54.90.209.204
export const loginUser = async (userData)   => {
    return await fetch(`${BASE_URL}/secure/authenticate`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
}

export const registerUser = async (userData) => {
    return await fetch(`${BASE_URL}/secure/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)

        })
}


export const postExercise = async (exerciseData, token) => {
    return await fetch(`${BASE_URL}/exercise`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(exerciseData)
    })

}

export const getExercisesForDate = async (token, date) => {
    return await fetch(`${BASE_URL}/exercise?date=${date}`, {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    })
}

export const getStatistics = async (token) => {

    // remove secure!
    // return await axios(`${BASE_URL}/secure/exercise/statistics`, {
    //     method: 'POST',
    //
    // })
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            // Add any other custom headers as needed
        },
        mode: 'no-cors', // Disable CORS
    };
    return axios(`${BASE_URL}/secure/exercise/statistics`, axiosConfig)
}



export const getExercises = async (token) => {
    // change to certain date
    return await fetch(`${BASE_URL}/exercises/all`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Request-Methods': 'GET',
            'Access-Control-Request-Headers': 'Authorization',
            'Authorization': `Bearer ${token}`
        },
    })


    // const myHeaders = new Headers();
    // myHeaders.append("Authorization", `Bearer ${token}`);
    // myHeaders.append("Content-Type", "application/json")
    // const requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     credentials: 'include'
    // };
    // return await fetch(`${BASE_URL}/exercise?user_id=1`, requestOptions)

    // return [
    //     {
    //         "muscleGroup": "Legs",
    //         "exerciseName": "Calf raises",
    //         "setsNumber": 1,
    //         "repsNumber": 10
    //     },
    //     {
    //         "muscleGroup": "Legs",
    //         "exerciseName": "Leg press",
    //         "setsNumber": 1,
    //         "repsNumber": 10
    //     },
    //     {
    //         "muscleGroup": "Legs",
    //         "exerciseName": "Leg press",
    //         "setsNumber": 1,
    //         "repsNumber": 12
    //     },
    //     {
    //         "muscleGroup": "Legs",
    //         "exerciseName": "Leg press",
    //         "setsNumber": 1,
    //         "repsNumber": 14
    //     }
    // ]
}