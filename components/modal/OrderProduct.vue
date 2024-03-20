<script setup lang="ts">
// data
const sort = ref("desc");
const filter = ref();

// emits
const emits = defineEmits<{
  (e: "sortBy", sort: any): void;
  (e: "filterBy", filter: any): void;
  (e: "onShowModal"): void;
}>();

// props
const props = defineProps<{
  isShowModal?: boolean;
}>();
// methods
const sortBy = () => {
  emits("sortBy", sort.value);
};
</script>
<template>
  <ClientOnly>
    <div
        v-show="isShowModal"
        class="relative">
      <div
          class="absolute z-50 px-3 pt-1 bg-white rounded-3xl shadow w-52 md:w-80 -left-36 top-5"
      >
        <article class="flex py-2 font-light">
          <form class="flex flex-col gap-2 px-4 py-2 w-full">
            <span class="font-medium font-primary">Fecha de creacion</span>
            <hr/>
            <div class="group_input">
              <input
                  v-model="sort"
                  id="recent"
                  :value="'desc'"
                  type="radio"
                  name="recent"
                  title="Mas nuevos"
                  class="rounded-full hover:bg-gray-300 text-left checked:bg-primary focus:ring-primary focus:hover:bg-primary/80"
                  @change="sortBy"
              />
              <label for="recent"> Más recientes </label>
            </div>
            <div class="group_input">
              <input
                  v-model="sort"
                  id="older"
                  type="radio"
                  name="older"
                  :value="'asc'"
                  title="Mas antiguos"
                  class="rounded-full hover:bg-gray-300 text-left checked:bg-primary focus:ring-primary focus:hover:bg-primary/80"
                  @change="sortBy"
              />
              <label for="older"> Más antiguos </label>
            </div>
          </form>
        </article>
      </div>
      <div
          class="fixed left-0 top-0 z-20 px-3 pt-1 bg-black/40 rounded-lg shadow w-screen h-screen"
          @click="
            () => {
              emits('onShowModal');
            }
          "
      ></div>
    </div>
  </ClientOnly>
</template>

