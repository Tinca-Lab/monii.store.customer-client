<script setup lang="ts">
const props = defineProps<{
  value: any;
}>();

const error = computed(() => JSON.parse(props.value.data))
</script>

<template>
  <section class="bg-white font-poppins">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center">
        <img class="mx-auto mb-4" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/404/404-computer.svg"
             alt="404 Not Found">
        <h1 class="mb-4 text-2xl font-extrabold text-primary-600">404 Not Found</h1>
        <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl ">
          Oops! No encontramos lo que buscas.
        </p>
        <span class="text-lg">
          {{ error.message }}
        </span>
        <article class="flex flex-col mt-4">
          <p class="mb-4 text-gray-500 ">Powered by <b><a href="https://tincalab.com">Tinca Lab</a></b></p>
        </article>
        <ul class="flex justify-center items-center space-x-4 text-gray-500">
          <li>
            <a href="#" class="underline hover:text-gray-900">Help</a>
          </li>
          <li>
            <a href="#" class="underline hover:text-gray-900">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
