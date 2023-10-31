<template>
  <section
    v-if="!hasAsset || !isSigned"
    class="flex flex-col empty text-center font-medium my-10 md:my-24"
  >
    <span>There is no NFT.</span>
  </section>

  <section v-else>
    <swiper
      :modules="modules"
      :slides-per-view="1.2"
      :space-between="12"
      :pagination="{ clickable: true, el: '.swiper-custom-pagination' }"
      :navigation="{
        nextEl: '.button-next',
        prevEl: '.button-prev'
      }"
      :loop="true"
    >
      <swiper-slide
        v-for="asset in asset6551"
        :key="Number(asset[0])"
        class="p-7 bg-[#1c235d] rounded-lg md:p-5"
      >
        <div class="grid grid-cols-1 gap-7 md:grid-cols-2 md:pr-20 md:gap-10">
          <a :href="`/tba/6551/${Number(asset[0])}`">
            <img
              :src="asset[1]?.metadata.image"
              :alt="asset[1]?.metadata.name"
              class="w-full h-auto rounded-md"
            />
          </a>
          <div class="flex flex-col justify-center items-start text-base-100 z-20">
            <span
              class="inline-flex items-center justify-center px-2 py-1 bg-warning rounded-lg text-neutral text-xs font-medium md:px-2.5 md:py-1.5 md:text-sm"
              >ERC-6551</span
            >
            <p class="mt-1 font-bold text-2xl md:mt-2 md:text-4xl">{{ asset[1]?.metadata.name }}</p>
            <p class="flex items-center mt-3 text-sm md:text-md">
              {{ truncate(asset[1]?.metadata.walletAddress) }}
              <button
                class="p-1.5 rounded-lg md:ml-1.5 md:p-2 hover:bg-base-100/20"
                type="button"
                aria-label="copy"
                @click="copy(asset[1]?.metadata.walletAddress), changeIcon()"
              >
                <!-- prettier-ignore -->
                <svg v-if="isCopy" width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4 h-auto md:w-5">
                  <path d="M4.79175 17.7502C4.37508 17.7502 4.02091 17.6043 3.72925 17.3127C3.43758 17.021 3.29175 16.6668 3.29175 16.2502V5.66683H4.54175V16.2502C4.54175 16.3196 4.56591 16.3785 4.61425 16.4268C4.66314 16.4757 4.7223 16.5002 4.79175 16.5002H12.8751V17.7502H4.79175ZM7.70841 14.8335C7.29175 14.8335 6.93758 14.6877 6.64591 14.396C6.35425 14.1043 6.20841 13.7502 6.20841 13.3335V3.85433C6.20841 3.42377 6.35425 3.06266 6.64591 2.771C6.93758 2.47933 7.29175 2.3335 7.70841 2.3335H14.6876C15.1181 2.3335 15.4792 2.47933 15.7709 2.771C16.0626 3.06266 16.2084 3.42377 16.2084 3.85433V13.3335C16.2084 13.7502 16.0626 14.1043 15.7709 14.396C15.4792 14.6877 15.1181 14.8335 14.6876 14.8335H7.70841ZM7.70841 13.5835H14.6876C14.757 13.5835 14.8195 13.5591 14.8751 13.5102C14.9306 13.4618 14.9584 13.4029 14.9584 13.3335V3.85433C14.9584 3.78488 14.9306 3.72239 14.8751 3.66683C14.8195 3.61127 14.757 3.5835 14.6876 3.5835H7.70841C7.63897 3.5835 7.58008 3.61127 7.53175 3.66683C7.48286 3.72239 7.45841 3.78488 7.45841 3.85433V13.3335C7.45841 13.4029 7.48286 13.4618 7.53175 13.5102C7.58008 13.5591 7.63897 13.5835 7.70841 13.5835Z" fill="currentColor" />
                </svg>
                <!-- prettier-ignore -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" class="w-4 h-auto md:w-5">
                  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M464 128L240 384l-96-96"></path>
                  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M144 384l-96-96"></path>
                  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 128L232 284"></path>
                </svg>
              </button>
            </p>
            <p class="text-base-100/70 text-sm md:text-md">Bora Testnet</p>
            <div class="grid grid-cols-7 gap-2 w-full mt-5">
              <button
                class="min-h-0 h-9 col-span-4 btn btn-primary rounded-lg text-[11px] md:h-12 md:text-base"
                type="button"
                @click="
                  showAddModal(asset[1]?.metadata.walletAddress)
                  // setToAddress(asset[1]?.metadata.walletAddress)
                "
              >
                Add NFT
              </button>
              <button
                class="min-h-0 h-9 col-span-3 btn rounded-lg text-[11px] md:h-12 md:text-base"
                type="button"
                @click="showSendModal(asset)"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        <div
          class="swiper-button hidden absolute w-full h-12 -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2"
        >
          <button
            type="button"
            class="button-prev btn btn-circle btn-sm absolute left-1 mr-2 bg-base-100/60 border-none md:btn-md md:left-3"
            aria-label="previous"
          >
            ❮
          </button>
          <button
            type="button"
            class="button-next btn btn-circle btn-sm absolute right-1 bg-base-100/60 border-none md:btn-md md:right-3"
            aria-label="next"
          >
            ❯
          </button>
        </div>
      </swiper-slide>

      <swiper-slide
        v-for="asset in asset721"
        :key="Number(asset[0])"
        class="p-7 bg-[#1c235d] rounded-lg md:p-5"
      >
        <div class="grid grid-cols-1 gap-7 md:grid-cols-2 md:pr-20 md:gap-10">
          <a :href="`/tba/721/${Number(asset[0])}`">
            <img
              :src="asset[1]?.metadata.image"
              :alt="asset[1]?.metadata.name"
              class="w-full h-auto rounded-md"
            />
          </a>
          <div class="flex flex-col justify-center items-start text-base-100">
            <span
              class="inline-flex items-center justify-center px-2 py-1 bg-warning rounded-lg text-neutral text-xs font-medium md:px-2.5 md:py-1.5 md:text-sm"
              >ERC-721</span
            >
            <p class="mt-1 font-bold text-2xl md:mt-2 md:text-4xl">{{ asset[1]?.metadata.name }}</p>
            <p class="text-base-100/70 text-sm md:text-md">Bora Testnet</p>
            <div class="grid grid-cols-7 gap-2 w-full mt-8">
              <button
                class="min-h-0 h-9 col-span-4 btn btn-accent rounded-lg text-[11px] md:h-12 md:text-base"
                type="button"
                @click="convert721to6551(asset[0])"
              >
                Convert to TBA
              </button>
              <button
                class="min-h-0 h-9 col-span-3 btn rounded-lg text-[11px] md:h-12 md:text-base"
                type="button"
                @click="showSendModal(asset)"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        <div
          class="swiper-button hidden absolute w-full h-12 -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2"
        >
          <button
            type="button"
            class="button-prev btn btn-circle btn-sm absolute left-1 mr-2 bg-base-100/60 border-none md:btn-md md:left-3"
            aria-label="previous"
          >
            ❮
          </button>
          <button
            type="button"
            class="button-next btn btn-circle btn-sm absolute right-1 bg-base-100/60 border-none md:btn-md md:right-3"
            aria-label="next"
          >
            ❯
          </button>
        </div>
      </swiper-slide>
    </swiper>

    <div class="swiper-custom-pagination" />

    <ul class="grid grid-cols-2 gap-3 mt-20 md:grid-cols-5 md:gap-5">
      <!-- 1155 -->
      <li v-for="asset in asset1155" :key="Number(asset[0])">
        <ItemCard
          :ercType="asset[1]?.metadata.type"
          badge-name="ERC-1155"
          :card-name="asset[1]?.metadata.name"
          :img-src="asset[1]?.metadata.image"
          :id="Number(asset[0])"
        >
          <div class="pt-4 pb-2 md:pt-5 md:pb-3">
            <button
              class="min-h-0 h-9 btn btn-neutral btn-outline w-full rounded-lg text-[11px] md:btn-base md:h-12 md:text-base"
              type="button"
              @click="showSendModal(asset)"
            >
              Send
            </button>
          </div>
        </ItemCard>
      </li>
    </ul>
  </section>

  <!-- modal: add nft -->
  <SendModal />
  <AddModal @modal-ref="(ref) => setAddModalRef(ref.value)" :modalAddRef="addModalRef" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, Mousewheel } from 'swiper/modules'
import ItemCard from '@/components/service/ItemCard.vue'
import { useAssetStore } from '@/stores/asset.module.ts'
import { storeToRefs } from 'pinia'

import { useAccountStore } from '@/stores/account.module.ts'
import { setupAsset } from '@/setups/asset.composition'
import { setupModal } from '@/setups/modal.composition'
import { copy, truncate } from '@/constant/utils'

const accountStore = useAccountStore()
const assetStore = useAssetStore()

const { convert721to6551 } = setupAsset()
const { isSigned } = storeToRefs(accountStore)
const { hasAsset, asset721, asset1155, asset6551 } = storeToRefs(assetStore)
const { showSendModal, showAddModal } = setupModal()
const { setToAddress } = assetStore
const modules = [Pagination, Navigation, Mousewheel]

const isCopy = ref(true)

const changeIcon = () => {
  isCopy.value = false
  setTimeout(() => (isCopy.value = true), 3000)
}
</script>
