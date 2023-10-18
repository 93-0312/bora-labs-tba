import MetamaskService from '@/services/metamask.service'
import { useAccountStore } from '@/stores/account.module.ts'
import { useAssetStore } from '@/stores/asset.module.ts'
import { Contract } from 'ethers'
import { DEPLOYED, IERC1155, IERC721, IREG, ITBA } from '@/types/abi'
import axios from 'axios'

export const setupAsset = () => {
  const assetStore = useAssetStore()
  const accountStore = useAccountStore()

  const { setWalletAddress, setIsSigned } = accountStore
  const { setAsset721, setAsset1155, setSendAsset } = assetStore

  const convert721to6551 = async (nft721Id: number) => {
    console.log({ nft721Id })
    // return
    const wallet = new MetamaskService()
    await wallet.init()
    const provider = await wallet.getWeb3Provider()
    const signer = await provider.getSigner()

    const reg = new Contract(DEPLOYED.tReg, IREG, signer)

    await reg.createAccount(
      DEPLOYED.tAcc,
      Number(import.meta.env.VITE_BORACHAIN_CHAIN_ID),
      DEPLOYED.nft,
      Number(nft721Id),
      0n,
      '0x'
    )

    const tba = await reg.account(
      DEPLOYED.tAcc,
      Number(import.meta.env.VITE_BORACHAIN_CHAIN_ID),
      DEPLOYED.nft,
      Number(nft721Id),
      0n
    )
    console.log({ tba })

    const tbaToken = new Contract(tba, ITBA, signer)
  }

  const tbaMint = async () => {
    const wallet = new MetamaskService()
    await wallet.init()
    const address = wallet.getAddress()
    const provider = await wallet.getWeb3Provider()
    const signer = await provider.getSigner()
    console.log(DEPLOYED)

    // ::CHECKLIST 20 mint onlyOwner
    // const tkn = new Contract(DEPLOYED.tkn, IERC20, signer)
    const nft = new Contract(DEPLOYED.nft, IERC721, signer)
    const mts = new Contract(DEPLOYED.mts, IERC1155, signer)

    // await tkn.mint(address, 10000000000000000000000n)
    try {
      await nft.tbaMint(address)
    } catch (e) {
      console.log(e)
      return
    }

    try {
      await mts.tbaMint(address, 5, '0x')
    } catch (e) {
      console.log(e)
      return
    }

    await checkAsset()
  }

  const checkAsset = async () => {
    const wallet = new MetamaskService()
    await wallet.init()
    const address = wallet.getAddress()
    const provider = await wallet.getWeb3Provider()
    const signer = await provider.getSigner()
    console.log(DEPLOYED)

    // ::CHECKLIST 20 mint onlyOwner
    // const tkn = new Contract(DEPLOYED.tkn, IERC20, signer)
    const nft = new Contract(DEPLOYED.nft, IERC721, signer)
    const mts = new Contract(DEPLOYED.mts, IERC1155, signer)

    const reg = new Contract(DEPLOYED.tReg, IREG, signer)

    const nftList = await nft.tokensOf(address)
    const mtsList = await mts.tokensOf(address)
    // const [mtsList, mstAmount] = await mts.tokensOf(address)

    console.log({ nftList })
    const asset721 = new Map()
    const asset1155 = new Map()

    const asset721Data = await Promise.all(
      nftList.map(async (tokenId: any) => {
        const uri = await nft.tokenURI(tokenId)
        const metadata = await axios.get(uri)
        return { tokenId, metadata: metadata.data }
      })
    )

    const asset1155Data = await Promise.all(
      mtsList[0].map(async (tokenId: any, i: number) => {
        const uri = await mts.uri(tokenId)
        const metadata = await axios.get(uri)
        return { tokenId, metadata: metadata.data, amount: mtsList[1][i] }
      })
    )

    asset721Data.forEach((x: any) => {
      asset721.set(x.tokenId, { metadata: x.metadata })
    })

    asset1155Data.forEach((x: any) => {
      asset1155.set(x.tokenId, { metadata: x.metadata, amount: x.amount })
    })

    setAsset721(asset721)
    setAsset1155(asset1155)

    console.log({ asset721 })
  }

  return {
    convert721to6551,
    tbaMint,
    checkAsset
  }
}
