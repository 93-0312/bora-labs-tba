import { ref } from 'vue'
import { defineStore } from 'pinia'

export const setupAssetStore = () => {
  const hasAsset = ref<boolean>(true)
  const asset721 = ref<any>([])
  const asset1155 = ref<any>([])

  const metadataList721 = ref<any>([])
  const metadataList1155 = ref<any>([])

  const setHasAsset = (data: boolean) => {
    hasAsset.value = data
  }

  const setAsset721 = (data: any) => {
    asset721.value = data
  }
  const setAsset1155 = (data: any) => {
    asset1155.value = data
  }

  const setMetadataList721 = (data: any) => {
    metadataList721.value = data
  }

  const setMetadataList1155 = (data: any) => {
    metadataList1155.value = data
  }

  return {
    // references
    hasAsset,
    asset721,
    asset1155,
    metadataList721,
    metadataList1155,

    // modifiers
    setHasAsset,
    setAsset721,
    setAsset1155,
    setMetadataList721,
    setMetadataList1155
  }
}

export const useAssetStore = defineStore('asset', setupAssetStore, {
  // @ts-ignore
  // persist: { storage: sessionStorage, paths: [''] },
})
