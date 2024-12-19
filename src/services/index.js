// const URL = 'https://jobfinder-capstone-backend.onrender.com';
const URL = 'http://localhost:3000'

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
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data)
    })
}


export const getJobs = ({ limit, offset, search, filters }) => {
    const skills = filters.skills.join(',');
    return fetch(`${URL}/api/jobs?limit=${limit}${offset>0 ? `&offset=${offset}` : ''}${search !== '' ? `&q=${search}` : ''}${filters.jobType !== '' ? `&jobType=${filters.jobType}` : ''}${filters.jobPosition !== '' ? `&jobPosition=${filters.jobPosition}` : ''}${filters.remoteOffice !== '' ? `&remoteOffice=${filters.remoteOffice}` : ''}${skills !== '' ? `&skills=${skills}` : ``}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const addJob = (data) => {
    return fetch(`${URL}/api/jobs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
    })
}

export const updateJob = (id,data) => {
    return fetch(`${URL}/api/jobs/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token'),
        },
        body: JSON.stringify(data),
    })
};

export const getJobByID = (id) => {
    return fetch(`${URL}/api/jobs/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : localStorage.getItem('token') ? `${localStorage.getItem('token')}` : '',
        } 
    })
}

export const getSkills = async () => {
    return fetch (`${URL}/api/skills`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export const getJobPositions = async () => {
    return fetch(`${URL}/api/jobPositions`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        },
    });
}