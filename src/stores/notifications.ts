import { defineStore } from 'pinia';
import { Notification } from '@/types/common/notification';
import { uid } from 'uid/single';

interface State {
    notifications: Notification[];
}

export const useNotificationsStore = defineStore('notifications', {
    state: (): State => ({
        notifications: []
    }),

    actions: {
        /**
         * @param delay delay to auto-delete notification in milliseconds
         */
        addNotification(notification: Omit<Notification, 'id'>, delay?: number) {
            const notificationUid = uid();
            this.notifications = [...this.notifications, { id: notificationUid, ...notification }];

            if (delay) {
                setTimeout(() => this.deleteNotification(notificationUid), delay);
            }
        },

        deleteNotification(notificationId: Notification['id']) {
            const notificationIndex = this.notifications.findIndex((n) => n.id === notificationId);

            if (notificationIndex > -1) {
                this.notifications.splice(notificationIndex, 1);
            }
        }
    }
});
