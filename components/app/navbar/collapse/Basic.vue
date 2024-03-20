<script setup lang="ts">

// composable
const router = useRouter();
</script>

<template>
  <div
      class="hidden w-full top-24 left-0 absolute md:hidden bg-white py-5 shadow"
      aria-label="collapse-navbar"
      id="collapse-navbar">
    <AppNavbarRoutesBasic @toggleProduct="router.push('/products')"/>
  </div>
</template>
