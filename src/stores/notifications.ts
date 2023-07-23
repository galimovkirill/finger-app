import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Notification } from '@/types/common/notification';
import { uid } from 'uid/single';

export const useNotificationsStore = defineStore('notifications', () => {
    const notifications = ref<Notification[]>([]);

    const addNotification = (notification: Omit<Notification, 'id'>) => {
        const notificationUid = uid();
        notifications.value = [...notifications.value, { id: notificationUid, ...notification }];

        // setTimeout(() => {
        //     deleteNotification(notificationUid);
        // }, 5000);
    };

    const deleteNotification = (notificationId: Notification['id']) => {
        const notificationIndex = notifications.value.findIndex((n) => n.id === notificationId);

        if (notificationIndex > -1) {
            notifications.value.splice(notificationIndex, 1);
        }
    };

    return {
        notifications,
        addNotification,
        deleteNotification
    };
});
