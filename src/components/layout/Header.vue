<template>
  <header
    :class="[
      'flex items-center justify-between fixed top-0 z-10 w-full h-16 px-5 text-base-100 md:h-20 lg:px-24',
      { scrolled: isScroll, colorHeader: colorHeader }
    ]"
  >
    <RouterLink to="/" class="flex">
      <img
        :src="colorHeader ? icBoralabsBlack : icBoralabs"
        alt="boralabs"
        width="112"
        height="20"
      />
      <span class="badge badge-md badge-primary text-xs ml-2 md:ml-3"> Beta </span>
    </RouterLink>
    <SignBtn />
  </header>
</template>

<script setup lang="ts">
import router from '@/router';
import { storeToRefs } from 'pinia';
import { watch, ref, onMounted, onBeforeUnmount, computed } from 'vue';
import SignBtn from '@/components/service/SignBtn.vue';
import { setupAsset } from '@/setups/asset.composition';
import { useAccountStore } from '@/stores/account.module';
import { useAssetStore } from '@/stores/asset.module';
import MetamaskService from '@/services/metamask.service';
import icBoralabsBlack from '@/assets/ic-boralabs-black.svg';
import icBoralabs from '@/assets/ic-boralabs.svg';

// const boralabsURL = import.meta.env.VITE_BORALABS_MAINPAGE_URL;

const accountStore = useAccountStore();
const assetStore = useAssetStore();

const { checkAsset } = setupAsset();
const { resetAsset } = assetStore;
const { setWalletAddress, setIsSigned } = accountStore;
const { isSigned, walletAddress } = storeToRefs(accountStore);

const isScroll = ref(false);

const onScroll = () => {
  isScroll.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', onScroll);
});

onBeforeUnmount(() => {
  window.addEventListener('scroll', onScroll);
});

const colorHeader = computed(() => router.currentRoute.value.fullPath !== '/');

watch(
  () => isSigned.value,
  async (isSigned: boolean) => {
    if (isSigned) {
      await checkAsset();
    }
  },
  { immediate: true }
);

watch(
  () => walletAddress.value,
  async (walletAddress: string) => {
    if (walletAddress !== '') {
      const wallet = new MetamaskService();
      await wallet.init();
      const currentWalletAddress = await wallet.getAddress();

      if (walletAddress !== currentWalletAddress) {
        resetAsset();
        setWalletAddress('');
        setIsSigned(false);
      }
    } else if (walletAddress === '') {
      router.replace('/');
    }
  },
  { immediate: true }
);
</script>
