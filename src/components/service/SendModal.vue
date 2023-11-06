<template>
  <ModalLayout
    @modal-ref="
      (ref) => {
        sendModalRef = ref.value
      }
    "
    title="Send NFT"
    btn-name="Send"
    :btn-click="async () => await confirmSend(toAddress, sendAsset!)"
    :btnDisable="isSendBtnDisable"
  >
    <div class="indicator block w-28 mx-auto md:w-32">
      <ItemCard
        :is-small="true"
        :has-badge="false"
        :img-src="sendAsset?.[1].metadata.image"
        :card-name="sendAsset?.[1]?.metadata.name"
        :hasCheckbox="false"
        :id="Number(sendAsset?.[0])"
        :ercType="sendAsset?.[1]?.metadata.type"
      />

      <!-- 카드 갯수 -->
      <span
        v-show="is1155"
        class="absolute top-2 right-2 badge badge-lg px-1 rounded-sm bg-opacity-80 border-none backdrop-blur-sm text-sm font-medium"
      >
        <!-- prettier-ignore -->
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-auto">
          <path d="M12 12L6 6M12 12L18 18M12 12L18 6M12 12L6 18" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
        </svg>
        {{ amountsOf1155 }}
      </span>
    </div>

    <div v-show="is1155" class="form-control w-full mt-3 md:mt-4">
      <label class="label py-1.5">
        <span class="label-text md:text-base">How many NFTs are you sending?</span>
      </label>
      <div>
        <!-- input error시 class에 input-error 추가  -->
        <input
          type="number"
          :class="['input input-bordered w-full h-10 md:h-12', { 'input-error': isAmountError }]"
          aria-label="token input"
          v-model="toAmounts"
        />
      </div>
      <!-- input error시 노출 -->
      <label class="label py-1.5">
        <span class="label-text-alt text-secondary-focus md:text-sm"
          >Balance: {{ amountsOf1155 }}</span
        >
        <span v-if="isAmountError" class="label-text-alt text-error md:text-sm">
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
        :class="['input input-bordered w-full h-10 md:h-12', { 'input-error': isInputError }]"
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

    <p class="mt-2 text-xs text-secondary-focus md:mt-4 md:text-sm">
      The recipient must be connected to the same chain as the NFT to check.
    </p>
  </ModalLayout>
</template>

<script setup lang="ts">
import ModalLayout from '@/components/ui/ModalLayout.vue'
import { computed } from 'vue'
import ItemCard from './ItemCard.vue'
import { setupAsset } from '@/setups/asset.composition'
import { storeToRefs } from 'pinia'
import { useAssetStore } from '@/stores/asset.module'
import { useModalStore } from '@/stores/modal.module'
import type { asset } from '@/types/asset'

const modalStore = useModalStore()

const { sendModalRef } = storeToRefs(modalStore)

defineEmits(['modalRef'])

const { sendNft, sendNftFrom6551 } = setupAsset()
const assetStore = useAssetStore()

const { sendAsset, toAddress, toAmounts, from6551 } = storeToRefs(assetStore)

const confirmSend = async (sendToAddress: string, sendAsset: asset) => {
  if (!from6551.value.from6551) await sendNft(sendToAddress, sendAsset, sendModalRef)
  else await sendNftFrom6551(sendAsset, sendModalRef)
  toAddress.value = ''
}

const is1155 = computed(() => {
  return sendAsset.value?.[1].metadata.type === 1155
})

const amountsOf1155 = computed(() => {
  return sendAsset.value?.[1].amount
})

const isInputError = computed(() => {
  return toAddress.value !== '' && !isValidAddress(toAddress.value)
})

const isAmountError = computed(() => {
  return Number(toAmounts.value) > Number(amountsOf1155.value)
})

const isValidAddress = (address: string) => {
  if (/^(0x)[0]{40}$/.test(address)) {
    return false
  } else if (/^(0x)[0-9a-fA-F]{40}$/.test(address)) {
    return true
  }
  return false
}

const isSendBtnDisable = computed(() => {
  return is1155.value
    ? isAmountError.value || isInputError.value || toAddress.value === '' || toAmounts.value === ''
    : isInputError.value || toAddress.value === '' || Number(amountsOf1155.value) === 0
})
</script>
