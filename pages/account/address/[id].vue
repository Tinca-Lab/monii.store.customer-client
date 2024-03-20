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
          :to="`/account/address/${route.params.id}`"
          class="font-body"
      >
        Editar Direcion
      </NuxtLink>
    </header>
    <FormAddress
        :isUpdatingAddress="isUpdatingAddress"
        :value="address || {}"
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
const route = useRoute();
const toast = useToast();

// data
const isUpdatingAddress = ref(false);

const {data: address, error: ErrorAddress} = await useAsyncData<any, any>(
    'address',
    () => $fetch(`/api/v2/user/address/${route.params.id}`, {
      baseURL: config.public.baseURL,
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      }
    }),
    {
      server: false,
      lazy: true,
    }
);

if (ErrorAddress.value && !address.value) {
  toast.add({
    description: ErrorAddress.value.data.message,
    type: 'error',
    title: 'Oops!'
  })
  await router.push('/account/address')
}

// methods
const onSubmit = async () => {
  isUpdatingAddress.value = true;
  try {
    const {error} = await useFetch(
        `${config.public.baseURL}/api/v2/user/address/${route.params.id}`,
        {
          method: 'PUT',
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
      });
      return;
    }
    isUpdatingAddress.value = true;
    await router.push('/account/address')
  } catch {
    isUpdatingAddress.value = false;
    toast.add({
      description: 'Error desconocido al actualizar tu dirección, por favor intenta de nuevo.',
      type: 'error',
      title: 'Oops!'
    });
  }
};
</script>
