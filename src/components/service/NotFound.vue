<template>
  <main class="w-full max-w-[1200px] mx-auto">
    <img :src="notFoundImg" alt="page not found" class="w-full max-w-lg h-auto mx-auto mt-7" />
    <strong class="block mt-12 text-center text-3xl">Page not found</strong>
    <p class="mt-3 text-center">Could you please check and try again?</p>
    <router-link to="/" class="flex btn btn-accent btn-wide mt-12 mb-24 mx-auto">Home</router-link>
  </main>
</template>

<script lang="ts" setup>
import notFoundImg from '@/assets/img-notFound.webp'
</script>
