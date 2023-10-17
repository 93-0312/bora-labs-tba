import { ref } from 'vue'
import { defineStore } from 'pinia'

export const setupAssetStore = () => {
  const hasAsset = ref<boolean>(true)
  const asset721 = ref<any>([])
  const asset1155 = ref<any>([])

  const sendAsset = ref<any>()

  const setHasAsset = (data: boolean) => {
    hasAsset.value = data
  }

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
    setHasAsset,
    setAsset721,
    setAsset1155,

    setSendAsset
  }
}

export const useAssetStore = defineStore('asset', setupAssetStore, {
  // @ts-ignore
  // persist: { storage: sessionStorage, paths: [''] },
})
