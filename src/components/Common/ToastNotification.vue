<template>
    <div class="toast" :class="[`toast--${type}`, { 'toast--closable': closable }]">
        <div class="toast__wrapper">
            <h4 v-if="$slots.title" class="toast__title">
                <slot name="title"></slot>
            </h4>

            <div class="toast__content">
                <slot></slot>
            </div>

            <SvgIcon v-if="closable" name="close" class="toast__close" @click="handleClose">
                <IconClose />
            </SvgIcon>
        </div>
    </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon.vue';
import IconClose from '@/icons/IconClose.vue';
import { useNotificationsStore } from '@/stores/notifications';
import { Notification } from '@/types/common/notification';

interface Props {
    id: Notification['id'];
    type: Notification['type'];
    closable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    closable: true
});

const { deleteNotification } = useNotificationsStore();

const handleClose = () => {
    if (!props.closable) return;

    deleteNotification(props.id);
};
</script>

<style lang="scss">
.toast {
    $self: &;

    position: relative;
    padding: 8px 16px;
    font-size: 12px;
    border-radius: 16px;
    display: inline-block;

    &__wrapper {
        display: flex;
        flex-direction: column;
    }

    &__title {
        font-size: 14px;
        margin-bottom: 4px;
    }

    &__content {
        display: flex;
    }

    &--error {
        background: rgba(var(--fg-danger), 0.1);
        color: rgb(var(--fg-danger));
    }

    &--success {
        background: rgba(var(--fg-success), 0.1);
        color: rgb(var(--fg-success));
    }

    &--closable {
        padding-right: 40px;

        #{$self}__close {
            position: absolute;
            right: 8px;
            top: 6px;
            cursor: pointer;
        }
    }
}
</style>
