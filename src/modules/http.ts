import { useNotificationsStore } from '@/stores/notifications';
import axios from 'axios';

export const http = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 1000 * 15,
    headers: {
        'Content-Type': 'application/json'
    }
});

http.interceptors.response.use(
    (response) => response,
    (error) => {
        const { addNotification } = useNotificationsStore();

        addNotification({
            type: 'error',
            code: error.response.data.statusCode || 'unknown',
            message: error.response.data.message || 'Unknown error'
        });
    }
);
