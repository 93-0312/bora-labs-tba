<template>
  <ModalLayout @modal-ref="(ref) => (modalRef = ref.value)" title="Add NFT" btn-name="Add">
    <p class="mb-2.5 text-sm md:text-base">Pitcher #1234에 추가할 NFT를 선택하세요.</p>
    <ul
      class="overflow-auto grid grid-cols-3 gap-2 max-h-72 md:grid-cols-4 md:gap-3 md:max-h-[340px]"
    >
      <li
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
      </li>

      <li
        v-for="asset in asset1155"
        :key="Number(asset[0])"
        class="overflow-hidden relative rounded"
      >
        <ItemCard
          :is-small="true"
          :has-badge="false"
          :has-checkbox="true"
          :card-name="asset[1]?.metadata.name"
          :img-src="asset[1]?.metadata.image"
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

const assetStore = useAssetStore()
const { asset721, asset1155 } = storeToRefs(assetStore)

defineProps({
  // asset721: { type: Map<BigInt, any> },
  // asset1155: { type: Map<BigInt, any> },
  isDisabled: { type: Boolean }
})
const modalRef = ref<HTMLDialogElement>()

const emit = defineEmits(['modalRef'])

onMounted(() => {
  emit('modalRef', modalRef)
})
</script>
