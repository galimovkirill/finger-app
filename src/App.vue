<template>
    <div class="app">
        <Component :is="layout">
            <RouterView />
        </Component>

        <div class="app__notifications">
            <ToastNotification
                v-for="notification in notifications"
                :key="notification.id"
                :id="notification.id"
                :type="notification.type"
            >
                {{ notification.message }}
            </ToastNotification>
        </div>
    </div>
</template>

<script lang="ts" setup>
import ToastNotification from '@/components/Common/ToastNotification.vue';
import { useInitialData } from '@/composables/useInitialData';
import { useNotificationsStore } from '@/stores/notifications';
import { storeToRefs } from 'pinia';
import { capitalize, computed, defineAsyncComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const { getInitialData } = useInitialData();

const router = useRouter();
const layout = computed(() => {
    const layoutFromMeta = router.currentRoute.value.meta.layout || 'default';
    const layoutName = `${capitalize(layoutFromMeta)}Layout`;

    return defineAsyncComponent(() => import(`@/layouts/${layoutName}.vue`));
});

const { notifications } = storeToRefs(useNotificationsStore());

onMounted(async () => {
    await getInitialData();
});
</script>

<style lang="scss">
.app {
    &__notifications {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        position: fixed;
        left: 32px;
        bottom: 32px;
        max-width: 400px;
        width: 100%;
        gap: 8px;
    }
}
</style>
