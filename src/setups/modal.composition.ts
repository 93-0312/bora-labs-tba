import { useAssetStore } from '@/stores/asset.module'
import { storeToRefs } from 'pinia'
import { useModalStore } from '@/stores/modal.module'
import type { asset } from '@/types/asset'

export const setupModal = () => {
  const assetStore = useAssetStore()
  const modalStore = useModalStore()

  const { setSendAsset, setSendErc20Asset, setFrom6551 } = assetStore
  const { addModalRef, sendModalRef, sendTokenModalRef } = storeToRefs(modalStore)

  const { toAddress, toAmounts, addAsset } = storeToRefs(assetStore)

  const showSendModal = (sendAsset: asset, tokenId?: any) => {
    toAddress.value = ''
    toAmounts.value = ''
    setSendAsset(sendAsset)
    setFrom6551({ from6551: tokenId !== undefined, tokenId: tokenId })
    sendModalRef.value?.showModal()
    return
  }
  const showAddModal = (addToAddress: string) => {
    toAddress.value = addToAddress
    toAmounts.value = ''
    addAsset.value = new Map()
    addModalRef.value?.showModal()
    return
  }

  const showTokenSendModal = (sendErc20Asset: any, tokenId?: any) => {
    toAddress.value = ''
    toAmounts.value = ''
    addAsset.value = ''
    setSendErc20Asset(sendErc20Asset)
    setFrom6551({ from6551: tokenId !== undefined, tokenId: tokenId })
    sendTokenModalRef.value?.showModal()
    return
  }

  return {
    showAddModal,
    showSendModal,
    showTokenSendModal
  }
}
