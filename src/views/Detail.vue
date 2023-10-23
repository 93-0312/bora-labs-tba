<template>
  <main
    class="grid gap-9 w-full max-w-[1200px] mx-auto px-4 pt-4 pb-16 align-top md:px-7 md:pb-20 md:grid-cols-2 md:grid-rows-[auto_1fr] md:pt-8"
  >
    <section
      class="relative w-full max-w-lg mx-auto h-auto text-center md:max-w-[556px] md:row-start-1 md:row-span-2"
    >
      <img
        width="100"
        height="100"
        :src="detailAsset && detailAsset?.get(assetId)?.metadata['image']"
        class="w-full h-auto rounded-lg"
        alt="nft"
      />

      <!-- badge: 6551 -->
      <div
        v-if="is6551"
        class="absolute left-3 top-3 badge bg-black h-8 rounded-md text-xs shadow-sm md:text-sm"
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
        class="absolute left-3 top-3 badge bg-neutral-600 border-neutral-600 h-8 rounded-md text-xs shadow-sm md:text-sm"
      >
        {{ is1155 ? 'ERC-1155' : 'ERC-721' }}
      </p>

      <a
        href="#"
        target="_blank"
        class="btn btn-circle btn-outline w-[40px] h-[40px] min-h-0 mt-4 md:btn-md"
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
    </section>

    <section>
      <h2 class="text-3xl font-bold md:text-4xl">TBA Floral Neo #615</h2>

      <!-- erc-6551 -->
      <template v-if="is6551">
        <p
          class="inline-flex items-center mt-3 py-2 pl-4 bg-base-200 rounded-lg text-sm text-neutral-200 md:mt-4 md:text-lg"
        >
          0x2D12...34caB1
          <button class="px-3 hover:text-neutral-300" type="button" aria-label="copy">
            <!-- prettier-ignore -->
            <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
              <path d="M4.79175 17.7502C4.37508 17.7502 4.02091 17.6043 3.72925 17.3127C3.43758 17.021 3.29175 16.6668 3.29175 16.2502V5.66683H4.54175V16.2502C4.54175 16.3196 4.56591 16.3785 4.61425 16.4268C4.66314 16.4757 4.7223 16.5002 4.79175 16.5002H12.8751V17.7502H4.79175ZM7.70841 14.8335C7.29175 14.8335 6.93758 14.6877 6.64591 14.396C6.35425 14.1043 6.20841 13.7502 6.20841 13.3335V3.85433C6.20841 3.42377 6.35425 3.06266 6.64591 2.771C6.93758 2.47933 7.29175 2.3335 7.70841 2.3335H14.6876C15.1181 2.3335 15.4792 2.47933 15.7709 2.771C16.0626 3.06266 16.2084 3.42377 16.2084 3.85433V13.3335C16.2084 13.7502 16.0626 14.1043 15.7709 14.396C15.4792 14.6877 15.1181 14.8335 14.6876 14.8335H7.70841ZM7.70841 13.5835H14.6876C14.757 13.5835 14.8195 13.5591 14.8751 13.5102C14.9306 13.4618 14.9584 13.4029 14.9584 13.3335V3.85433C14.9584 3.78488 14.9306 3.72239 14.8751 3.66683C14.8195 3.61127 14.757 3.5835 14.6876 3.5835H7.70841C7.63897 3.5835 7.58008 3.61127 7.53175 3.66683C7.48286 3.72239 7.45841 3.78488 7.45841 3.85433V13.3335C7.45841 13.4029 7.48286 13.4618 7.53175 13.5102C7.58008 13.5591 7.63897 13.5835 7.70841 13.5835Z" fill="currentColor" />
            </svg>
          </button>
        </p>

        <Accordion title="NFT (5)">
          <p v-if="isEmpty" class="flex flex-col empty empty-sm py-2 text-sm text-center">
            There is no NFT.
          </p>

          <template v-else>
            <ul class="grid grid-cols-3 gap-x-2.5 gap-y-4 md:grid-cols-4 md:gap-x-3">
              <li v-for="i in 7" :key="i" class="overflow-hidden rounded">
                <ItemCard
                  :is-small="true"
                  :has-badge="false"
                  :show-network="false"
                  img-src="https://gfile.boraportal.com/cdn-cgi/image/width=300,format=webp/1022000005/3/10393.gif"
                >
                  <button
                    class="btn btn-white btn-sm w-full p-1 rounded-t-none text-xs md:text-sm"
                    type="button"
                    @click="showSendModal(asset)"
                  >
                    Send
                    <!-- prettier-ignore -->
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 -ml-1">
                      <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </ItemCard>
              </li>
            </ul>

            <button
              class="btn btn-primary btn-sm block mt-3 ml-auto md:btn-md md:mt-4"
              type="button"
            >
              + Add NFT
            </button>
          </template>
        </Accordion>

        <Accordion title="Token (2)">
          <div v-for="i in 3" :key="i" class="flex justify-between items-center mb-5 last:mb-0">
            <div class="flex items-center mr-4 font-medium text-md">
              <img
                src="https://static.boraportal.com/logo/coins/mainnet/token-ic-bid.svg"
                alt="BID"
                class="w-8 h-8 mr-2"
              />
              <span>BID</span>
            </div>

            <p class="ml-auto text-sm md:text-base">12345.0000</p>

            <button
              class="btn btn-white btn-circle btn-sm min-h-0 ml-3 text-right md:ml-4"
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
            v-if="notIncluded"
            class="col-span-4 btn btn-secondary md:btn-lg"
            type="button"
            @click="modalConvertRef?.showModal(), convert721to6551(101n)"
          >
            Convert to TBA
          </button>
          <button
            :class="['btn', 'btn-white', 'md:btn-lg', notIncluded ? 'col-span-2' : 'col-span-6']"
            type="button"
          >
            Send
          </button>
        </div>

        <Accordion v-if="is1155" title="Item (5)">
          <ul class="text-sm md:text-base">
            <li class="flex items-center">
              <img
                src="https://gfile.boraportal.com/cdn-cgi/image/width=540,format=webp/1024000001/2/100109992.png"
                class="flex-none w-12 h-12 mr-3 rounded-md"
                alt=""
              />
              <p class="text-neutral-300">item name</p>
              <p class="flex-none w-16 ml-auto text-right"><span class="text-xs mr-1">✕</span>5</p>
            </li>
          </ul>
        </Accordion>
      </template>

      <!-- 공통: info -->
      <Accordion isInfo />
    </section>

    <AddModal @modal-ref="(ref) => (modalAddRef = ref.value)" :modalAddRef="modalAddRef" />
    <SendModal @modal-ref="(ref) => (modalSendRef = ref.value)" :modalSendRef="modalSendRef" />
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
import { computed, onMounted, ref, watch } from 'vue'
import Accordion from '@/components/ui/Accordion.vue'
import ItemCard from '@/components/service/ItemCard.vue'
import ModalLayout from '@/components/ui/ModalLayout.vue'
import { useRoute, useRouter } from 'vue-router'
import { setupAccount } from '@/setups/account.composition'
import { setupAsset } from '@/setups/asset.composition'
import { useAssetStore, ercAsset } from '@/stores/asset.module.ts'
import { useAccountStore } from '@/stores/account.module.ts'
import { storeToRefs } from 'pinia'
import AddModal from '@/components/service/AddModal.vue'
import SendModal from '@/components/service/SendModal.vue'
import SendTokenModal from '@/components/service/SendTokenModal.vue'
import ModalLoading from '@/components/ui/ModalLoading.vue'

