<template>
  <header
    class="flex items-center justify-between sticky top-0 z-10 h-16 px-5 bg-base-100/50 backdrop-blur-md md:h-20 md:px-7"
  >
    <a href="/" class="flex items-center">
      <img :src="icTBA" alt="boralabs tba" />
      <span
        class="badge badge-xs badge-neutral h-4 ml-1 rounded-lg font-normal md:badge-sm md:h-5 md:rounded-xl"
        >Beta
      </span>
    </a>

    <SignBtn />
  </header>
</template>

<script setup lang="ts">
import SignBtn from '@/components/service/SignBtn.vue'
import { setupAsset } from '@/setups/asset.composition'
import { useAccountStore } from '@/stores/account.module'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import icTBA from '@/assets/ic-tba.svg'
import { useRouter } from 'vue-router'

const router = useRouter()

const accountStore = useAccountStore()

const { checkAsset } = setupAsset()
const { isSigned } = storeToRefs(accountStore)

watch(
  () => isSigned.value,
  async (isSigned: boolean) => {
    if (isSigned) {
      // console.log('header watch')
      await checkAsset()
    } else !isSigned && router.replace('/')
  },
  { immediate: true }
)
</script>
