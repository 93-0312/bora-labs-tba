import MetamaskService from '@/services/metamask.service'
import { computed, ref } from 'vue'
import { useAccountStore } from '@/stores/account.module.ts'

export const setupAccount = () => {
  const accountStore = useAccountStore()
  const { setWalletAddress, setIsSigned } = accountStore

  const connectWallet = async () => {
    try {
      const wallet = new MetamaskService()
      await wallet.init()

      await wallet.switchNetworkChain(Number(import.meta.env.VITE_BORACHAIN_CHAIN_ID))
      await wallet.signMessage('Connect wallet to Borachain TBA labs')
      const cntWallet = await wallet.getAddress()
      setWalletAddress(cntWallet)
      setIsSigned(true)
    } catch (err) {
      console.error({ err })
    }
  }

  const disconnectWallet = () => {
    setWalletAddress('')
    confirm('Disconnect Wallet?')
    setIsSigned(false)
  }

  return {
    connectWallet,
    disconnectWallet
  }
}
