<script setup lang="ts">


// composable
const auth = useAuth();
const accessToken = useCookie('access_token');

// props
const props = defineProps<{
  isOpen: boolean;
}>();

// emits
const emits = defineEmits<(
    (event: 'update:isOpen') => void
    )>();
</script>

<template>
  <ClientOnly>
    <TransitionGroup>
      <article
          v-if="isOpen"
          class="w-max h-auto bg-white rounded-lg shadow absolute top-10 right-0 p-5">
        <ul class="text-sm flex flex-col gap-y-1.5">
          <li>
            <NuxtLink
                class="hover:underline"
                title="Ver mi cuenta"
                to="/account">
              Mi cuenta
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
                class="hover:underline"
                title="Ver pedidos"
                to="/account/orders">
              Ver pedidos
            </NuxtLink>
          </li>

          <li
              v-if="accessToken"
          >
            <button
                class="hover:underline"
                title="Cerrar sesión"
                @click="auth.logout()"
            >
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </article>
    </TransitionGroup>
  </ClientOnly>
</template>

<style scoped>

</style>
