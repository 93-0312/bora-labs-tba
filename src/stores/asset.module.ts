import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type ercAsset = Map<any, { metadata: any; amount?: bigint }>

export const setupAssetStore = () => {
  const asset721 = ref<ercAsset>(new Map())
  const asset1155 = ref<ercAsset>(new Map())
  const asset6551 = ref<any>(new Map())

  const toAddress = ref<string>('')

  const hasAsset = computed(() => asset721.value.size > 0 || asset1155.value.size > 0)

  const sendAsset = ref<any>()
  const selectedAsset = ref<Map<bigint, any>>(new Map())

  const setAsset721 = (data: ercAsset) => {
    asset721.value = data
  }
  const setAsset1155 = (data: ercAsset) => {
    asset1155.value = data
  }
  const setAsset6551 = (data: ercAsset) => {
    asset6551.value = data
  }

  const setSendAsset = (data: any) => {
    sendAsset.value = data
  }

  const setSelectedAsset = (data: any) => {
    selectedAsset.value.set = data
  }

  const setToAddress = (data: any) => {
    toAddress.value = data
  }

  return {
    // references
    hasAsset,
    asset721,
    asset1155,
    asset6551,
    sendAsset,
    selectedAsset,

    toAddress,

    // modifiers
    setAsset721,
    setAsset1155,
    setAsset6551,
    setSendAsset,
    setSelectedAsset,
    setToAddress
  }
}

export const useAssetStore = defineStore('asset', setupAssetStore, {
  // @ts-ignore
  // persist: { storage: sessionStorage, paths: ['asset721', 'asset1155', 'asset6551'] }
})
