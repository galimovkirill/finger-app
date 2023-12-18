<template>
    <form class="register-form" @submit.prevent="onSubmit">
        <h1 class="text-heading-s register-form__heading">Регистрация</h1>

        <div class="register-fields">
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

            <FgInput
                v-model="passwordRepeat"
                placeholder="Повторите пароль"
                type="password"
                name="passwordRepeat"
            >
                <template #icon>
                    <SvgIcon>
                        <IconLock />
                    </SvgIcon>
                </template>
            </FgInput>
        </div>

        <div class="register-agreements">
            <FgCheckbox v-model="isPolicyAgreed" id="privacy-policy">
                Принимаю условия пользовательского соглашения
            </FgCheckbox>
        </div>

        <div class="register-actions">
            <FgButton native-type="submit">Зарегистрироваться</FgButton>
            <FgButton type="border" :to="{ name: 'Login' }">У меня есть аккаунт</FgButton>
        </div>
    </form>
</template>

<script lang="ts" setup>
import { FgInput, FgButton, FgCheckbox } from '@galimovdev/fg-ui';
import SvgIcon from '@/components/SvgIcon.vue';
import IconEmail from '@/icons/IconEmail.vue';
import IconLock from '@/icons/IconLock.vue';
import { computed, ref } from 'vue';
import { required, email as emailValidator, minLength, sameAs } from '@vuelidate/validators';
import { PASSWORD_MIN_LENGTH } from '@/constants/auth';
import useVuelidate from '@vuelidate/core';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/auth/useAuth';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { updateUserByToken } = useAuth();

const router = useRouter();

const email = ref('');
const password = ref('');
const passwordRepeat = ref('');
const isPolicyAgreed = ref(false);

const validationRules = computed(() => ({
    email: {
        required,
        email: emailValidator
    },
    password: {
        required,
        minLength: minLength(PASSWORD_MIN_LENGTH)
    },
    passwordRepeat: {
        required,
        sameAsRef: sameAs(password)
    }
}));

const $v = useVuelidate(validationRules, {
    email,
    password,
    passwordRepeat
});

const onSubmit = async () => {
    await $v.value.$validate();

    if ($v.value.$error) {
        return;
    }

    try {
        const { token } = await userStore.registerUser({
            email: email.value,
            password: password.value
        });

        updateUserByToken(token);
    } catch (err) {
        console.error(err);
    }

    router.push({ name: 'Home' });
};
</script>

<style lang="scss">
.register-form {
    max-width: 300px;
    width: 100%;

    &__heading {
        margin-bottom: 16px;
    }
}

.register-fields {
    display: grid;
    gap: 8px;
}

.register-actions {
    display: grid;
    gap: 8px;
    margin-top: 24px;
}

.register-agreements {
    margin-top: 24px;
}
</style>
