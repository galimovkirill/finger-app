import { ref } from 'vue';

export const useRegister = () => {
    const email = ref('');
    const password = ref('');
    const passwordRepeat = ref('');

    const isPolicyAgreed = ref(false);

    const submitRegister = () => {
        console.log('Form data: ', { email, password, passwordRepeat });
    };

    return {
        email,
        password,
        passwordRepeat,
        isPolicyAgreed,
        submitRegister
    };
};
