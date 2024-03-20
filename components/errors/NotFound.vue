<script setup lang="ts">
import NotFound from '~/assets/media/lotties/not_found.gif'

const props = defineProps<{
  label: string
}>();

// emits
const emits = defineEmits<(
    (event: "onClick") => void
    )>();

</script>

<template>
  <article class="font-primary w-max block mx-auto text-gray-700">
    <img
        class="block mx-auto"
        :src="NotFound"
        alt="No encontramos informacion"/>
    <slot name="title"/>
    <slot name="description"/>
    <button
        title="Refrescar"
        name="refresh"
        class="block mx-auto bg-gray-700  px-6 py-2 text-white rounded-lg font-body hover:bg-gray-600 ease-in-out duration-150"
        type="button"
        @click="emits('onClick')"
    >
      {{ label }}
    </button>
  </article>

</template>
