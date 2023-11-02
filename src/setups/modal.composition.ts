import { useAssetStore } from '@/stores/asset.module'
import { storeToRefs } from 'pinia'
import { useModalStore } from '@/stores/modal.module'
import type { Erc20, asset } from '@/types/asset'

export const setupModal = () => {
  const assetStore = useAssetStore()
  const modalStore = useModalStore()

  const { setSendAsset, setSendErc20Asset, setFrom6551 } = assetStore
  const { addModalRef, sendModalRef, sendTokenModalRef } = storeToRefs(modalStore)

  const { toAddress, toAmounts, addAsset } = storeToRefs(assetStore)

  const showSendModal = (sendAsset: asset, tokenId?: bigint) => {
    toAddress.value = ''
    toAmounts.value = ''
    setSendAsset(sendAsset)
    // :CHECKLIST
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

  const showTokenSendModal = (sendErc20Asset: Erc20, tokenId?: bigint) => {
    toAddress.value = ''
    toAmounts.value = ''
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
