import { useInitialData } from '@/composables/useInitialData';
import { CookiesKeys } from '@/constants/cookies';
import { http } from '@/modules/http';
import { useUserStore } from '@/stores/user';
import { User, UserDecodedToken } from '@/types/user/user';
import { useCookies } from '@vueuse/integrations/useCookies';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'vue-router';

export const useAuth = () => {
    const cookies = useCookies();
    const router = useRouter();
    const userStore = useUserStore();
    const { getInitialData } = useInitialData();

    const getUserByToken = (token: string): User => {
        const decodedUser = jwtDecode<UserDecodedToken>(token);
        return decodedUser;
    };

    const updateUserByToken = async (token: string) => {
        userStore.$patch({ user: getUserByToken(token) });
        cookies.set(CookiesKeys.ACCESS_TOKEN, token);
        http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await getInitialData();
    };

    const logout = () => {
        userStore.$patch({ user: null });
        cookies.remove(CookiesKeys.ACCESS_TOKEN);
        delete http.defaults.headers.common['Authorization'];
        router.push({ name: 'Login' });
    };

    return {
        getUserByToken,
        logout,
        updateUserByToken
    };
};
