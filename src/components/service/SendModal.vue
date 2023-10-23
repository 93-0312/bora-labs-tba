<template>
  <ModalLayout
    @modal-ref="(ref) => (modalRef = ref.value)"
    title="Send NFT"
    btn-name="Send"
    :btn-click="async () => await confirmSend(toAddress, sendAsset)"
  >
    <div class="w-28 mx-auto md:w-32">
      <ItemCard
        :is-small="true"
        :has-badge="false"
        :img-src="sendAsset?.[1].metadata.image"
        :card-name="sendAsset?.[1]?.metadata.name"
      />
    </div>
    <div class="form-control w-full mt-4">
      <label class="label">
        <span class="label-text md:text-base">Who are you sending the NFT to?</span>
      </label>
      <!-- input error시 class에 input-error 추가  -->
      <input
        type="text"
        placeholder="ex. 0x1234..."
        :class="['input', 'input-bordered', 'w-full', { 'input-error': isInputError }]"
        maxlength="42"
        v-model="toAddress"
      />
      <!-- input error시 노출 -->
      <label v-if="isInputError" class="label pb-1">
        <span class="label-text-alt text-error md:text-sm"
          >This is not a valid wallet address.</span
        >
      </label>
    </div>

    <p class="mt-2 text-xs text-neutral-content/70 md:mt-4 md:text-sm">
      The recipient must be connected to the same chain as the NFT to check.
    </p>
  </ModalLayout>
</template>

<script setup lang="ts">
import ModalLayout from '@/components/ui/ModalLayout.vue'
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import ItemCard from './ItemCard.vue'
import { setupAsset } from '@/setups/asset.composition'
import { storeToRefs } from 'pinia'
import { useAssetStore } from '@/stores/asset.module'

const modalRef = ref<HTMLDialogElement>()

const props = defineProps({
  modalSendRef: HTMLDialogElement,
  isDisabled: { type: Boolean }
})

const emit = defineEmits(['modalRef'])

const { sendNft, toAddress } = setupAsset()
// const { sendNft } = setupAsset()
const assetStore = useAssetStore()

const { sendAsset } = storeToRefs(assetStore)

const confirmSend = async (sendToAddress: string, sendAsset: any) => {
  await sendNft(sendToAddress, sendAsset)
  props.modalSendRef?.close()
  toAddress.value = ''
}

const isInputError = computed(() => {
  return !isValidAddress(toAddress.value)
})

const isValidAddress = (address: string) => {
  if (/^(0x)[0-9a-fA-F]{40}$/.test(address)) {
    return true
  }

  return false
}

onMounted(() => {
  emit('modalRef', modalRef)
})

onBeforeMount(() => {
  toAddress.value = ''
})
</script>
