import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhsot/80/todo/api',
    headers: {
        'content-type': 'application/json'
    }
});