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

// data
const name = ref('');
const lastname = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const terms = ref(false);
const isLoadingRegister = ref(false);

// computed
const company = computed(() => companyStore.company);

// methods
const onSubmit = async () => {
  if (!email.value || !password.value || !confirmPassword.value || !name.value || !lastname.value) {
    toast.add({
      description: 'Por favor ingresa todos los campos',
      type: 'warning',
      title: 'Oops!'
    });
    return;
  }

  try {
    isLoadingRegister.value = true;
    const {data, error} = await useFetch(
        `${config.public.baseURL}/api/v2/auth/register`,
        {
          method: 'POST',
          body: JSON.stringify({
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value,
            name: name.value,
            lastname: lastname.value,
            terms: terms.value,
          }),
          server: false,
          lazy: true,
        }
    )
    if (error.value) {
      toast.add({
        description: error.value.data.message,
        type: 'error',
        title: 'Oops!'
      })
      isLoadingRegister.value = false;
      return;
    }
    toast.add({
      description: 'Tu cuenta ha sido creada exitosamente! Por favor inicia sesión.',
      type: 'success',
      title: 'Bienvenido!'
    })
    await router.push('/')
    isLoadingRegister.value = false;
  } catch {
    isLoadingRegister.value = false;
    toast.add({
      description: 'Error desconocido al registrar tu cuenta, por favor intenta de nuevo.',
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
            <div>
              <label
                  for="confirm-password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Confirmar contraseña
              </label>
              <input
                  title="Confirmar contraseña"
                  v-model="confirmPassword"
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  class="bg-gray-50 border font-body border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required="">
            </div>
            <div>
              <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nombres
              </label>
              <input
                  v-model="name"
                  title="Tus nombres"
                  type="text"
                  name="name"
                  autocomplete="name"
                  id="name"
                  class="bg-gray-50 border font-body border-gray-300 text-gray-900 sm:text-sm rounded-lg
                  focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John" required="">
            </div>
            <div>
              <label
                  for="lastname"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nombres
              </label>
              <input
                  v-model="lastname"
                  title="Tus Apellidos"
                  type="text"
                  name="lastname"
                  autocomplete="lastname"
                  id="lastname"
                  class="bg-gray-50 border font-body border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Doe" required="">
            </div>
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                    title="Acepto los terminos y condiciones"
                    id="terms"
                    v-model="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary dark:ring-offset-gray-800 checked:bg-primary"
                    required="">
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="font-light text-gray-500 dark:text-gray-300">
                  Acepto los
                  <NuxtLink
                      target="_blank"
                      :to="company?.terms"
                      class="font-medium text-primary hover:underline dark:text-primary text-base">
                    términos y condiciones
                  </NuxtLink>
                </label>
              </div>
            </div>
            <button
                :disabled="isLoadingRegister"
                type="submit"
                class="w-full text-white bg-primary hover:bg-primary/80 ease-in-out duration-150 focus:ring-4
                focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center
                dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary-800 disabled:cursor-not-allowed disabled:bg-gray-200">
              Registrarme
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Ya tienes una cuenta?
              <NuxtLink to="/login"
                        class="font-medium text-primary hover:underline dark:text-primary text-base">
                Inicia sesión aqui
              </NuxtLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
