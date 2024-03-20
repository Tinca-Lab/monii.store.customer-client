<script setup lang="ts">
// meta
definePageMeta({
  layout: 'empty',
})

// composable
const route = useRoute();
const config = useRuntimeConfig();
const toast = useToast();
const router = useRouter();

// data
const {data, error, pending} = await useFetch(
    '/api/v2/auth/verify', {
      method: 'GET',
      baseURL: config.public.baseURL,
      server: false,
      lazy: true,
      query: {
        token: route.query.token,
        email: route.query.email,
        timestamp: route.query.timestamp,
        company: route.query.company,
      }
    })


watch(() => data.value, (value) => {
  if (value) {
    toast.add({
      description: 'Cuenta verificada correctamente, ya puedes iniciar sesión',
      type: 'success',
      title: '¡Exito!'
    })
    router.push('/login')
  }
})

watch(() => error.value, (value) => {
  if (value) {
    toast.add({
      description: value.data.message,
      type: 'error',
      title: 'Oops!'
    })
  }
})

</script>

<template>
  <div v-if="pending">
    Verificando...
  </div>
  <div v-else-if="error">
    Error al verificar
  </div>
  <div v-else>
    Verificado
  </div>
</template>

<style scoped>

</style>
