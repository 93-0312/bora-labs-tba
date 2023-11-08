<template>
  <main class="px-5 md:px-7">
    <section
      class="relative rounded-md bg-neutral-content -mx-5 py-8 px-5 text-left md:-mx-7 md:py-10 md:px-7"
    >
      <div
        class="grid gap-5 items-center w-full max-w-[1200px] mx-auto md:grid-cols-[3fr_1fr] md:bg-transparent"
      >
        <div>
          <h1 class="text-3xl font-bold rounded-sm md:text-4xl lg:text-[54px]">
            WHAT is
            <a href="https://eips.ethereum.org/EIPS/eip-6551" target="_blank" class="text-highlight"
              >TBA</a
            >?
          </h1>
          <p
            class="bg-highlight relative z-[1] inline-block max-w-[80%] mt-3 py-0.5 px-2 text-sm font-medium md:max-w-full md:text-base md:mt-6 lg:mt-8 lg:text-lg"
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
            class="opacity-80 relative inline-block mt-2 py-2 pr-2 text-xs leading-tight md:mt-6 md:py-0 md:pr-0 md:text-[14px] lg:mt-6 lg:text-base"
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
          width="300"
          height="298"
          class="absolute top-3 right-3 w-[18%] h-auto md:block md:relative md:w-[90%] md:top-0 md:right-0"
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
          type="button"
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
                  alt="token"
                  width="20"
                  height="20"
                  class="inline-block w-4 h-auto -mt-0.5 md:w-5 md:mr-1"
                />
                ERC-6551
              </dt>
              <dd class="w-[70%] mb-5 md:w-[80%]">
                Tokens and NFTs can be stored in an ERC-6551 wallet.
              </dd>
              <dt
                class="shrink-0 w-[30%] pr-1 text-md font-medium text-neutral md:w-[20%] md:text-lg"
              >
                <img
                  :src="icToken"
                  alt="token"
                  width="20"
                  height="20"
                  class="inline-block w-4 h-auto -mt-0.5 md:w-5 md:mr-1"
                />
                ERC-721
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
                  alt="token"
                  width="20"
                  height="20"
                  class="inline-block w-4 h-auto -mt-0.5 md:w-5 md:mr-1"
                />
                ERC-1155
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

  <!-- modal -->
  <SendModal />
  <AddModal />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AddModal from '@/components/service/AddModal.vue';
import ItemList from '@/components/service/ItemList.vue';
import SendModal from '@/components/service/SendModal.vue';
import icToken from '@/assets/ic-token.svg';

const isAbout = ref(true);
</script>
