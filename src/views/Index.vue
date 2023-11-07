<template>
  <main class="px-5 md:px-7">
    <!-- <section
      class="relative grid items-center w-full max-w-[1200px] mx-auto rounded-md text-left md:grid-cols-[3fr_1fr] md:bg-transparent"
    >
      <div>
        <h1 class="text-3xl font-bold rounded-sm md:text-5xl lg:text-[66px]">
          WHAT is
          <a href="https://eips.ethereum.org/EIPS/eip-6551" target="_blank" class="text-highlight"
            >TBA</a
          >?
        </h1>
        <p
          class="bg-highlight relative inline-block max-w-[80%] mt-3 py-0.5 px-2 text-sm font-medium md:max-w-full md:text-base md:mt-6 lg:mt-8 lg:text-lg"
        >
          <a
            href="https://eips.ethereum.org/EIPS/eip-6551"
            target="_blank"
            class="underline font-bold"
            >TBA,</a
          >
          or a token-bound account, allows you to use NFTs like wallets.
        </p>
        <ul
          class="opacity-80 inline-block mt-2 py-2 pr-2 text-xs leading-tight bg-base-100/80 rounded-sm backdrop-blur-sm md:mt-6 md:py-0 md:pr-0 md:text-[14px] md:bg-transparent lg:mt-6 lg:text-base"
        >
          <li>
            NFTs integrated with an ERC-6551 token can hold multiple tokens and NFTs, similar to
            wallets.
          </li>
          <li class="mt-2.5 lg:mt-1">
            Using ERC-6551 NFTs for game accounts is useful when transferring wallets or creating
            new accounts.
          </li>
        </ul>
      </div>

      <img
        src="@/assets/bg-tba.webp"
        alt="bg"
        class="absolute -top-4 right-0 -z-10 w-[30%] h-auto md:block md:relative md:w-full md:top-3"
      />
    </section> -->

    <section class="relative rounded-md bg-neutral-content -mx-7 py-8 px-7 text-left md:py-10">
      <div
        class="grid items-center w-full max-w-[1200px] mx-auto md:grid-cols-[3fr_1fr] md:bg-transparent"
      >
        <div>
          <h1 class="text-3xl font-bold rounded-sm md:text-5xl lg:text-6xl">
            WHAT is
            <a href="https://eips.ethereum.org/EIPS/eip-6551" target="_blank" class="text-highlight"
              >TBA</a
            >?
          </h1>
          <p
            class="bg-highlight relative z-10 inline-block max-w-[80%] mt-3 py-0.5 px-2 text-sm font-medium md:max-w-full md:text-base md:mt-6 lg:mt-8 lg:text-lg"
          >
            <a
              href="https://eips.ethereum.org/EIPS/eip-6551"
              target="_blank"
              class="underline font-bold"
              >TBA,</a
            >
            or a token-bound account, allows you to use NFTs like wallets.
          </p>
          <ul
            class="opacity-80 relative inline-block z-[1] mt-2 py-2 pr-2 text-xs leading-tight md:mt-6 md:py-0 md:pr-0 md:text-[14px] lg:mt-6 lg:text-base"
          >
            <li>
              NFTs integrated with an ERC-6551 token can hold multiple tokens and NFTs, similar to
              wallets.
            </li>
            <li class="mt-2.5 lg:mt-1">
              Using ERC-6551 NFTs for game accounts is useful when transferring wallets or creating
              new accounts.
            </li>
          </ul>

          <!-- <button
          v-show="!isSigned || !hasAsset"
          class="inline-flex btn btn-sm btn-primary mt-3 justify-center rounded-sm text-xs text-base-100 md:btn-md md:mt-8 md:justify-start md:text-base lg:mt-12"
          type="button"
          @click="createWallet()"
        >
          Create Wallet
          prettier-ignore
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" class="w-4 h-auto md:w-5" >
            <path d="M24 40.0001L21.9 37.8501L34.25 25.5001H8V22.5001H34.25L21.9 10.1501L24 8.00012L40 24.0001L24 40.0001Z" fill="white" />
          </svg>
        </button> -->
        </div>

        <img
          src="@/assets/bg-tba.webp"
          alt="bg"
          class="absolute top-0 right-0 w-[25%] h-auto md:block md:relative md:w-full md:top-3"
        />
      </div>
    </section>

    <!-- My NFT -->
    <section class="w-full max-w-[1200px] mx-auto mt-8 md:mt-16">
      <h2 class="mb-4 text-3xl font-bold md:mb-6 md:text-4xl">My NFT</h2>

      <ItemList />
    </section>

    <!-- About NFT -->
    <section class="mt-10 bg-base-200 -mx-5 py-12 px-5 md:-mx-7 md:mt-12">
      <div
        class="relative w-full max-w-[1200px] mx-auto bg-base-100/80 rounded-sm border border-base-300"
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

  <!-- modal: add nft -->
  <SendModal />
  <AddModal />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { setupAsset } from '@/setups/asset.composition'
import { useAssetStore } from '@/stores/asset.module.ts'
import { useAccountStore } from '@/stores/account.module.ts'
import ItemList from '@/components/service/ItemList.vue'
import icToken from '@/assets/ic-token.webp'
import SendModal from '@/components/service/SendModal.vue'
import AddModal from '@/components/service/AddModal.vue'

const assetStore = useAssetStore()
const accountStore = useAccountStore()

const { hasAsset } = storeToRefs(assetStore)
const { isSigned } = storeToRefs(accountStore)

const { createWallet } = setupAsset()

const isAbout = ref(true)
</script>
