<template>
  <ModalLayout @modal-ref="(ref) => (modalRef = ref.value)" title="Send Token" btn-name="Send">
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
            { 'bg-base-content text-base-300 border-base-content': isSelected }
          ]"
          @click="isSelected = !isSelected"
        >
          Max
        </button>
        <!-- input error시 class에 input-error 추가  -->
        <input
          type="text"
          value="1.0000 tBORA"
          :class="[
            'input',
            'input-bordered',
            'w-full',
            'pl-20',
            'text-right',
            { 'input-error': isInputError }
          ]"
          aria-label="token input"
        />
      </div>
      <!-- input error시 노출 -->
      <label class="label">
        <span class="label-text-alt text-neutral-content/70 md:text-sm"
          >Balance: 92.3245 tBORA</span
        >
        <span v-if="isInputError" class="label-text-alt text-error md:text-sm">
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
      />
      <!-- input error시 노출 -->
      <label v-if="isInputError" class="label pb-1">
        <span class="label-text-alt text-error md:text-sm">
          This is not a valid wallet address.
        </span>
      </label>
    </div>

    <p class="mt-2 text-xs text-neutral-content/70 md:text-sm">
      The recipient must be connected to the same chain as the NFT to check.
    </p>
  </ModalLayout>
</template>

<script setup lang="ts">
import ModalLayout from '@/components/ui/ModalLayout.vue'
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import { setupAsset } from '@/setups/asset.composition'
import { storeToRefs } from 'pinia'
import { useAssetStore } from '@/stores/asset.module'

const modalRef = ref<HTMLDialogElement>()

const isSelected = ref(false)

const props = defineProps({
  modalSendTokenRef: HTMLDialogElement,
  isDisabled: { type: Boolean }
})

const emit = defineEmits(['modalRef'])

const { sendNft, toAddress } = setupAsset()
// const { sendNft } = setupAsset()
const assetStore = useAssetStore()

const { sendAsset } = storeToRefs(assetStore)

const confirmSend = async (sendToAddress: string, sendAsset: any) => {
  await sendNft(sendToAddress, sendAsset)
  props.modalSendTokenRef?.close()
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
