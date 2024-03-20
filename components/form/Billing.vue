<template>
  <div class="text-sm grid grid-cols-1 gap-4 font-body font-normal sm:grid-cols-2 w-full">
    <div>
      <label for="name"
             class="block mb-2 text-sm font-medium">Nombres</label>
      <input type="text"
             id="name"
             v-model="payload.billing.name"
             class="block p-3 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
             placeholder="Juan" required>
    </div>
    <div>
      <label for="lastname" class="block mb-2 text-sm font-medium">Apellidos</label>
      <input
          type="text"
          id="lastname"
          v-model="payload.billing.lastname"
          class="block p-3 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
          placeholder="Ramirez" required>
    </div>
    <div>
      <label for="email" class="block mb-2 text-sm font-medium">Tu email</label>
      <input type="email" id="email"
             v-model="payload.billing.email"
             class="block p-3 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
             placeholder="name@example.com" required>
    </div>
    <div>
      <label for="department" class="block mb-2 text-sm font-medium">Departamento</label>
      <select
          id="department"
          @input="(e) => {
            payload.billing.state = e.target.value
          }"
          class="block p-3 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
          required>
        <option disabled selected value="">Seleccionar tu departamento</option>
        <option value="Amazonas">Amazonas</option>
      </select>
    </div>
    <div>
      <label for="city" class="block mb-2 text-sm font-medium">Ciudad</label>
      <select id="city"
              @input="(e) => {
                payload.billing.city = e.target.value
              }"
              class="block p-3 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
              required>
        <option disabled selected value="">Selecciona tu ciudad</option>
        <option value="Leticia">Leticia</option>
      </select>
    </div>
    <div>
      <label for="address" class="block mb-2 text-sm font-medium">Direccion</label>
      <input type="text"
             v-model="payload.billing.address"
             id="address"
             class="block p-3 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
             placeholder="CLL 52 #23-31" required>
    </div>
    <div>
      <label for="phone-number" class="block mb-2 text-sm font-medium">Telefono/Celular</label>
      <input type="number"
             v-model="payload.billing.phone"
             id="phone-number"
             min="0"
             class="block p-3 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
             placeholder="315476980" required>
    </div>
    <div>
      <label for="zip" class="block mb-2 text-sm font-medium">Zip/Codigo postal</label>
      <input type="number" id="zip"
             v-model="payload.billing.zip"
             min="0"
             class="block p-3 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
             placeholder="680003" required>
    </div>
  </div>
</template>
<script setup lang="ts">

// props
const props = defineProps<{
  value: any
}>();

// computed
const payload = computed(() => props.value);
</script>
