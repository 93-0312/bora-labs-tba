<template>
  <main class="flex flex-col justify-center w-full max-w-[1200px] mx-auto">
    <img
      :src="notFoundImg"
      alt="page not found"
      class="w-full max-w-xs h-auto mx-auto mt-3 md:max-w-lg md:mt-7"
    />
    <strong class="block mt-6 text-center text-2xl md:text-3xl md:mt-12">Page not found</strong>
    <p class="mt-2 text-center text-sm md:mt-3 md:text-md">Could you please check and try again?</p>
    <router-link to="/" class="flex btn btn-accent btn-wide mt-8 mb-12 mx-auto md:mt-12 md:mb-24"
      >Home</router-link
    >
  </main>
</template>

<script lang="ts" setup>
import notFoundImg from '@/assets/img-notFound.webp';
</script>
