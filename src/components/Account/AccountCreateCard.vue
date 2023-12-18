<template>
    <div class="account-create" :class="buttonClasses" @click="isCreationModalShown = true">
        Добавить счет
    </div>

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
import { computed, ref } from 'vue';

interface Props {
    view?: 'text' | 'card';
}

const props = withDefaults(defineProps<Props>(), {
    view: 'text'
});

const buttonClasses = computed(() =>
    props.view === 'card' ? 'account-create--card' : 'account-create--text'
);

const isCreationModalShown = ref(false);
</script>

<style lang="scss">
@import '@/assets/styles/mixin.scss';
@import '@/assets/styles/typography.scss';

.account-create {
    @extend .text-body-s;

    cursor: pointer;
    user-select: none;

    &--card {
        border: 1px solid getColor('base-04');
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.2s ease;
        height: 100%;

        &:hover {
            background-color: getColor('base-02');
        }
    }
}
</style>
