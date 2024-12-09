const URL = 'https://jobfinder-capstone-backend.onrender.com';

export const register = (data) => {
    return fetch(`${URL}/api/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data),
    })
}


export const login = (data) => {
    return fetch(`${URL}/api/user/login`, {
        method: 'POST',
        header: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data)
    })
}


export const getJobs = () => {
    return fetch(`${URL}/api/jobs`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}