<template>
  <template v-if="!detailAsset.size"></template>
  <main
    v-else
    class="grid gap-6 w-full max-w-[1200px] mx-auto px-4 pt-4 pb-16 align-top md:gap-10 md:px-7 md:pb-20 md:grid-cols-[4fr_5fr] md:pt-8"
  >
    <section class="relative w-full max-w-lg mx-auto h-auto text-center md:max-w-lg">
      <img
        width="100"
        height="100"
        :src="detailAsset && detailAsset?.get(tokenId)?.metadata['image']"
        class="w-full h-auto rounded-lg"
        alt="nft"
      />

      <!-- badge: 6551 -->
      <div
        v-if="is6551"
        class="absolute left-4 top-4 badge h-8 bg-neutral-content/60 backdrop-blur-md rounded-md border-none text-xs md:text-sm"
      >
        <!-- prettier-ignore -->
        <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1">
          <path d="M14.25 4H9.75C6.56802 4 4.97703 4 3.98851 5.00421C3 6.00841 3 7.62465 3 10.8571V13.1429C3 16.3753 3 17.9916 3.98851 18.9958C4.97703 20 6.56802 20 9.75 20H14.25C17.432 20 19.023 20 20.0115 18.9958C21 17.9916 21 16.3753 21 13.1429V10.8571C21 7.62465 21 6.00841 20.0115 5.00421C19.023 4 17.432 4 14.25 4Z" stroke="currentColor" />
          <path d="M7 8H10" stroke="currentColor" stroke-linecap="round" />
          <path d="M19 16H17C16.0572 16 15.5858 16 15.2929 15.7071C15 15.4142 15 14.9428 15 14C15 13.0572 15 12.5858 15.2929 12.2929C15.5858 12 16.0572 12 17 12H19C19.9428 12 20.4142 12 20.7071 12.2929C21 12.5858 21 13.0572 21 14C21 14.9428 21 15.4142 20.7071 15.7071C20.4142 16 19.9428 16 19 16Z" stroke="currentColor" />
        </svg>
        ERC-6551
      </div>

      <!-- badge: 721, 1155 -->
      <p
        v-else
        class="absolute left-4 top-4 badge h-8 bg-neutral-content/60 backdrop-blur-md rounded-md border-none text-xs md:text-sm"
      >
        {{ is1155 ? 'ERC-1155' : 'ERC-721' }}
      </p>
    </section>

    <section>
      <div class="flex items-center justify-between">
        <h2 class="text-3xl font-bold md:text-4xl">
          {{ detailAsset && detailAsset?.get(tokenId)?.metadata['name'] }}
        </h2>

        <<<<<<< HEAD
        <a
          v-if="is6551"
          :href="`${scopeUrl}address/${tbaWalletAddress}`"
          target="_blank"
          class="flex items-center justify-center w-11 h-11 rounded-full transition hover:bg-neutral-content"
          aria-label="go to borascope"
        >
          <!-- prettier-ignore -->
          <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-6 md:h-6">
            <path d="M8 21H20.4C20.7314 21 21 20.7314 21 20.4V3.6C21 3.26863 20.7314 3 20.4 3H3.6C3.26863 3 3 3.26863 3 3.6V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 6L18 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 6H7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3.5 20.5L12 12M12 12V16M12 12H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        =======
        <div class="tooltip tooltip-neutral tooltip-left" data-tip="Go to Bora Scope">
          <a
            href="#"
            target="_blank"
            class="flex items-center justify-center w-11 h-11 rounded-full bg-neutral-content"
            aria-label="go to borascope"
          >
            <!-- prettier-ignore -->
            <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-6 md:h-6">
              <path d="M8 21H20.4C20.7314 21 21 20.7314 21 20.4V3.6C21 3.26863 20.7314 3 20.4 3H3.6C3.26863 3 3 3.26863 3 3.6V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 6L18 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 6H7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3.5 20.5L12 12M12 12V16M12 12H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
        >>>>>>> feature/update-theme
      </div>

      <!-- erc-6551 -->
      <template v-if="is6551">
        <p
          class="inline-flex items-center h-11 mt-3 pl-4 bg-neutral-content rounded-lg text-sm md:mt-4 md:text-lg"
        >
          {{ detailAsset && truncate(detailAsset?.get(tokenId)?.metadata['walletAddress'] || '') }}
          <button
            @click="copy(detailAsset && detailAsset?.get(tokenId)?.metadata['walletAddress'])"
            class="px-3 h-11 ml-1 rounded-r-lg hover:bg-secondary/20"
            type="button"
            aria-label="copy"
          >
            <!-- prettier-ignore -->
            <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
              <path d="M4.79175 17.7502C4.37508 17.7502 4.02091 17.6043 3.72925 17.3127C3.43758 17.021 3.29175 16.6668 3.29175 16.2502V5.66683H4.54175V16.2502C4.54175 16.3196 4.56591 16.3785 4.61425 16.4268C4.66314 16.4757 4.7223 16.5002 4.79175 16.5002H12.8751V17.7502H4.79175ZM7.70841 14.8335C7.29175 14.8335 6.93758 14.6877 6.64591 14.396C6.35425 14.1043 6.20841 13.7502 6.20841 13.3335V3.85433C6.20841 3.42377 6.35425 3.06266 6.64591 2.771C6.93758 2.47933 7.29175 2.3335 7.70841 2.3335H14.6876C15.1181 2.3335 15.4792 2.47933 15.7709 2.771C16.0626 3.06266 16.2084 3.42377 16.2084 3.85433V13.3335C16.2084 13.7502 16.0626 14.1043 15.7709 14.396C15.4792 14.6877 15.1181 14.8335 14.6876 14.8335H7.70841ZM7.70841 13.5835H14.6876C14.757 13.5835 14.8195 13.5591 14.8751 13.5102C14.9306 13.4618 14.9584 13.4029 14.9584 13.3335V3.85433C14.9584 3.78488 14.9306 3.72239 14.8751 3.66683C14.8195 3.61127 14.757 3.5835 14.6876 3.5835H7.70841C7.63897 3.5835 7.58008 3.61127 7.53175 3.66683C7.48286 3.72239 7.45841 3.78488 7.45841 3.85433V13.3335C7.45841 13.4029 7.48286 13.4618 7.53175 13.5102C7.58008 13.5591 7.63897 13.5835 7.70841 13.5835Z" fill="currentColor" />
            </svg>
          </button>
        </p>

        <Accordion title="NFT (5)">
          <p v-if="tbaAssetisEmpty" class="flex flex-col empty empty-sm py-2 text-sm text-center">
            There is no NFT.
          </p>

          <template v-else>
            <ul class="grid grid-cols-2 gap-4 md:grid-cols-3">
              <li v-for="asset in tbaAsset721" :key="asset" class="relative">
                <ItemCard
                  :is-small="true"
                  :has-badge="false"
                  :show-network="false"
                  :card-name="asset[1]?.metadata.name"
                  :img-src="asset[1].metadata.image"
                  :id="Number(asset[0])"
                >
                  <button
                    class="btn btn-sm btn-neutral border-none w-[calc(100%_+_24px)] p-1 -mx-3 mt-1.5 rounded-none text-xs md:text-xs"
                    type="button"
                    @click="showSendModal(asset)"
                  >
                    Send
                    <!-- prettier-ignore -->
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4">
                      <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </ItemCard>

                <!-- 카드 갯수 -->
                <span
                  class="absolute -top-2 -right-2 badge badge-accent px-1 rounded-md text-xs font-bold text-base-100"
                >
                  <!-- prettier-ignore -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" class="w-3.5 h-auto">
                    <path d="M8.28464 24.9001L6.90002 23.5155L14.5154 15.9001L6.90002 8.28476L8.28464 6.90015L15.9 14.5155L23.5154 6.90015L24.9 8.28476L17.2846 15.9001L24.9 23.5155L23.5154 24.9001L15.9 17.2848L8.28464 24.9001Z" fill="white"/>
                  </svg>
                  3
                </span>
              </li>
              <li v-for="asset in tbaAsset1155" :key="Number(asset[0])" class="relative">
                <ItemCard
                  :is-small="true"
                  :has-badge="false"
                  :show-network="false"
                  :card-name="asset[1]?.metadata.name"
                  :img-src="asset[1]?.metadata.image"
                  :id="Number(asset[0])"
                >
                  <button
                    class="btn btn-sm btn-neutral border-none w-[calc(100%_+_24px)] p-1 -mx-3 mt-1.5 rounded-none text-xs md:text-xs"
                    type="button"
                    @click="showSendModal(asset)"
                  >
                    Send
                    <!-- prettier-ignore -->
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4">
                      <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </ItemCard>

                <!-- 카드 갯수 -->
                <span
                  class="absolute -top-2 -right-2 badge badge-accent px-1 rounded-md text-xs font-bold text-base-100"
                >
                  <!-- prettier-ignore -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" class="w-3.5 h-auto">
                    <path d="M8.28464 24.9001L6.90002 23.5155L14.5154 15.9001L6.90002 8.28476L8.28464 6.90015L15.9 14.5155L23.5154 6.90015L24.9 8.28476L17.2846 15.9001L24.9 23.5155L23.5154 24.9001L15.9 17.2848L8.28464 24.9001Z" fill="white"/>
                  </svg>
                  3
                </span>
              </li>
            </ul>

            <button
              class="btn btn-primary btn-sm block mt-3 ml-auto rounded-lg text-xs md:btn-md md:mt-4 md:text-md"
              type="button"
            >
              + Add NFT
            </button>
          </template>
        </Accordion>

        <Accordion title="Token (2)">
          <div
            v-for="asset in tbaAsset20"
            :key="asset"
            class="flex justify-between items-center mb-5 last:mb-0"
          >
            <div class="flex items-center mr-4 font-medium text-md">
              <img
                src="https://static.boraportal.com/logo/coins/mainnet/token-ic-bid.svg"
                :alt="asset.tknSymbol"
                class="w-8 h-8 mr-2"
              />
              <span @click="console.log(asset)">{{ asset.tknSymbol }}</span>
            </div>

            <p class="ml-auto text-sm md:text-base">{{ asset.formatEtherAmount }}</p>

            <button
              class="btn btn-neutral btn-circle btn-sm min-h-0 ml-3 text-right md:ml-4"
              type="button"
              @click="modalSendTokenRef?.showModal()"
              aria-label="send"
            >
              <!-- prettier-ignore -->
              <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 translate-x-[1px]">
                <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </Accordion>
      </template>

      <!-- erc-721, 1155 -->
      <template v-else>
        <div class="overflow-hidden grid grid-cols-6 gap-3 mt-7 md:gap-4">
          <button
            v-if="notIncluded && is721"
            class="col-span-4 btn btn-accent rounded-lg md:btn-lg"
            type="button"
            @click="
              async () => [await convert721to6551(tokenId), router.push(`/tba/6551/${tokenId}`)]
            "
          >
            Convert to TBA
          </button>
          <button
            :class="[
              'btn',
              'btn-neutral',
              'md:btn-lg',
              'rounded-lg',
              notIncluded && is721 ? 'col-span-2' : 'col-span-6'
            ]"
            type="button"
            :disabled="detailAsset?.get(tokenId)?.['amount'] === 0n"
            @click="showSendModal([tokenId, detailAsset.get(tokenId)])"
          >
            Send
          </button>
        </div>

        <Accordion v-if="is1155" title="Item (1)">
          <ul class="text-sm md:text-base">
            <li class="flex items-center">
              <img
                :src="detailAsset && detailAsset?.get(tokenId)?.metadata['image']"
                class="flex-none w-14 h-14 mr-3 rounded-md md:mr-4"
                alt="nft"
              />
              <p class="text-md">
                {{ detailAsset && detailAsset?.get(tokenId)?.metadata['name'] }}
              </p>
              <p class="flex-none w-16 ml-auto text-right font-medium">
                <span class="text-xs mr-1">✕</span>
                {{ detailAsset && detailAsset?.get(tokenId)?.['amount'] }}
              </p>
            </li>
          </ul>
        </Accordion>
      </template>

      <!-- 공통: info -->
      <Accordion
        :owner="assetOwner"
        :-contract-address="nftContractAddress"
        :-token-id="Number(tokenId)"
        isInfo
      />
    </section>

    <AddModal @modal-ref="(ref) => (modalAddRef = ref.value)" :modalAddRef="modalAddRef" />
    <SendModal />
    <SendTokenModal
      @modal-ref="(ref) => (modalSendTokenRef = ref.value)"
      :modalSendTokenRef="modalSendTokenRef"
    />

    <ModalLoading
      @modal-ref="(ref) => (modalConvertRef = ref.value)"
      :is-radial="true"
      desc="It takes about 5 minutes. Once complete, you can check in TBA menu."
      progress-name="Convert"
    />
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, onUpdated, ref, watch } from 'vue'
import Accordion from '@/components/ui/Accordion.vue'
import ItemCard from '@/components/service/ItemCard.vue'
import { useRoute, useRouter } from 'vue-router'
import { setupAsset } from '@/setups/asset.composition'
import { useAssetStore } from '@/stores/asset.module.ts'
import { useAccountStore } from '@/stores/account.module.ts'
import { storeToRefs } from 'pinia'
import AddModal from '@/components/service/AddModal.vue'
import SendModal from '@/components/service/SendModal.vue'
import SendTokenModal from '@/components/service/SendTokenModal.vue'
import ModalLoading from '@/components/ui/ModalLoading.vue'
import { useModalStore } from '@/stores/modal.module'
import MetamaskService from '@/services/metamask.service'
import { DEPLOYED, IERC1155, IERC20, IERC721, IREG } from '@/types/abi'
import { Contract, ethers } from 'ethers'
import axios from 'axios'
import { copy, truncate } from '@/constant/utils'
import { setupModal } from '@/setups/modal.composition'

