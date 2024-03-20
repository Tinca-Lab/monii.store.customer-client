export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: null,
        loggedIn: false,
    }),
    actions: {
        setUser(user: any) {
            this.user = user;
        },
        setLoggedIn(loggedIn: boolean) {
            this.loggedIn = loggedIn;
        },
    }
});