const route = useRoute()
const router = useRouter()
const assetStore = useAssetStore()
const accountStore = useAccountStore()

const { setSendAsset } = assetStore
const { asset721, asset1155, asset6551 } = storeToRefs(assetStore)
const { isSigned } = storeToRefs(accountStore)

const { convert721to6551, checkOwner } = setupAsset()

const modalAddRef = ref<HTMLDialogElement>()
const modalSendRef = ref<HTMLDialogElement>()
const modalConvertRef = ref<HTMLDialogElement>()

const ercType = ref<number>(721)
const assetId = ref<bigint>()

const is6551 = computed(() => ercType.value === 6551)
const is1155 = computed(() => ercType.value === 1155)
// const is721 = computed(() => ercType.value === 721)

const isEmpty = ref(false)
const notIncluded = ref(true)
const isInputError = ref(true)

const detailAsset = computed(() => {
  return ercType.value === 721
    ? asset721.value
    : ercType.value === 6551
    ? asset6551.value
    : asset1155.value
})

const showSendModal = (sendAsset: any) => {
  modalSendRef.value?.showModal()
  setSendAsset(sendAsset)
}

onMounted(async () => {
  ercType.value = route?.meta.type as number
  assetId.value = BigInt(route?.params.id as string)

  const isOwner = await checkOwner(assetId.value, ercType.value)

  !isOwner && router.replace('/')
})

const test = (data: any) => console.log({ data })

watch(
  () => isSigned.value,
  (isSigned: boolean) => {
    return !isSigned && router.replace('/')
  },
  { immediate: true }
)

const modalSendTokenRef = ref<HTMLDialogElement>()
</script>
