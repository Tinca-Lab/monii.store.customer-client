<script setup lang="ts">

const props = defineProps<{
  error: any;
}>();

enum ErrorType {
  INTERNAL_SERVER_ERROR = 500,
  NOT_FOUND = 404,
}

console.error(props.error);

</script>

<template>
  <ErrorsInternalServerError
      :error="error"
      v-if="error?.statusCode == ErrorType.INTERNAL_SERVER_ERROR"/>
  <ErrorsNotFoundError
      :value="error"
      v-else-if="error?.statusCode == ErrorType.NOT_FOUND"/>
</template>

<style scoped>

</style>
