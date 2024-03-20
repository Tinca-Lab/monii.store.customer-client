<template>
  <article
      class="flex items-center justify-center p-2 border-2 border-candles-heavy text-candles-heavy rounded-lg max-w-xs lg:max-w-min px-4 gap-4 lg:gap-6">
    <button
        title="Disminuir cantidad"
        name="decrement"
        class="w-3 h-3"
        @click="decrement">
      <IconMinus/>
    </button>
    <span>{{ quantity }}</span>
    <button
        title="Aumentar cantidad"
        name="increment"
        class="w-3 h-3"
        @click="increment">
      <IconPlus/>
    </button>
  </article>
</template>
<script setup lang="ts">

// composable
const cart = useCart()

// props
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

// emits
const emits = defineEmits(['onIncrement', 'onDecrement'])

// computed
const quantity = computed(() => {
  return props.product.quantity;
})

// methods
const increment = () => {
  emits('onIncrement', props.product._id)
}
const decrement = () => {
  emits('onDecrement', props.product._id)
}
</script>