const route = useRoute()
const router = useRouter()

const assetStore = useAssetStore()
const accountStore = useAccountStore()
const modalStore = useModalStore()

const { setSendAsset } = assetStore

const { asset6551, detail1155Asset, detail721Asset, toAddress } = storeToRefs(assetStore)
const { isSigned } = storeToRefs(accountStore)

const { convert721to6551, checkOwner } = setupAsset()

const modalConvertRef = ref<HTMLDialogElement>()

const ercType = ref<number>(0)
const tokenId = ref<bigint>(0n)
const notIncluded = ref(true)

const tbaWalletAddress = ref<string>('')
const tbaAsset20 = ref<any>()
const tbaAsset721 = ref<any>()
const tbaAsset1155 = ref<any>()

const assetOwner = ref<string>('')
const nftContractAddress = DEPLOYED.nft

const scopeUrl = import.meta.env.VITE_BORACHAIN_EXPLORER_URL

const { showSendModal } = setupModal()

const is6551 = computed(() => ercType.value === 6551)
const is1155 = computed(() => ercType.value === 1155)
const is721 = computed(() => ercType.value === 721)

// const isConverted = async () => {
//   const wallet = new MetamaskService()
//   await wallet.init()

//   const provider = await wallet.getWeb3Provider()
//   const signer = await provider.getSigner()
//   const reg = new Contract(DEPLOYED.tReg, IREG, signer)
//   const is6551 = await reg.accountsOf(DEPLOYED.nft, tokenId.value)

