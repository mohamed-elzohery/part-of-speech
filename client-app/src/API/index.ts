import axios from 'axios';

const axiosGroup = axios.create({baseURL: 'http://localhost:4000/'});

export const getWords = async () => {
    return axiosGroup.get('/words');
}