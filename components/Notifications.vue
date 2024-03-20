<script setup lang="ts">
const {notifications, remove, shift} = useToast();

// watch
watch(notifications, () => {
  setTimeout(() => {
    shift();
  }, 3000);
}, {deep: true});
</script>

<template>
  <div class="h-auto w-96 fixed bottom-5 right-5 z-50">
    <TransitionGroup>
      <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="{
           'border-green-400': notification.type === 'success',
           'border-red-400': notification.type === 'error',
           'border-yellow-400': notification.type === 'warning',
          }"
          class="flex items-center p-4 mb-4 border-b-4
          bg-white shadow rounded-lg"
          role="alert">
        <div class="flex flex-col">
          <p>
            {{ notification.title }}
          </p>
          <span class="text-sm font-medium text-gray-500">
          {{ notification.description }}
        </span>
        </div>
        <button
            @click="remove(notification.id)"
            type="button"
            class="ms-auto -mx-1.5 -my-1.5 text-gray-500 rounded-lg focus:ring-0
            p-1.5 inline-flex items-center justify-center ease-in-out duration-150
            h-8 w-8 hover:text-gray-700"
            aria-label="Close">
          <span class="sr-only">
            Cerrar notificación
          </span>
          <svg class="w-3 h-3"
               aria-hidden="true"
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 14 14">
            <path stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
