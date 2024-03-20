<template>
  <div class="grid grid-cols-12 gap-4 mt-4 px-4">
    <NavAccount class="col-span-full sm:col-span-2 sm:col-start-2 gap-4"/>
    <LazySectionAccountDetail
        v-if="user"
        :user="user"
        class="col-span-full lg:col-span-8 px-4"/>
  </div>
</template>

<script setup lang="ts">

// meta
definePageMeta({
  layout: 'default',
  middleware: ['auth'],
})

// seo
useHead({
  title: 'Mi cuenta',
  meta: [
    {
      name: 'description',
      content: 'Account'
    }
  ]
})

// composable
const auth = useAuth();

// computed
const user = computed(() => auth.user.value);

</script>
