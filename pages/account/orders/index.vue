<template>
  <div class="grid grid-cols-12 gap-4 mt-4 px-4">
    <NavAccount class="col-span-full sm:col-span-2 sm:col-start-2 gap-4"/>
    <SectionAccountView
        v-if="!isLoadingOrders && orders"
        :orders="orders"
        class="col-span-full lg:col-span-8 gap-4 md:px-8 px-4"/>
    <div
        class="lg:col-span-8 col-span-full"
        v-else-if="isLoadingOrders">
      <img
          class="block mx-auto" src="@/assets/media/lotties/loading.gif"
          :alt="isLoadingOrders ? 'Cargando' : 'No se encontro informacion'">
    </div>
    <div
        class="lg:col-span-8 col-span-full flex justify-center items-center"
        v-else>
      <ErrorsNotFound @on-click="router.push('/products')" label="Ver productos">
        <template #title>
            <span class="text-3xl text-center mb-4">
              Aun no tienes pedidos
            </span>
        </template>
      </ErrorsNotFound>
    </div>
  </div>
</template>

<script setup>

// composable
const config = useRuntimeConfig();
const router = useRouter();
const toast = useToast();

// meta
definePageMeta({
  layout: 'default',
  middleware: ['auth'],
})

useHead({
  title: 'Mis pedidos',
  meta: [
    {
      name: 'description',
      content: 'Orders'
    }
  ]
})


// data
const page = ref(1);
const pageSize = ref(10);
const sortBy = ref('createdAt');
const sort = ref('desc');
const accessToken = useCookie('access_token');

const {data: orders, error: ErrorOrders, pending: isLoadingOrders, refresh: fetchOrders} = await useAsyncData(
    'orders',
    () => $fetch(`${config.public.baseURL}/api/v2/user/orders`, {
      params: {
        page: page.value,
        pageSize: pageSize.value,
        sortBy: sortBy.value,
        sort: sort.value,
      },
      headers: {
        authorization: `Bearer ${accessToken.value}`,
      }
    }),
    {
      server: false,
      lazy: true
    }
)

if (ErrorOrders.value) {
  toast.add({
    type: 'error',
    title: 'Oops!',
    description: ErrorOrders.value.data.message,
  })
}
</script>
