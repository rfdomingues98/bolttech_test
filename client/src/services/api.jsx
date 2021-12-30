import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3001', headers: { 'x-access-token': '' } });

export default api;
