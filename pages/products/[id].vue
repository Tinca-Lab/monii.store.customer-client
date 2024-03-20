<script setup lang="ts">
// imports
import {FetchError} from "ofetch";

// composable
const config = useRuntimeConfig();
const host = useRequestURL();
const route = useRoute();

// data
const {data: product, error: ErrorProduct, pending: isLoadingProduct} = await useAsyncData<any, FetchError>(
    "product",
    () =>
        $fetch(`${config.public.baseURL}/api/v2/product/${route.params.id}`, {
          headers: {
            origin: host.origin,
          },
        }),
    {
      server: false,
      lazy: true,
    }
) as any;

if (ErrorProduct.value && !product.value) {
  throw createError(ErrorProduct.value)
}

</script>

<template>
  <section
      v-if="product"
      class="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-12 gap-4 p-3 md:px-10 md:pt-20">
    <AppSectionProductInfoMediaBasic
        class="col-span-12 md:col-span-2 lg:col-span-6 lg:col-start-2"
        :product="product"/>
    <AppSectionProductInfoMetaBasic
        class="col-span-12 md:col-span-2 lg:col-span-4"
        :product="product"/>
    <LazyAppSectionProductInfoDescriptionBasic
        v-if="product.description"
        class="col-span-12"
        :content="product.description"
    />
  </section>
  <div
      v-else>
    <img
        class="block mx-auto" src="@/assets/media/lotties/loading.gif"
        :alt="isLoadingProduct ? 'Cargando' : 'No se encontro informacion'">
  </div>
</template>
