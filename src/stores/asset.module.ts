import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type ercAsset = Map<any, { metadata: any; amount?: bigint }>

export const setupAssetStore = () => {
  const asset721 = ref<ercAsset>(new Map())
  const asset1155 = ref<ercAsset>(new Map())
  const asset6551 = ref<any>(new Map())
  const asset20 = ref<any>(new Map())

  const detail1155Asset = ref<any>(new Map())
  const detail721Asset = ref<any>(new Map())

  const toAddress = ref<string>('')

  const tbaMintStep = ref<1 | 2 | 3 | 4>(1)

  const hasAsset = computed(
    () => asset721.value.size > 0 || asset1155.value.size > 0 || asset6551.value.size > 0
  )

  const sendAsset = ref<any>()
  const selectedAsset = ref<Map<bigint, any>>(new Map())

  const setTbaMintStep = (data: 1 | 2 | 3 | 4) => {
    tbaMintStep.value = data
  }

  const setAsset721 = (data: ercAsset) => {
    asset721.value = data
  }
  const setAsset1155 = (data: ercAsset) => {
    asset1155.value = data
  }
  const setAsset6551 = (data: ercAsset) => {
    asset6551.value = data
  }
  const setAsset20 = (data: any) => {
    asset20.value = data
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

  const resetAsset = () => {
    setAsset721(new Map())
    setAsset1155(new Map())
    setAsset6551(new Map())
  }

  return {
    // references
    hasAsset,
    asset20,
    asset721,
    asset1155,
    asset6551,
    detail1155Asset,
    detail721Asset,

    sendAsset,
    selectedAsset,
    toAddress,

    tbaMintStep,

    // modifiers
    setAsset721,
    setAsset1155,
    setAsset6551,
    setAsset20,
    setSendAsset,
    setSelectedAsset,
    setToAddress,
    resetAsset,

    setTbaMintStep
  }
}

export const useAssetStore = defineStore('asset', setupAssetStore, {})
