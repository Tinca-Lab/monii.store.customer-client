<script setup lang="ts">

// composable
const config = useRuntimeConfig()

// props
const props = defineProps<{
  data: any,
}>();
</script>

<template>
  <article class="relative h-64">
    <NuxtImg
        quality="85"
        class="w-full h-full relative object-cover"
        v-if="data[0].media.mimetype.includes('image')"
        :src="data[0].media.url"
        :alt="data[0].media.alternativeText || data[0].media.name">
    </NuxtImg>
    <video
        v-else
        :src="data[0].media.url"
        autoplay
        loop
        muted
        playsinline
        class="w-full h-44 object-cover"/>
    <section class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h2 class="text-3xl lg:text-5xl font-medium font-primary text-white drop-shadow-md">
        {{ data[0].description }}
      </h2>
    </section>
  </article>
</template>
