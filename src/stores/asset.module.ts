import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const setupAssetStore = () => {
  const asset721 = ref<any>(new Map())
  const asset1155 = ref<any>(new Map())
  const hasAsset = computed(() => asset721.value.size > 0 || asset1155.value.size > 0)

  const sendAsset = ref<any>()

  const setAsset721 = (data: any) => {
    asset721.value = data
  }
  const setAsset1155 = (data: any) => {
    asset1155.value = data
  }

  const setSendAsset = (data: any) => {
    sendAsset.value = data
  }

  return {
    // references
    hasAsset,
    asset721,
    asset1155,

    sendAsset,

    // modifiers
    setAsset721,
    setAsset1155,

    setSendAsset
  }
}

export const useAssetStore = defineStore('asset', setupAssetStore, {
  // @ts-ignore
  // persist: { storage: sessionStorage, paths: [''] },
})
