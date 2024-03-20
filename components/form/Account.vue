<script setup lang="ts">
// composable
const auth = useAuth();
const config = useRuntimeConfig();
const accessToken = useCookie('access_token');
const toast = useToast();


// data
const isEditing = ref(false);
const isMutated = ref(false);
let USER: any = null;
const user = auth.user;

// methods
const onSubmit = async () => {
  try {
    const {error} = await useFetch(
        '/api/v2/user',
        {
          baseURL: config.public.baseURL,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
          server: false,
          lazy: true,
          body: JSON.stringify(user.value),
        }
    );
    if (error.value) {
      toast.add({
        title: 'Oops!',
        description: error.value.data.message,
        type: 'error',
      })
      return;
    }
    toast.add({
      title: 'Listo!',
      description: 'Tu cuenta ha sido actualizada',
      type: 'success',
    })
    await auth.me();
  } catch {
    toast.add({
      title: 'Oops!',
      description: 'Error desconocido al actualizar tu cuenta',
      type: 'error',
    })
  }
}

const onEditing = async () => {
  isEditing.value = !isEditing.value;
}

// onMounted
onMounted(() => {
  USER = JSON.stringify(user.value);
});

// watch
watch(user, () => {
  isMutated.value = user.value !== USER;
}, {deep: true});
</script>


<template>
  <form
      class="flex flex-col gap-4"
      @submit.prevent="onSubmit">
    <section class="flex items-center justify-between">
      <p class="font-medium font-primary text-xl">
        Mis datos
      </p>
      <AppButtonPrimaryBasic
          class="p-2"
          variant="outline"
          type="button"
          title="Habilitar edicion"
          @click="onEditing">
        Editar informacion
      </AppButtonPrimaryBasic>
    </section>
    <div
        class="text-sm grid grid-cols-1 gap-4 font-body font-normal w-full sm:grid-cols-2"
    >
      <div>
        <label
            for="name"
            class="block mb-2 text-sm font-medium"
        >Nombres</label>
        <input
            :disabled="!isEditing"
            v-model="user.name"
            title="Nombres"
            type="text"
            id="name"
            class="block p-3 w-full text-sm bg-gray-100 rounded-lg border border-gray-400 shadow-sm focus:ring-primary focus:border-primary disabled:bg-gray-50 disabled:border-gray-300 disabled:cursor-not-allowed"
            placeholder="Juan Andres"
        />
      </div>
      <div>
        <label
            for="lastname"
            class="block mb-2 text-sm font-medium"
        >Apellidos</label
        >
        <input
            v-model="user.lastname"
            :disabled="!isEditing"
            title="Apellidos"
            type="text"
            id="lastname"
            class="block p-3 w-full text-sm bg-gray-100 rounded-lg border border-gray-400 shadow-sm focus:ring-primary focus:border-primary disabled:bg-gray-50 disabled:border-gray-300 disabled:cursor-not-allowed"
            placeholder="Lopez"
        />
      </div>
      <div>
        <label for="email" class="block mb-2 text-sm font-medium"
        >Tu email</label
        >
        <input
            v-model="user.email"
            :disabled="!isEditing"
            title="Correo electronico"
            type="email"
            id="email"
            class="block p-3 w-full text-sm bg-gray-100 rounded-lg border border-gray-400 shadow-sm focus:ring-primary focus:border-primary disabled:bg-gray-50 disabled:border-gray-300 disabled:cursor-not-allowed"
            placeholder="jhon@doe.com"
        />
      </div>
      <div>
        <label
            for="phone"
            class="block mb-2 text-sm font-medium"
        >Numero telefono/Celular</label
        >
        <input
            v-model="user.phone"
            :disabled="!isEditing"
            title="Numero telefono/Celular"
            type="number"
            min="0"
            maxlength="10"
            id="phone"
            class="block p-3 w-full text-sm bg-gray-100 rounded-lg border border-gray-400 shadow-sm focus:ring-primary focus:border-primary disabled:bg-gray-50 disabled:border-gray-300 disabled:cursor-not-allowed"
            placeholder="e.j. 3123456789"
        />
      </div>
    </div>
    <AppButtonPrimaryBasic
        block
        :disabled="!(isEditing && isMutated == true)"
        title="Guardar Cambios"
        @click="onSubmit">
      Guardar Cambios
    </AppButtonPrimaryBasic>
  </form>
</template>


