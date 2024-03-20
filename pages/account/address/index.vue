<template>
  <section
  >
    <div class="grid grid-cols-12 gap-4 mt-4 px-4">
      <NavAccount class="col-span-full sm:col-span-2 sm:col-start-2 gap-4"/>
      <div
          class="col-span-full lg:col-span-8 justify-center items-center"
          v-if="isLoadingAddresses">
        <img
            class="block mx-auto" src="@/assets/media/lotties/loading.gif"
            :alt="isLoadingAddresses ? 'Cargando' : 'No se encontro informacion'">
      </div>
      <div
          class="lg:col-span-5 col-span-full flex flex-col gap-4 rounded-lg px-4"
          v-else-if="!isLoadingAddresses && !addresses">
        <h1 class="font-medium text-2xl font-primary">
          Direccion de envio
        </h1>
        <span class="font-body text-lg">
          No hay direcciones de envio guardadas
        </span>
        <NuxtLink
            title="Agregar direccion"
            to="/account/address/create"
            class="w-max bg-neutral-900 text-white font-medium font-body rounded-lg px-5 py-2 hover:bg-neutral-800 ease-in-out duration-150">
          Agregar direccion
        </NuxtLink>
      </div>
      <section
          v-else
          class="col-span-full lg:col-span-8 gap-4 flex overflow-x-auto overflow-y-hidden">
        <article
            title="Doble click para establecer como predeterminada"
            @dblclick="onDefaultAddress(address)"
            v-for="address in addresses"
            :class="[address.default ? 'border-dashed border-neutral-500 border-2' : 'border-dashed border-neutral-200 border-2']"
            class="bg-gray-100 font-body font-medium relative p-5 flex flex-col justify-between gap-2 rounded-lg cursor-pointer min-w-[300px] h-max">
          <div class="flex items-center justify-between gap-x-2">
            <div class="flex items-center gap-2 bg-gray-200 px-3.5 py-1.5 rounded-lg">
              <input
                  title="Establecer como predeterminada"
                  name="default-address"
                  type="checkbox"
                  :checked="address.default"
                  @change="onDefaultAddress(address)"
                  class="w-4 h-4 rounded-sm"
              />
              <label
                  title="Establecer como predeterminada"
                  for="default-address"
                  class="ml-2 text-xs font-body font-medium underline">
                Predeterminada
              </label>
            </div>
            <button
                title="Eliminar direccion"
                name="delete-address"
                type="button"
                @click="onDeleteAddress(address)"
                class="flex items-center text-red-500 hover:text-red-700 ease-in-out duration-150 text-xs gap-1">
              <span class="w-5 h-5">
                  <IconTrash/>
              </span>
            </button>
          </div>

          <div class="flex flex-col gap-2 w-full">
            <p class="uppercase w-min whitespace-normal">
              {{ address.name }} {{ address.lastname }}
            </p>
            <p>
              {{ address.email }}
            </p>
            <p class="uppercase">
              {{ address.street }}
            </p>
            <p>
              {{ address.city }}
            </p>
            <p>
              {{ address.state }}
            </p>
            <p>
              {{ address.phone }}
            </p>
            <p>
              {{ address.zip }}
            </p>
          </div>
          <NuxtLink
              title="Editar direccion"
              class="bg-neutral-200 text-center w-full whitespace-nowrap border border-neutral-400 font-medium font-body rounded-lg px-5 py-2 hover:bg-neutral-300 ease-in-out duration-150"
              :to="`/account/address/${address._id}`"
          >
            Editar direccion
          </NuxtLink>
        </article>
      </section>

    </div>
    <NuxtLink
        v-if="addresses"
        title="Agregar direccion"
        to="/account/address/create"
        class="w-max block mx-auto mt-4 bg-neutral-900 text-white font-medium font-body rounded-lg px-5 py-2 hover:bg-neutral-800 ease-in-out duration-150">
      Agregar direccion
    </NuxtLink>
  </section>
</template>
<script setup lang="ts">

// composable
const config = useRuntimeConfig();
const route = useRoute();
const host = useRequestURL();
const accessToken = useCookie('access_token');
const toast = useToast();

// meta
definePageMeta({
  layout: 'default',
  middleware: ['auth'],
})

// seo
useHead({
  title: 'Mis direcciones',
  meta: [
    {
      name: 'description',
      content: 'Direcciones de envio',
    },
  ],
})

// data
const {data: addresses, pending: isLoadingAddresses, refresh: onFetchAddress} = await useAsyncData<any>(
    'addresses',
    () => $fetch(
        `${config.public.baseURL}/api/v2/user/address`,
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }),
    {
      server: false,
      lazy: true,
    }
);

// methods
const onDeleteAddress = async (address: any) => {
  if (address.default) {
    toast.add({
      description: 'No puedes eliminar una direccion predeterminada',
      type: 'warning',
      title: 'Oops!'
    });
    return;
  }

  try {
    const {data, error} = await useFetch(
        `${config.public.baseURL}/api/v2/user/address/${address._id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
          server: false,
          lazy: true,
        })
    if (error.value) {
      toast.add({
        description: error.value.data.message,
        type: 'error',
        title: 'Oops!'
      })
      return;
    }
    await onFetchAddress();
    toast.add({
      description: 'Direccion eliminada correctamente',
      type: 'success',
      title: '¡Exito!'
    });
  } catch {
    toast.add({
      description: 'Error desconocido al eliminar la direccion',
      type: 'error',
      title: 'Oops!'
    });
    await onFetchAddress();
  }
}

const onDefaultAddress = async (address: any) => {
  if (address.default) {
    toast.add({
      description: 'Esta direccion ya es predeterminada',
      type: 'warning',
      title: 'Oops!'
    });
    return;
  }
  try {
    const {data, error} = await useFetch(
        `${config.public.baseURL}/api/v2/user/address/default/${address._id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
          server: false,
          lazy: true,
        })
    if (error.value) {
      toast.add({
        description: error.value.data.message,
        type: 'error',
        title: 'Oops!'

      });
      return;
    }
    await onFetchAddress();
    toast.add({
      description: 'Direccion predeterminada actualizada correctamente',
      type: 'success',
      title: '¡Exito!'
    });
  } catch {
    toast.add({
      description: 'Error desconocido al actualizar la direccion predeterminada',
      type: 'error',
      title: 'Oops!'
    });
    await onFetchAddress();
  }
}
</script>
