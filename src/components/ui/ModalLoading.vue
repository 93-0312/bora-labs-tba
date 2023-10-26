<template>
  <dialog class="modal" ref="modalRef">
    <div class="modal-box flex flex-col items-center p-5 md:p-6">
      <!-- step, 진행된 step에 step-primary 추가 -->
      <ul v-if="props.isStep" class="steps mt-2">
        <li v-for="i in step" :key="i" :class="['step', currentStep >= i && 'step-primary']" />
      </ul>

      <!-- step, 로딩중 -->
      <span v-if="props.isStep" class="loading loading-dots w-9 mt-3" />

      <!-- radial progress, --value값으로 progress 조절 -->
      <div
        v-if="props.isRadial"
        class="radial-progress text-primary mt-2 mb-1"
        :style="`--value: ${progressTime}; --size: 100px; --thickness: 6px`"
      >
        <p class="text-sm font-medium text-center">{{ props.progressName }} in<br />progress</p>
      </div>

      <!-- 공통 -->
      <p class="w-[90%] mt-5 text-center text-sm md:text-base">{{ props.desc }}</p>

      <p class="mt-5 text-xs text-neutral-content/70 text-center leading-relaxed md:text-sm">
        <!-- prettier-ignore -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block stroke-neutral-content/70 w-4 h-auto mr-0.5 -mt-0.5 md:w-[18px]">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Don't worry! You may close the window without affecting the {{ props.progressName }}.
      </p>

      <button class="btn btn-white btn-wide mt-6 md:mt-8" type="button" @click="modalRef?.close()">
        Confirm
      </button>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import { useModalStore } from '@/stores/modal.module'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'

const props = defineProps({
  isStep: {
    type: Boolean,
    default: false
  },
  isRadial: {
    type: Boolean,
    default: false
  },
  desc: String,
  step: Number,
  currentStep: { type: Number, default: 1 },
  progressName: String
})

const modalStore = useModalStore()
const { progressTime } = storeToRefs(modalStore)

const modalRef = ref<HTMLDialogElement>()

const emit = defineEmits(['modalRef'])

onMounted(() => {
  emit('modalRef', modalRef)
})
</script>
