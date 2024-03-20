<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<script setup>

// composable
const url = useRequestURL();
const config = useRuntimeConfig();
const companyStore = useCompanyStore();
const style = useStyle();
const cart = useCart();
const favorites = useFavorites();

// data
const {data: company, error: ErrorCompany} = await useAsyncData(
    'company',
    () => $fetch(`${config.public.baseURL}/api/v2/company`, {
      headers: {
        origin: url.origin,
      }
    }),
);

if (ErrorCompany.value) {
  throw createError(ErrorCompany.value)
}

companyStore.setCompany(company.value);

const {primaryColor, secondaryColor, thirdColor} = company.value.config;
style.setPrimaryColor(primaryColor);

const {data: routes, error: ErrorRoutes} = await useAsyncData(
    'routes',
    () => $fetch(`${config.public.baseURL}/api/v2/route`, {
      headers: {
        origin: url.origin,
      },
      params: {
        filters: 'menu[$eq]=true',
      },
    }),
);

if (ErrorRoutes.value) {
  throw createError(ErrorRoutes.value);
}

// provide/inject
provide('routes', routes)

// seo
useSeoMeta({
  ogTitle: company.value.name || '',
  ogDescription: company.value.description || '',
  ogImage: company.value.config.logo || '',
  ogUrl: url.href,
})

useHead({
  title: company.value.name,
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: company.value.config.favicon || '/favicon.ico',
    },
  ],
  meta: [
    {
      name: 'description',
      content: company?.value?.description || '',
    },
    {
      name: 'twitter:image',
      content: company.value.config.logo || '',
    },
    {
      name: 'twitter:description',
      content: company.value.description || '',
    },
    {
      name: 'twitter:card',
      content: 'summary_image',
    },
    {
      name: 'twitter:title',
      content: company.value.name || '',
    },
    {
      name: 'twitter:site',
      content: company.value.config.socialNetworks.find((social) => social.name === 'Twitter').url || '',
    }
  ],
});

onMounted(() => {
  cart.sync()
  favorites.sync()
});
</script>
