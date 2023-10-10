<template>
  <dialog class="modal" ref="modalRef">
    <div class="modal-box">
      <p class="mb-4 text-lg font-bold">{{ props.title }}</p>

      <slot />

      <!-- bottom button -->
      <div class="flex justify-center mt-8">
        <button type="button" class="btn btn-white btn-wide" :disabled="false">{{ props.btnName }}</button>
      </div>

      <!-- x button -->
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute top-3 right-3 text-base">✕</button>
      </form>
    </div>

    <!-- click outside -->
    <form v-if="clickOutside" method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  title: String,
  clickOutside: {
    type: Boolean,
    default: true
  },
  btnName: String
})

const modalRef = ref<HTMLDialogElement>()

const emit = defineEmits(['modalRef'])

onMounted(() => emit('modalRef', modalRef))
</script>
