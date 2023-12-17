import { defineStore } from 'pinia';
import { User, UserRegistrationFields, UserLoginFields } from '@/types/user/user';
import { http } from '@/modules/http';

interface State {
    user: User | null;
}

export const useUserStore = defineStore('user', {
    state: (): State => ({
        user: null
    }),

    actions: {
        async registerUser(data: UserRegistrationFields) {
            const response = await http.post<{ token: string }>('/auth/registration', data);
            return response.data;
        },

        async loginUser(data: UserLoginFields) {
            const response = await http.post<{ token: string }>('/auth/login', data);
            return response.data;
        }
    }
});
