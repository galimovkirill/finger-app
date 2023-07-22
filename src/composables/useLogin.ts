import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useLogin = () => {
    const email = ref('');
    const password = ref('');

    const router = useRouter();

    const userStore = useUserStore();

    const submitLogin = async () => {
        if (!email.value || !password.value) {
            return;
        }

        await userStore.loginUser({ email: email.value, password: password.value });
        router.push({ name: 'Home' });
    };

    return { email, password, submitLogin };
};
