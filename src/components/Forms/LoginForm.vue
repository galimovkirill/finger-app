<template>
    <form class="login-form" @submit.prevent="onSubmit">
        <h1 class="text-heading-s login-form__heading">Авторизация</h1>

        <div class="login-fields">
            <FgInput
                v-model="email"
                :invalid="$v.email.$dirty && $v.email.$invalid"
                placeholder="Электронный адрес"
                type="email"
                name="email"
            >
                <template #icon>
                    <SvgIcon>
                        <IconEmail />
                    </SvgIcon>
                </template>
            </FgInput>

            <FgInput
                v-model="password"
                :invalid="$v.password.$dirty && $v.password.$invalid"
                placeholder="Пароль"
                type="password"
                name="password"
            >
                <template #icon>
                    <SvgIcon>
                        <IconLock />
                    </SvgIcon>
                </template>
            </FgInput>
        </div>

        <div class="login-actions">
            <FgButton native-type="submit">Войти</FgButton>
            <FgButton type="border" :to="{ name: 'Register' }">Зарегистрироваться</FgButton>
        </div>
    </form>
</template>

<script lang="ts" setup>
import { FgButton, FgInput } from '@galimovdev/fg-ui';
import SvgIcon from '@/components/SvgIcon.vue';
import IconLock from '@/icons/IconLock.vue';
import IconEmail from '@/icons/IconEmail.vue';
import useVuelidate from '@vuelidate/core';
import { required, email as emailValidator, minLength } from '@vuelidate/validators';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { PASSWORD_MIN_LENGTH } from '@/constants/auth';
import { useAuth } from '@/composables/auth/useAuth';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const router = useRouter();

const { updateUserByToken } = useAuth();

const email = ref('');
const password = ref('');

const validationRules = computed(() => ({
    email: {
        required,
        email: emailValidator
    },
    password: {
        required,
        minLength: minLength(PASSWORD_MIN_LENGTH)
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

    try {
        const { token } = await userStore.loginUser({
            email: email.value,
            password: password.value
        });

        updateUserByToken(token);
    } catch (error) {
        console.log(error);
    }

    router.push({ name: 'Home' });
};
</script>

<style lang="scss">
.login-form {
    max-width: 300px;
    width: 100%;

    &__heading {
        margin-bottom: 16px;
    }
}

.login-fields {
    display: grid;
    gap: 8px;
}

.login-actions {
    display: grid;
    gap: 8px;
    margin-top: 16px;
}
</style>
