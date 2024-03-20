<script setup lang="ts">

// props
const props = defineProps<{
  type?: "button" | "submit" | "reset";
  variant?: "solid" | "outline" | "link" | "ghost";
  block?: boolean;
  disabled?: boolean;
}>();


// emits
const emits = defineEmits<{
  (event: "onClick"): void;
}>();

const style = computed(() => {
  return {
    'solid': 'bg-primary text-neutral-900 border-transparent hover:bg-primary/80 border border-transparent',
    'outline': 'bg-gray-50 border border-primary hover:bg-gray-100 font-medium',
    'link': 'text-primary bg-transparent border-transparent disabled:border disabled:border-gray-200 disabled:bg-gray-100',
    'ghost': 'bg-transparent border-transparent text-gray-700 border border-transparent disabled:border disabled:border-gray-200 disabled:bg-gray-100',
  }[props.variant || 'solid'] + (props.block ? 'block mx-auto w-full py-1.5' : '');
});
</script>

<template>
  <button
      @click="emits('onClick')"
      :type="type || 'button'"
      :class="style"
      :disabled="disabled"
      class="rounded-lg ease-in-out duration-150 font-medium disabled:cursor-not-allowed disabled:border disabled:border-gray-200 disabled:bg-gray-100">
    <slot name="leading-icon"/>
    <slot name="default"/>
    <slot name="trailing-icon"/>
  </button>
</template>

<style scoped>

</style>
