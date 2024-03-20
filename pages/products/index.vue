<script setup lang="ts">

// composable
const route = useRoute();
const config = useRuntimeConfig();
const host = useRequestURL();

// meta
useHead({
  title: "Productos",
  meta: [
    {
      name: "description",
      content: "Productos",
    }
  ]
})

// data
const sortBy = ref('createdAt');
const sort = ref('desc');
const page = ref(1);
const pageSize = ref(10);
const categoryId = ref(route.query.category);
const filters = ref(`status[$eq]=true${categoryId.value ? `&category._id[$eq]=${categoryId.value}` : ''}`);
const tags = ref([]);

const {data: market, error: errorPage} = await useFetch<any>(
    `${config.public.baseURL}/api/v2/route/path`,
    {
      query: {
        path: route.path,
      },
      headers: {
        origin: host.origin,
      },
    }
);

if (errorPage.value) {
  throw createError({
    statusCode: errorPage.value.statusCode,
    message: "Esta página aun no ha sido credo por el administrador del sitio.",
  });
}

const {data: products, pending: isLoadingProducts, error: ErrorProducts} = await useAsyncData<any[]>(
    "products",
    () =>
        $fetch(`${config.public.baseURL}/api/v2/product`, {
          headers: {
            origin: host.origin,
          },
          params: {
            sortBy: sortBy.value,
            sort: sort.value,
            page: page.value,
            pageSize: pageSize.value,
            filters: filters.value,
          },
        }),
    {
      server: false,
      lazy: true,
      watch: [sortBy, sort, filters, page, pageSize],
    }
);

const {data: count, error: ErrorCount} = await useAsyncData<any>(
    "count",
    () =>
        $fetch(`${config.public.baseURL}/api/v2/product/count`, {
          headers: {
            origin: host.origin,
          },
          params: {
            filters: filters.value
          },
        }),
    {
      server: false,
      lazy: true,
      watch: [filters],
    },
);

if (ErrorCount) {
  count.value = 0;
}

// computed
const sections = computed(() => {
  return market.value.sections;
});

// watch
watch(route, () => {
  const {category} = route.query;
  if (!category) {
    filters.value = `status[$eq]=${true}`;
    return;
  }
  filters.value += `&category._id[$eq]=${category}`;
}, {deep: true});

watch(tags, () => {
  const repeatedTags = tags.value.filter((tag, index, self) => {
    return self.indexOf(tag) !== index;
  });

  if (repeatedTags.length) {
    tags.value = tags.value.filter((tag) => !repeatedTags.includes(tag));
  }

  if (!tags.value.length) {
    return;
  }

  if (filters.value.includes("tags")) {
    filters.value = filters.value.replace(/&tags\[\$in\]=\[[\w,]+\]/g, "");
  }

  filters.value += `&tags[$in]=[${tags.value.map((tag) => tag).join(",")}]`;
}, {deep: true})

</script>

<template>
  <div class="h-full w-full">
    <Component
        v-for="section in sections"
        :key="section._id"
        :is="resolveComponent(section.component)"
        :data="section.props"
    />
    <section class="p-10 h-auto">
      <NavProduct
          @filterBy="({ _, value} : { key: string, value: string}) => { tags.push(value.toLowerCase()) }"
          @removeFilters="() => { filters = `status[$eq]=${true}` }"
          @sortBy="(e) => { sort = e; }"
          :isTags="!!tags?.length"
          :count="Number(count)"/>
      <section v-if="products">
        <section
            class="grid grid-cols-4 md:grid-cols-9 lg:grid-cols-12 gap-4 px-4"
        >
          <TransitionGroup name="fade">
            <div
                v-for="product in products"
                :key="product._id"
                class="col-span-4 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-3"
            >
              <AppCardProductBasic
                  class="h-96 lg:h-[550px]"
                  :product="product"/>
            </div>
          </TransitionGroup>
        </section>
      </section>
      <section v-else-if="isLoadingProducts">
        <article class="mt-12 grid grid-cols-4 md:grid-cols-9 lg:grid-cols-12 gap-4 px-4">
          <div
              v-for="i in 12"
              :key="i"
              class="col-span-4 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-3"
          >
            <SkeletonProductCard/>
          </div>
        </article>
      </section>
      <ErrorsNotFound
          label="Refrescar"
          @onClick="() => { filters = `status[$eq]=${true}`; tags = []; }"
          v-else>
        <template #title>
     <span class="text-3xl flex justify-center text-center mb-4">
          No se encontraron resultados <br> para tu busqueda
        </span>
        </template>
        <template #description>
        <span class="text-xl block text-center my-2">
          Intente de nuevo
        </span>
        </template>
      </ErrorsNotFound>
    </section>
  </div>
</template>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
