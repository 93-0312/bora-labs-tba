<template>
  <main class="px-5 pt-8 md:px-7">
    <section
      class="w-full max-w-[1200px] mx-auto bg-neutral-content p-3 rounded-xl bg-no-repeat bg-[top_65%_center] bg-[length:auto_135%] md:p-12 md:bg-[top_60%_right_-10%] md:bg-[length:auto_155%]"
      :style="{ backgroundImage: 'url(' + bgImg + ')' }"
    >
      <div class="p-4 bg-base-100/60 backdrop-blur-sm rounded-lg md:p-8">
        <h1 class="text-3xl font-bold md:text-4xl">WHAT IS TBA?</h1>
        <p class="py-4 text-sm md:text-lg">
          TBA, or a token-bound account, allows you to use NFTs like wallets.
        </p>
        <ul class="text-secondary-focus font-medium text-xs md:text-base">
          <li>
            NFTs integrated with an ERC-6551 token can hold multiple tokens and NFTs, similar to
            wallets.
          </li>
          <li>
            Using ERC-6551 NFTs for game accounts is useful when transferring wallets or creating
            new accounts.
          </li>
        </ul>
      </div>

      <!-- Create wallet -->
      <button
        v-show="!isSigned || !hasAsset"
        class="flex btn btn-sm btn-primary mt-4 ml-auto rounded-lg text-xs text-base-100 md:btn-md md:mt-9 md:text-base"
        type="button"
        @click="createWallet()"
      >
        <!-- prettier-ignore -->
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" class="w-4 h-auto md:w-5">
          <path d="M24 40.0001L21.9 37.8501L34.25 25.5001H8V22.5001H34.25L21.9 10.1501L24 8.00012L40 24.0001L24 40.0001Z" fill="white"/>
        </svg>
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
                Tokens and NFTs can be stored in an ERC-6551 wallet.
              </dd>
              <dt
                class="shrink-0 w-[30%] pr-1 text-md font-medium text-neutral md:w-[20%] md:text-lg"
              >
                <img :src="icToken" class="inline-block w-4 h-auto -mt-0.5 md:w-6 md:mr-1" />ERC-721
              </dt>
              <dd class="w-[70%] mb-5 md:w-[80%]">
                This NFT can be converted with ERC-6551.
                <br />When minting at BORA LABS, you can receive two ERC-721 tokens.
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
                This NFT can not be converted with ERC-6551.
                <br />You can send ERC-1155 to other wallet address or ERC-6551.
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
import bgImg from '@/assets/bg-6551.webp'
import icToken from '@/assets/ic-token.webp'

const assetStore = useAssetStore()
const accountStore = useAccountStore()

const { hasAsset } = storeToRefs(assetStore)
const { isSigned } = storeToRefs(accountStore)

const { createWallet } = setupAsset()

const isAbout = ref(true)

const enter = (el: HTMLDivElement) => {
  el.style.height = el.scrollHeight + 'px'
}
</script>
