<template>
  <section v-if="!hasAsset || !isSigned" class="flex flex-col empty text-center mt-12">
    <span>There is no NFT</span>
  </section>

  <ul v-else class="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
    <!-- 6551 -->
    <li v-for="asset in asset6551" :key="asset" class="overflow-hidden relative rounded-t-lg">
      <ItemCard is6551 :card-name="asset[1]?.metadata.name" :img-src="asset[1]?.metadata.image">
        <div class="grid grid-cols-6">
          <button
            class="min-h-0 h-10 col-span-4 btn btn-primary rounded-none text-xs md:h-12 md:text-base"
            type="button"
            @click="modalAddRef?.showModal()"
          >
            Add NFT
          </button>
          <button
            class="min-h-0 h-10 col-span-2 btn btn-white rounded-none text-xs md:h-12 md:text-base"
            type="button"
            @click="showSendModal(asset)"
          >
            Send
          </button>
        </div>
      </ItemCard>
    </li>

    <!-- 721 -->
    <li v-for="asset in asset721" :key="asset" class="overflow-hidden relative rounded-t-lg">
      <ItemCard
        is721
        badge-name="ERC-721"
        :card-name="asset[1]?.metadata.name"
        :img-src="asset[1]?.metadata.image"
      >
        <div class="grid grid-cols-6">
          <button
            class="min-h-0 h-10 col-span-4 btn btn-secondary rounded-none text-xs md:h-12 md:text-base"
            type="button"
            @click="modalConvertRef?.showModal(), convert721to6551(asset[0])"
          >
            Convert to TBA
          </button>
          <button
            class="min-h-0 h-10 col-span-2 btn btn-white rounded-none text-xs md:h-12 md:text-base"
            type="button"
            @click="showSendModal(asset)"
          >
            Send
          </button>
        </div>
      </ItemCard>
    </li>

    <!-- 1155 -->
    <li v-for="asset in asset1155" :key="asset" class="overflow-hidden relative rounded-t-lg">
      <ItemCard
        badge-name="ERC-1155"
        :card-name="asset[1]?.metadata.name"
        :img-src="asset[1]?.metadata.image"
      >
        <button
          class="min-h-0 h-10 btn btn-white w-full rounded-none text-xs md:btn-base md:h-12 md:text-base"
          type="button"
          @click="showSendModal(asset)"
        >
          Send
        </button>
      </ItemCard>
    </li>
  </ul>

  <!-- modal: add nft -->
  <AddModal @modal-ref="(ref) => (modalAddRef = ref.value)" :modalAddRef="modalAddRef" />
  <SendModal @modal-ref="(ref) => (modalSendRef = ref.value)" />

  <!-- modal: convert to TBA -->
  <ModalLoading
    @modal-ref="(ref) => (modalConvertRef = ref.value)"
    :is-radial="true"
    desc="It takes about 5 minutes. Once complete, you can check in TBA menu."
    progress-name="Convert"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ItemCard from '@/components/service/ItemCard.vue'
import ModalLoading from '../ui/ModalLoading.vue'
import MetamaskService from '@/services/metamask.service'
import { DEPLOYED, IREG, ITBA } from '@/types/abi'
import { Contract } from 'ethers'
import { useAssetStore } from '@/stores/asset.module.ts'
import { storeToRefs } from 'pinia'

import { useAccountStore } from '@/stores/account.module.ts'
import AddModal from './AddModal.vue'
import SendModal from './SendModal.vue'

const accountStore = useAccountStore()
const assetStore = useAssetStore()

const { isSigned } = storeToRefs(accountStore)

const { setSendAsset } = assetStore
const { hasAsset, asset721, asset1155, asset6551, sendAsset } = storeToRefs(assetStore)

const showSendModal = (sendAsset: any) => {
  modalSendRef.value?.showModal()
  setSendAsset(sendAsset)
}

// modal
const modalAddRef = ref<HTMLDialogElement>()
const modalSendRef = ref<HTMLDialogElement>()
const modalConvertRef = ref<HTMLDialogElement>()
//

const convert721to6551 = async (nft721Id: bigint) => {
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
</script>
