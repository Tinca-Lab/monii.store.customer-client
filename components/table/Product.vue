<template>
  <section class="w-full py-4">
    <!--Mobile View-->
    <section class="flex gap-3 flex-col">
      <AppCardProductBasic
          v-for="product in products"
          :key="product._id"
          class="flex md:hidden bg-gray-50 rounded-lg"
          :product="product"/>
    </section>
    <!--Desktop View -->
    <section class="hidden md:block bg-primary/5 rounded-xl">
      <article
          class="w-full grid sm:grid-cols-4 text-gray-500 font-inter uppercase text-xs font-semibold bg-gray-50 md:grid-cols-4 px-4 py-6 justify-items-center rounded-t-xl">
        <section class="justify-self-start uppercase">Producto</section>
        <section class="text-center">Cantidad</section>
        <section class="text-center">Precio Individual</section>
        <section class="text-center">Acciones</section>
      </article>
      <article
          v-for="product in products"
          :key="product._id"
          class="hidden sm:grid md:grid-cols-4 px-4 py-6 rounded-b-xl">
        <section class="flex flex-col items-center lg:flex-row gap-2 border-r border-primary">
          <img class="w-12 max-h-16 rounded-lg"
               :src="product?.variants[0]?.images[0]?.url"
               alt=""/>
          <article class="flex flex-col">
            <h3 class="font-body font-medium leading-[150%]">{{ product?.name }}</h3>
          </article>
        </section>
        <section class="flex justify-center items-center  border-r border-primary p-3">
          <ButtonCounterButtonApp
              @on-increment="onIncrement"
              @on-decrement="onDecrement"
              :product="product"/>
        </section>
        <section class="flex flex-col justify-center items-center border-r border-primary">
          <article class="flex flex-col gap-1">
            <span
                :class="product?.variants[0]?.discount ? 'text-red-600 lg:text-lg flex text-center font-body font-medium' : 'hidden'">
              {{
                useDiscount(
                    product?.variants[0]?.price,
                    product?.variants[0]?.discount?.percent
                )
              }} COP
             </span>
            <span
                :class="product?.variants[0]?.discount?.percent ? 'text-gray-500 line-through text-center font-body' : 'text-center font-body'">
              {{ useCurrency(product?.variants[0]?.price) }} COP
            </span>
          </article>
        </section>
        <section class="flex justify-center items-center">
          <button
              title="Eliminar producto del carrito"
              class="text-red-600 text-lg hover:cursor-pointer flex gap-1 items-center font-body"
              @click="removeProduct(product)">
            <IconTrash/>
            Eliminar
          </button>
        </section>
      </article>
    </section>
  </section>
</template>

<script setup lang="ts">

// composable
const config = useRuntimeConfig()
const cart = useCart()

// props
const props = defineProps<{
  products: any[]
}>();

// methods
const removeProduct = (product: any) => {
  cart.remove(product)
}

const onIncrement = (id: string) => {
  cart.increment(id)
}

const onDecrement = (id: string) => {
  cart.decrement(id)
}
</script>
