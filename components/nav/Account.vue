<script setup lang="ts">
// composable
const auth = useAuth();
</script>

<template>
  <div class="bg-white w-full h-auto lg:h-96 rounded-lg">
    <ul class="font-body w-min lg:w-full flex items-center md:flex-col mx-auto">
      <li class="lg:border-b w-full">
        <NuxtLink
            active-class="text-primary"
            title="Pedidos"
            to="/account/orders"
            class="flex items-center gap-2 px-5 py-2 hover:text-primary ease-in-out duration-150">
          <span class="w-5 h-5">
            <IconShoppingBag/>
          </span>
          <span class="hidden sm:block">
            Pedidos
          </span>
        </NuxtLink>
      </li>
      <li class="lg:border-b w-full">
        <NuxtLink
            active-class="text-primary"
            title="Direcciones"
            to="/account/address"
            class="flex items-center gap-2 px-5 py-2 hover:text-primary ease-in-out duration-150">
          <span class="w-5 h-5">
            <IconMapPin/>
          </span>
          <span class="hidden sm:block">
            Direcciones
          </span>
        </NuxtLink>
      </li>
      <li class="lg:border-b w-full">
        <NuxtLink
            active-class="text-primary"
            title="Direcciones"
            to="/account"
            class="flex items-center gap-2 px-5 py-2 hover:text-primary ease-in-out duration-150">
          <span class="w-5 h-5">
            <IconProfile/>
          </span>
          <span class="hidden sm:block text-center">
            Mi Cuenta
          </span>
        </NuxtLink>
      </li>
      <li class="lg:border-b w-full">
        <button
            @click="auth.logout()"
            title="Cerrar Sesión"
            class="flex items-center gap-2 px-5 py-2 hover:text-primary ease-in-out duration-150">
          <span class="w-5 h-5">
            <IconBackDoorIcon/>
          </span>
          <span class="hidden sm:block text-center">
            Cerrar Sesión
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>
