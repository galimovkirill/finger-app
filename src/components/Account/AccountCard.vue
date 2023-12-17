<template>
    <div class="account-card">
        <div class="account-card__wrapper">
            <FgAvatar color="primary">{{ name }}</FgAvatar>

            <div class="account-card__body">
                <span class="account-card__title">{{ name }}</span>
                <FgCounter :value="balance" class="account-card__balance" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Account } from '@/types/account/account';
import { FgAvatar, FgCounter } from '@galimovdev/fg-ui';

interface Props extends Pick<Account, 'name' | 'balance'> {}

defineProps<Props>();
</script>

<style lang="scss">
@import '@/assets/styles/mixin.scss';
@import '@/assets/styles/typography.scss';

.account-card {
    background-color: getColor('base-02');
    border-radius: 16px;
    user-select: none;
    transition: 0.2s ease;
    display: flex;

    &__wrapper {
        display: flex;
        align-items: center;
        padding: 18px 16px;
    }

    &__body {
        display: flex;
        flex-direction: column;
        margin-left: 12px;
    }

    &__title {
        @extend .text-body-s;
    }

    &__balance {
        @extend .text-body-l, .text-body-bold;
    }

    &:hover {
        background-color: getColor('base-04');
    }
}
</style>
