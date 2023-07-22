import { defineStore } from 'pinia';
import { http } from '@/modules/http';
import { ref } from 'vue';
import { User, UserDecodedToken, UserLoginFields } from '@/types/user/user';
import jwtDecode from 'jwt-decode';
import { useCookies } from '@vueuse/integrations/useCookies';
import { CookiesKeys } from '@/constants/cookies';

export const useUserStore = defineStore('user', () => {
    const user = ref<User>();

    const cookies = useCookies();

    const getUserByToken = (token: string): User => {
        const decodedUser = jwtDecode<UserDecodedToken>(token);
        return decodedUser;
    };

    const loginUser = async (data: UserLoginFields) => {
        try {
            const response = await http.post<{ token: string }>('/auth/login', data);
            const { token } = response.data;

            if (!token) {
                return;
            }

            user.value = getUserByToken(token);
            cookies.set(CookiesKeys.ACCESS_TOKEN, token);
        } catch (error) {
            console.log(error);
        }
    };

    return {
        user,
        loginUser
    };
});
