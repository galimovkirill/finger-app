<template>
    <form class="register-form" @submit.prevent="submitRegister">
        <h1 class="text-heading-s register-form__heading">Регистрация</h1>

        <div class="register-fields">
            <BaseInput v-model="login" placeholder="Электронный адрес" type="email">
                <template #icon>
                    <SvgIcon>
                        <IconEmail />
                    </SvgIcon>
                </template>
            </BaseInput>

            <BaseInput v-model="password" placeholder="Пароль" type="password">
                <template #icon>
                    <SvgIcon>
                        <IconLock />
                    </SvgIcon>
                </template>
            </BaseInput>

            <BaseInput v-model="passwordRepeat" placeholder="Повторите пароль" type="password">
                <template #icon>
                    <SvgIcon>
                        <IconLock />
                    </SvgIcon>
                </template>
            </BaseInput>
        </div>

        <div class="register-agreements">
            <BaseCheckbox v-model="isPolicyAgreed" id="privacy-policy">
                Принимаю условия пользовательского соглашения
            </BaseCheckbox>
        </div>

        <div class="register-actions">
            <BaseButton native-type="submit">Зарегистрироваться</BaseButton>
            <BaseButton type="border" :to="{ name: 'Login' }">У меня есть аккаунт</BaseButton>
        </div>
    </form>
</template>

<script lang="ts" setup>
import { BaseInput, BaseButton, BaseCheckbox } from '@galimovdev/fg-ui';
import SvgIcon from '@/components/SvgIcon.vue';
import IconEmail from '@/icons/IconEmail.vue';
import IconLock from '@/icons/IconLock.vue';
import { useRegister } from '@/composables/useRegister';

const { login, password, passwordRepeat, isPolicyAgreed, submitRegister } = useRegister();
</script>

<style lang="scss">
.register-form {
    min-width: 300px;

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