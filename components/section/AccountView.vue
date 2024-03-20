<template>
  <section class="w-full">
    <section class="block">
      <table class="w-full text-sm text-left rounded-xl">
        <thead class="text-md text-gray-500 uppercase bg-gray-50 rounded-xl">
        <tr>
          <th
              scope="col" class="pr-4 xl:p-0 py-3 font-semibold font-body">
            <span># de Pedido</span>
          </th>
          <th
              scope="col" class="pr-4 xl:p-0 py-3 font-semibold font-body">
            <span># de Productos</span>
          </th>
          <th
              scope="col" class="pr-4 xl:p-0 py-3 font-semibold font-body">
            <span> Total</span>
          </th>
          <th
              scope="col" class=" py-3 font-semibold font-body">
            <span>Estado de envio</span>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            @click="() => { router.push(`/account/orders/${order._id}`) }"
            v-for="order in orders"
            :key="order._id"
            class="hover:bg-gray-50 border-t h-14 cursor-pointer">
          <th class="pr-4 xl:p-0 font-medium font-body">
            {{ order._id }}
          </th>
          <th class="pr-4 xl:p-0 font-medium font-body">
            {{ order.items.length }}
          </th>
          <th class="pr-4 xl:p-0 font-medium font-body">
            {{ useCurrency(order.amount) }}
          </th>
          <th class="pr-4 xl:p-0 font-medium font-body">
            {{ shippingStatus(order) }}
          </th>
        </tr>
        </tbody>
      </table>
    </section>
  </section>
</template>
<script setup lang="ts">


// composable
const router = useRouter();


// props
const props = defineProps<{
  orders: any[];
}>();

// computed
const shippingStatus = (order: any) => {
  return order?.shippingStatus === 'PENDING' ? 'Pendiente' :
      order?.shippingStatus === 'SHIPPED' ? 'Enviado' :
          order?.shippingStatus === 'CANCELLED' ? 'Cancelado' :
              order?.shippingStatus === 'COMPLETED' ? 'Completado' : ''
}
</script>
