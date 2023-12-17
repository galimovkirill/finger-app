<template>
    <div>
        <div class="container">
            <AccountGrid>
                <AccountCard
                    v-for="account in accounts"
                    :key="account.id"
                    :name="account.name"
                    :balance="account.balance"
                />

                <AccountCreateCard />
            </AccountGrid>
        </div>
    </div>
</template>

<script lang="ts" setup>
import AccountCard from '@/components/Account/AccountCard.vue';
import AccountCreateCard from '@/components/Account/AccountCreateCard.vue';
import AccountGrid from '@/components/Account/AccountGrid.vue';
import { useAccountsStore } from '@/stores/accounts';

const { accounts } = useAccountsStore();
</script>
