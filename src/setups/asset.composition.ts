import MetamaskService from '@/services/metamask.service'
import { useAccountStore } from '@/stores/account.module.ts'
import { useAssetStore } from '@/stores/asset.module.ts'
import { Contract } from 'ethers'
import { DEPLOYED, IERC1155, IERC20, IERC721, IREG, ITBA } from '@/types/abi'
import axios from 'axios'
import { ref } from 'vue'
import type { Signer } from 'ethers'
import { useModalStore } from '@/stores/modal.module'
import { storeToRefs } from 'pinia'

export const setupAsset = () => {
  const assetStore = useAssetStore()
  const accountStore = useAccountStore()
  const modalStore = useModalStore()

  const { walletAddress } = accountStore
  const { setAsset721, setAsset1155, setAsset6551 } = assetStore

  const { sendModalRef, sendLoadingModalRef, radialModalRef, progressTime } =
    storeToRefs(modalStore)

  const tbaMintDescObj = {
    1: 'ERC-721 민트 중 입니다.',
    2: 'TBA 생성 중 입니다.',
    3: 'ERC-20 민트 중 입니다.',
    4: 'ERC-1155 민트 중 입니다.'
  }

  const toAddress = ref<string>('')
  const tbaMintStep = ref<number>(1)
  const tbaMintDesc = ref<string>(tbaMintDescObj[1])

  const convert721to6551 = async (nft721Id: bigint) => {
    const wallet = new MetamaskService()
    await wallet.init()
    const provider = await wallet.getWeb3Provider()
    const signer = await provider.getSigner()

    const reg = new Contract(DEPLOYED.tReg, IREG, signer)

    const createTx = await reg.createAccount(
      DEPLOYED.tAcc,
      Number(import.meta.env.VITE_BORACHAIN_CHAIN_ID),
      DEPLOYED.nft,
      Number(nft721Id),
      0n,
      '0x'
    )
    radialModalRef.value && radialModalRef?.value.showModal()

    progressTime.value = 0
    const progressInterval = setInterval(
      () =>
        (progressTime.value =
          progressTime.value <= 100 ? progressTime.value + 10 : progressTime.value),
      1000
    )

    await waitTransaction(provider, createTx)
    progressTime.value = 100
    clearInterval(progressInterval)

    radialModalRef.value && radialModalRef?.value.close()

    await check721Asset()
  }

  const tbaMint = async () => {
    const wallet = new MetamaskService()
    await wallet.init()
    const address = wallet.getAddress()
    const provider = await wallet.getWeb3Provider()
    const signer = await provider.getSigner()
    console.log(DEPLOYED)

    // ::CHECKLIST 20 mint onlyOwner

    const tkn = new Contract(DEPLOYED.tkn, IERC20, signer)
    const nft = new Contract(DEPLOYED.nft, IERC721, signer)
    const mts = new Contract(DEPLOYED.mts, IERC1155, signer)

    // 721mint & convertTo6551
    try {
      const tx = await nft.tbaMint(address)

      const txResponse = await provider.getTransaction(tx.hash)
      txResponse && (await txResponse.wait())
      tbaMintStep.value = 2
      tbaMintDesc.value = tbaMintDescObj[2]

      const tokensOf721 = await nft.tokensOf(address)
      await convert721to6551(tokensOf721[0])
    } catch (e) {
      console.log(e)
      return
    }

    // 20mint
    try {
      tbaMintStep.value = 3
      tbaMintDesc.value = tbaMintDescObj[3]
      const tx = await tkn.mint(address, 10000000000000000000000n)
      const txResponse = await provider.getTransaction(tx.hash)
      txResponse && (await txResponse.wait())
    } catch (e) {
      console.log(e)
    }

    // 1155mint
    try {
      tbaMintStep.value = 4
      tbaMintDesc.value = tbaMintDescObj[4]
      const tx = await mts.tbaMint(address, 5, '0x')
      const txResponse = await provider.getTransaction(tx.hash)
      txResponse && (await txResponse.wait())
    } catch (e) {
      console.log(e)
      return
    }

    await checkAsset()
  }

  const checkOwner = async (id: bigint | undefined, ercType: number) => {
    const wallet = new MetamaskService()
    await wallet.init()
    const address = wallet.getAddress()
    const provider = await wallet.getWeb3Provider()
    const signer = await provider.getSigner()

    try {
      if (ercType === 721 || ercType === 6551) {
        const nft = new Contract(DEPLOYED.nft, IERC721, signer)
        const ownerAddress = await nft.ownerOf(id)
        return walletAddress === ownerAddress
      } else if (ercType === 1155) {
        const mts = new Contract(DEPLOYED.mts, IERC1155, signer)
        const tokensOf1155 = await mts.tokensOf(address)

        return tokensOf1155[0].includes(id)
      }
    } catch (e) {
      console.log(e)
      return false
    }
  }

  const check721Asset = async (signerArg?: Signer) => {
    const wallet = new MetamaskService()
    await wallet.init()
    const address = wallet.getAddress()
    const provider = await wallet.getWeb3Provider()
    const signer = await provider.getSigner()

    const nft = new Contract(DEPLOYED.nft, IERC721, signer)
    const reg = new Contract(DEPLOYED.tReg, IREG, signer)

    // const address = signer.getAddress()

    const tokensOf721 = await nft.tokensOf(address)

    const asset721: Map<bigint, { metadata: any; amount?: bigint }> = new Map()
    const asset6551: Map<bigint, { metadata: any; amount?: bigint }> = new Map()

    const is6551List = await Promise.all(
      tokensOf721.map(async (tokenId: bigint) => {
        const is6551 = await reg.accountsOf(DEPLOYED.nft, tokenId)
        return is6551.length !== 0
      })
    )

    const nftList = tokensOf721.filter((_: any, index: number) => !is6551List[index])

    const asset721Data = await Promise.all(
      nftList.map(async (tokenId: any) => {
        const uri = await nft.tokenURI(tokenId)
        const metadata = await axios.get(uri)
        return { tokenId, metadata: metadata.data }
      })
    )

    asset721Data.forEach((x: any) => {
      asset721.set(x.tokenId, { metadata: { ...x.metadata, type: 721 } })
    })

    const asset6551List = tokensOf721.filter((tokenId: bigint, index: number) => is6551List[index])

    // const createTx = await reg.createAccount(
    // DEPLOYED.tAcc,
    // Number(import.meta.env.VITE_BORACHAIN_CHAIN_ID),
    //   DEPLOYED.nft,
    //   Number(nft721Id),
    //   0n,
    //   '0x'
    // )

    const asset6551Data = await Promise.all(
      asset6551List.map(async (tokenId: any) => {
        const uri = await nft.tokenURI(tokenId)
        const walletAddress = await reg.account(
          DEPLOYED.tAcc,
          Number(import.meta.env.VITE_BORACHAIN_CHAIN_ID),
          DEPLOYED.nft,
          tokenId,
          0n
        )
        console.log({ walletAddress })
        const metadata = await axios.get(uri)
        return { tokenId, metadata: { ...metadata.data, walletAddress: walletAddress } }
      })
    )

    asset6551Data.forEach((x: any) => {
      asset6551.set(x.tokenId, { metadata: { ...x.metadata, type: 6551 } })
    })

    setAsset721(asset721)
    setAsset6551(asset6551)
  }

  const check1155Asset = async (params?: type) => {
    const wallet = new MetamaskService()
    await wallet.init()
    const address = wallet.getAddress()
    const provider = await wallet.getWeb3Provider()
    const signer = await provider.getSigner()

    const mts = new Contract(DEPLOYED.mts, IERC1155, signer)
    const tokensOf1155 = await mts.tokensOf(address)

    const asset1155: Map<bigint, { metadata: any; amount?: bigint }> = new Map()

    const mtsList = tokensOf1155

    const asset1155Data = await Promise.all(
      mtsList[0].map(async (tokenId: any, i: number) => {
        const uri = await mts.uri(tokenId)
        const metadata = await axios.get(uri)
        return { tokenId, metadata: metadata.data, amount: mtsList[1][i] }
      })
    )

    asset1155Data.forEach((x: any) => {
      asset1155.set(x.tokenId, { metadata: { ...x.metadata, type: 1155 }, amount: x.amount })
    })
    setAsset1155(asset1155)
  }

  const checkAsset = async () => {
    const wallet = new MetamaskService()
    await wallet.init()
    const address = wallet.getAddress()
    const provider = await wallet.getWeb3Provider()
    const signer = await provider.getSigner()

    // ::CHECKLIST 20 mint onlyOwner

    await Promise.all([check721Asset(), check1155Asset()])
    const tkn = new Contract(DEPLOYED.tkn, IERC20, signer)

    const tknAmount = await tkn.balanceOf(address)
    const tknSymbol = await tkn.symbol()
    const tknDecimals = await tkn.decimals()
  }

  const sendNft = async (toAddress: string, asset: any, upperModalRef: any) => {
    const assetType = asset[1].metadata.type

    const wallet = new MetamaskService()
    await wallet.init()
    const provider = await wallet.getWeb3Provider()
    const address = await wallet.getAddress()
    const signer = await provider.getSigner()

    if (assetType === 721 || assetType === 6551) {
      const nft = new Contract(DEPLOYED.nft, IERC721, signer)

      const tx = await nft.transferFrom(address, toAddress, asset[0])
      console.log({ upperModalRef })
      upperModalRef.value.close()

      sendLoadingModalRef.value && sendLoadingModalRef?.value.showModal()

      progressTime.value = 0
      const progressInterval = setInterval(
        () =>
          (progressTime.value =
            progressTime.value <= 100 ? progressTime.value + 7 : progressTime.value),
        1000
      )

      await waitTransaction(provider, tx)

      progressTime.value = 100
      clearInterval(progressInterval)
      sendLoadingModalRef.value && sendLoadingModalRef?.value.close()

      await checkAsset()
    }

    if (assetType === 1155) {
      // 1155 send 시 가지고 있는 전량을 send

      const mts = new Contract(DEPLOYED.mts, IERC1155, signer)

      const tx = await mts.safeTransferFrom(address, toAddress, asset[0], asset[1].amount, '0x')
      console.log({ upperModalRef })
      upperModalRef.value.close()
      sendLoadingModalRef.value && sendLoadingModalRef?.value.showModal()

      progressTime.value = 0
      const progressInterval = setInterval(
        () =>
          (progressTime.value =
            progressTime.value <= 100 ? progressTime.value + 7 : progressTime.value),
        1000
      )

      await waitTransaction(provider, tx)

      progressTime.value = 100
      clearInterval(progressInterval)
      sendLoadingModalRef.value && sendLoadingModalRef?.value.close()

      await checkAsset()
    }
  }

  const waitTransaction = async (provider: any, tx: any) => {
    const txResponse = await provider.getTransaction(tx.hash)
    txResponse && (await txResponse.wait())

    return
  }

  return {
    toAddress,
    tbaMintStep,
    tbaMintDesc,
    convert721to6551,
    tbaMint,
    checkAsset,
    sendNft,
    check721Asset,
    check1155Asset,
    checkOwner
  }
}
