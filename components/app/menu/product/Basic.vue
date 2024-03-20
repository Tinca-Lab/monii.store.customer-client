`
<template>
  <section
      class="bg-white border-gray-200 font-body h-96 shadow hidden md:block">
    <div
        class="flex justify-between w-full h-full px-14 py-5 text-sm text-gray-500">
      <nav class="flex flex-col gap-4">
        <NuxtLink
            to="/products"
            class="hover:underline hover:bg-primary/20 ease-in-out border border-transparent
             hover:border-primary duration-150 bg-gray-100 px-5 py-2 rounded-lg font-medium w-full flex">
          Ver Todos
        </NuxtLink>
        <ul
            v-if="categories"
            class="flex flex-col gap-y-4 mb-4 md:mb-0 h-full">
          <li
              class="mt-2"
              v-for="category in categories"
              :key="category._id">
            <NuxtLink
                :href="`/products?category=${category._id}`"
                class="hover:underline hover:bg-primary/20 ease-in-out border border-transparent hover:border-primary duration-150 bg-gray-100 px-5 py-2 rounded-lg font-medium w-full flex">
              {{ category.name }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div>
        <h3 class="text-end font-body text-xl text-black">
          Lo más destacado
        </h3>
        <div class="h-max w-min overflow-auto flex items-center">
          <AppCardProductBasic
              class="w-72 h-80"
              v-for="product in products"
              :product="product"/>

        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">

// composable
const config = useRuntimeConfig();
const url = useRequestURL();

// emits
const emits = defineEmits<{
  (event: 'update:isOpen'): void
}>();

const filters = ref<string>(`featured[$eq]=true&status[$eq]=true`);

// data
const {data: categories, error: ErrorCategories}: any = await useLazyAsyncData(
    'featured-categories',
    () => $fetch(`${config.public.baseURL}/api/v2/category`, {
      params: {
        filters: 'featured[$eq]=true'
      },
      headers: {
        origin: url.origin,
      }
    }),
)

if (ErrorCategories.value && !categories.value) {
  categories.value = [];
}

const {data: products,}: any = await useLazyAsyncData(
    'featured-products',
    () => $fetch(`${config.public.baseURL}/api/v2/product`, {
      method: 'GET',
      query: {
        pageSize: 2,
        filters: filters.value,
      },
      headers: {
        origin: url.origin,
      }
    }),
)
</script>
