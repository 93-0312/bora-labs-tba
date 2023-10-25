<template>
  <button
    v-if="!isSigned"
    type="button"
    class="btn btn-sm btn-primary rounded-lg text-xs md:btn-md md:text-base"
    @click="connectWallet"
  >
    <!-- prettier-ignore -->
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" class="w-5 h-auto md:w-6">
      <mask id="mask0_4_7766" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="33">
        <rect y="0.000366211" width="32" height="32" fill="#D9D9D9"/>
      </mask>
      <g mask="url(#mask0_4_7766)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.69955 24.6337C5.61066 25.5448 6.71066 26.0004 7.99955 26.0004H23.9996C25.2884 26.0004 26.3884 25.5448 27.2996 24.6337C28.2107 23.7226 28.6662 22.6226 28.6662 21.3337V10.667C28.6662 9.37814 28.2107 8.27814 27.2996 7.36703C26.3884 6.45592 25.2884 6.00037 23.9996 6.00037H7.99955C6.71066 6.00037 5.61066 6.45592 4.69955 7.36703C3.78844 8.27814 3.33289 9.37814 3.33289 10.667V21.3337C3.33289 22.6226 3.78844 23.7226 4.69955 24.6337ZM23.9996 12.3337H7.99955C7.48844 12.3337 7.01066 12.4057 6.56622 12.5497C6.12178 12.6946 5.71066 12.9115 5.33289 13.2004V10.667C5.33289 9.9337 5.59422 9.30614 6.11689 8.78437C6.63866 8.2617 7.26622 8.00037 7.99955 8.00037H23.9996C24.7329 8.00037 25.3609 8.2617 25.8836 8.78437C26.4053 9.30614 26.6662 9.9337 26.6662 10.667V13.2004C26.2884 12.9115 25.8773 12.6946 25.4329 12.5497C24.9884 12.4057 24.5107 12.3337 23.9996 12.3337ZM23.3333 20.0004C24.4379 20.0004 25.3333 19.1049 25.3333 18.0004C25.3333 16.8958 24.4379 16.0004 23.3333 16.0004C22.2288 16.0004 21.3333 16.8958 21.3333 18.0004C21.3333 19.1049 22.2288 20.0004 23.3333 20.0004Z" fill="white"/>
      </g>
    </svg>
    Sign in
  </button>

  <div
    v-else
    class="flex items-center h-8 bg-base-200 rounded-lg md:h-12"
  >
    <button
      type="button"
      class="flex items-center ic-metamask h-8 px-3 rounded-l-lg rounded- text-xs transition md:h-12 md:px-4 md:text-sm hover:bg-base-300"
      @click="disconnectWallet"
    >
      {{ truncate(walletAddress) }}
    </button>

    <span class="w-[1px] h-4 bg-neutral/50" />

    <button type="button" class="h-8 px-2 rounded-r-lg md:h-12 md:px-3 hover:bg-base-300" @click="copy(walletAddress)">
      <!-- prettier-ignore -->
      <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
        <path d="M4.79175 17.7502C4.37508 17.7502 4.02091 17.6043 3.72925 17.3127C3.43758 17.021 3.29175 16.6668 3.29175 16.2502V5.66683H4.54175V16.2502C4.54175 16.3196 4.56591 16.3785 4.61425 16.4268C4.66314 16.4757 4.7223 16.5002 4.79175 16.5002H12.8751V17.7502H4.79175ZM7.70841 14.8335C7.29175 14.8335 6.93758 14.6877 6.64591 14.396C6.35425 14.1043 6.20841 13.7502 6.20841 13.3335V3.85433C6.20841 3.42377 6.35425 3.06266 6.64591 2.771C6.93758 2.47933 7.29175 2.3335 7.70841 2.3335H14.6876C15.1181 2.3335 15.4792 2.47933 15.7709 2.771C16.0626 3.06266 16.2084 3.42377 16.2084 3.85433V13.3335C16.2084 13.7502 16.0626 14.1043 15.7709 14.396C15.4792 14.6877 15.1181 14.8335 14.6876 14.8335H7.70841ZM7.70841 13.5835H14.6876C14.757 13.5835 14.8195 13.5591 14.8751 13.5102C14.9306 13.4618 14.9584 13.4029 14.9584 13.3335V3.85433C14.9584 3.78488 14.9306 3.72239 14.8751 3.66683C14.8195 3.61127 14.757 3.5835 14.6876 3.5835H7.70841C7.63897 3.5835 7.58008 3.61127 7.53175 3.66683C7.48286 3.72239 7.45841 3.78488 7.45841 3.85433V13.3335C7.45841 13.4029 7.48286 13.4618 7.53175 13.5102C7.58008 13.5591 7.63897 13.5835 7.70841 13.5835Z" fill="currentColor" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/stores/account.module.ts'
import { setupAccount } from '@/setups/account.composition'
import { storeToRefs } from 'pinia'
import { copy, truncate } from '@/constant/utils'

const accountStore = useAccountStore()

const { isSigned, walletAddress } = storeToRefs(accountStore)

const { connectWallet, disconnectWallet } = setupAccount()
</script>
