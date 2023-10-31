import MetamaskService from '@/services/metamask.service'
import { useAccountStore } from '@/stores/account.module.ts'
import { useAssetStore } from '@/stores/asset.module'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

export const setupAccount = () => {
  const assetStore = useAssetStore()
  const accountStore = useAccountStore()
  const { setWalletAddress, setIsSigned } = accountStore
  const { walletAddress } = storeToRefs(accountStore)

  const { resetAsset } = assetStore
  const connectWallet = async () => {
    try {
      const wallet = new MetamaskService()
      await wallet.init()

      await wallet.switchNetworkChain(Number(import.meta.env.VITE_BORACHAIN_CHAIN_ID))

      const cntWallet = await wallet.getAddress()
      setWalletAddress(cntWallet)
      setIsSigned(true)
    } catch (err) {
      console.error({ err })
    }
  }

  const disconnectWallet = () => {
    if (confirm('Disconnect Wallet?')) {
      resetAsset()
      setWalletAddress('')
      setIsSigned(false)
    }
  }

  watch(
    () => walletAddress.value,
    async (walletAddress: string) => {
      const wallet = new MetamaskService()
      await wallet.init()
      const currentWalletAddress = await wallet.getAddress()

      if (walletAddress !== currentWalletAddress) {
        resetAsset()
        setWalletAddress('')
        setIsSigned(false)
      }
    },
    { immediate: true }
  )

  return {
    connectWallet,
    disconnectWallet
  }
}
