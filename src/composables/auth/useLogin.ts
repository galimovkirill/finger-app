import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import { useCookies } from '@vueuse/integrations/useCookies';
import { UserLoginFields } from '@/types/user/user';
import { http } from '@/modules/http';
import { CookiesKeys } from '@/constants/cookies';
import { useAuth } from '@/composables/auth/useAuth';

export const useLogin = () => {
    const userStore = useUserStore();
    const cookies = useCookies();
    const { getUserByToken } = useAuth();

    const email = ref('');
    const password = ref('');

    const loginUser = async (data: UserLoginFields) => {
        try {
            const response = await http.post<{ token: string }>('/auth/login', data);
            const { token } = response.data;

            if (!token) {
                return;
            }

            userStore.$patch({ user: getUserByToken(token) });
            cookies.set(CookiesKeys.ACCESS_TOKEN, token);
        } catch (error) {
            console.log(error);
        }
    };

    return { email, password, loginUser };
};
