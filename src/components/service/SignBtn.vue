<template>
  <button
    v-if="!isSigned"
    type="button"
    class="btn btn-sm btn-primary md:btn-md"
    @click="connectWallet"
  >
    Sign in
  </button>

  <div
    v-else
    class="flex items-center h-8 pl-3 border border-neutral-50 rounded-full md:h-12 md:pl-4"
  >
    <div class="dropdown dropdown-bottom dropdown-end">
      <label
        tabIndex="{0}"
        class="flex items-center ic-metamask text-xs cursor-pointer md:text-base"
      >
        {{ truncate(walletAddress) }}
      </label>

      <button
        tabIndex="{0}"
        type="button"
        class="dropdown-content relative z-1 h-8 px-4 -mr-[37px] mt-3 border border-gray-500 bg-gray-800 bg-opacity-80 rounded-md text-xs shadow-sm text-neutral-content backdrop-blur-md hover:bg-opacity-100 hover:text-base-content md:h-10 md:mt-4 md:text-sm"
        @click="disconnectWallet"
      >
        Sign Out
      </button>
    </div>

    <button type="button" class="p-2 hover:text-neutral-300" @click="copy(walletAddress)">
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
