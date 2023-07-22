<template>
    <form class="login-form" @submit.prevent="submitLogin">
        <h1 class="text-heading-s login-form__heading">Авторизация</h1>

        <div class="login-fields">
            <FgInput v-model="email" placeholder="Электронный адрес" type="email">
                <template #icon>
                    <SvgIcon>
                        <IconEmail />
                    </SvgIcon>
                </template>
            </FgInput>

            <FgInput v-model="password" placeholder="Пароль" type="password">
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
import { useLogin } from '@/composables/useLogin';

const { email, password, submitLogin } = useLogin();
</script>

<style lang="scss">
.login-form {
    min-width: 300px;

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
