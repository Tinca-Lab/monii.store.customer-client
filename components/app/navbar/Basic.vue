<script setup lang="ts">
// imports
import {Collapse} from "flowbite";
import type {CollapseInterface} from "flowbite";

// composable
const route = useRoute();
const cart = useCart();
const favorites = useFavorites();

// props
const props = defineProps<{
  routes: any[];
  company: any;
}>();

// data
const toggleCart = ref(false);
const toggleFavorite = ref(false);
const toggleProduct = ref(false);
const toggleProfile = ref(false);
let collapse: CollapseInterface;
let $targetEl: HTMLElement | null;
let $triggerEl: HTMLElement | null;

// computed
const bag: any = computed(() => cart.cartItems.value.reduce((acc: number, item: any) => acc + item?.quantity, 0));
const favorite: any = computed(() => favorites.favoritesItems.value.length);

// hooks
onMounted(() => {
  $targetEl = document.getElementById('collapse-navbar');
  $triggerEl = document.getElementById('button-collapse-navbar');

  collapse = new Collapse($targetEl, $triggerEl);

  collapse.collapse();
})

// watch
watch(toggleProduct, () => {
  if (toggleProduct.value) {
    toggleCart.value = false;
    toggleFavorite.value = false;
    toggleProfile.value = false;
  }
})

watch(toggleCart, () => {
  if (toggleCart.value) {
    toggleProduct.value = false;
    toggleFavorite.value = false;
    toggleProfile.value = false;
  }
})

watch(toggleFavorite, () => {
  if (toggleFavorite.value) {
    toggleProduct.value = false;
    toggleCart.value = false;
    toggleProfile.value = false;
  }
})

watch(toggleProfile, () => {
  if (toggleProfile.value) {
    toggleProduct.value = false;
    toggleCart.value = false;
    toggleFavorite.value = false;
  }
})

watch(() => route.path, () => {
  toggleProduct.value = false;
  toggleCart.value = false;
  toggleFavorite.value = false;
  toggleProfile.value = false;
  if (collapse) {
    collapse.collapse();
  }
})
</script>

<template>
  <nav
      class="border-gray-200 h-24 bg-white fixed top-0 left-0 w-full z-30 font-body text-xl shadow">
    <div class="w-full flex flex-wrap items-center justify-between px-4 md:px-16 py-4 h-full">
      <div class="flex items-end gap-8">
        <NuxtLink to="/">
          <LazyNuxtImg
              :src="company.config.logo ?? ''"
              :alt="company.name ?? ''"
              class="w-auto"
              height="40"
          />
        </NuxtLink>
        <LazyAppNavbarRoutesBasic
            v-if="routes"
            :routes="routes"
            @toggleProduct="toggleProduct = !toggleProduct"
        />
      </div>
      <div class="flex gap-2.5 relative items-center">
        <div class="relative flex items-center h-10">
          <button
              @click="toggleFavorite = !toggleFavorite"
              title="Abrir favoritos"
              class="w-5">
            <IconLikeHeart class="hover:fill-primary"/>
          </button>
          <span
              v-if="favorite > 0"
              class="absolute -top-2 -right-2 flex h-5 w-5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span
                class="flex items-center justify-center rounded-full h-5 w-5 bg-red-500 text-xs font-medium text-center text-white">
              {{ favorite > 9 ? '9+' : favorite }}
            </span>
          </span>
          <LazyDrawerFavoritesDrawer v-if="toggleFavorite"
                                     :is-open="toggleFavorite"
                                     @update:isOpen="toggleFavorite = false"
          />
        </div>
        <div class="relative flex items-center h-10">
          <button
              type="button"
              @click="toggleCart = !toggleCart"
              title="Abrir carrito"
              class="w-5">
            <IconShoppingBag class="hover:fill-primary"/>
          </button>
          <span
              v-if="bag > 0"
              class="absolute -top-2 -right-2 flex h-5 w-5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span
                class="flex items-center justify-center rounded-full h-5 w-5 bg-red-500 text-xs font-medium text-center text-white">
              {{ bag > 9 ? '9+' : bag }}
            </span>
          </span>
          <LazyDrawerShoppingCartDrawer v-if="toggleCart"
                                        @update:isOpen="toggleCart = !toggleCart"
                                        :isOpen="toggleCart"
          />
        </div>
        <div class="relative flex items-center h-10">
          <button
              @click="toggleProfile = !toggleProfile"
              title="Opciones de cuenta"
              class="w-5">
            <IconProfile class="hover:fill-primary"/>
          </button>
          <LazyDrawerProfileDrawer v-if="toggleProfile"
                                   @update:isOpen="toggleProfile = !toggleProfile"
                                   :isOpen="toggleProfile"
          />
        </div>
        <button
            id="button-collapse-navbar"
            data-collapse-toggle="collapse-navbar"
            data-drawer-target="collapse-navbar"
            data-drawer-toggle="collapse-navbar"
            data-drawer-backdrop="false"
            type="button"
            class="inline-flex items-center w-5 h-5 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="collapse-navbar"
            aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
      </div>
      <AppNavbarCollapseBasic/>
    </div>
    <AppMenuProductBasic
        v-if="toggleProduct"
        :is-open="toggleProduct"
        @update:isOpen="toggleProduct = false"
    />
  </nav>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
