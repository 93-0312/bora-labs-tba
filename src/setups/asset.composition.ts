import MetamaskService from '@/services/metamask.service'
import { useAccountStore } from '@/stores/account.module.ts'
import { useAssetStore } from '@/stores/asset.module.ts'
import { Contract, ethers } from 'ethers'
import { DEPLOYED, IERC1155, IERC20, IERC721, IREG, ITBA } from '@/types/abi'
import axios from 'axios'
import { ref } from 'vue'
import { useModalStore } from '@/stores/modal.module'
import { storeToRefs } from 'pinia'
import { setupAccount } from '@/setups/account.composition'

export const setupAsset = () => {
  const assetStore = useAssetStore()
  const accountStore = useAccountStore()
  const modalStore = useModalStore()
  const { isSigned } = storeToRefs(accountStore)
  const { setAsset721, setAsset1155, setAsset6551, setAsset20, addAsset } = assetStore
  const {
    hasAsset,
    detail1155Asset,
    tbaMintStep,
    toAddress,
    toAmounts,
    from6551,
    tbaAsset1155,
    tbaAsset20,
    tbaAsset721
  } = storeToRefs(assetStore)

  const { sendLoadingModalRef, radialModalRef, progressTime, stepModalRef } =
    storeToRefs(modalStore)

  const { setShowToast, setToastMsg } = modalStore
  const { connectWallet } = setupAccount()

  const createWallet = async () => {
    if (isSigned.value) {
      stepModalRef.value?.showModal()
      await tbaMint()
      stepModalRef.value?.close()
    } else if (!isSigned.value) {
      await connectWallet()
      await checkAsset()
      if (!hasAsset.value) {
        stepModalRef.value?.showModal()
        await tbaMint()
        stepModalRef.value?.close()
      }
    }
  }

  const tbaMint = async () => {
    const wallet = new MetamaskService()
    await wallet.init()
    const address = await wallet.getAddress()
    const provider = await wallet.getWeb3Provider()
    const signer = await provider.getSigner()

    const tkn = new Contract(DEPLOYED.tkn, IERC20, signer)
    const nft = new Contract(DEPLOYED.nft, IERC721, signer)
    const mts = new Contract(DEPLOYED.mts, IERC1155, signer)
    const reg = new Contract(DEPLOYED.tReg, IREG, signer)

    // 721mint & convertTo6551
    try {
      const tx = await nft.tbaMint(address)

      const txResponse = await provider.getTransaction(tx.hash)
      txResponse && (await txResponse.wait())
      tbaMintStep.value = 2

      // 20mint
      const tokensOf721 = await nft.tokensOf(address)
      await convert721to6551(tokensOf721[0], true)
      tbaMintStep.value = 3

      const walletAddress = await reg.account(
        DEPLOYED.tAcc,
        Number(import.meta.env.VITE_BORACHAIN_CHAIN_ID),
        DEPLOYED.nft,
        tokensOf721[0],
        0n
      )

      const txErc20 = await tkn.mint(walletAddress, 100000000000000000000n)
      const txErc20Response = await provider.getTransaction(txErc20.hash)
      txErc20Response && (await txErc20Response.wait())
    } catch (e) {
      console.log(e)
      return
    }

    // 1155mint
    try {
      tbaMintStep.value = 4
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
    const address = await wallet.getAddress()
    const provider = await wallet.getWeb3Provider()
    const signer = await provider.getSigner()

    try {
      if (ercType === 721 || ercType === 6551) {
        const nft = new Contract(DEPLOYED.nft, IERC721, signer)

        const ownerAddress = await nft.ownerOf(id)
        console.log({ ownerAddress })
        console.log({ address })

        return address === ownerAddress
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

  const check721Asset = async (address2?: string) => {
    const wallet = new MetamaskService()
    await wallet.init()
    // const address = wallet.getAddress()
    const address = address2

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
        const metadata = await axios.get(uri)
        return { tokenId, metadata: { ...metadata.data, walletAddress: walletAddress } }
      })
    )

    asset6551Data.forEach((x: any) => {
      asset6551.set(x.tokenId, { metadata: { ...x.metadata, type: 6551 } })
    })

    return { asset721, asset6551 }
  }

  const check1155Asset = async (address2?: string) => {
    const wallet = new MetamaskService()
    await wallet.init()
    // const address = wallet.getAddress()
    const address = address2
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

    return asset1155
  }

  const checkAsset = async () => {
    const wallet = new MetamaskService()
    await wallet.init()
    const address = await wallet.getAddress()
    const provider = await wallet.getWeb3Provider()
    const signer = await provider.getSigner()

    const result = await Promise.all([check721Asset(address), check1155Asset(address)])

    const asset721 = result[0]['asset721']
    const asset6551 = result[0]['asset6551']
    const asset1155 = result[1]

    setAsset1155(asset1155)
    setAsset721(asset721)
    setAsset6551(asset6551)

    const tkn = new Contract(DEPLOYED.tkn, IERC20, signer)

    const tknAmountWei = await tkn.balanceOf(address)
    const tknSymbol = await tkn.symbol()
    const tknDecimals = await tkn.decimals()
    const formatEtherAmount = ethers.formatEther(tknAmountWei)

    setAsset20({ tknAmountWei, tknSymbol, tknDecimals, formatEtherAmount })
  }

  const send20Token = async (asset: any, upperModalRef: any) => {
    const wallet = new MetamaskService()
    await wallet.init()
    const provider = await wallet.getWeb3Provider()
    const signer = await provider.getSigner()

    const nft = new Contract(DEPLOYED.nft, IERC721, signer)
    const reg = new Contract(DEPLOYED.tReg, IREG, signer)
    const mts = new Contract(DEPLOYED.mts, IERC1155, signer)
    const tkn = new Contract(DEPLOYED.tkn, IERC20, signer)
    console.log(from6551.value?.tokenId)
    const tbaWalletAddress = await reg.account(
      DEPLOYED.tAcc,
      Number(import.meta.env.VITE_BORACHAIN_CHAIN_ID),
      DEPLOYED.nft,
      from6551.value?.tokenId,
      0n
    )

    const encodedFn = tkn.interface.encodeFunctionData('transfer', [
      toAddress.value,

      ethers.toBigInt(toAmounts.value)
    ])

    const proxy6551 = new Contract(tbaWalletAddress, ITBA, signer)

    const tx = await proxy6551.execute(DEPLOYED.tkn, 0n, encodedFn, 0n)

    upperModalRef.value.close()

    sendLoadingModalRef.value && sendLoadingModalRef?.value.showModal()

    progressTime.value = 0
    const progressInterval = setInterval(
      () =>
        (progressTime.value =
          progressTime.value <= 100 ? progressTime.value + 0.05 : progressTime.value),
      10
    )

    await waitTransaction(provider, tx)

    progressTime.value = 100
    clearInterval(progressInterval)
    sendLoadingModalRef.value && sendLoadingModalRef?.value.close()

    const tknAmountWei = await tkn.balanceOf(tbaWalletAddress)
    const tknSymbol = await tkn.symbol()
    const tknDecimals = await tkn.decimals()
    const formatEtherAmount = ethers.formatEther(tknAmountWei)

    tbaAsset20.value = [{ tknAmountWei, tknSymbol, tknDecimals, formatEtherAmount }]

    await checkAsset()

    setShowToast(true)
    setToastMsg('Send Completed!')
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
      upperModalRef.value.close()

      sendLoadingModalRef.value && sendLoadingModalRef?.value.showModal()

      progressTime.value = 0
      const progressInterval = setInterval(
        () =>
          (progressTime.value =
            progressTime.value <= 100 ? progressTime.value + 0.05 : progressTime.value),
        10
      )

      await waitTransaction(provider, tx)

      progressTime.value = 100
      clearInterval(progressInterval)
      sendLoadingModalRef.value && sendLoadingModalRef?.value.close()

      const uri = await nft.tokenURI(BigInt(asset[0]))
      const metadata = await axios.get(uri)

      detail721Asset.value.set(asset[0], { metadata: { ...metadata.data, type: 721 } })
    }

    if (assetType === 1155) {
      const mts = new Contract(DEPLOYED.mts, IERC1155, signer)

      const tx = await mts.safeTransferFrom(
        address,
        toAddress,
        asset[0],
        BigInt(toAmounts.value),
        '0x'
      )
      // const tx = await mts.safeTransferFrom(address, toAddress, asset[0], toAmounts.value, '0x')
      upperModalRef.value.close()
      sendLoadingModalRef.value && sendLoadingModalRef?.value.showModal()

      progressTime.value = 0
      const progressInterval = setInterval(
        () =>
          (progressTime.value =
            progressTime.value <= 100 ? progressTime.value + 0.05 : progressTime.value),
        10
      )

      await waitTransaction(provider, tx)

      progressTime.value = 100
      clearInterval(progressInterval)
      sendLoadingModalRef.value && sendLoadingModalRef?.value.close()

      const uri = await mts.uri(BigInt(asset[0]))
      const metadata = await axios.get(uri)
      const amount = await mts.balanceOf(signer.getAddress(), asset[0])

      detail1155Asset.value.set(asset[0], {
        metadata: { ...metadata.data, type: 1155 },
        amount
      })
    }
    await checkAsset()

    setShowToast(true)
    setToastMsg('Send Completed!')
  }

  const sendNftFrom6551 = async (asset: any, upperModalRef: any) => {
    const assetType = asset[1].metadata.type

    const wallet = new MetamaskService()
    await wallet.init()
    const provider = await wallet.getWeb3Provider()
    const signer = await provider.getSigner()

    const nft = new Contract(DEPLOYED.nft, IERC721, signer)
    const reg = new Contract(DEPLOYED.tReg, IREG, signer)
    const mts = new Contract(DEPLOYED.mts, IERC1155, signer)
    const tkn = new Contract(DEPLOYED.tkn, IERC20, signer)

    const tbaWalletAddress = await reg.account(
      DEPLOYED.tAcc,
      Number(import.meta.env.VITE_BORACHAIN_CHAIN_ID),
      DEPLOYED.nft,
      from6551.value?.tokenId,
      0n
    )

    if (assetType === 721 || assetType === 6551) {
      const encodedFn = nft.interface.encodeFunctionData('transferFrom', [
        tbaWalletAddress,
        toAddress.value,
        asset[0]
      ])

      const proxy6551 = new Contract(tbaWalletAddress, ITBA, signer)

      const tx = await proxy6551.execute(DEPLOYED.nft, 0n, encodedFn, 0n)

      upperModalRef.value.close()

      sendLoadingModalRef.value && sendLoadingModalRef?.value.showModal()

      progressTime.value = 0
      const progressInterval = setInterval(
        () =>
          (progressTime.value =
            progressTime.value <= 100 ? progressTime.value + 0.05 : progressTime.value),
        10
      )

      await waitTransaction(provider, tx)

      progressTime.value = 100
      clearInterval(progressInterval)
      sendLoadingModalRef.value && sendLoadingModalRef?.value.close()

      const uri = await nft.tokenURI(BigInt(asset[0]))
      const metadata = await axios.get(uri)

      detail721Asset.value.set(asset[0], { metadata: { ...metadata.data, type: 721 } })
    }

    if (assetType === 1155) {
      const encodedFn = mts.interface.encodeFunctionData('safeTransferFrom', [
        tbaWalletAddress,
        toAddress.value,
        asset[0],
        BigInt(toAmounts.value),
        '0x'
      ])

      const proxy6551 = new Contract(tbaWalletAddress, ITBA, signer)

      const tx = await proxy6551.execute(DEPLOYED.mts, 0n, encodedFn, 0n)

      upperModalRef.value.close()
      sendLoadingModalRef.value && sendLoadingModalRef?.value.showModal()

      progressTime.value = 0
      const progressInterval = setInterval(
        () =>
          (progressTime.value =
            progressTime.value <= 100 ? progressTime.value + 0.05 : progressTime.value),
        10
      )

      await waitTransaction(provider, tx)

      progressTime.value = 100
      clearInterval(progressInterval)
      sendLoadingModalRef.value && sendLoadingModalRef?.value.close()

      const uri = await mts.uri(BigInt(asset[0]))
      const metadata = await axios.get(uri)
      const amount = await mts.balanceOf(signer.getAddress(), asset[0])

      detail1155Asset.value.set(asset[0], {
        metadata: { ...metadata.data, type: 1155 },
        amount
      })
    }

    const tknAmountWei = await tkn.balanceOf(tbaWalletAddress)
    const tknSymbol = await tkn.symbol()
    const tknDecimals = await tkn.decimals()
    const formatEtherAmount = ethers.formatEther(tknAmountWei)

    const result = await Promise.all([
      check721Asset(tbaWalletAddress),
      check1155Asset(tbaWalletAddress)
    ])

    const asset721 = result[0]['asset721']
    const asset1155 = result[1]

    tbaAsset20.value = [{ tknAmountWei, tknSymbol, tknDecimals, formatEtherAmount }]
    tbaAsset721.value = asset721
    tbaAsset1155.value = asset1155

    await checkAsset()

    setShowToast(true)
    setToastMsg('Send Completed!')
  }

  const addNft = async (toAddress: string, asset: any, upperModalRef: any) => {
    const wallet = new MetamaskService()
    await wallet.init()
    const provider = await wallet.getWeb3Provider()
    const address = await wallet.getAddress()
    const signer = await provider.getSigner()

    const assetIdList: bigint[] = []
    const assetAmountsList: bigint[] = []

    addAsset.forEach((value: any, key: bigint) => {
      assetIdList.push(key), assetAmountsList.push(value.amount), console.log(value.amount)
    })

    console.log(assetAmountsList)
    console.log(assetIdList)

    const mts = new Contract(DEPLOYED.mts, IERC1155, signer)

    const tx = await mts.safeBatchTransferFrom(
      address,
      toAddress,
      assetIdList,
      assetAmountsList,
      '0x'
    )
    upperModalRef.value.close()
    sendLoadingModalRef.value && sendLoadingModalRef?.value.showModal()

    progressTime.value = 0
    const progressInterval = setInterval(
      () =>
        (progressTime.value =
          progressTime.value <= 100 ? progressTime.value + 0.05 : progressTime.value),
      10
    )

    await waitTransaction(provider, tx)

    progressTime.value = 100
    clearInterval(progressInterval)
    sendLoadingModalRef.value && sendLoadingModalRef?.value.close()

    await checkAsset()
  }

  const convert721to6551 = async (nft721Id: bigint, initMint?: boolean) => {
    const wallet = new MetamaskService()
    await wallet.init()
    const address = await wallet.getAddress()
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

    if (!initMint) {
      radialModalRef.value && radialModalRef?.value.showModal()

      progressTime.value = 0
      const progressInterval = setInterval(
        () =>
          (progressTime.value =
            progressTime.value <= 100 ? progressTime.value + 0.05 : progressTime.value),
        10
      )

      await waitTransaction(provider, createTx)
      progressTime.value = 100
      clearInterval(progressInterval)
      radialModalRef.value && radialModalRef?.value.close()
      setShowToast(true)
      setToastMsg('Convert Completed!')
      const result = await check721Asset(address)

      setAsset721(result['asset721'])
      setAsset6551(result['asset6551'])
      return
    }
    await waitTransaction(provider, createTx)

    !initMint && setShowToast(true)
    setToastMsg('Convert Completed!')

    const result = await check721Asset(address)

    setAsset721(result['asset721'])
    setAsset6551(result['asset6551'])

    return
  }

  const waitTransaction = async (provider: any, tx: any) => {
    const txResponse = await provider.getTransaction(tx.hash)
    txResponse && (await txResponse.wait())

    return
  }

  const detail721Asset = ref<any>(new Map())
  // const detail1155Asset = ref<any>(new Map())

  const checkDetailAsset = async (ercType: number, tokenId: bigint) => {
    const wallet = new MetamaskService()
    await wallet.init()
    const provider = await wallet.getWeb3Provider()
    const signer = await provider.getSigner()

    if (ercType === 6551) {
      const reg = new Contract(DEPLOYED.tReg, IREG, signer)
      const tbaWalletAddress = await reg.account(
        DEPLOYED.tAcc,
        Number(import.meta.env.VITE_BORACHAIN_CHAIN_ID),
        DEPLOYED.nft,
        // tokenId.value,
        tokenId,
        0n
      )

      const result = await Promise.all([
        check721Asset(tbaWalletAddress),
        check1155Asset(tbaWalletAddress)
      ])

      const asset721 = result[0]['asset721']
      const asset1155 = result[1]

      tbaAsset721.value = asset721
      tbaAsset1155.value = asset1155
    } else if (ercType === 721) {
      const nft = new Contract(DEPLOYED.nft, IERC721, signer)

      const uri = await nft.tokenURI(BigInt(tokenId))
      const metadata = await axios.get(uri)

      detail721Asset.value.set(tokenId, { metadata: { ...metadata.data, type: 721 } })
    } else if (ercType === 1155) {
      const mts = new Contract(DEPLOYED.mts, IERC1155, signer)

      const uri = await mts.uri(BigInt(tokenId))
      const metadata = await axios.get(uri)

      const amount = await mts.balanceOf(signer.getAddress(), tokenId)
      detail1155Asset.value.set(tokenId, {
        metadata: { ...metadata.data, type: 1155 },
        amount
      })
    }
  }

  return {
    toAddress,
    toAmounts,
    tbaMintStep,
    createWallet,
    convert721to6551,
    tbaMint,
    checkAsset,
    sendNft,
    addNft,
    sendNftFrom6551,
    send20Token,
    check721Asset,
    check1155Asset,
    checkOwner,
    checkDetailAsset,

    detail1155Asset,
    detail721Asset
  }
}
