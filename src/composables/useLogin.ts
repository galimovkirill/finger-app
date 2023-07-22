import { useUserStore } from '@/stores/user';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { required, email as emailValidator, minLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

export const useLogin = () => {
    const email = ref('');
    const password = ref('');

    const router = useRouter();
    const userStore = useUserStore();

    const validationRules = computed(() => ({
        email: {
            required,
            email: emailValidator
        },
        password: {
            required,
            minLength: minLength(6)
        }
    }));

    const $v = useVuelidate(validationRules, {
        email,
        password
    });

    const onSubmit = async () => {
        await $v.value.$validate();

        if ($v.value.$error) {
            return;
        }

        await userStore.loginUser({ email: email.value, password: password.value });
        router.push({ name: 'Home' });
    };

    return { email, password, onSubmit, $v };
};
