<script setup lang="ts">

// composable
const cart = useCart();
const route = useRoute();

// data
const discountCode = ref('');

// emits
const emits = defineEmits<{
  (event: 'onPurchase'): void
  (event: 'onApplyDiscount', value: string): void
}>();

// props
const props = defineProps<{
  discount?: any
  cost?: number
}>();

// computed
const products = computed(() => cart.cartItems.value);
const shipping = computed(() => props.cost || 0);

const discounts = computed(() => {
  return products?.value?.reduce((acc: number, product: any) => {
    const discount = product?.variants[0]?.discount ? product?.variants[0]?.discount?.value * product?.quantity : 0;
    return acc + discount;
  }, 0)
})

const subtotal = computed(() => {
  if (props.discount && props.discount.percentage) {
    return cart.getSubtotal() - (cart.getSubtotal() * props.discount?.percentage / 100)
  }
  return cart.getSubtotal();
});

const total = computed(() => {
  return (subtotal.value + shipping.value)
})


</script>

<template>
  <section class="flex flex-col gap-11 h-max bg-white p-4 rounded-xl">
    <section>
      <h4 class="font-body font-semibold text-gray-900">Resumen de la compra</h4>
      <section class="flex flex-col gap-4">
        <article
            class="font-body text-sm font-medium text-gray-500 border-b border-candles-medium flex justify-between py-2">
          <p>
            Subtotal
          </p>
          <p>
            {{ useCurrency(subtotal) }}
          </p>
        </article>
        <article
            class="font-body text-sm font-medium text-gray-500 border-b border-candles-medium flex justify-between py-2">
          <p>
            Descuentos
          </p>
          <p>
            - {{ useCurrency(discounts) }}
          </p>
        </article>
        <article
            v-if="discount"
            class="font-body text-sm font-medium text-gray-500 border-b border-candles-medium flex justify-between py-2">
          <p>
            Cupones
          </p>
          <p>
            - {{ discount.percentage || 0 }} %
          </p>
        </article>
        <article
            v-if="cost"
            class="font-body text-sm font-medium text-gray-500 border-b border-candles-medium flex justify-between py-2">
          <p>
            Envío
          </p>
          <p>
            {{ useCurrency(shipping || 0) }}
          </p>
        </article>
        <article class="font-body text-sm font-semibold text-gray-900 flex justify-between">
          <p>
            Valor Total
          </p>
          <p>
            {{ useCurrency(total) }}
          </p>
        </article>
        <AppButtonPrimaryBasic
            block
            title="Ir a pagar"
            name="purchase"
            @click="emits('onPurchase')"
            type="submit"
        >
          <template #default>
            <span class="flex items-center gap-2 justify-center">
              Pagar
              <span class="w-5 h-5">
              <IconShoppingCartIcon/>
            </span>
            </span>
          </template>
        </AppButtonPrimaryBasic>
        <span class="font-body text-xs">
          El valor del envio sera calculado al agregar la dirección de envio.
        </span>
      </section>
    </section>
    <section
        v-if="route.fullPath.includes('checkout')"
        class="flex flex-col gap-3">
      <label
          for="coupon"
          class="text-sm font-medium font-body text-gray-900 rounded-lg">Código de descuento</label>
      <form class="flex gap-2" @submit.prevent="emits('onApplyDiscount', discountCode)">
        <input
            required
            id="coupon"
            :value="discountCode"
            @input="discountCode = $event.target.value.toUpperCase()"
            class="w-32 uppercase h-auto text-sm bg-gray-50 border border-gray-300 py-3 px-4 text-inter text-gray-500 rounded-lg font-body font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            type="text" placeholder="---- ---- ----"/>
        <button
            type="submit"
            title="Aplicar descuento"
            name="apply-discount"
            class="bg-gray-100 px-5 py-2 rounded-lg font-body font-medium hover:bg-primary/20 ease-in-out duration-200 border border-transparent hover:border-primary">
          Aplicar
        </button>
      </form>
      <span class="font-inter text-gray-500 text-sm leading-tight">Si tienes un cupon o codigo escribelo aquí.</span>
    </section>
  </section>
</template>
