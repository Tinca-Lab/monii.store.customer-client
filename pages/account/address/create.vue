<template>
  <section class="grid grid-cols-4 md:grid-cols-7 lg:grid-cols-12 gap-3 md:gap-4 px-3 md:px-4 py-3">
    <header class="col-span-4 md:col-span-full md:col-start-2 lg:col-start-5 flex gap-3 items-center text-sm">
      <NuxtLink
          class="font-body"
          to="/account/address">
        Direcciones
      </NuxtLink>
      <IconRightArrow/>
      <NuxtLink
          to="/account/address/create"
          class="font-body"
      >
        Crear Direcion
      </NuxtLink>
    </header>
    <FormAddress
        :value="address"
        class="col-span-4 md:col-span-5 md:col-start-2 lg:col-start-5 lg:col-span-4"
        @onSubmit="onSubmit"
    />
  </section>
</template>
<script setup lang="ts">

// meta

definePageMeta({
  layout: 'default',
  middleware: ['auth'],
})

// composable
const config = useRuntimeConfig();
const accessToken = useCookie('access_token');
const router = useRouter();
const toast = useToast();

// data
const address = ref({
  name: '',
  lastname: '',
  email: '',
  state: '',
  stateId: '',
  city: '',
  cityId: '',
  street: '',
  phone: '',
  zip: '',
});

// methods
const onSubmit = async () => {
  if (!address.value.name || !address.value.lastname || !address.value.email || !address.value.state || !address.value.city || !address.value.street || !address.value.phone || !address.value.zip) {
    toast.add({
      description: 'Por favor ingresa todos los campos',
      type: 'warning',
      title: 'Oops!'
    })
    return;
  }
  try {
    const {error} = await useFetch(
        '/api/v2/user/address/create',
        {
          baseURL: config.public.baseURL,
          method: 'POST',
          body: JSON.stringify(address.value),
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          }
        }
    );
    if (error.value) {
      toast.add({
        description: error.value.data.message,
        type: 'error',
        title: 'Oops!'
      })
      return;
    }
    toast.add({
      description: 'Dirección creada con éxito',
      type: 'success',
      title: '¡Listo!'
    })
    await router.push('/account/address')
  } catch {
    toast.add({
      description: 'Error desconocido al crear la dirección',
      type: 'error',
      title: 'Oops!'
    })
  }
};
</script>
