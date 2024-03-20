<template>
  <section class="flex justify-center">
    <div class="w-full flex flex-col gap-5 bg-white rounded-xl">
      <FormAccount
          :is-editing="isEditing"
      />
      <article class="flex flex-col gap-4 mt-4">
        <p class="font-lg font-medium font-primary text-xl">
          Seguridad
        </p>
        <FormPassword
            :is-editing="isEditing"
        />
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
// composable
const config = useRuntimeConfig();

// data
const isEditing = ref(false);
</script>
