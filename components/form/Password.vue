<template>
  <form @submit.prevent="onSubmit"

  >
    <div class="text-sm grid grid-cols-1 gap-4 font-body font-normal w-full  mb-4">
      <div>
        <label
            for="current-password"
            class="block mb-2 text-sm font-medium "
        >Contraseña actual</label>
        <input
            type="password"
            required
            v-model="currentPassword"
            id="current-password"
            class="block p-3 w-full text-sm bg-gray-100 rounded-lg border border-gray-400 shadow-sm focus:ring-primary focus:border-primary disabled:bg-gray-50 disabled:border-gray-300 disabled:cursor-not-allowed"
            placeholder="Contraseña actual"
            maxlength="32"
        />
      </div>
      <div>
        <label
            for="password"
            class="block mb-2 text-sm font-medium "
        >Nueva contraseña</label>
        <input
            type="password"
            required
            v-model="password"
            id="password"
            class="block p-3 w-full text-sm bg-gray-100 rounded-lg border border-gray-400 shadow-sm focus:ring-primary focus:border-primary disabled:bg-gray-50 disabled:border-gray-300 disabled:cursor-not-allowed"
            placeholder="Nueva contraseña"
            maxlength="32"
        />
      </div>
      <div>
        <label
            for="repeat-password"
            class="block mb-2 text-sm font-medium "
        >
          Nueva contraseña</label>
        <input
            required
            type="password"
            id="repeat-password"
            v-model="confirmPassword"
            class="block p-3 w-full text-sm bg-gray-100 rounded-lg border border-gray-400 shadow-sm focus:ring-primary focus:border-primary disabled:bg-gray-50 disabled:border-gray-300 disabled:cursor-not-allowed"
            placeholder="Confirma tu nueva contraseña"
            maxlength="32"
        />
      </div>
      <span
          v-if="isValid"
          class="text-red-800 text-sm">
            La contraseña aun no cumple con los requisitos.
      </span>
    </div>
    <!--    -->
    <AppButtonPrimaryBasic
        type="submit"
        block
        title="Guardar Cambios">
      Cambiar Contraseña
    </AppButtonPrimaryBasic>
    <div class="rounded-md w-full my-4">
      <h3 class="text-lg font-semibold mb-1">
        Requisitos de contraseña
      </h3>
      <p class="text-base">
        Para crear una contraseña segura, siga estos requisitos:
      </p>
      <ul class="list-disc pl-6">
        <li>
          Al menos 8 caracteres, pero no más de 32 caracteres
        </li>
        <li>
          Inclusión de al menos una letra mayúscula, e.g., A, B, C
        </li>
        <li>
          Inclusión de al menos una letra minúscula, e.g., a, b, c
        </li>
        <li>
          Inclusión de al menos un número, e.g., 1, 2, 3
        </li>
      </ul>
    </div>
  </form>
</template>

<script setup lang="ts">

// composable
const toast = useToast();
const config = useRuntimeConfig();
const accessToken = useCookie('access_token');

// props
const props = defineProps<{
  isEditing?: boolean
}>();

// data
const currentPassword = ref('');
const password = ref('');
const confirmPassword = ref('');
const isValid = ref(false);

// watch
watch([password, confirmPassword], () => {
  if (password.value.length < 8) {
    isValid.value = true;
    return;
  }
  if (password.value.length > 32) {
    isValid.value = true;
    return;
  }
  if (!/[A-Z]/.test(password.value)) {
    isValid.value = true;
    return;
  }
  if (!/[a-z]/.test(password.value)) {
    isValid.value = true;
    return;
  }
  if (!/[0-9]/.test(password.value)) {
    isValid.value = true;
    return;
  }
  isValid.value = false;
});

// methods
const onSubmit = () => {
  if (isValid.value) {
    toast.add({
      title: 'Oops!',
      description: 'La contraseña no cumple con los requisitos',
      type: 'error',
    })
    return;
  }
  if (!password.value || !confirmPassword.value || !currentPassword.value) {
    toast.add({
      title: 'Oops!',
      description: 'Por favor ingresa todos los campos',
      type: 'error',
    })
    return;
  }
  if (password.value !== confirmPassword.value) {
    toast.add({
      title: 'Oops!',
      description: 'Las contraseñas no coinciden',
      type: 'error',
    })
    return;
  }
  try {
    const {error, data} = useFetch('/api/v2/auth/change-password', {
      baseURL: config.public.baseURL,
      method: 'POST',
      body: JSON.stringify({
        password: password.value,
        confirmPassword: confirmPassword.value,
        currentPassword: currentPassword.value,
      }),
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      }
    })
    if (error.value && !data.value) {
      toast.add({
        title: 'Oops!',
        description: error.value.data.message,
        type: 'error',
      })
      return;
    }
    if (data.value) {
      toast.add({
        title: '¡Listo!',
        description: 'Tu contraseña ha sido actualizada',
        type: 'success',
      });
      currentPassword.value = '';
      password.value = '';
      confirmPassword.value = '';
    }
  } catch {
    toast.add({
      title: 'Oops!',
      description: 'Error desconocido al actualizar tu contraseña',
      type: 'error',
    })
  }
};
</script>
