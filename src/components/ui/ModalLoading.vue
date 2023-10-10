<template>
  <dialog class="modal" ref="modalRef">
    <div class="modal-box flex flex-col items-center">
      <!-- step, 진행된 step에 step-primary 추가 -->
      <ul v-if="props.isStep" class="steps mt-2">
        <li class="step step-primary" />
        <li class="step step-primary" />
        <li class="step" />
        <li class="step" />
      </ul>

      <!-- radial progress, --value값으로 progress 조절 -->
      <div
        v-if="props.isRadial"
        class="radial-progress text-primary mt-2"
        style="--value: 70; --size: 100px; --thickness: 6px"
      >
        <p class="text-sm font-medium text-center">{{ props.progressName }} in<br />progress</p>
      </div>

      <!-- 공통 -->
      <p class="mt-6 text-center w-4/5">{{ props.desc }}</p>

      <div class="flex flex-col items-center">
        <!-- prettier-ignore -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-neutral-content/70 shrink-0 w-5 h-5 mt-5">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-xs text-neutral-content/70 text-center leading-relaxed">
          Don't worry! You may close the window without affecting the {{ props.progressName }}.
        </p>
      </div>

      <button class="btn btn-white btn-wide mt-8" type="button" @click="modalRef?.close()">
        Confirm
      </button>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
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
  progressName: String
})

const modalRef = ref<HTMLDialogElement>()

const emit = defineEmits(['modalRef'])

onMounted(() => emit('modalRef', modalRef))
</script>
