<script setup lang="ts">
// imports

// composable
const cart = useCart();
const auth = useAuth();
const accessToken = useCookie('access_token');
const toast = useToast();
const config = useRuntimeConfig();
const url = useRequestURL();

// data
if (accessToken.value) {
  auth.me();
}
const payload = ref({
  shipping: {
    name: '',
    lastname: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    cityId: '',
    stateId: '',
    zip: '',
  },
  billing: {
    name: '',
    lastname: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    cityId: '',
    stateId: '',
    state: '',
    zip: '',
  },
  email: '',
  discount: null,
  cost: 0,
})

// computed
const products: any = computed(() => cart.cartItems.value);
const user = computed(() => auth.user.value);
const city = computed(() => payload.value.shipping.city);
const cityId = computed(() => payload.value.shipping.cityId);

// methods
const onPurchase = async () => {
  if (!products.value) {
    toast.add({
      type: 'error',
      description: 'No hay productos en el carrito',
      title: 'Oops!',
    })
    return;
  }
  if (user.value) {
    payload.value.email = user.value.email
  }
  try {
    const {data: checkout, error} = await useAsyncData<any, any>(
        'order',
        () => $fetch(`${config.public.baseURL}/api/v2/checkout`, {
          method: 'POST',
          headers: {
            origin: url.origin,
          },
          body: JSON.stringify({
            items: products.value,
            ...payload.value,
          })
        }),
        {
          server: false,
          lazy: true
        }
    )
    if (error.value) {
      toast.add({
        type: 'error',
        description: error.value.data.message,
        title: 'Oops!',
      })
      return;
    }
    location.href = checkout.value;
    cart.clear();
  } catch {
    toast.add({
      type: 'error',
      description: 'No pudimos completar tu orden, por favor intenta de nuevo.',
      title: 'Oops!',
    })
  }
}

const onApplyDiscount = async (discount: string) => {
  if (!products.value) {
    toast.add({
      type: 'warning',
      description: 'No hay productos en tu orden',
      title: 'Oops!',
    })
    return;
  }
  if (!discount) {
    toast.add({
      type: 'warning',
      description: 'No has ingresado un código de descuento',
      title: 'Oops!',
    })
  }
  const {data, error: ErrorDiscount} = await useAsyncData<any, any>(
      'discount',
      () => $fetch('/api/v2/checkout/discount', {
        method: 'POST',
        baseURL: config.public.baseURL,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: discount,
        })
      }),
      {
        server: false,
        lazy: true,
      })
  if (ErrorDiscount.value && !data.value) {
    toast.add({
      type: 'error',
      description: ErrorDiscount.value.data.message,
      title: 'Oops!',
    })
    return;
  }
  payload.value.discount = data.value;
  toast.add({
    type: 'success',
    description: 'Descuento aplicado',
    title: '¡Genial!',
  })
}

// hooks
watch([city, cityId], async () => {
  if (!city.value || !cityId.value) return;
  const {data, error} = await useAsyncData<any, any>(
      'shipping-cost',
      () => $fetch(`${config.public.baseURL}/api/v2/checkout/shipping`, {
        headers: {
          origin: url.origin,
        },
        method: "POST",
        body: JSON.stringify({
          order: {
            items: products.value,
            shipping: payload.value.shipping,
          }
        })
      }),
      {
        server: false,
        lazy: true,
      },
  );
  if (error.value && !data.value) {
    toast.add({
      type: 'error',
      description: error.value.data.message,
      title: 'Oops!',
    })
    return;
  }
  toast.add({
    type: 'success',
    description: 'Costo de envío actualizado',
    title: '¡Genial!',
  })
  payload.value.cost = Number(data.value);
})
</script>

<template>
  <section class="px-6 py-3 relative h-auto">
    <div
        class="flex flex-col items-center"
        v-if="!products[0]">
      <img
          class="block mx-auto"
          src="@/assets/media/lotties/not_found.gif"
          alt="Not found">
      <span class="font-body">
        Tu carrito de compras está vacío :(
      </span>
    </div>
    <div v-else>
      <form
          class="grid grid-cols-4 md:grid-cols-12 gap-4"
          @submit.prevent="onPurchase">
        <SectionPersonalInfo
            :user="user"
            :value="payload"
            class="col-span-4 md:col-span-7 lg:col-start-2 lg:col-span-6 mt-1"/>
        <SectionOrderSummary
            :cost="payload.cost"
            :discount="payload.discount"
            @onApplyDiscount="onApplyDiscount"
            class="col-span-4 md:col-span-5 md:col-start-8 lg:col-start-8 lg:col-span-4 sticky top-28"
        />
      </form>
    </div>
  </section>
</template>
