<template>
  <div class="flex flex-col gap-4">
    <!---->
    <div class="grid grid-cols-1 lg:grid-cols-1 bg-white rounded-xl py-4">
      <div>
        <h2
            class="xs:text-base md:text-lg font-body font-medium leading-normal"
        >
          Envío
        </h2>
        <p class="xs:text-sm md:text-base font-body leading-normal">
          Lee nuestra política de envíos y devoluciones.
        </p>
      </div>
      <div class="col-span-2">
        <p
            class="xs:text-sm md:text-lg font-body font-semibold text-green-600 self-start m-1"
        >
          {{ useCurrency(payload.cost || 0) }}
        </p>
      </div>
      <div class="col-span-3 underline decoration-1">
        <a
            href="#"
            target="_blank"
            class="xs:text-sm md:text-base font-inter font-semibold my-1">
          Política de envíos y devoluciones
        </a>
      </div>
    </div>
    <!--    -->
    <div
        v-if="!user"
        class="bg-white rounded-xl border border-candles-medium p-4 flex flex-col gap-3 font-body text-base">
      <div class="flex gap-2">
        <p>
          ¿Ya tienes cuenta?
        </p>
        <NuxtLink
            :to="`/login?redirect=${url.pathname}`"
            class="font-medium text-green-600 underline decoration-1"
        >Iniciar sesión
        </NuxtLink>
      </div>
      <div>
        <span>
          ¿No tienes una cuenta?
        </span>
        <NuxtLink
            to="/register"
            class="font-medium text-green-600 underline decoration-1">
          Regístrate.
        </NuxtLink>
        <span>
          Para hacer seguimiento de tus pedidos y otros beneficios más.
        </span>
      </div>

    </div>

    <div
        class="flex flex-col gap-4"
        v-if="!user">
      <p class="xs:text-sm md:text-xl font-medium font-body bg-white rounded-xl flex flex-col gap-2">
        Información de Usuario
        <span class="text-xs font-body text-gray-400 underline">
        Si no has iniciado sesión, nos ayudara a garantizar la unicidad de tu cuenta.
      </span>
      </p>
      <div>
        <label for="payload-email"
               class="block mb-2 text-sm font-medium">Correo Electronico</label>
        <input type="text"
               id="payload-email"
               v-model="payload.email"
               class="block p-3 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary font-body focus:border-primary"
               placeholder="name@example.com" required>
      </div>
    </div>

    <p class="xs:text-sm md:text-xl font-medium font-body bg-white rounded-xl gap-4">
      Información de Envío <span class="text-xs">(quien recibe)</span>
    </p>
    <div
        v-if="user"
    >
      <label
          class="font-semibold text-sm"
          for="addresses">
        Tus direcciones
      </label>
      <select
          @change="onSelectAddress"
          id="addresses"
          class="focus:ring-primary focus:border-primary block w-full p-3 text-sm bg-gray-50 rounded-lg border border-gray-300 shadow-sm font-body"
      >
        <option selected disabled>Selecciona una dirección</option>
        <option
            :value="index"
            v-for="(address, index) in addresses"
            :key="index">
          {{ address.name }} {{ address.lastname }} - {{ address.street }} {{ address.city }} {{ address.state }}
          {{ address.zip }}
        </option>
      </select>
    </div>
    <FormShipping
        :value="payload"
    />

    <div class="xs:py-3 rounded-xl">
      <div class="items-center gap-3 flex">
        <input
            id="billing"
            v-model="billing"
            type="checkbox"
            class="text-xs md:text-sm font-inter font-medium checked:bg-primary rounded-sm focus:ring-primary"
        />
        <label for="billing" class="font-body text-xs">La dirección de facturación es diferente a la del
          envío.</label
        >
      </div>
    </div>

    <div
        v-if="billing"
        class="bg-white rounded-xl p-4 flex flex-col gap-4">
      <p class="xs:text-sm md:text-xl font-medium font-body">
        Datos de facturación <span class="text-xs">(quien paga)</span>
      </p>
      <FormBilling
          :value="payload"
          class="m-auto"/>
    </div>
  </div>
</template>

<script setup lang="ts">

// composable
const url = useRequestURL();
const config = useRuntimeConfig();
const accessToken = useCookie('access_token');
const {user} = useAuth();

// props
const props = defineProps<{
  value: any,
}>();

// data
const billing = ref(false);
const address = ref(null)
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
      immediate: false,
    }
);


// computed
const payload = computed(() => props.value);

// methods
const onSelectAddress = (e: Event) => {
  const index = (e.target as HTMLSelectElement).value;
  address.value = addresses.value[index];
  payload.value.shipping = address.value;
}

// watch
watch(billing, () => {
  if (billing.value) {
    payload.value.billing = {
      name: '',
      lastname: '',
      email: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zip: '',
    }
  } else {
    payload.value.billing = payload.value.shipping
  }
}, {immediate: false, deep: true})

// hooks
onMounted(async () => {
  if (user.value && !addresses.value) {
    await onFetchAddress()
  }
  if (user.value && addresses.value) {
    address.value = addresses.value.find((address: any) => address.default);
    payload.value.shipping = address.value;
    payload.value.billing = address.value;
  }
})
</script>
