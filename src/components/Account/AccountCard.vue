<template>
    <div class="account-card">
        <div class="account-card__wrapper">
            <FgAvatar color="primary">test</FgAvatar>

            <div class="account-card__body">
                <span class="account-card__title">{{ data.title }}</span>
                <FgCounter :value="data.balance" class="account-card__balance" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { FgAvatar, FgCounter } from '@galimovdev/fg-ui';

export interface IAccountCard {
    title: string;
    balance: number;
}

interface Props {
    data: IAccountCard;
}

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
