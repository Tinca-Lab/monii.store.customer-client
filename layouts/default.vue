<template>
  <div
      class="_default overflow-y-auto min-h-screen flex flex-col w-full relative">
    <header>
      <AppNavbarBasic
          v-if="routes && company"
          :routes="routes"
          :company="company"/>
    </header>
    <main class="flex-1 h-auto py-24">
      <slot/>
    </main>
    <footer>
      <AppFooterBasic
          v-if="routes && company"
          :company="company"
          :routes="routes"/>
    </footer>
    <ClientOnly>
      <Notifications/>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">

// composable
const {company} = useCompanyStore();

// inject
const routes = inject('routes') as { path: string, title: string }[];
</script>
