<template>
  <div>
    <p class="xs:text-sm md:text-xl font-bold font-body">
      Dirección de Envío
    </p>
    <form
        @submit.prevent="onSubmit"
        class="text-sm grid grid-cols-1 gap-4 py-3 font-body font-normal sm:grid-cols-2"
    >
      <div>
        <label for="first-name" class="block mb-2 text-sm font-medium">Primer Nombre</label>
        <input
            v-model="payload.name"
            type="text"
            id="name"
            class="block p-3 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
            placeholder="John"
            required
        />
      </div>
      <div>
        <label for="lastname" class="block mb-2 text-sm font-medium">Apellido</label>
        <input
            v-model="payload.lastname"
            type="text"
            id="lastname"
            class="block p-3 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
            placeholder="Doe"
            required
        />
      </div>
      <div>
        <label
            for="email"
            class="block mb-2 text-sm font-medium">Tu email</label>
        <input
            v-model="payload.email"
            type="email"
            id="email"
            class="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            placeholder="john@doe.com"
            required
        />
      </div>
      <div>
        <label for="department" class="block mb-2 text-sm font-medium"
        >Departamento</label
        >
        <select
            v-model="payload.state"
            @change="onChangeState"
            id="department"
            class="block p-3 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
            required
        >
          <option value="" disabled selected>
            Seleccione una opcion
          </option>
          <option
              v-for="location in locations"
              :value="location.state">
            {{ location.state }}
          </option>
        </select>
      </div>
      <div>
        <label for="city" class="block mb-2 text-sm font-medium"
        >Ciudad</label
        >
        <select
            :value="`${payload.cityId},${payload.city}`"
            @change="onChangeCity"
            id="city"
            class="block p-3 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
            required
        >
          <option value="" disabled selected>
            Seleccione una opcion
          </option>
          <option
              :value="`${location.cityId},${location.city}`"
              v-for="location in cities"
          >
            {{ location.city }}
          </option>
        </select>
      </div>
      <div>
        <label for="address" class="block mb-2 text-sm font-medium"
        >Direccion</label
        >
        <input
            v-model="payload.street"
            type="text"
            id="address"
            class="shadow-sm uppercase bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            placeholder="CLL 51 #23-31 APT 308"
            required
        />
      </div>
      <div>
        <label for="phone-number" class="block mb-2 text-sm font-medium"
        >Telefono/Celular</label
        >
        <input
            v-model="payload.phone"
            type="number"
            id="phone-number"
            min="0"
            class="block p-3 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
            placeholder="3102908761"
            required
        />
      </div>
      <div>
        <label for="zip" class="block mb-2 text-sm font-medium"
        >Zip/Codigo postal
        </label>
        <input
            v-model="payload.zip"
            type="number"
            id="zip"
            min="0"
            minlength="1"
            class="block p-3 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
            placeholder="680003"
            required
        />
      </div>
      <button
          :disabled="isUpdatingAddress"
          title="Guardar"
          class="bg-primary px-5 py-2 rounded-lg font-medium col-span-full hover:bg-primary/80 ease-in-out duration-150 disabled:bg-primary/50 disabled:cursor-not-allowed"
          type="submit"
      >
        Guardar
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">

// composable
const config = useRuntimeConfig();

// props
const props = defineProps<{
  value?: any;
  isUpdatingAddress?: boolean;
}>();

// emits
const emits = defineEmits<{
  (event: "onSubmit"): void
}>();

// data
const cities = ref();
const {data: locations, pending: isLoadingLocation} = await useAsyncData<any>(
    'locations',
    () => $fetch(
        '/api/v2/location', {
          method: 'GET',
          baseURL: config.public.baseURL,
        }
    ),
    {
      server: false,
      lazy: true,
    }
)

// computed
const payload = computed(() => props.value)

// methods
const onSubmit = () => {
  emits("onSubmit");
};

const onChangeState = async (e: Event) => {
  const state = (e.target as HTMLSelectElement).value;
  const stateId = locations.value.find((location: any) => location.state === state).stateId;
  payload.value.stateId = stateId;
  const {data} = await useFetch<any>(
      `${config.public.baseURL}/api/v2/location/${stateId}`,
  )
  cities.value = data.value;
}

const onChangeCity = (e: Event) => {
  const [cityId, city] = (e.target as HTMLSelectElement).value.split(',');
  payload.value.cityId = cityId;
  payload.value.city = city;
}

// hooks
onMounted(async () => {

})

// watch
watch(payload, async () => {
  if (!payload.value.stateId) {
    return;
  }
  const {data} = await useFetch<any>(
      `${config.public.baseURL}/api/v2/location/${payload.value.stateId}`,
  )
  cities.value = data.value;
}, {
  deep: true
})
</script>
