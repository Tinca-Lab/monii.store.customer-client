<script setup lang="ts">
// composable
const marked = useMarked();

// props
const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

</script>

<template>
  <article
      v-if="content"
      class="px-4 sm:px-14 bg-gray-200 mt-10">
    <div
        id="html"
        v-html="marked.onParse(content)"
        class="p-4 flex flex-col gap-4"/>
  </article>
</template>

<style scoped>

</style>
