<template>
    <form class="account-create" @submit.prevent="onSubmit">
        <div class="account-create__fields">
            <FgInput v-model="accountName" placeholder="Название счета" name="accountName" />
            <FgInput v-model="initialBalance" placeholder="Начальный баланс" type="number" name="initialBalance" />
            <FgSelect
                v-model="currencyCode"
                :options="currenciesStore.currencies.map((c) => c.code)"
                placeholder="Валюта"
            />
        </div>

        <FgButton expanded native-type="submit">Сохранить</FgButton>
    </form>
</template>

<script lang="ts" setup>
import { useAccountsStore } from '@/stores/accounts';
import { useCurrenciesStore } from '@/stores/currencies';
import { useNotificationsStore } from '@/stores/notifications';
import { FgInput, FgSelect, FgButton } from '@galimovdev/fg-ui';
import { ref } from 'vue';

const emit = defineEmits<{ onSubmitCallback: [] }>();

const accountsStore = useAccountsStore();
const notificationsStore = useNotificationsStore();
const currenciesStore = useCurrenciesStore();

const accountName = ref('');
const initialBalance = ref(0);
const currencyCode = ref('');

const onSubmit = async () => {
    try {
        await accountsStore.createAccount({
            name: accountName.value,
            initialBalance: initialBalance.value,
            currencyCode: currencyCode.value
        });

        notificationsStore.addNotification(
            {
                type: 'success',
                message: `Счет ${accountName.value} успешно добавлен`
            },
            5000
        );

        emit('onSubmitCallback');
    } catch (err) {
        console.error(err);
    }
};
</script>

<style lang="scss" scoped>
.account-create {
    display: flex;
    flex-direction: column;
    gap: 16px;

    &__fields {
        display: flex;
        flex-direction: column;
        gap: 8px;
        z-index: 10;
    }
}
</style>
