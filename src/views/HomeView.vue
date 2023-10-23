<template>
  <main class="w-full max-w-[1200px] mx-auto px-5 pt-8 pb-16 md:px-7 md:pb-20">
    <section class="overflow-hidden relative">
      <h1 class="text-3xl font-bold md:text-4xl">WHAT IS TBA?</h1>
      <p class="py-4 text-sm md:text-lg">ERC-6551은 NFT를 지갑처럼 사용할 수 있는 기능입니다.</p>
      <ul class="text-xs text-neutral-400 md:text-base">
        <li>ERC-6551이 적용된 NFT는 지갑처럼 여러개의 토큰과 NFT를 넣을 수 있습니다.</li>
        <li>
          ERC-6551 NFT를 게임 계정으로 이용하면, 지갑 이동이나 새로운 계정을 생성할 때 유용합니다.
        </li>
      </ul>

      <!-- Like -->
      <label class="swap absolute right-1 top-1" aria-label="heart">
        <input type="checkbox" />
        <div class="swap-on">
          <!-- prettier-ignore -->
          <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 md:w-9 md:h-9">
            <path d="M3.48877 6.00387C2.76311 7.24787 2.52428 8.97403 2.97014 10.7575C3.13059 11.3992 3.59703 12.2243 4.33627 13.174C5.06116 14.1052 5.9864 15.0787 6.96636 16.0127C8.90945 17.8648 11.0006 19.4985 12 20.254C12.5679 19.8247 13.4884 19.1118 14.5338 18.2364C14.7154 18.0844 14.9444 18 15.1812 18H15.2755C16.1864 18 16.6096 19.1044 15.9123 19.6905C14.7762 20.6456 13.7775 21.418 13.181 21.8683C12.4803 22.3974 11.5197 22.3974 10.819 21.8683C9.80433 21.1022 7.62583 19.4042 5.58648 17.4605C4.56733 16.4891 3.56585 15.4402 2.75806 14.4025C1.96461 13.3832 1.2924 12.2927 1.02986 11.2425C0.475714 9.02597 0.736884 6.75213 1.76121 4.99613C2.80291 3.21035 4.62017 2 6.99998 2C9.59038 2 11.0969 3.95772 11.8944 5.55278C11.9307 5.62535 11.9659 5.69784 12 5.77011C12.0341 5.69784 12.0693 5.62535 12.1056 5.55279C12.9031 3.95772 14.4096 2 17 2C19.3798 2 21.1971 3.21035 22.2388 4.99613C23.1118 6.49271 23.4305 8.36544 23.1625 10.2583C23.1008 10.6946 22.7141 11 22.2735 11C21.6284 11 21.169 10.3586 21.2387 9.71731C21.3774 8.44008 21.1371 7.07683 20.5112 6.00387C19.8029 4.78965 18.6202 4 17 4C15.5904 4 14.5969 5.04228 13.8944 6.44721C13.5569 7.12228 13.3275 7.80745 13.1823 8.33015C13.1102 8.58959 13.0602 8.80435 13.0286 8.95172C12.9167 9.47392 12.3143 9.5 12 9.5C11.6857 9.5 11.0823 9.46905 10.9714 8.95172C10.9398 8.80436 10.8898 8.58959 10.8177 8.33015C10.6725 7.80745 10.4431 7.12229 10.1056 6.44722C9.40308 5.04228 8.40956 4 6.99998 4C5.37979 4 4.19706 4.78965 3.48877 6.00387Z" fill="hsl(var(--pf))"/>
            <path d="M15.9191 9.60608C15.7658 9.24819 15.4186 9.01187 15.0294 9.00043C14.6402 8.98899 14.2797 9.20452 14.1056 9.55279L12.382 13H9C8.44771 13 8 13.4477 8 14C8 14.5523 8.44771 15 9 15H13C13.3788 15 13.725 14.786 13.8944 14.4472L14.9302 12.3757L17.0808 17.3939C17.2215 17.7221 17.5265 17.9504 17.881 17.9929C18.2355 18.0354 18.5858 17.8856 18.8 17.6L21.5 14H23C23.5523 14 24 13.5523 24 13C24 12.4477 23.5523 12 23 12H21C20.6852 12 20.3888 12.1482 20.2 12.4L18.2378 15.0163L15.9191 9.60608Z" fill="hsl(var(--pf))"/>
          </svg>
        </div>
        <div class="swap-off">
          <!-- prettier-ignore -->
          <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 md:w-9 md:h-9">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.48877 6.00387C2.76311 7.24787 2.52428 8.97403 2.97014 10.7575C3.13059 11.3992 3.59703 12.2243 4.33627 13.174C5.06116 14.1052 5.9864 15.0787 6.96636 16.0127C8.90945 17.8648 11.0006 19.4985 12 20.254C12.9994 19.4985 15.0905 17.8648 17.0336 16.0127C18.0136 15.0787 18.9388 14.1052 19.6637 13.174C20.403 12.2243 20.8694 11.3992 21.0299 10.7575C21.4757 8.97403 21.2369 7.24788 20.5112 6.00387C19.8029 4.78965 18.6202 4 17 4C15.5904 4 14.5969 5.04228 13.8944 6.44721C13.5569 7.12228 13.3275 7.80745 13.1823 8.33015C13.1102 8.58959 13.0602 8.80435 13.0286 8.95172C12.9167 9.47392 12.3143 9.5 12 9.5C11.6857 9.5 11.0823 9.46905 10.9714 8.95172C10.9398 8.80436 10.8898 8.58959 10.8177 8.33015C10.6725 7.80745 10.4431 7.12229 10.1056 6.44722C9.40308 5.04228 8.40956 4 6.99998 4C5.37979 4 4.19706 4.78965 3.48877 6.00387ZM12 5.77011C12.0341 5.69784 12.0693 5.62535 12.1056 5.55279C12.9031 3.95772 14.4096 2 17 2C19.3798 2 21.1971 3.21035 22.2388 4.99613C23.2631 6.75212 23.5243 9.02597 22.9701 11.2425C22.7076 12.2927 22.0354 13.3832 21.2419 14.4025C20.4341 15.4402 19.4327 16.4891 18.4135 17.4605C16.3742 19.4042 14.1957 21.1022 13.181 21.8683C12.4803 22.3974 11.5197 22.3974 10.819 21.8683C9.80433 21.1022 7.62583 19.4042 5.58648 17.4605C4.56733 16.4891 3.56586 15.4402 2.75806 14.4025C1.96461 13.3832 1.2924 12.2927 1.02986 11.2425C0.475714 9.02597 0.736884 6.75213 1.76121 4.99613C2.80291 3.21035 4.62017 2 6.99998 2C9.59038 2 11.0969 3.95772 11.8944 5.55278C11.9307 5.62535 11.9659 5.69784 12 5.77011Z" fill="currentColor"/>
          </svg>
        </div>
      </label>

      <div @click="tbaMint">tbaMint</div>
      <div @click="checkAsset">check721Asset</div>
      <div>isSigned:{{ isSigned }}</div>
      <!-- Create wallet -->

      <button
        v-show="!isSigned || !hasAsset"
        class="btn btn-sm btn-accent mt-6 md:btn-md md:mt-9"
        type="button"
        @click="createWallet()"
      >
        Create Wallet
      </button>
    </section>

    <!-- My NFT -->
    <section class="mt-8 pt-8 border-t border-dashed border-neutral-500">
      <h2 class="mb-4 text-3xl font-bold md:mb-6 md:text-4xl">My NFT</h2>

      <ItemList />

      <!-- About NFT -->
      <div class="mt-10 md:mt-12">
        <button
          class="flex items-center justify-between w-full p-3 pr-5 border border-neutral-600 rounded-lg text-lg font-bold hover:border-neutral-500 md:p-4 md:text-xl"
          @click="isAbout = !isAbout"
        >
          About NFT
          <span :class="['arrow', isAbout ? 'arrow-up' : '']" />
        </button>

        <transition name="show-down">
          <dl v-if="isAbout" class="pt-5 px-4 text-sm text-neutral-400 md:text-base md:pt-6">
            <dt class="mb-1 text-base font-medium text-white md:text-lg">ERC-6551</dt>
            <dd>
              지갑처럼 Token과 NFT를 보관할 수 있습니다.<br />보라랩스에서 Minting 시, 6551 NFT에
              bGas와 Token 2가지를 발급해줍니다.
            </dd>
            <dt class="mt-5 mb-1 text-base font-medium text-white md:text-lg">ERC-721</dt>
            <dd>
              6551 NFT로 변환 가능한 NFT입니다.<br />보라 테스트넷에서 721 NFT를 6551 NFT로 변환할
              수 있으며, 다른 지갑 주소로 전송도 가능합니다.
            </dd>
            <dt class="mt-5 mb-1 text-base font-medium text-white md:text-lg">ERC-1155</dt>
            <dd>
              6551 NFT로 변환이 불가한 NFT입니다.<br />1155 NFT를 다른 지갑 주소 혹은 6551로 전송할
              수 있습니다.
            </dd>
          </dl>
        </transition>
      </div>
    </section>

    <!-- modal: minting -->
    <ModalLoading
      @modal-ref="(ref) => (modalStepRef = ref.value)"
      :is-step="true"
      :current-step="tbaMintStep"
      progress-name="Minting in progress"
      :desc="tbaMintDesc"
    />

    <!-- toast -->
    <Toast :showToast="false" msg="Mint Completed!" />
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { setupAccount } from '@/setups/account.composition'
import { setupAsset } from '@/setups/asset.composition'
import { useAssetStore } from '@/stores/asset.module.ts'
import { useAccountStore } from '@/stores/account.module.ts'
import ModalLoading from '@/components/ui/ModalLoading.vue'
import ItemList from '@/components/service/ItemList.vue'
import Toast from '@/components/ui/Toast.vue'

const assetStore = useAssetStore()
const accountStore = useAccountStore()

const { isSigned } = storeToRefs(accountStore)

const { hasAsset } = storeToRefs(assetStore)

const { connectWallet } = setupAccount()
const { tbaMint, checkAsset, check721Asset, tbaMintStep, tbaMintDesc } = setupAsset()

const isAbout = ref(false)

const createWallet = async () => {
  if (isSigned.value) {
    // tbaMint()
    modalStepRef.value?.showModal()
  } else if (!isSigned.value) {
    await connectWallet()
    await checkAsset()
    if (!hasAsset.value) {
      modalStepRef.value?.showModal()
      await tbaMint()
      modalStepRef.value?.close()
    }
  }
}

// modal
const modalStepRef = ref<HTMLDialogElement>()
</script>
