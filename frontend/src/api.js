const BASE_URL = 'http://localhost:8080'

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


export const postExercise = async (exerciseData) => {
    return await fetch(`${BASE_URL}/exercise`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(exerciseData)
    })

}


export const getExercises = async (token) => {
    // const myHeaders = new Headers();
    // myHeaders.append("Authorization", `Bearer ${token}`);
    // myHeaders.append("Content-Type", "application/json")
    // const requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     credentials: 'include'
    // };
    // return await fetch(`${BASE_URL}/exercise?user_id=1`, requestOptions)

    return [
        {
            "muscleGroup": "Legs",
            "exerciseName": "Calf raises",
            "setsNumber": 1,
            "repsNumber": 10
        },
        {
            "muscleGroup": "Legs",
            "exerciseName": "Leg press",
            "setsNumber": 1,
            "repsNumber": 10
        },
        {
            "muscleGroup": "Legs",
            "exerciseName": "Leg press",
            "setsNumber": 1,
            "repsNumber": 12
        },
        {
            "muscleGroup": "Legs",
            "exerciseName": "Leg press",
            "setsNumber": 1,
            "repsNumber": 14
        }
    ]
}