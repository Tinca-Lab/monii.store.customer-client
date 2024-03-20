export default defineNuxtRouteMiddleware(async (to, from) => {
    const accessToken = useCookie('access_token')

    if (accessToken.value && to?.name === 'register') {
        if (process.client) {
            return abortNavigation();
        }
        return navigateTo('/')
    }

})
