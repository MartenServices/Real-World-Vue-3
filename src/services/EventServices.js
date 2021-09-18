import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/MartenServices/Real-World-Vue-3',
    withCredentials: false,
    headers: {
        Acccept: 'application/json',
        'Content-type': 'application/json'
    }
})

export default {
    getEvents(){
        return apiClient.get('/events')
    },
    // Added new call for single event by ID
    getEvent(id) {
        return apiClient.get('/events/' + id)
    }
}