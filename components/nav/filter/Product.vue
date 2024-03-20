<script setup lang="ts">
// composable
const config = useRuntimeConfig();

// props
const props = defineProps<{
  isTags?: boolean;
}>();

// emits
const emits = defineEmits(["sortBy", "filterBy", "removeFilters"]);

// data
const activeModalFilter = ref(false);
const activeModalOrder = ref(false);
const isFilter = ref(false);

// methods
const filterBy = (e: Event) => {
  isFilter.value = true;
  emits('filterBy', e)
};

const removeFilters = () => {
  isFilter.value = false;
  emits('removeFilters')
};

const sortBy = (e) => {
  emits("sortBy", e);
};

// watch
watch(() => props.isTags, (value) => {
  if (!value) {
    isFilter.value = false;
  }
});

</script>

<template>
  <div class="flex items-center gap-5 relative">

    <div>
      <button
          @click="activeModalFilter = !activeModalFilter"
          name="filter"
          title="Filtrar"
          class="text-gray-800 font-body text-base font-medium flex items-center gap-1.5"
      >
        <span class="w-5 h-5"><IconAdjustmentsVertical/></span>
        Filtrar
      </button>
      <ModalFilterProduct
          :isShow="activeModalFilter"
          @onShow="activeModalFilter = !activeModalFilter"
          @filterBy="filterBy"/>
    </div>

    <button
        title="Quitar filtros"
        v-if="isFilter"
        type="button"
        @click="removeFilters"
        class="text-sm font-medium bg-red-400 hover:bg-red-500 text-white px-2 rounded-lg ease-in-out duration-150 flex items-center gap-1">
      Quitar filtros
    </button>

    <button
        title="Ordenar por"
        class="text-gray-800 font-body text-base font-medium flex items-center gap-1.5"
        name="order-by"
        @click="activeModalOrder = !activeModalOrder"
    >
      <IconArrowUpDown/>
      Ordenar por
    </button>
    <ModalOrderProduct
        :isShowModal="activeModalOrder"
        @onShowModal="activeModalOrder = !activeModalOrder"
        @sortBy="sortBy"
    />
  </div>
</template>

<style scoped></style>
