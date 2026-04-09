import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:4500', // כתובת השרת שלך
    withCredentials: true // חובה כדי שהדפדפן יקבל וישלח עוגיות
});

export default API;