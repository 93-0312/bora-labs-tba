import { ref } from 'vue'
import { defineStore } from 'pinia'

export const setupModalStore = () => {
  const addModalRef = ref<HTMLDialogElement>()
  const sendModalRef = ref<HTMLDialogElement>()

  const sendLoadingModalRef = ref<HTMLDialogElement>()
  const addLoadingModalRef = ref<HTMLDialogElement>()

  const radialModalRef = ref<HTMLDialogElement>()
  const stepModalRef = ref<HTMLDialogElement>()

  const progressTime = ref<number>(0)

  const setAddModalRef = (data: HTMLDialogElement) => {
    addModalRef.value = data
  }
  const setSendModalRef = (data: HTMLDialogElement) => {
    sendModalRef.value = data
  }

  const setRadialModalRef = (data: HTMLDialogElement) => {
    radialModalRef.value = data
    progressTime.value = 0
  }
  const setStepModalRef = (data: HTMLDialogElement) => {
    stepModalRef.value = data
  }

  return {
    // references
    addModalRef,
    sendModalRef,
    radialModalRef,
    stepModalRef,
    sendLoadingModalRef,
    addLoadingModalRef,
    progressTime,

    // modifiers
    setSendModalRef,
    setAddModalRef,
    setRadialModalRef,
    setStepModalRef
  }
}

export const useModalStore = defineStore('modal', setupModalStore, {
  // @ts-ignore
  // persist: { storage: sessionStorage, paths: ['isSigned', 'walletAddress'] }
})
