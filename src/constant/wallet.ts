import { boraDevRpc } from '@/constant/index.ts'

export const klaytnId = Number(import.meta.env.VITE_KLAYTN_CHAIN_ID)
export const borachainId = Number('55001')
export const polygonId = Number(import.meta.env.VITE_POLYGON_CHAIN_ID)

const addBorachain = {
  chainId: `0x${borachainId.toString(16)}`,
  chainName: 'Borachain Devnet',
  nativeCurrency: {
    name: 'BGAS',
    symbol: 'BGAS',
    decimals: 18
  },
  rpcUrls: [boraDevRpc],
  blockExplorerUrls: ['https://scope.boraportal.net'],
  iconUrls: ['https://static.boraportal.com/logo/coins/mainnet/token-ic-t-bora.svg']
}

export const getNetworkChainConfig = (idx: number) => {
  switch (idx) {
    case 55001: {
      console.log('55001!!')
      return addBorachain
    }
  }
  return
}
