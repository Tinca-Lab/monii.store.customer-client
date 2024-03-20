<template>
  <div class="text-sm grid grid-cols-1 gap-4 font-body font-normal sm:grid-cols-2 w-full">
    <div>
      <label for="name"
             class="block mb-2 text-sm font-medium">Nombres</label>
      <input type="text"
             id="name"
             v-model="payload.shipping.name"
             class="block p-3 w-full text-sm uppercase bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
             placeholder="Juan" required>
    </div>
    <div>
      <label for="lastname" class="block mb-2 text-sm font-medium">Apellidos</label>
      <input
          type="text"
          id="lastname"
          v-model="payload.shipping.lastname"
          class="block p-3 w-full text-sm uppercase bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
          placeholder="Ramirez" required>
    </div>
    <div>
      <label for="email" class="block mb-2 text-sm font-medium">Tu email</label>
      <input type="email" id="email"
             v-model="payload.shipping.email"
             class="block p-3 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
             placeholder="name@example.com" required>
    </div>
    <div>
      <label for="department" class="block mb-2 text-sm font-medium">Departamento</label>
      <select
          v-model="payload.shipping.state"
          id="department"
          @change="onChangeState"
          class="block p-3 w-full text-sm uppercase bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
          required>
        <option disabled selected value="">Seleccionar tu departamento</option>
        <option
            v-for="location in locations"
            :value="location.state">
          {{ location.state }}
        </option>
      </select>
    </div>
    <div>
      <label for="city" class="block mb-2 text-sm font-medium">Ciudad</label>
      <select id="city"
              :value="`${payload.cityId},${payload.city}`"
              @change="onChangeCity"
              class="block p-3 w-full text-sm uppercase bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
              required>
        <option disabled selected value="">Selecciona tu ciudad</option>
        <option
            v-for="location in cities"
            :value="`${location.cityId},${location.city}`">
          {{ location.city }}
        </option>
      </select>
    </div>
    <div>
      <label for="address" class="block mb-2 text-sm font-medium">Direccion</label>
      <input type="text"
             v-model="payload.shipping.street"
             id="address"
             class="block p-3 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary focus:border-primary uppercase"
             placeholder="CLL 52 #23-31" required>
    </div>
    <div>
      <label for="phone-number" class="block mb-2 text-sm font-medium">Telefono/Celular</label>
      <input type="number"
             v-model="payload.shipping.phone"
             id="phone-number"
             min="0"
             class="block p-3 w-full text-sm uppercase bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
             placeholder="315476980" required>
    </div>
    <div>
      <label for="zip" class="block mb-2 text-sm font-medium">Zip/Codigo postal</label>
      <input type="number" id="zip"
             v-model="payload.shipping.zip"
             min="0"
             class="block p-3 w-full text-sm uppercase bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
             placeholder="680003" required>
    </div>
  </div>
</template>
<script setup lang="ts">

// composable
const config = useRuntimeConfig();
const {user} = useAuth();

// props
const props = defineProps<{
  value: any
}>();

// data
const cities = ref();
const {data: locations, pending: isLoadingLocation} = await useAsyncData<any>(
    'locations',
    () => $fetch(
        `${config.public.baseURL}/api/v2/location`,
    ),
    {
      server: false,
      lazy: true,
    }
)

// computed
const payload = computed(() => props.value);

// methods
const onChangeState = async (e: Event) => {
  const state = (e.target as HTMLSelectElement).value;
  const stateId = locations.value.find((location: any) => location.state === state).stateId;
  payload.value.shipping.stateId = stateId;
  await onFetchCities(stateId);
}

const onChangeCity = (e: Event) => {
  const [cityId, city] = (e.target as HTMLSelectElement).value.split(',');
  payload.value.shipping.cityId = cityId;
  payload.value.shipping.city = city;
}

const onFetchCities = async (stateId: number) => {
  const {data} = await useFetch<any>(
      `${config.public.baseURL}/api/v2/location/${stateId}`,
  )
  cities.value = data.value;
}

// watch
watch([locations, payload], async () => {
  if (!locations.value) return;
  if (user.value) {
    const stateId = payload.value.shipping.stateId;
    await onFetchCities(stateId);
  }
}, {deep: true, immediate: true})
</script>
