<template>
  <div class="grid grid-cols-12 gap-4">
    <section class="col-span-10 col-start-2 bg-gray-800 rounded-3xl">
      <article class="mx-auto px-6 py-6 md:py-14 gap-14 w-full">
        <h1 class="mb-4 xs:text-2xl md:text-6xl 2xl:text-6xl font-inter tracking-tight font-bold leading-10 text-center text-white">
          {{ data[0].title }}
        </h1>
        <p class="mb-4 text-sm xs:mt-3 md:text-3xl 2xl:px-72 font-inter leading-8 text-center text-white mt-6">
          {{
            data[0].description
          }}
        </p>
        <span class="flex w-1/2 md:w-4/12 lg:w-3/12 xl:w-2/12 mx-auto">
        <LazyNuxtLink
            v-if="data[0].linkCta && data[0].textCta"
            :title="data[0].textCta"
            class="bg-white px-5 py-2 text-center flex items-center gap-2 rounded-lg font-body hover:bg-gray-100 ease-in-out duration-150"
            :to="data[0].linkCta"
        >
          <span>{{ data[0].textCta }}</span>
          <IconBackDoorIcon class="my-auto text-primary focus:text-primary"/>
        </LazyNuxtLink>
      </span>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
// props
const props = defineProps<{
  data: any
}>();
</script>
