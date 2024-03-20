export default defineNuxtRouteMiddleware(async (to, from) => {
    const {me, loggedIn} = useAuth()
    const accessToken = useCookie('access_token')

    if (to?.name !== 'login' && from?.name === 'login') {
        if (!accessToken.value) {
            return abortNavigation();
        }
    }

    if (accessToken.value && !loggedIn.value) {
        await me()
    }

    if (accessToken.value && to?.name === 'login') {
        if (process.client) {
            return abortNavigation();
        }
        return navigateTo('/')
    }

    if (!accessToken.value && to?.name !== 'login') {
        abortNavigation();
        return navigateTo('/login');
    }
})
