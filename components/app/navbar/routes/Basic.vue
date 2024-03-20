<script setup lang="ts">
// composable
const route = useRoute();

// inject
const routes = inject('routes') as { path: string, title: string }[];

// emits
const emits = defineEmits<{
  (event: 'toggleProduct'): void;
}>();
</script>

<template>
  <ul class="flex flex-col items-center font-medium gap-y-2 md:items-start md:gap-0
      md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
    <li
        class="w-max"
        v-for="path in routes"
        :key="path.path">
      <NuxtLink
          v-if="path.path !== '/products'"
          :to="path.path"
          active-class="border-b border-primary text-primary"
          class="font-primary text-lg hover:text-primary ease-in-out duration-150 hover:border-primary"
          aria-current="page">
        {{ path.title }}
      </NuxtLink>
      <button
          v-else
          @click="emits('toggleProduct')"
          type="button"
          :class="[route.path === '/products' ? 'border-b border-primary text-primary' : 'border-transparent']"
          class="font-primary text-lg hover:text-primary ease-in-out duration-150 border-b hover:border-primary w-max"
      >
        {{ path.title }}
      </button>
    </li>
  </ul>
</template>
