<template>
  <header
    class="flex items-center justify-between sticky top-0 z-10 h-16 px-5 bg-base-100/50 backdrop-blur-md md:h-20 md:px-7"
  >
    <div class="flex items-center">
      <a href="https://boraportal.com" target="_blank" class="flex items-center">
        <img :src="icBoralabs" alt="boralabs" width="130" height="23" class="hidden md:block" />
        <img :src="icB" alt="bora" width="15" height="20" class="shrink-0 md:hidden" />
      </a>
      <a href="/" class="flex items-center ml-1 md:ml-3">
        <strong className="text-xl sm:text-[20px]">TBA</strong>
        <span
          class="badge badge-xs badge-neutral h-4 ml-1 rounded-lg font-normal md:badge-sm md:h-5 md:rounded-xl"
          >Beta
        </span>
      </a>
    </div>

    <SignBtn />
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import SignBtn from '@/components/service/SignBtn.vue';
import { setupAsset } from '@/setups/asset.composition';
import { useAccountStore } from '@/stores/account.module';
import { useAssetStore } from '@/stores/asset.module';
import MetamaskService from '@/services/metamask.service';
import icB from '@/assets/ic-b.svg';
import icBoralabs from '@/assets/ic-boralabs.svg';

const accountStore = useAccountStore();
const assetStore = useAssetStore();

const { checkAsset } = setupAsset();
const { resetAsset } = assetStore;

const { setWalletAddress, setIsSigned } = accountStore;
const { isSigned, walletAddress } = storeToRefs(accountStore);

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
    }
  },
  { immediate: true }
);
</script>
