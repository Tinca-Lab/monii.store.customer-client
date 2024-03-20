<script setup lang="ts">
// props
const props = defineProps<{
  count?: 0 | number;
  isTags?: boolean;
}>();

// emits
const emits = defineEmits<{
  (event: "sortBy", value: any): void;
  (event: "filterBy", value: any): void;
  (event: "removeFilters"): void;
}>();

const filterBy = (e: any) => {
  emits('filterBy', e)
};

const removeFilters = () => {
  emits('removeFilters')
};

const sortBy = (e: any) => {
  emits("sortBy", e);
};
</script>

<template>
  <section class="flex items-center justify-between">
    <NavFilterProduct
        @sortBy="sortBy"
        @filterBy="filterBy"
        @removeFilters="removeFilters"
        :isTags="isTags"
        class="col-span-6 lg:col-start-2"
    />
    <article class="flex gap-5 col-start-8 justify-end col-span-4">
      <span
          class="hidden md:flex gap-1 text-gray-800 text-base font-normal font-body"
      >
        <b>{{ count }}</b>resultados
      </span>
    </article>
  </section>
</template>
