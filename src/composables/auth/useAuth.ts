import { CookiesKeys } from '@/constants/cookies';
import { useUserStore } from '@/stores/user';
import { User, UserDecodedToken } from '@/types/user/user';
import { useCookies } from '@vueuse/integrations/useCookies';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'vue-router';

export const useAuth = () => {
    const cookies = useCookies();
    const router = useRouter();
    const userStore = useUserStore();

    const getUserByToken = (token: string): User => {
        const decodedUser = jwtDecode<UserDecodedToken>(token);
        return decodedUser;
    };

    const logout = () => {
        userStore.$patch({ user: null });
        cookies.remove(CookiesKeys.ACCESS_TOKEN);
        router.push({ name: 'Login' });
    };

    return {
        getUserByToken,
        logout
    };
};
