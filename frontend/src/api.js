const BASE_URL = 'http://localhost:8080'

export const loginUser = async (userData)   => {
    return await fetch(`${BASE_URL}/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
}

export const registerUser = async (userData) => {
    const response  = await fetch(`${BASE_URL}/addUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)

        })
        .then(response => {
        if(!response.ok){
            throw new Error(`HTTP error ${response.status}`)
        }
        return response.json();
        })
        .then( data => console.log(data))
        .catch(error => {console.error('Error:', error)})
}