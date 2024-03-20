<template>
  <div class="flex flex-col gap-4">
    <h3 class="font-bold font-body text-center">
      {{ data[0].title }}
    </h3>
    <section class="grid grid-cols-12 gap-4">
      <article class="col-span-10 col-start-2 grid sm:grid-cols-2 xs:grid-cols-1 gap-4">
        <article
            v-for="category in categories"
            :key="category._id"
            class="relative h-[450px] rounded-3xl overflow-hidden flex flex-col
             items-center justify-center object-contain max-h-72 md:max-h-full">
          <LazyNuxtImg
              format="webp"
              quality="50"
              width="500"
              height="500"
              class="transition-all ease-in-out delay-150 duration-1000 hover:scale-125
              relative w-full h-full object-cover object-center"
              :src="category.image.url"
              :alt="category.image.alternativeText || category.image.name"/>

          <article class="flex flex-col gap-2 absolute items-center">
            <h2 class="text-white font-inter font-medium text-5xl drop-shadow-md">{{ category.name }}</h2>
            <NuxtLink
                class="font-body text-white bg-black/10 hover:bg-primary text-sm px-5 py-[10px]
                rounded-lg border border-white hover:border-transparent ease-in-out duration-150"
                :to="`/products?category=${category._id}`">
              Ver más
            </NuxtLink>
          </article>
        </article>
      </article>
    </section>
  </div>
</template>
<script setup lang="ts">

// composable
const config = useRuntimeConfig();
const url = useRequestURL();

// data
const {data: categories}: any = await useAsyncData(
    'categories',
    () => $fetch(`${config.public.baseURL}/api/v2/category`, {
      query: {
        pageSize: 4,
        featured: true,
      },
      headers: {
        origin: url.origin,
      }
    }),
)

// props
const props = defineProps<{
  data: any
}>();
</script>
