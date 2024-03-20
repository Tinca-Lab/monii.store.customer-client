export default defineNuxtRouteMiddleware((to, from) => {
  useNuxtApp().hook("page:finish", () => {
    if (process.client && to.path !== from.path) {
        window.scrollTo(0, 0);
    }
  });
});
