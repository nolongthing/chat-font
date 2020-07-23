import axios from 'axios';

const basePath = process.env.NODE_ENV === 'production' ? '/api' : '';

function getLogin(params) {
    return axios.get(`${basePath}/login`, { params });
}

export {
    getLogin
};
