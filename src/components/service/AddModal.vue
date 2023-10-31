<template>
  <!-- addNft -->
  <ModalLayout
    @modal-ref="(ref) => (addModalRef = ref.value)"
    title="Add NFT"
    btn-name="Add"
    :btn-click="async () => await confirmSend(toAddress, addAsset)"
  >
    <p class="mb-2.5 text-sm md:text-base">Select the NFT to add to Pitcher #1234.</p>
    <ul
      class="overflow-auto grid grid-cols-3 gap-2 max-h-72 py-1 md:grid-cols-4 md:gap-3 md:max-h-[340px]"
    >
      <!-- <li
        v-for="asset in asset721"
        :key="Number(asset[0])"
        class="overflow-hidden relative rounded"
      >
        <ItemCard
          is721
          :is-small="true"
          :has-badge="false"
          :has-checkbox="true"
          :card-name="asset[1]?.metadata.name"
          :img-src="asset[1]?.metadata.image"
        />
      </li> -->

      <li v-for="asset in asset1155" :key="Number(asset[0])">
        <ItemCard
          :is-small="true"
          :has-badge="false"
          :has-checkbox="true"
          :card-name="asset[1]?.metadata.name"
          :img-src="asset[1]?.metadata.image"
          :linkDisable="true"
          :asset="asset"
        />
      </li>
    </ul>
  </ModalLayout>
</template>

<script setup lang="ts">
import ModalLayout from '@/components/ui/ModalLayout.vue'
import { onMounted, ref } from 'vue'
import ItemCard from './ItemCard.vue'
import { useAssetStore } from '@/stores/asset.module'
import { storeToRefs } from 'pinia'

import { useModalStore } from '@/stores/modal.module'
import { setupAsset } from '@/setups/asset.composition'

const modalStore = useModalStore()

const { addNft } = setupAsset()
const assetStore = useAssetStore()

const { addAsset, toAddress, toAmounts } = storeToRefs(assetStore)
const { asset721, asset1155 } = storeToRefs(assetStore)

const { setSendAsset } = assetStore

const { addModalRef } = storeToRefs(modalStore)

const confirmSend = async (addToAddress: string, addAsset: any) => {
  await addNft(addToAddress, addAsset, addModalRef)
}

defineProps({
  isDisabled: { type: Boolean }
})
const modalRef = ref<HTMLDialogElement>()

const emit = defineEmits(['modalRef'])

onMounted(() => {
  emit('modalRef', modalRef)
})
</script>
