<template>
    <div class="container">
        <FgGrid
            :justify="{
                sm: hasAccounts ? 'start' : 'center',
                md: hasAccounts ? 'start' : 'center',
                xl: hasAccounts ? 'start' : 'center'
            }"
            :gutter="{
                sm: { horizontal: 8, vertical: 8 },
                md: { horizontal: 8, vertical: 8 },
                xl: { horizontal: 16, vertical: 16 }
            }"
            :style="{
                alignItems: 'stretch',
                textAlign: !hasAccounts && 'center'
            }"
        >
            <FgGridColumn
                v-for="account in accounts"
                :key="account.id"
                :span="{ sm: 12, md: 6, xl: 3 }"
            >
                <AccountCard :name="account.name" :balance="account.balance" />
            </FgGridColumn>

            <FgGridColumn v-if="!hasAccounts">
                <p>У Вас пока нет открытых счетов</p>
            </FgGridColumn>

            <FgGridColumn :span="{ sm: 12, md: 6, xl: 3 }">
                <AccountCreateCard :view="hasAccounts ? 'card' : 'text'" />
            </FgGridColumn>
        </FgGrid>
    </div>
</template>

<script lang="ts" setup>
import { FgGrid, FgGridColumn } from '@galimovdev/fg-ui';
import AccountCard from '@/components/Account/AccountCard.vue';
import AccountCreateCard from '@/components/Account/AccountCreateCard.vue';
import { useAccountsStore } from '@/stores/accounts';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const { accounts } = storeToRefs(useAccountsStore());

const hasAccounts = computed(() => !!accounts.value.length);
</script>

<style lang="scss"></style>
