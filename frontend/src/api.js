import axios from 'axios';
const BASE_URL = 'http://localhost:8080'

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

    return await axios.get(`${BASE_URL}/exercise/statistics`,{
        mode:"no-cors",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

}



export const getExercises = async (token) => {
    // change to certain date
    return await axios.get(`${BASE_URL}/exercise/all`, {
        mode:"no-cors",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

}