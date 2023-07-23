<template>
    <div
        class="toast"
        :class="[`toast--${props.notification.type}`]"
        @click="deleteNotification(props.notification.id)"
    >
        <div class="toast__wrapper">
            <div class="toast__content">
                <slot></slot>
            </div>

            <SvgIcon name="close" class="toast__close">
                <IconExit />
            </SvgIcon>
        </div>
    </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon.vue';
import IconExit from '@/icons/IconExit.vue';
import { useNotificationsStore } from '@/stores/notifications';
import { Notification } from '@/types/common/notification';

interface Props {
    notification: Notification;
}

const props = defineProps<Props>();

const { deleteNotification } = useNotificationsStore();
</script>

<style lang="scss">
.toast {
    $self: &;

    padding: 8px 16px;
    font-size: 12px;
    border-radius: 16px;
    display: inline-block;
    margin: 0 auto;

    &__wrapper {
        display: flex;
        align-items: center;
    }

    &__close {
        margin-left: 8px;
    }

    &--error {
        background: rgba(var(--fg-danger), 0.1);
        color: rgb(var(--fg-danger));

        #{$self}__close {
            fill: var(--color-danger);
        }
    }
}
</style>
