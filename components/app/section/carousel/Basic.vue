<template>
  <carousel
      class="w-full"
      :items-to-show="1">
    <slide
        class="relative w-full max-h-min"
        v-for="prop in data"
        :key="prop.label">
      <article
          v-if="prop.textCta || prop.linkCta || prop.description"
          :class="[
              prop.positionX === 'right' ? 'lg:right-44 lg:items-end xs:items-center xs:text-center' : '',
              prop.positionX === 'left' ? 'lg:left-44 lg:text-start xs:items-center xs:text-center' : '',
              prop.positionY === 'top' ? 'md:top-24 top-2.5' : '',
              prop.positionY === 'bottom' ? 'md:bottom-24 bottom-2.5' : '',
              ]"
          class="absolute z-20 w-max h-auto flex flex-col gap-2 md:gap-4">
        <h1 class="text-white lg:text-5xl font-bold font-primary drop-shadow-md">
          {{ prop?.description }}
        </h1>
        <NuxtLink
            target="_blank"
            class="bg-primary font-body px-5 py-2 rounded-lg hover:bg-primary/80 ease-in-out duration-150 md:text-xl text-xs"
            v-if="prop.linkCta"
            :to="prop.linkCta"
        >
          {{ prop.textCta }}
        </NuxtLink>
      </article>
      <LazyNuxtImg
          v-if="prop.media && prop.media.mimetype.includes('image')"
          sizes="xs:640px sm:768px md:1024px lg:1280px xl:1536px xxl:1920px"
          format="webp"
          quality="75"
          class="object-cover w-full min-h-96 max-h-[500px]"
          :src="prop.media.url"
          :alt="prop.media.alternativeText || prop.media.name"
      />
      <video
          v-else-if="prop.media && prop.media.mimetype.includes('video')"
          class="w-full max-h-[550px] object-cover"
          autoplay
          muted
          loop
          :src="prop.media.url"/>
    </slide>
  </carousel>
</template>

<script lang="ts">
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Navigation, Pagination, Slide} from 'vue3-carousel'

export default defineComponent({
  setup() {
    const config = useRuntimeConfig()
    return {
      config,
    }
  },
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
})
</script>
