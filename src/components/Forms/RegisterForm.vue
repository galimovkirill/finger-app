<template>
    <form class="register-form" @submit.prevent="submitRegister">
        <h1 class="text-heading-s register-form__heading">Регистрация</h1>

        <div class="register-fields">
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

            <FgInput v-model="passwordRepeat" placeholder="Повторите пароль" type="password">
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
import { useRegister } from '@/composables/useRegister';

const { email, password, passwordRepeat, isPolicyAgreed, submitRegister } = useRegister();
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
