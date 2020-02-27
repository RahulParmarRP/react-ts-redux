import axios from 'axios';
import { User } from '../models/User';

const apiBaseUrl = 'http://localhost:3001/api';

class ApiClient {

    auth = {
        login: (username: string, password: string) => axios.post('/api/login', { username, password }),
        logout: () => axios.post('/api/logout'),
        checkAuth: () => axios.get('/api/auth/check')
    }

    clients = {
        getAll: () => axios.get('/api/clients')
    };

    roles = {
        getAll: () => axios.get('/api/roles')
    };

    users = {
        create: (user: User) => axios.post('/api/users', user),
        getAll: () => axios.get('/api/users'),
        delete: (userId: number) => axios.delete('/api/users/' + userId)
    };
}

export default ApiClient;

