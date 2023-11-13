<template>
  <ModalLayout
    @modal-ref="(ref) => (addModalRef = ref.value)"
    title="Add NFT"
    btn-name="Add"
    :btn-click="async () => await confirmSend(toAddress)"
  >
    <p class="mb-2.5 text-sm md:text-base">Select the NFT to add to Pitcher #1234.</p>
    <ul
      class="overflow-auto grid grid-cols-3 gap-2 max-h-76 py-1 md:grid-cols-4 md:gap-3 md:max-h-[360px]"
    >
      <li v-for="asset in asset1155" :key="Number(asset[0])">
        <ItemCard
          :is-small="true"
          :has-badge="false"
          :has-checkbox="true"
          :card-name="asset[1]?.metadata.name"
          :img-src="asset[1]?.metadata.image"
          :asset="asset"
        />
      </li>
    </ul>
  </ModalLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import ItemCard from '@/components/service/ItemCard.vue';
import ModalLayout from '@/components/ui/ModalLayout.vue';
import { setupAsset } from '@/setups/asset.composition';
import { useAssetStore } from '@/stores/asset.module';
import { useModalStore } from '@/stores/modal.module';

const modalStore = useModalStore();

const { addNft } = setupAsset();
const assetStore = useAssetStore();

const { toAddress } = storeToRefs(assetStore);
const { asset1155 } = storeToRefs(assetStore);

const { addModalRef } = storeToRefs(modalStore);

const confirmSend = async (addToAddress: string) => {
  await addNft(addToAddress, addModalRef);
};
</script>
