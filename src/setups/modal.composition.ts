import { useAssetStore } from '@/stores/asset.module'
import { storeToRefs } from 'pinia'
import { useModalStore } from '@/stores/modal.module'

export const setupModal = () => {
  const assetStore = useAssetStore()
  const modalStore = useModalStore()

  const { setSendAsset } = assetStore
  const { sendModalRef } = storeToRefs(modalStore)

  const { toAddress } = storeToRefs(assetStore)

  const showSendModal = (sendAsset: any) => {
    toAddress.value = ''
    setSendAsset(sendAsset)
    sendModalRef.value?.showModal()
    return
  }

  return {
    showSendModal
  }
}
