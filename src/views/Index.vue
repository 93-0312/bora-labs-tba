<template>
  <main class="px-5 pt-8 md:px-7">
    <section
      class="w-full max-w-[1200px] mx-auto bg-neutral-content px-5 py-6 rounded-xl bg-no-repeat bg-[center_right_50px] bg-[length:0] md:px-10 md:py-12 md:bg-[length:250px_auto]"
      :style="{ backgroundImage: 'url(' + bgImg + ')' }"
    >
      <h1 class="text-3xl font-bold md:text-4xl">WHAT IS TBA?</h1>
      <p class="py-4 text-sm md:text-lg">ERC-6551은 NFT를 지갑처럼 사용할 수 있는 기능입니다.</p>
      <ul class="text-xs md:text-base">
        <li>ERC-6551이 적용된 NFT는 지갑처럼 여러개의 토큰과 NFT를 넣을 수 있습니다.</li>
        <li>
          NFTs integrated with an ERC-6551 token can hold multiple tokens and NFTs, similar to
          wallets.
        </li>
        <li>
          Using ERC-6551 NFTs for game accounts is useful when transferring wallets or creating new
          accounts.
        </li>
      </ul>

      <!-- Create wallet -->
      <button
        v-show="!isSigned || !hasAsset"
        class="btn btn-sm btn-neutral mt-6 rounded-lg text-xs md:btn-md md:mt-9 md:text-base"
        type="button"
        @click="createWallet()"
      >
        Create Wallet
      </button>
    </section>

    <!-- My NFT -->
    <section class="w-full max-w-[1200px] mx-auto mt-10 md:mt-12">
      <h2 class="mb-4 text-3xl font-bold md:mb-6 md:text-4xl">My NFT</h2>

      <ItemList />
    </section>

    <!-- About NFT -->
    <section class="mt-10 bg-base-200 -mx-5 py-12 px-5 md:-mx-7 md:mt-12">
      <div
        class="relative w-full max-w-[1200px] mx-auto bg-base-100/80 rounded-xl border border-base-300"
      >
        <button
          class="flex items-center justify-between w-full p-5 text-lg font-medium md:p-8 md:text-2xl"
          @click="isAbout = !isAbout"
        >
          About NFT
          <span :class="['arrow', isAbout ? 'arrow-up' : '']" />
        </button>

        <transition name="show-down">
          <div v-if="isAbout">
            <dl
              class="flex flex-wrap w-full p-5 py-7 border-t border-base-200 text-xs text-neutral/70 md:p-10 md:px-12 md:text-base"
            >
              <dt
                class="shrink-0 w-[30%] pr-1 text-md font-medium text-neutral md:w-[20%] md:text-lg"
              >
                <img
                  :src="icToken"
                  class="inline-block w-4 h-auto -mt-0.5 md:w-6 md:mr-1"
                />ERC-6551
              </dt>
              <dd class="w-[70%] mb-5 md:w-[80%]">
                지갑처럼 Token과 NFT를 보관할 수 있습니다.<br />보라랩스에서 Minting 시, 6551 NFT에
                bGas와 Token 2가지를 발급해줍니다.
              </dd>
              <dt
                class="shrink-0 w-[30%] pr-1 text-md font-medium text-neutral md:w-[20%] md:text-lg"
              >
                <img :src="icToken" class="inline-block w-4 h-auto -mt-0.5 md:w-6 md:mr-1" />ERC-721
              </dt>
              <dd class="w-[70%] mb-5 md:w-[80%]">
                6551 NFT로 변환 가능한 NFT입니다.<br />보라 테스트넷에서 721 NFT를 6551 NFT로 변환할
                수 있으며, 다른 지갑 주소로 전송도 가능합니다.
              </dd>
              <dt
                class="shrink-0 w-[30%] pr-1 text-md font-medium text-neutral md:w-[20%] md:text-lg"
              >
                <img
                  :src="icToken"
                  class="inline-block w-4 h-auto -mt-0.5 md:w-6 md:mr-1"
                />ERC-1155
              </dt>
              <dd class="w-[70%] md:w-[80%]">
                6551 NFT로 변환이 불가한 NFT입니다.<br />1155 NFT를 다른 지갑 주소 혹은 6551로
                전송할 수 있습니다.
              </dd>
            </dl>
          </div>
        </transition>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { setupAsset } from '@/setups/asset.composition'
import { useAssetStore } from '@/stores/asset.module.ts'
import { useAccountStore } from '@/stores/account.module.ts'
import ItemList from '@/components/service/ItemList.vue'
import Toast from '@/components/ui/Toast.vue'
import { useModalStore } from '@/stores/modal.module'
import bgImg from '@/assets/bg-6551.webp'
import icBora from '@/assets/ic-bora.webp'
import icToken from '@/assets/ic-token.webp'

const assetStore = useAssetStore()
const accountStore = useAccountStore()

const { hasAsset } = storeToRefs(assetStore)
const { isSigned } = storeToRefs(accountStore)

const { createWallet } = setupAsset()

const isAbout = ref(false)

const enter = (el: HTMLDivElement) => {
  el.style.height = el.scrollHeight + 'px'
}
</script>
