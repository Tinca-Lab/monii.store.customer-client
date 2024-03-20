export const useToast = () => {

    // imports
    const notificationStore = useNotificationStore();

    const notifications = computed(() => notificationStore.notifications);

    // methods
    const add = (notification: {
        type: string,
        title: string,
        description: string,
    }) => notificationStore.addNotification({
        ...notification,
        id: Math.floor(Math.random() * 100) + 1,
    });

    const remove = (id: number) => notificationStore.removeNotification(id);

    const shift = () => notificationStore.shift();

    return {
        notifications,
        add,
        remove,
        shift,
    };
};
