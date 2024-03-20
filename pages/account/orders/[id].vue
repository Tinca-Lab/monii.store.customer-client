<template>
  <section
      v-if="accessToken"
      class="grid grid-cols-4 md:grid-cols-7 lg:grid-cols-12 gap-3 md:gap-4 px-3 md:px-4 py-10 md:py-0 md:pt-14"
  >
    <header
        v-if="!isLoadingOrder && order"
        class="flex items-center gap-4 col-span-full lg:col-start-4 font-body"
    >
      <NuxtLink to="/account/orders"> Mis pedidos</NuxtLink>
      <IconRightArrow/>
      <NuxtLink :to="`/account/orders/${route.params.id}`">Detalles del pediddo</NuxtLink>
    </header>
    <div
        class="col-span-full flex justify-center items-center"
        v-if="isLoadingOrder">
      <img
          class="block mx-auto" src="@/assets/media/lotties/loading.gif"
          :alt="isLoadingOrder ? 'Cargando' : 'No se encontro informacion'">
    </div>
    <div
        class="col-span-full flex justify-center items-center"
        v-else-if="!order">
      <ErrorsNotFound @onClick="router.push('/account/orders')" label="Volver a ordenes">
        <template #title>
          <span class="text-3xl flex justify-center text-center mb-4">
            No se encontro esta orden <br> o no existe
          </span>
        </template>
      </ErrorsNotFound>
    </div>
    <SectionOrderDetail
        v-else
        :order="order"
        class="col-span-4 md:col-span-full lg:col-start-4 lg:col-span-6 bg-white rounded-xl"/>
  </section>
  <section v-else>
    <div class="max-w-sm p-6 bg-white rounded-lg  mx-auto my-14 flex flex-col justify-center items-center">
      <h5 class="mb-2 text-5xl font-primary font-bold tracking-tight text-gray-900">
        Inicia Sesión
      </h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 font-body text-2xl text-center">
        Debes iniciar sesión si lo que quieres es ver tus pedidos.
      </p>
      <NuxtLink
          title="Iniciar Sesion"
          to="/login"
          class="inline-flex w-max  items-center px-3 py-2 text-sm font-medium text-center text-white bg-neutral-700 rounded-lg hover:bg-neutral-600 focus:ring-0 focus:outline-none">
        Iniciar Sesion
        <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
// composable
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const accessToken = useCookie('access_token');

// meta
definePageMeta({
  layout: 'default',
})

// data
const {data: order, pending: isLoadingOrder, refresh: FetchOrder} = await useAsyncData(
    'order',
    () => $fetch(`/api/v2/order/${route.params.id}`, {
      baseURL: config.public.baseURL,
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      }
    }),
    {
      server: false,
      lazy: true
    }
)
</script>
