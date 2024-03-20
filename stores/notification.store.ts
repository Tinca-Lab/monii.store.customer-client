type Notification = {
    type: string,
    title: string,
    description: string,
    id: number,
}

export const useNotificationStore = defineStore('notification', {
    state: () => ({
        notifications: [] as Notification[],
    }),
    actions: {
        addNotification(notification: Notification): void {
            this.notifications.push(notification);
        },
        removeNotification(id: number): void {
            this.notifications = this.notifications.filter((notification: Notification): boolean => notification.id !== id);
        },
        shift(): void {
            this.notifications.shift();
        }
    },
});
