<template>
  <section v-if="!hasAsset || !isSigned" class="flex flex-col empty text-center mt-12">
    <span>There is no NFT</span>
  </section>

  <ul v-else class="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
    <!-- 6551 -->
    <!-- <li class="overflow-hidden relative rounded-t-lg">
      <ItemCard
        is6551
        img-src="https://gfile.boraportal.com/cdn-cgi/image/width=300,format=webp/1024000001/2/100109992.png"
      >
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
            @click="modalSendRef?.showModal()"
          >
            Send
          </button>
        </div>
      </ItemCard>
    </li> -->

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
            @click="modalSendRef?.showModal(), setSendAsset(asset)"
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
          @click="modalSendRef?.showModal(), setSendAsset(asset)"
        >
          Send
        </button>
      </ItemCard>
    </li>
  </ul>

  <!-- modal: add nft -->
  <ModalLayout @modal-ref="(ref) => (modalAddRef = ref.value)" title="Add NFT" btn-name="Add">
    <p class="mb-2.5 text-sm md:text-base">Pitcher #1234에 추가할 NFT를 선택하세요.</p>
    <ul
      class="overflow-auto grid grid-cols-3 gap-2 max-h-72 md:grid-cols-4 md:gap-3 md:max-h-[340px]"
    >
      <li v-for="i in 7" :key="i" class="overflow-hidden relative rounded">
        <ItemCard
          :is-small="true"
          :has-badge="false"
          :has-checkbox="true"
          img-src="https://gfile.boraportal.com/cdn-cgi/image/width=300,format=webp/1022000005/3/10393.gif"
        />
      </li>
    </ul>
  </ModalLayout>

  <!-- modal: send nft -->
  <ModalLayout @modal-ref="(ref) => (modalSendRef = ref.value)" title="Send NFT" btn-name="Send">
    <div class="w-28 mx-auto md:w-32">
      <ItemCard :is-small="true" :has-badge="false" :img-src="sendAsset?.[1].metadata.image" />
    </div>
    <div class="form-control w-full mt-4">
      <label class="label">
        <span class="label-text md:text-base">Who are you sending the NFT to?</span>
      </label>
      <!-- input error시 class에 input-error 추가  -->
      <input
        type="text"
        placeholder="ex. 0x1234..."
        :class="['input', 'input-bordered', 'w-full', { 'input-error': isInputError }]"
        maxlength="42"
      />
      <!-- input error시 노출 -->
      <label v-if="isInputError" class="label pb-1">
        <span class="label-text-alt text-error md:text-sm"
          >This is not a valid wallet address.</span
        >
      </label>
    </div>

    <p class="mt-2 text-xs text-neutral-content/70 md:mt-4 md:text-sm">
      The recipient must be connected to the same chain as the NFT to check.
    </p>
  </ModalLayout>

  <!-- modal: convert to TBA -->
  <ModalLoading
    @modal-ref="(ref) => (modalConvertRef = ref.value)"
    :is-radial="true"
    desc="It takes about 5 minutes. Once complete, you can check in TBA menu."
    progress-name="Convert"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import ItemCard from '@/components/service/ItemCard.vue'
import ModalLayout from '@/components/ui/ModalLayout.vue'
import ModalLoading from '../ui/ModalLoading.vue'
import MetamaskService from '@/services/metamask.service'
import { DEPLOYED, IERC721, IERC1155, IERC20, IREG, ITBA } from '@/types/abi'
import { ethers, Contract } from 'ethers'
import { useAssetStore } from '@/stores/asset.module.ts'
import { storeToRefs } from 'pinia'
import axios from 'axios'

import { useAccountStore } from '@/stores/account.module.ts'

const accountStore = useAccountStore()

const { isSigned } = storeToRefs(accountStore)

// const consoleLog = (data) => console.log({ data })

// const isEmpty = ref(true)
const isInputError = ref(true)

// modal
const modalAddRef = ref<HTMLDialogElement>()
const modalSendRef = ref<HTMLDialogElement>()
const modalConvertRef = ref<HTMLDialogElement>()
//

const assetStore = useAssetStore()

const { setAsset721, setAsset1155, setSendAsset } = assetStore
const { hasAsset, asset721, asset1155, sendAsset } = storeToRefs(assetStore)

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
</script>
