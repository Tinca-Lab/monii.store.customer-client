<script setup lang="ts">

// composable
const config = useRuntimeConfig();
const url = useRequestURL();

// data
const filters = ref()

const {data: tags, error: ErrorTags} = useAsyncData(
    'tags',
    () => $fetch(
        `${config.public.baseURL}/api/v2/tag`, {
          method: 'GET',
          headers: {
            origin: url.origin,
          },
          params: {
            filters: `status[$eq]=${true}`,
          },
        },
    ),
);

// emits
const emits = defineEmits<{
  (e: "onShow"): void;
  (e: "filterBy", filter: any): void;
}>();

// props
const props = defineProps<{
  isShow?: boolean;
}>();

// methods
const filterBy = (e: any) => {
  emits('filterBy', e)
}

</script>
<template>
  <div
      v-show="isShow"
      class="relative">
    <div
        class="absolute z-20 p-3 bg-white rounded-3xl shadow-md w-52 md:w-80 h-max font-body"
    >
      <article class="flex py-2 font-light border-gray-200 h-44 overflow-y-scroll">
        <form class="flex flex-col gap-2 px-4 py-2 w-full">
          <span class="font-medium font-primary">Filtros</span>
          <hr/>
          <div v-for="tag in tags"
               :key="tag._id"
               class="group_tag">
            <button
                class="flex justify-between font-light text-left w-full hover:bg-gray-100 ease-in-out duration-150 p-2 rounded-sm"
                type="button"
                @click="filters = tag._id === filters ? '' : tag._id"
            >
              {{ tag.name }}
              <span>
                  <IconUpArrow v-if="filters === tag._id"/>
                  <IconDownArrow v-else/>
                </span>

            </button>
            <ul
                v-show="filters === tag._id"
                class="flex">
              <li
                  v-for="item in tag.value"
                  :key="item.value"
                  class="flex gap-4 mt-2 px-2">
                <input
                    @input="filterBy({key: tag.key, value: item.value})"
                    type="checkbox"
                    :id="`${tag._id}-${item.value}`"
                    :value="item.value"
                    class="peer hidden"
                >
                <label :for="`${tag._id}-${item.value}`"
                       class="inline-flex items-center justify-between px-2 py-1 text-gray-500 bg-white border-2
                        border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700
                         peer-checked:border-primary hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600
                         hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <span class="block">
                      <span class="w-full text-lg font-semibold">
                        {{ item.value }}
                      </span>
                    </span>
                </label>
              </li>
            </ul>
          </div>
        </form>
      </article>
    </div>
    <div
        @click.stop="emits('onShow')"
        class="fixed z-10 left-0 top-0 bg-black/20 w-screen h-screen">
    </div>
  </div>
</template>

