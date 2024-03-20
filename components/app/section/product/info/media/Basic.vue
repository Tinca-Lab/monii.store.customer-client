<template>
  <section class="grid grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
    <div class="col-span-4 md:col-span-5 lg:col-span-1 xs:w-full order-3 lg:order-1">
      <div
          class="flex xs:flex-row lg:flex-col gap-3 md:gap-4 justify-start items-center overflow-y-auto md:overflow-x-auto lg:h-[420px]">
        <div
            v-for="image in product.variants[0]?.images"
            :key="image._id" class="w-full flex justify-start"
            @click="selectImage(image)">
          <NuxtPicture
              title="Vista previa"
              :src="image.url"
              alt="Vista previa"
              class="w-32 h-32 rounded-lg object-contain cursor-pointer"
          />
        </div>
      </div>
    </div>
    <div class="col-span-4 md:col-span-5 lg:col-span-4 w-full order-1 lg:order-2">
      <NuxtPicture
          format="webp"
          quality="85"
          title="Imagen seleccionada"
          :src="selectedImage"
          alt="Imagen seleccionada"
          class="w-full rounded-lg object-cover custom-height"/>
    </div>
    <div class="w-max gap-4 hidden md:flex md:flex-col items-center order-2">
      <AppButtonPrimaryBasic
          class="w-6 h-6 p-0"
          @on-click="onAddFavorite(product)"
          variant="ghost">
        <IconLikeHeart class="hover:fill-primary ease-in-out duration-150"/>
      </AppButtonPrimaryBasic>
      <AppButtonPrimaryBasic
          class="w-9 h-9 p-0"
          title="Compartir"
          type="button"
          variant="ghost"
          @on-click="copy"
      >
        <IconShare class="hover:fill-primary ease-in-out duration-150"/>
        <span
            v-show="copied"
            class="text-xs bg-gray-200 rounded-lg p-1 text-nowrap absolute z-50">
          {{ copied ? '¡Copiado!' : '' }}
        </span>
      </AppButtonPrimaryBasic>
    </div>
  </section>
</template>

<script setup lang="ts">
// imports
import {useClipboard} from '@vueuse/core'


// composable
const config = useRuntimeConfig();
const url = useRequestURL();
const source = ref(url.href)
const {text, copy, copied, isSupported} = useClipboard({source})

// props
const props = defineProps<{
  product: any
}>();

// data
const favorites = useFavorites();

const selectedImage = ref(props.product?.variants[0].images[0].url)

// methods
const onAddFavorite = (item: any) => {
  favorites.add(item)
}

const selectImage = (image: any) => {
  selectedImage.value = image.url;
}
</script>

<style scoped>
@media (min-width: 769px) {
  .custom-height {
    max-height: 550px;
  }
}

@media (max-width: 768px) {
  .custom-height {
    max-height: 350px;
  }
}

::-webkit-scrollbar {
  width: 1px; /* Ancho de la barra de desplazamiento */
}

/* Estilo para la pista de la barra de desplazamiento */
::-webkit-scrollbar-track {
  background-color: transparent; /* Color de fondo de la pista */
  border-radius: 1.5rem; /* Redondeo de la pista */
}

/* Estilo para la barra de desplazamiento */
::-webkit-scrollbar-thumb {
  background-color: rgb(209 213 219); /* Color de la barra de desplazamiento */
  border-radius: 1.5rem; /* Redondeo de la barra de desplazamiento */
}
</style>
