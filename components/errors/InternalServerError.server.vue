<script setup lang="ts">

// props
const props = defineProps<{
  error: any;
}>();


// hooks
onMounted(() => {
  console.error(props.error);
})
</script>

<template>
  <section class="bg-white">
    <div class="grid-cols-2 gap-8 content-center py-8 px-4 mx-auto max-w-screen-xl md:grid lg:py-16 lg:px-6">
      <div class="self-center">
        <h1 class="mb-4 text-2xl font-bold text-primary-600">500 Internal Error</h1>
        <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 lg:mb-10 md:text-4xl">
          Whoops! That page doesn’t exist.</p>
      </div>
      <img class="hidden mx-auto mb-4 md:flex"
           src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/500/500.svg"
           alt="500 Server Error">
    </div>
  </section>
</template>

<style scoped>

</style>
