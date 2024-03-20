<template>
  <section class="px-6 py-3 relative">
    <h1 class="font-body font-semibold block text-center">Bolsa de compras</h1>
    <div class="flex flex-col items-center" v-if="!products[0]">
      <img
          class="block mx-auto"
          src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" alt="">
      <span class="font-body">
        Tu carrito de compras está vacío :(
      </span>
    </div>
    <div class="grid grid-cols-4 md:grid-cols-12" v-else>
      <TableProduct
          :products="products"
          class="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-2"/>
      <SectionOrderSummary
          @onPurchase="() => {
            router.push('/checkout')
          }"
          class="col-span-4 lg:col-span-3 sticky top-28"/>
    </div>
  </section>
</template>
<script setup lang="ts">
// composable
const cart = useCart();
const router = useRouter();

// metadata
useHead({
  title: 'Carrito de compras',
  meta: [
    {
      name: 'description',
      content: 'Carrito de compras',
    },
  ],
});

// computed
const products = computed(() => cart.cartItems.value);
</script>
