<script setup lang="ts">
// composable
const config = useRuntimeConfig();
const url = useRequestURL();
const route = useRoute();

// data
const {data: home, error: ErrorHome} = await useFetch<any>('/api/v2/route/path', {
  query: {
    path: route.path,
  },
  baseURL: config.public.baseURL,
  headers: {
    origin: url.origin,
  },
});

if (ErrorHome.value) {
  throw createError(ErrorHome.value);
}

// computed
const sections = computed(() => {
  return home.value.sections;
});

// seo
useHead({
  title: home.value.title || 'Inicio',
});
</script>

<template>
  <div
      class="w-full flex flex-col gap-10">
    <section class="grid grid-cols-4 md:grid-cols-12 gap-12">
      <Component
          v-for="section in sections"
          :key="section._id"
          :is="resolveComponent(section.component)"
          :data="section.props"
          class="col-span-4 md:col-span-12 lg:col-span-12"
      />
    </section>
  </div>
</template>

<style scoped>

</style>
