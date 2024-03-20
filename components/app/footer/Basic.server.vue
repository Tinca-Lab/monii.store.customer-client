<script setup lang="ts">
// props
const props = defineProps<{
  company: any,
  routes: any,
}>();

</script>

<template>
  <section
      class="grid grid-cols-4 md:grid-cols-10 lg:grid-cols-12 gap-3 md:gap-4 px-3 md:px-4 py-16">
    <article
        class="w-full gap-5 flex flex-col col-span-4 lg:col-start-2 md:col-span-2 border-b-2 border-blue-200 pb-5 md:border-none">
      <NuxtLink class="block mx-auto" to="/">
        <nuxt-img
            format="webp"
            class="w-auto"
            height="40"
            v-if="company.config.logo"
            :src="company.config.logo"
            :alt="company.name"/>
        <h1
            class="font-primary"
            v-else>
          {{ company.name }}
        </h1>
      </NuxtLink>
      <span class="font-body text-base">
        {{ company.description }}
      </span>
    </article>
    <article
        class="w-full md:col-start-4 col-span-4 lg:col-start-5 md:col-span-1 border-b-2 border-blue-200 pb-5 p md:border-none flex flex-col gap-4">
      <p class="font-medium">
        Navegación
      </p>
      <ul class="flex flex-col items-left gap-2">
        <li v-for="route in routes" :key="route._id">
          <NuxtLink class="font-medium text-base font-body underline" :to="route.path">
            {{ route.title }}
          </NuxtLink>
        </li>
      </ul>
    </article>
    <article
        class="flex flex-col gap-4 w-full col-span-4 md:col-start-6 lg:col-start-7 md:col-span-2 border-b-2 border-blue-200 pb-5 md:border-none">
      <span class="font-medium">
        Síguenos
      </span>
      <span
          v-if="!!company.config.socialNetworks[0]"
          class="flex gap-4">
          <a
              class="w-5 h-5"
              v-for="socialNetwork in company.config.socialNetworks"
              :key="socialNetwork._id"
              :title="socialNetwork.name"
              target="_blank"
              :href="socialNetwork.url">
            <span class="font-primary text-base">
              <component class="w-5 h-5" :is="resolveComponent(socialNetwork.icon)"/>
            </span>
          </a>
      </span>
    </article>
    <article
        v-if="company.address"
        class="flex flex-col gap-4 w-full col-span-4 md:col-start-9 lg:col-start-10 md:col-span-2">
      <span class="font-medium">
        Ubicación
      </span>
      <span class="font-body">
        {{ company.address }}
      </span>
    </article>
    <article class="w-full col-span-full">
      <span class="flex justify-center gap-1 text-base font-body">
        © <b>{{ new Date().getFullYear() }}</b>{{ company.name }}. Todos los derechos reservados.
      </span>
    </article>
  </section>
</template>
