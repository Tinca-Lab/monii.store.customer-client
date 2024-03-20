<template>
  <div class="_empty">
    <slot/>
    <ClientOnly>
      <Notifications/>
    </ClientOnly>
  </div>
</template>
