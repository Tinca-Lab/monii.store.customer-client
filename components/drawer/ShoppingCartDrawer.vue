<script setup lang="ts">
// composable
const cart = useCart();

// props
const props = defineProps<{
  isOpen: boolean;
}>();

// emits
const emits = defineEmits<{
  (event: 'update:isOpen'): void
}>();

// computed
const products: any = computed(() => cart.cartItems.value);
const subtotal = computed(() => cart.getSubtotal())
</script>

<template>
  <ClientOnly>
    <TransitionGroup>
      <div v-if="isOpen"
           @click="emits('update:isOpen')"
           class="fixed top-0 left-0 bg-black/20 h-screen w-screen z-40"/>
      <div
          v-if="isOpen"
          tabindex="-1"
          class="sm:w-max sm:h-max w-screen h-screen bg-white fixed sm:absolute top-0 md:top-24 right-0 z-50 sm:rounded-xl shadow">
        <div class="flex items-center justify-between w-full px-5 py-2 border-b sticky">
          <h2 class="text-lg font-body">Bolsa de compras</h2>
          <button @click="emits('update:isOpen')">
            <IconCancel/>
          </button>
        </div>
        <div class="flex flex-col h-full">
          <ul
              v-if="products.length > 0"
              class="p-5 overflow-y-auto h-96">
            <li
                class="my-4"
                v-for="product in products"
                :key="product._id">
              <div class="flex justify-between items-start font-medium">
                <div class="flex items-start w-max gap-2">
                  <NuxtImg
                      width="100"
                      height="100"
                      :src=" product.variants[0].images[0].url"/>
                  <div class="flex flex-col font-normal">
                    <div class="flex gap-1 items-center">
                    <span v-if="product.variants[0].discount.value || product.variants[0].discount.percent"
                          class="text-red-700 inline">
                    {{
                        useDiscount(
                            product?.variants[0]?.price,
                            product?.variants[0]?.discount?.percent
                        )
                      }}
                  </span>
                      <span
                          :class="[product.variants[0].discount.value || product.variants[0].discount.percent ? 'line-through text-gray-800 text-sm' : 'text-md']"
                          class="font-medium inline-flex">
                    {{ useCurrency(product.variants[0].price) }}
                    </span>
                      <span
                          v-if="product.variants[0].discount.value || product.variants[0].discount.percent"
                          class="bg-green-600 px-2 rounded text-white w-max text-sm">
                     - {{ product.variants[0].discount?.percent }} %
                    </span>
                    </div>
                    <span class="text-sm w-32">
                    {{ product.name }}
                  </span>
                    <div>
                      <ButtonCounterButtonApp
                          @on-increment="cart.increment(product._id)"
                          @on-decrement="cart.decrement(product._id)"
                          class="h-8 w-28"
                          :product="product"/>
                      <button
                          @click="cart.remove(product)"
                          class="text-xs text-red-700 hover:underline">
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div
              class="h-96 p-5"
              v-else
          >
          <span>
            No hay productos en la bolsa :c
          </span>
          </div>
          <div class="border-t h-44 fixed sm:static bottom-0 left-0 w-full px-5">
            <span class="font-medium">Subtotal: </span>
            <span class="font-bold">
            {{ useCurrency(subtotal) || '$0' }}
          </span>
            <p class="text-sm my-4">
              Envío calculado en el momento de la compra.
            </p>
            <NuxtLink
                title="Ir a pagar"
                name="checkout"
                v-if="products.length > 0"
                to="/checkout"
                class="block w-full bg-primary text-center py-2 rounded-lg mt-4 hover:bg-primary/80 ease-in-out duration-150">
              Ir a pagar
            </NuxtLink>
            <NuxtLink
                name="products"
                title="Ver productos"
                v-else
                to="/products"
                class="block w-full bg-primary text-center py-2 rounded-lg mt-4 hover:bg-primary/80 ease-in-out duration-150">
              Ver productos
            </NuxtLink>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </ClientOnly>

</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