//   return is6551.length !== 0
// }

const detailAsset = computed(() => {
  return ercType.value === 721
    ? detail721Asset.value
    : ercType.value === 6551
    ? asset6551.value
    : detail1155Asset.value
})

const tbaAssetisEmpty = computed(
  () =>
    (tbaAsset721.value && tbaAsset721.value.size) === 0 &&
    tbaAsset1155.value &&
    tbaAsset1155.value.size === 0
)

const { check721Asset, check1155Asset } = setupAsset()

onMounted(async () => {
  ercType.value = route?.meta.type as number
  tokenId.value = BigInt(route?.params.id as string)

  // CHECK OWNER LOGIC
  const isOwner = await checkOwner(tokenId.value, ercType.value)
  !isOwner && router.replace('/')
})

onUpdated(() => (ercType.value = route?.meta.type as number))

watch(
  () => isSigned.value,
  (isSigned: boolean) => {
    return !isSigned && router.replace('/')
  },
  { immediate: true }
)

watch(
  () => ercType.value,
  async (ercType: number) => {
    if (ercType === 6551) {
      const wallet = new MetamaskService()
      await wallet.init()
      const provider = await wallet.getWeb3Provider()
      const signer = await provider.getSigner()

      const reg = new Contract(DEPLOYED.tReg, IREG, signer)
      const nft = new Contract(DEPLOYED.nft, IERC721, signer)
      const tkn = new Contract(DEPLOYED.tkn, IERC20, signer)

      assetOwner.value = await nft.ownerOf(tokenId.value)
      // const tbaWalletAddress = await reg.account(
      tbaWalletAddress.value = await reg.account(
        DEPLOYED.tAcc,
        Number(import.meta.env.VITE_BORACHAIN_CHAIN_ID),
        DEPLOYED.nft,
        tokenId.value,
        0n
      )

      const tknAmountWei = await tkn.balanceOf(tbaWalletAddress.value)
      const tknSymbol = await tkn.symbol()
      const tknDecimals = await tkn.decimals()
      const formatEtherAmount = ethers.formatEther(tknAmountWei)

      const result = await Promise.all([
        check721Asset(tbaWalletAddress.value),
        check1155Asset(tbaWalletAddress.value)
      ])

      const asset721 = result[0]['asset721']
      const asset1155 = result[1]

      tbaAsset20.value = [{ tknAmountWei, tknSymbol, tknDecimals, formatEtherAmount }]
      tbaAsset721.value = asset721
      tbaAsset1155.value = asset1155
    } else if (ercType === 721) {
      const wallet = new MetamaskService()
      await wallet.init()
      const provider = await wallet.getWeb3Provider()
      const signer = await provider.getSigner()

      const nft = new Contract(DEPLOYED.nft, IERC721, signer)
      assetOwner.value = await nft.ownerOf(tokenId.value)
      const uri = await nft.tokenURI(BigInt(tokenId.value))
      const metadata = await axios.get(uri)

      detail721Asset.value.set(tokenId.value, { metadata: { ...metadata.data, type: 721 } })
    } else if (ercType === 1155) {
      const wallet = new MetamaskService()
      await wallet.init()
      const provider = await wallet.getWeb3Provider()
      const signer = await provider.getSigner()

      const mts = new Contract(DEPLOYED.mts, IERC1155, signer)

      const uri = await mts.uri(BigInt(tokenId.value))
      const metadata = await axios.get(uri)
      const amount = await mts.balanceOf(signer.getAddress(), tokenId.value)

      detail1155Asset.value.set(tokenId.value, {
        metadata: { ...metadata.data, type: 1155 },
        amount
      })
    }
  },
  { immediate: true }
)

const modalSendTokenRef = ref<HTMLDialogElement>()
</script>
