<template>
  <ModalLayout
    @modal-ref="(ref) => (modalRef = ref.value)"
    title="Send NFT"
    btn-name="Send"
    :btn-click="async () => await confirmSend(toAddress, sendAsset)"
  >
    <div class="indicator block w-28 mx-auto md:w-32">
      <ItemCard
        :is-small="true"
        :has-badge="false"
        :img-src="sendAsset?.[1].metadata.image"
        :card-name="sendAsset?.[1]?.metadata.name"
      />

      <!-- 카드 갯수 -->
      <span class="indicator-item badge badge-primary px-1 text-xs font-bold">
        <!-- prettier-ignore -->
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" class="w-3.5 h-auto">
          <path d="M8.28464 24.9001L6.90002 23.5155L14.5154 15.9001L6.90002 8.28476L8.28464 6.90015L15.9 14.5155L23.5154 6.90015L24.9 8.28476L17.2846 15.9001L24.9 23.5155L23.5154 24.9001L15.9 17.2848L8.28464 24.9001Z" fill="#32261b"/>
        </svg>
        5
      </span>
    </div>

    <div class="form-control w-full mt-3 md:mt-4">
      <label class="label py-1.5">
        <span class="label-text md:text-base">How many NFTs are you sending?</span>
      </label>
      <div>
        <!-- input error시 class에 input-error 추가  -->
        <input
          type="text"
          :class="[
            'input',
            'input-bordered',
            'w-full',
            'h-10',
            'md:h-12',
            { 'input-error': isInputError }
          ]"
          aria-label="token input"
        />
      </div>
      <!-- input error시 노출 -->
      <label class="label py-1.5">
        <span class="label-text-alt text-neutral-content/70 md:text-sm">Balance: 5</span>
        <span v-if="isInputError" class="label-text-alt text-error md:text-sm">
          Exceed balance
        </span>
      </label>
    </div>

    <div class="form-control w-full mt-3 md:mt-4">
      <label class="label py-1.5">
        <span class="label-text md:text-base">Who are you sending the NFT to?</span>
      </label>
      <!-- input error시 class에 input-error 추가  -->
      <input
        type="text"
        placeholder="ex. 0x1234..."
        :class="[
          'input',
          'input-bordered',
          'w-full',
          'h-10',
          'md:h-12',
          { 'input-error': isInputError }
        ]"
        maxlength="42"
        v-model="toAddress"
      />
      <!-- input error시 노출 -->
      <label v-if="isInputError" class="label py-1.5">
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
import { computed, onMounted, ref } from 'vue'
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
const assetStore = useAssetStore()

const { sendAsset } = storeToRefs(assetStore)

const confirmSend = async (toAddress: string, sendAsset: any) => {
  await sendNft(toAddress, sendAsset)
  props.modalSendRef?.close()
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
  toAddress.value = ''
  emit('modalRef', modalRef)
})
</script>
