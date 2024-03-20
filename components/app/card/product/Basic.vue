<script setup lang="ts">

// composable
const config = useRuntimeConfig();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();
const cart = useCart();
const favorites = useFavorites();

// props
const props = defineProps<{
  product: any;
  reduceHeight?: boolean;
}>();

// methods
const onAdd = (item: any) => {
  cart.add(item, 1);
};

const onAddFavorite = (item: any) => {
  favorites.add(item);
};
</script>

<template>
  <article
      class="flex flex-col justify-between overflow-hidden relative rounded-3xl w-full ring-2 ring-gray-50 bg-neutral-50"
  >
    <label
        v-if="product.variants[0].discount.value || product.variants[0].discount.percent"
        class="font-body bg-green-600 text-white text-sm font-normal absolute top-10 right-10 z-10 px-5 py-2.5 rounded-xl"
    >
      <span>- {{ product.variants[0].discount.percent }} %</span>
    </label>
    <NuxtLink
        :title="product.name"
        name="product-name"
        :to="`/products/${product._id}`"
        class="h-[550px] overflow-hidden rounded-3xl z-0 relative"
    >
      <LazyNuxtImg
          class="w-full h-full hover:scale-125 object-cover transition-all ease-in-out duration-300 rounded-3xl"
          :src="product.variants[0].images[0].url"
          alt=""
      />
    </NuxtLink>
    <article class="flex flex-row justify-between p-4 gap-2">
      <div class="font-body flex flex-col items-start h-max">
        <p class="text-base font-medium font-primary truncate ...">
          {{ product.name }}
        </p>
        <div class="flex items-center gap-2 2xl:gap-2 text-sm flex-wrap">
          <span
              class="font-body font-semibold text-red-600"
              v-if="product.variants[0].discount.value || product.variants[0].discount.percent"
          >
            {{ useDiscount(product.variants[0].price, product.variants[0].discount.percent) }}
          </span>
          <span
              :class="[
              product.variants[0].discount.value || product.variants[0].discount.percent ? 'line-through text-gray-400' : '',
            ]"
              class="font-body py-1.5"
          >
            {{ useCurrency(product.variants[0].price) }}
          </span>
        </div>
      </div>
      <div class="flex gap-1 items-start">
        <button
            class="w-6 h-6"
            title="Agregar a favoritos"
            name="add-favorite"
            @click="onAddFavorite(product)">
          <IconLikeHeart class="hover:fill-primary"/>
        </button>
        <button
            class="w-6 h-6"
            title="Agregar al carrito"
            name="add-cart"
            @click="onAdd(product)">
          <IconShoppingBag class="hover:fill-primary"/>
        </button>
      </div>
    </article>
  </article>
</template>
