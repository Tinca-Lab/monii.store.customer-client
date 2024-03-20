<script setup lang="ts">
// seo
useHead({
  title: 'Iniciar Sesión',
})

// meta
definePageMeta({
  layout: 'empty',
  middleware: ['guest']
})

// composable
const router = useRouter();
const companyStore = useCompanyStore();
const toast = useToast();
const config = useRuntimeConfig();
const auth = useAuth();
const route = useRoute();

// data
const email = ref('');
const password = ref('');
const isLoadingLogin = ref(false);
const redirect = ref(route.query.redirect);

// computed
const company = computed(() => companyStore.company);

// methods
const onSubmit = async () => {
  if (!email.value || !password.value) {
    toast.add({
      description: 'Por favor ingresa todos los campos',
      type: 'warning',
      title: 'Oops!'
    });
    return;
  }

  try {
    isLoadingLogin.value = true;
    await auth.login({
      email: email.value,
      password: password.value,
    }, redirect.value as string);
    isLoadingLogin.value = false;
  } catch {
    isLoadingLogin.value = false;
    toast.add({
      description: 'Error desconocido al iniciar sesion, por favor intenta de nuevo',
      type: 'error',
      title: 'Oops!'
    })
  }
}
</script>

<template>
  <section class="bg-gray-50 h-screen">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <NuxtLink
          prefetch
          to="/"
          class="flex mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <NuxtImg
            v-if="company?.config?.logo"
            class="w-max h-10 mr-2 pointer-events-none"
            :src="company?.config?.logo"
            :alt="company?.config?.logo"/>
        <span
            v-else
            class="font-primary">
          {{ company?.name }}
        </span>
      </NuxtLink>
      <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-body font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Crea una cuenta
          </h1>
          <form
              class="space-y-4 md:space-y-6"
              @submit.prevent="onSubmit">
            <div>
              <label for="email"
                     class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Correo electrónico
              </label>
              <input
                  v-model="email"
                  title="Tu correo electrónico"
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border font-body border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="john@doe.com" required="">
            </div>
            <div>
              <label for="password"
                     class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Contraseña
              </label>
              <input
                  title="Tu contraseña"
                  v-model="password"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border font-body border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required="">
            </div>
            <AppButtonPrimaryBasic
                block
                type="submit"
                :disabled="isLoadingLogin"
            >
              Iniciar Sesión
            </AppButtonPrimaryBasic>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              No tienes una cuenta?
              <NuxtLink to="/register"
                        class="font-medium text-primary hover:underline dark:text-primary text-base">
                Registrate aqui
              </NuxtLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
