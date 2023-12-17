<template>
    <div class="account-create-card" @click="isCreationModalShown = true">Добавить счет</div>

    <Teleport to="body">
        <FgModal v-if="isCreationModalShown" @close-modal="isCreationModalShown = false">
            <template #header>
                <h3>Создать счет</h3>
            </template>

            <template #default="{ close }">
                <AccountCreateForm @on-submit-callback="close" />
            </template>
        </FgModal>
    </Teleport>
</template>

<script lang="ts" setup>
import { FgModal } from '@galimovdev/fg-ui';
import AccountCreateForm from '@/components/Account/AccountCreateForm.vue';
import { ref } from 'vue';

const isCreationModalShown = ref(false);
</script>

<style lang="scss">
@import '@/assets/styles/mixin.scss';
@import '@/assets/styles/typography.scss';

.account-create-card {
    @extend .text-body-s;

    border: 1px solid getColor('base-04');
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    transition: 0.2s ease;

    &:hover {
        background-color: getColor('base-02');
    }
}
</style>
