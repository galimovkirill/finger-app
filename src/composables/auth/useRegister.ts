import { useAuth } from '@/composables/auth/useAuth';
import { CookiesKeys } from '@/constants/cookies';
import { http } from '@/modules/http';
import { useUserStore } from '@/stores/user';
import { UserRegistrationFields } from '@/types/user/user';
import { useCookies } from '@vueuse/integrations/useCookies';
import { ref } from 'vue';

export const useRegister = () => {
    const userStore = useUserStore();
    const { getUserByToken } = useAuth();
    const cookies = useCookies();

    const email = ref('');
    const password = ref('');
    const passwordRepeat = ref('');
    const isPolicyAgreed = ref(false);

    const registerUser = async (data: UserRegistrationFields) => {
        const response = await http.post<{ token: string }>('/auth/registration', data);
        const { token } = response.data;

        if (!token) {
            return;
        }

        userStore.$patch({ user: getUserByToken(token) });
        cookies.set(CookiesKeys.ACCESS_TOKEN, token);
    };

    return {
        email,
        password,
        passwordRepeat,
        isPolicyAgreed,
        registerUser
    };
};
