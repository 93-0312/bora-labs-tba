<template>
  <ModalLayout @modal-ref="(ref) => (modalRef = ref.value)" title="Send NFT" btn-name="Send">
    <div class="w-28 mx-auto md:w-32">
      <ItemCard
        :is-small="true"
        :has-badge="false"
        img-src="https://gfile.boraportal.com/cdn-cgi/image/width=300,format=webp/1024000001/2/100109992.png"
      />
    </div>
    <div class="form-control w-full mt-4">
      <label class="label">
        <span class="label-text md:text-base">Who are you sending the NFT to?</span>
      </label>
      <!-- input error시 class에 input-error 추가  -->
      <!-- <input
        type="text"
        placeholder="ex. 0x1234..."
        :class="['input', 'input-bordered', 'w-full', { 'input-error': isInputError }]"
        maxlength="42"
      /> -->
      <!-- input error시 노출 -->
      <!-- <label v-if="isInputError" class="label pb-1">
        <span class="label-text-alt text-error md:text-sm"
          >This is not a valid wallet address.</span
        >
      </label> -->
    </div>

    <p class="mt-2 text-xs text-neutral-content/70 md:mt-4 md:text-sm">
      The recipient must be connected to the same chain as the NFT to check.
    </p>
  </ModalLayout>
</template>

<script setup lang="ts">
import ModalLayout from '@/components/ui/ModalLayout.vue'
import { onMounted, ref } from 'vue'

defineProps({
  modalSendRef: HTMLDialogElement
})
const modalRef = ref<HTMLDialogElement>()

const emit = defineEmits(['modalRef'])

onMounted(() => {
  emit('modalRef', modalRef)
})

// defineProps({
//   isDisabled: Boolean
// })
</script>
