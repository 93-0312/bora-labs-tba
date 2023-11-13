<template>
  <button
    v-if="!isSigned"
    type="button"
    class="btn btn-sm btn-neutral rounded-sm text-xs md:btn-md md:text-base"
    @click="connectWallet"
  >
    <!-- prettier-ignore -->
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" class="w-5 h-auto md:w-6">
      <mask id="wallet" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="33">
        <rect y="0.000366211" width="32" height="32" fill="currentColor"/>
      </mask>
      <g mask="url(#wallet)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.69955 24.6337C5.61066 25.5448 6.71066 26.0004 7.99955 26.0004H23.9996C25.2884 26.0004 26.3884 25.5448 27.2996 24.6337C28.2107 23.7226 28.6662 22.6226 28.6662 21.3337V10.667C28.6662 9.37814 28.2107 8.27814 27.2996 7.36703C26.3884 6.45592 25.2884 6.00037 23.9996 6.00037H7.99955C6.71066 6.00037 5.61066 6.45592 4.69955 7.36703C3.78844 8.27814 3.33289 9.37814 3.33289 10.667V21.3337C3.33289 22.6226 3.78844 23.7226 4.69955 24.6337ZM23.9996 12.3337H7.99955C7.48844 12.3337 7.01066 12.4057 6.56622 12.5497C6.12178 12.6946 5.71066 12.9115 5.33289 13.2004V10.667C5.33289 9.9337 5.59422 9.30614 6.11689 8.78437C6.63866 8.2617 7.26622 8.00037 7.99955 8.00037H23.9996C24.7329 8.00037 25.3609 8.2617 25.8836 8.78437C26.4053 9.30614 26.6662 9.9337 26.6662 10.667V13.2004C26.2884 12.9115 25.8773 12.6946 25.4329 12.5497C24.9884 12.4057 24.5107 12.3337 23.9996 12.3337ZM23.3333 20.0004C24.4379 20.0004 25.3333 19.1049 25.3333 18.0004C25.3333 16.8958 24.4379 16.0004 23.3333 16.0004C22.2288 16.0004 21.3333 16.8958 21.3333 18.0004C21.3333 19.1049 22.2288 20.0004 23.3333 20.0004Z" fill="currentColor"/>
      </g>
    </svg>
    Sign in
  </button>

  <div v-else class="flex items-center h-8 bg-base-200 rounded-sm md:h-12">
    <button
      type="button"
      class="flex items-center ic-metamask w-[136px] h-8 px-2 rounded-l-sm text-xs transition md:w-40 md:h-12 md:px-3 md:text-sm hover:bg-base-300"
      @click="disconnectWallet"
    >
      <p class="overflow-hidden h-5">
        <span class="wallet-address flex items-center transition">{{
          truncate(walletAddress)
        }}</span>
        <span class="sign-out flex items-center mt-0.5 transition md:mt-0">
          <!-- prettier-ignore -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-5 h-auto mr-1">
            <path d="M304 336v40a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V136a40 40 0 0 1 40-40h152c22.09 0 48 17.91 48 40v40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path>
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 336l80-80l-80-80"></path>
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M176 256h256"></path>
          </svg>
          Sign out
        </span>
      </p>
    </button>

    <span class="w-[1px] h-4 bg-neutral/50" />

    <button
      type="button"
      class="h-8 px-1.5 rounded-r-sm md:h-12 md:px-3 hover:bg-base-300"
      @click="copy(walletAddress), changeIcon()"
    >
      <img
        v-if="isCopy"
        :src="icCopy"
        alt="copy"
        width="20"
        height="20"
        class="w-4 h-auto md:w-5"
      />
      <img v-else :src="icCheck" alt="check" width="20" height="20" class="w-4 h-auto md:w-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { copy, truncate } from '@/utils/utils';
import { storeToRefs } from 'pinia';
import { setupAccount } from '@/setups/account.composition';
import { setupCommon } from '@/setups/common.composition';
import { useAccountStore } from '@/stores/account.module.ts';
import icCheck from '@/assets/ic-check.svg';
import icCopy from '@/assets/ic-copy.svg';

const { changeIcon, isCopy } = setupCommon();

const accountStore = useAccountStore();
const { isSigned, walletAddress } = storeToRefs(accountStore);
const { connectWallet, disconnectWallet } = setupAccount();
</script>
