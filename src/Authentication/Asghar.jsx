import axios from "axios";

export const api = axios.create({
    baseURL: 'http://192.168.137.1:3000',
    headers: {
        Authorization: localStorage.getItem('userToken'),
    }
});