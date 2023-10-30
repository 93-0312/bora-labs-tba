<template>
  <div
    :class="[
      'overflow-hidden relative bg-base-100 rounded-lg border border-base-300 transition translate-y-0 will-change-transform',
      props.isSmall ? '' : 'hover:-translate-y-1 hover:shadow-[0_5px_15px] hover:shadow-neutral/20'
    ]"
  >
    <a
      :href="`/tba/${props.ercType + '/' + props.id}`"
      :class="[
        'block w-full p-1.5',
        props.hasCheckbox ? 'pointer-events-none' : 'md:p-3',
        props.isSmall ? 'p-1.5 md:p-1.5' : ''
      ]"
    >
      <!-- <router-link :to="`/tba/${props.ercType + '/' + props.id}`"> -->
      <img
        :src="props.imgSrc"
        alt="nft"
        :class="[
          'w-full h-auto aspect-square object-cover rounded-md',
          props.hasCheckbox ? 'opacity-80' : 'opacity-100'
        ]"
      />
    </a>
    <!-- badge -->
    <template v-if="props.hasBadge">
      <!-- badge: 6551 -->
      <div
        v-if="props.ercType === 6551"
        class="absolute left-4 top-4 badge h-7 px-2 bg-neutral-content/60 backdrop-blur-md rounded-md border-none text-xs md:top-6 md:left-6 md:h-8 md:text-sm"
      >
        <!-- prettier-ignore -->
        <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4 h-auto mr-1 md:w-5">
          <path d="M14.25 4H9.75C6.56802 4 4.97703 4 3.98851 5.00421C3 6.00841 3 7.62465 3 10.8571V13.1429C3 16.3753 3 17.9916 3.98851 18.9958C4.97703 20 6.56802 20 9.75 20H14.25C17.432 20 19.023 20 20.0115 18.9958C21 17.9916 21 16.3753 21 13.1429V10.8571C21 7.62465 21 6.00841 20.0115 5.00421C19.023 4 17.432 4 14.25 4Z" stroke="currentColor" />
          <path d="M7 8H10" stroke="currentColor" stroke-linecap="round" />
          <path d="M19 16H17C16.0572 16 15.5858 16 15.2929 15.7071C15 15.4142 15 14.9428 15 14C15 13.0572 15 12.5858 15.2929 12.2929C15.5858 12 16.0572 12 17 12H19C19.9428 12 20.4142 12 20.7071 12.2929C21 12.5858 21 13.0572 21 14C21 14.9428 21 15.4142 20.7071 15.7071C20.4142 16 19.9428 16 19 16Z" stroke="currentColor" />
        </svg>
        ERC-6551
      </div>
      <!-- badge: 721, 1155 -->
      <p
        v-else
        class="absolute left-4 top-4 badge h-7 px-2 bg-neutral-content/60 backdrop-blur-md rounded-md border-none text-xs md:top-6 md:left-6 md:h-8 md:text-sm"
      >
        {{ props.badgeName }}
      </p>
    </template>

    <!-- checkbox -->
    <input
      v-if="props.hasCheckbox"
      type="checkbox"
      class="checkbox checkbox-neutral absolute top-3 right-3 rounded-lg bg-base-200/80"
      aria-label="checkbox"
      :checked="addAsset.has(props.asset?.[0])"
      @click="selectAddAsset"
    />

    <!-- information -->
    <div class="px-2 md:px-3">
      <!-- address: 6551 -->
      <p
        v-if="props.ercType === 6551"
        :class="[
          'flex items-center font-medium',
          props.isSmall
            ? 'px-1 text-xs md:text-md'
            : 'h-8 px-0.5 text-sm md:h-10 md:px-2 md:text-base'
        ]"
      >
        {{ truncate(props.walletAddress) }}
        <button
          class="p-1.5 rounded-lg md:ml-0.5 md:p-2 md:hover:bg-neutral-content"
          type="button"
          aria-label="copy"
          @click="copy(props.walletAddress), changeIcon()"
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

      <!-- name -->
      <p
        v-else
        :class="[
          'truncate font-bold',
          props.isSmall
            ? 'text-xs md:text-md'
            : 'h-8 px-0.5 text-sm leading-8 md:h-10 md:px-2 md:text-[20px] md:leading-10'
        ]"
      >
        {{ props.cardName }}
      </p>

      <!-- network -->
      <p
        v-if="showNetwork"
        :class="[
          'flex items-center text-neutral/60 font-medium',
          props.isSmall ? 'pb-2 text-[10px] md:text-md' : 'px-0.5 text-xs md:px-2 md:text-sm'
        ]"
      >
        Bora Testnet
      </p>

      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { copy, truncate } from '@/constant/utils'
import { useAssetStore } from '@/stores/asset.module'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const assetStore = useAssetStore()
const { addAsset } = storeToRefs(assetStore)

const selectAddAsset = () => {
  addAsset.value.set(props.asset[0], props.asset[1])

  console.log(addAsset.value, ': addAsset')
  // const addAssetKeyArr: bigint[] = []
  // addAsset.value.forEach((value: any, key: bigint) => addAssetKeyArr.push(key))
  // console.log(addAssetKeyArr, 'addAssetKeyArr')
}

const props = defineProps({
  asset: { type: null },
  isSmall: {
    type: Boolean,
    default: false
  },
  hasBadge: {
    type: Boolean,
    default: true
  },
  hasCheckbox: {
    type: Boolean,
    default: false
  },
  checked: { type: Boolean },
  ercType: {
    type: Number,
    default: 721
  },

  showNetwork: {
    type: Boolean,
    default: true
  },

  id: {
    type: Number
  },

  imgSrc: String,
  badgeName: String,
  cardName: String,
  walletAddress: {
    type: String,
    default: ''
  },
  linkDisable: {
    type: Boolean,
    default: false
  }
})

const isCopy = ref(true)

const changeIcon = () => {
  isCopy.value = false
  setTimeout(() => (isCopy.value = true), 3000)
}
</script>
