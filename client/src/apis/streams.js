import axios from 'axios';
// This is the json-server
export default axios.create({
    baseURL:'http://localhost:3001'
});