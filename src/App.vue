<template>
    <div class="app">
        <Component :is="layout">
            <RouterView />
        </Component>

        <div class="app__notifications">
            <ToastNotification
                v-for="notification in notifications"
                :key="notification.id"
                :notification="notification"
            >
                test
            </ToastNotification>
        </div>
    </div>
</template>

<script lang="ts" setup>
import ToastNotification from '@/components/Common/ToastNotification.vue';
import { useNotificationsStore } from '@/stores/notifications';
import { capitalize, computed, defineAsyncComponent, toRefs } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const layout = computed(() => {
    const layoutFromMeta = router.currentRoute.value.meta.layout || 'default';
    const layoutName = `${capitalize(layoutFromMeta)}Layout`;

    return defineAsyncComponent(() => import(`@/layouts/${layoutName}.vue`));
});

const { notifications } = toRefs(useNotificationsStore());
</script>

<style lang="scss">
.app {
    &__notifications {
        position: fixed;
        justify-content: flex-start;
        left: 32px;
        bottom: 32px;
        max-width: 90%;
        width: 100%;
        display: grid;
        gap: 8px;
    }
}
</style>
