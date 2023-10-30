import { useAssetStore } from '@/stores/asset.module'
import { storeToRefs } from 'pinia'
import { useModalStore } from '@/stores/modal.module'

export const setupModal = () => {
  const assetStore = useAssetStore()
  const modalStore = useModalStore()

  const { setSendAsset, setSendErc20Asset, setAddAsset, setFrom6551 } = assetStore
  const { addModalRef, sendModalRef, sendTokenModalRef } = storeToRefs(modalStore)

  const { toAddress, toAmounts } = storeToRefs(assetStore)

  const showSendModal = (sendAsset: any, tokenId?: any) => {
    toAddress.value = ''
    toAmounts.value = ''
    setSendAsset(sendAsset)
    setFrom6551({ from6551: tokenId !== undefined, tokenId: tokenId })
    sendModalRef.value?.showModal()
    return
  }
  const showAddModal = (addToAddress: string) => {
    toAddress.value = ''
    toAmounts.value = ''
    addModalRef.value?.showModal()
    return
  }

  const showTokenSendModal = (sendErc20Asset: any) => {
    toAddress.value = ''
    toAmounts.value = ''
    setSendErc20Asset(sendErc20Asset)
    sendTokenModalRef.value?.showModal()
    return
  }

  return {
    showAddModal,
    showSendModal,
    showTokenSendModal
  }
}
