<template>
  <section class="font-body">
    <h1 class="xs:text-sm md:text-xl font-bold font-body text-gray-900 mt-3 ">Detalles De Pedido</h1>
    <section>
      <aside class="flex border-b border-gray-300 justify-between py-3">
        <p>Referencia</p>
        <p>{{ order?._id }}</p>
      </aside>
      <aside class="flex border-b border-gray-300 justify-between py-3">
        <p>Fecha de Pedido</p>
        <p>
          {{ useDate(order?.createdAt) }}
        </p>
      </aside>
      <aside
          v-if="order?.shippingStatus !== 'PENDING'"
          class="flex border-b border-gray-300 justify-between py-3">
        <p>Número de Guía</p>
        <article>
          <p class="text-right">Coordinadora</p>
          <p>
            #3727982749279
          </p>
        </article>
      </aside>
      <aside class="flex border-b border-gray-300 justify-between py-3">
        <p>Estado de envio:</p>
        <p>{{ shippingStatus }}</p>
      </aside>
      <aside class="flex border-b border-gray-300 justify-between py-3">
        <p>Estado del pago:</p>
        <p>{{ paymentStatus }}</p>
      </aside>
      <aside class="border-b border-gray-300 justify-between py-3">
        <p>Producto(s):</p>
        <div class="flex flex-col gap-1.5 h-8 overflow-y-auto"
             v-for="item in order?.items">
          <NuxtLink
              class="hover:text-primary"
              :to="`/products/${item._id}`"
          >
            {{ item.name }} x {{ item.quantity }}
          </NuxtLink>
        </div>
      </aside>
      <aside class="flex border-b border-gray-300 justify-between py-3">
        <p>Envio:</p>
        <p>
          {{ useCurrency(order?.shippingCost) }}
        </p>
      </aside>
      <!--      <aside class="flex border-b border-gray-300 justify-between py-3">-->
      <!--        <p>Metodo De Pago:</p>-->
      <!--        <p>Credito Visa </p>-->
      <!--      </aside>-->
      <aside class="flex justify-between py-3 font-medium font-primary text-xl">
        <p>Total:</p>
        <p>
          {{ useCurrency(order?.amount) }} COP
        </p>
      </aside>
    </section>
    <section class="flex flex-col md:flex-row gap-12">
      <article class="flex flex-col gap-3">
        <h4 class="uppercase font-bold">Direccion De envio</h4>
        <aside class="uppercase">
          <p> {{ order?.shipping?.name }} {{ order?.shipping?.lastname }}</p>
          <p> {{ order?.shipping?.address }} </p>
          <p> {{ order?.shipping?.city }}</p>
          <p> {{ order?.shipping?.state }} </p>
          <p> {{ order.shipping?.zip }} </p>
          <p> {{ order.shipping?.phone }} </p>
          <p> {{ order.shipping?.email }} </p>
        </aside>
      </article>
      <article class="flex flex-col gap-3">
        <h4 class="uppercase font-bold">Direccion De Facturacion</h4>
        <aside class="uppercase">
          <p> {{ order?.billing?.name }} {{ order?.billing?.lastname }}</p>
          <p> {{ order?.billing?.address }} </p>
          <p> {{ order?.billing?.city }}</p>
          <p> {{ order?.billing?.state }} </p>
          <p> {{ order.billing?.zip }} </p>
          <p> {{ order.billing?.phone }} </p>
          <p> {{ order.billing?.email }} </p>
        </aside>
      </article>
    </section>
  </section>
</template>
<script setup lang="ts">

// props
const props = defineProps<{
  order: any;
}>();

// computed
const shippingStatus = computed(() => {
  return props.order?.shippingStatus === 'PENDING' ? 'Pendiente' :
      props.order?.shippingStatus === 'SHIPPED' ? 'Enviado' :
          props.order?.shippingStatus === 'CANCELLED' ? 'Cancelado' :
              props.order?.shippingStatus === 'COMPLETED' ? 'Completado' : ''
})

const paymentStatus = computed(() => {
  return props.order?.paymentStatus === 'PENDING' ? 'Pendiente' :
      props.order?.paymentStatus === 'VOIDED' ? 'Anulado' :
          props.order?.paymentStatus === 'APPROVED' ? 'Aprobado' :
              props.order?.paymentStatus === 'DECLINED' ? 'Declinado' :
                  props.order?.paymentStatus === 'ERROR' ? 'ERROR' : ''
})
</script>
