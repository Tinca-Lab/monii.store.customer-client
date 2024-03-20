<template>
  <section class="flex w-full flex-col gap-0 md:gap-3 font-body">
    <header class="flex flex-col gap-2 md:gap-3">
      <p class="text-2xl lg:text-4xl font-bold">{{ product.name }}</p>
      <p class="flex items-center gap-3">
        <span v-if="product.variants[0].discount.value || product.variants[0].discount.percent"
              class="text-2xl lg:text-3xl text-red-700 font-semibold">
          {{
            useDiscount(
                product?.variants[0]?.price,
                product?.variants[0]?.discount?.percent
            )
          }}
        </span>
        <span
            :class="(product.variants[0].discount.value || product.variants[0].discount.percent) ? 'text-gray-500 line-through text-sm' : 'font-semibold text-gray-800'"
            class="text-lg font-extrabold"> {{ useCurrency(product?.variants[0]?.price) }}</span>
        <span v-if="product.variants[0].discount.value || product.variants[0].discount.percent"
              class="text-lg flex items-center text-white bg-green-600 px-3 rounded-xl">
        - {{ product?.variants[0]?.discount?.percent }} %
      </span>
      </p>
    </header>
    <div class="flex flex-col gap-2 md:gap-3 mt-4">
      <article class="flex flex-col gap-2 md:gap-3">
        <p
            v-if="product.brand"
            class="text-xl">
          Marca: {{ product.brand }}
        </p>
        <article
            v-if="product.tags"
            class="flex gap-2">
            <span
                class="bg-gray-100 text-xs text-gray-700 px-3 py-1 rounded-md uppercase"
                v-for="(tag) in product.tags"
                :key="tag">
              {{ tag }}
            </span>
        </article>
        <article class="mt-4">
          {{ product.details }}
          lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quos.
          lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quos.
          lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quos.
          lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, quos.
        </article>
      </article>
      <article class="flex flex-col gap-2 md:gap-3 mb-4">
        <p class="font-bold text-xl">Cantidad</p>
        <div
            class="flex items-center justify-center p-2 border border-neutral-400 rounded-xl max-w-min px-2 gap-2.5">
          <AppButtonPrimaryBasic
              variant="ghost"
              class="w-3 h-3 py-0"
              @click="decrement">
            <IconMinus/>
          </AppButtonPrimaryBasic>
          <div class="text-lg text-center w-5">{{ count }}</div>
          <AppButtonPrimaryBasic
              variant="ghost"
              class="w-3 h-3 py-0"
              @click="increment">
            <IconPlus/>
          </AppButtonPrimaryBasic>
        </div>
      </article>
    </div>
    <footer class="gap-2 md:gap-3 flex flex-col">
      <AppButtonPrimaryBasic
          class="py-2"
          @on-click="onAdd(product,count)"
      >
        Añadir al carrito
      </AppButtonPrimaryBasic>
      <AppButtonPrimaryBasic
          class="py-2"
          variant="outline"
          @on-click="() => { onAdd(product,count); router.push('/cart') }"
      >
        Comprar ahora
      </AppButtonPrimaryBasic>
    </footer>
  </section>
</template>

<script setup lang="ts">

// composable
const cart = useCart()
const router = useRouter()

// methods
const onAdd = (item: any, quantity: any) => {
  cart.add(item, quantity)
}
const increment = () => {
  count.value++;
}

const decrement = () => {
  if (count.value > 1) {
    count.value--;
  }
}

const count = ref(1);

// props
const props = defineProps<{
  product: {
    name: string,
    brand: string,
    tags: string[],
    details: string,
    variants: {
      price: number,
      discount: {
        value: number,
        percent: number
      },
      stock: number
    }[]
  }
}>();

</script>


