<template>
  <ModalLayout
    @modal-ref="(ref) => (sendTokenModalRef = ref.value)"
    title="Send Token"
    btn-name="Send"
    :btn-click="async () => await confirmSendToken(toAddress, sendAsset)"
    :btnDisable="isSendBtnDisable"
  >
    <div class="form-control w-full mt-4">
      <label class="label">
        <span class="label-text md:text-base">How many token are you sending?</span>
      </label>
      <div class="relative">
        <!-- max 버튼 활성화 시, -->
        <button
          type="button"
          :class="[
            'btn',
            'btn-outline',
            'btn-xs',
            'w-12',
            'absolute',
            'top-3',
            'left-3',
            'rounded-lg',
            { 'bg-base-content text-base-300 border-base-content': isSelected }
          ]"
          @click="isSelected = !isSelected"
        >
          Max
        </button>
        <!-- input error시 class에 input-error 추가  -->
        <input
          type="text"
          :class="[
            'input',
            'input-bordered',
            'w-full',
            'pl-20',
            'text-right',
            { 'input-error': isAmountError }
          ]"
          aria-label="token input"
          v-model="toAmounts"
        />
      </div>
      <!-- input error시 노출 -->
      <label class="label">
        <span class="label-text-alt text-secondary-focus md:text-sm"
          >Balance: {{ sendErc20Asset?.formatEtherAmount }} {{ sendErc20Asset?.tknSymbol }}</span
        >
        <span v-if="isAmountError" class="label-text-alt text-error md:text-sm">
          Exceed balance
        </span>
      </label>
    </div>

    <div class="form-control w-full mt-10">
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
        <span class="label-text-alt text-error md:text-sm">
          This is not a valid wallet address.
        </span>
      </label>
    </div>

    <p class="mt-2 text-xs text-secondary-focus md:text-sm">
      The recipient must be connected to the same chain as the NFT to check.
    </p>
  </ModalLayout>
</template>

<script setup lang="ts">
import ModalLayout from '@/components/ui/ModalLayout.vue'
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue'
import { setupAsset } from '@/setups/asset.composition'
import { storeToRefs } from 'pinia'
import { useAssetStore } from '@/stores/asset.module'
import { useModalStore } from '@/stores/modal.module'

const modalStore = useModalStore()

const { sendTokenModalRef } = storeToRefs(modalStore)

const modalRef = ref<HTMLDialogElement>()

const isSelected = ref(false)

const props = defineProps({
  isDisabled: { type: Boolean }
})

const emit = defineEmits(['modalRef'])

const { send20Token } = setupAsset()
const assetStore = useAssetStore()

const { sendAsset, toAmounts, toAddress, sendErc20Asset } = storeToRefs(assetStore)

const confirmSendToken = async (sendToAddress: string, sendAsset: any) => {
  await send20Token(sendToAddress, sendAsset, sendTokenModalRef)
}

const isInputError = computed(() => {
  return toAddress.value !== '' && !isValidAddress(toAddress.value)
})

const isValidAddress = (address: string) => {
  if (/^(0x)[0]{40}$/.test(address)) {
    return false
  } else if (/^(0x)[0-9a-fA-F]{40}$/.test(address)) {
    return true
  }
  return false
}

const isAmountError = computed(() => {
  console.log(toAmounts.value)
  console.log(sendErc20Asset.value?.formatEtherAmount)
  return toAmounts.value > sendErc20Asset.value?.formatEtherAmount
})

const isSendBtnDisable = computed(() => {
  return (
    isAmountError.value || isInputError.value || toAddress.value === '' || toAmounts.value === ''
  )
})

watch(
  () => isSelected.value,
  (isSelected: boolean) => {
    if (isSelected) {
      toAmounts.value = sendErc20Asset.value?.formatEtherAmount
    }
    // if (!isSelected) {
    //   toAmounts.value = ''
    // }
  }
)

watch(
  () => toAmounts.value,
  (toAmounts: string) => {
    if (toAmounts === sendErc20Asset.value?.formatEtherAmount) isSelected.value = true
    else isSelected.value = false
  }
)

onMounted(() => {
  emit('modalRef', modalRef)
})
</script>
