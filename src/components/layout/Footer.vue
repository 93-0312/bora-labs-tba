<template>
  <footer
    class="grid grid-cols-[200px_1fr] gap-[10px] mt-auto pt-12 pb-7 px-5 border border-t-1 border-base-200 md:px-7 md:pt-16 md:pb-10"
  >
    <a href="#" class="flex items-start">
      <img
        :src="icBoraLabs"
        width="224"
        height="40"
        alt="boralabs logo"
        class="w-40 h-auto md:w-42"
      />
    </a>

    <div class="flex flex-col items-end justify-end md:flex-row">
      <a
        class="mb-2 text-sm transition hover:opacity-80"
        target="_blank"
        href="https://boraportal.com"
      >
        <img :src="icBora" width="96" height="16" alt="bora portal" class="w-24 h-4" />
      </a>
      <a
        class="mb-2 text-sm transition hover:opacity-80"
        target="_blank"
        href="https://scope.boraportal.cc"
      >
        <img :src="icBorascope" width="96" height="16" alt="bora scope" class="w-24 h-4" />
      </a>
    </div>

    <a
      class="btn btn-outline max-w-[180px] h-10 min-h-0 mt-4 rounded-lg text-base normal-case font-normal"
      href="#"
      target="_blank"
    >
      <!-- prettier-ignore -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 20 20" width="20px" height="20px" class="w-4 h-auto fill-current">
        <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6c0-0.4,0-0.9,0.2-1.3 C7.2,6.1,7.4,6,7.5,6c0,0,0.1,0,0.1,0C8.1,6.1,9.1,6.4,10,7.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3c0.9-0.9,2-1.2,2.5-1.3 c0,0,0.1,0,0.1,0c0.2,0,0.3,0.1,0.4,0.3C17,6.7,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4 c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3C22,6.1,16.9,1.4,10.9,2.1z" />
      </svg>
      Github
    </a>

    <p class="col-span-2 mt-12 text-xs text-neutral-400 md:col-span-2">
      © METABORA SINGAPORE PTE. LTD. All Rights Reserved.
    </p>
  </footer>
</template>

<script setup lang="ts">
import icBoraLabs from '@/assets/ic-boralabs.svg'
import icBora from '@/assets/ic-bora.svg'
import icBorascope from '@/assets/ic-borascope.svg'
</script>
