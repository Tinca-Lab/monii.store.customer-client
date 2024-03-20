<template>
  <section class="bg-white rounded-3xl">
    <div class="mx-auto max-w-screen-2xl text-center xs:py-12 md:py-24 gap-14">
      <p class="font-primary mb-4 xs:text-base xs:w-64 xs:mt-3 xs:leading-4 md:text-3xl md:w-5/6 lg:w-2/4 font-medium leading-8 text-center mx-auto">
        {{ data[0].description }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: any,
}>();
</script>

<style scoped>
</style>
