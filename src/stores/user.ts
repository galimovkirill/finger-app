import { defineStore } from 'pinia';
import { User } from '@/types/user/user';

interface State {
    user: User | null;
}

export const useUserStore = defineStore('user', {
    state: (): State => ({
        user: null
    })
});
