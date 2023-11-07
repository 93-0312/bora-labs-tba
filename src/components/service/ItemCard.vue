<template>
  <div
    :class="[
      'overflow-hidden relative bg-base-100 rounded-md transition translate-y-0 will-change-transform',
      props.isSmall
        ? 'shadow-none'
        : 'shadow-[0_2px_5px] shadow-neutral/20 hover:-translate-y-1 hover:shadow-[0_5px_15px] hover:shadow-neutral/30'
    ]"
  >
    <a
      :href="`/tba/${props.ercType + '/' + props.id}`"
      :class="['block w-full', props.hasCheckbox ? 'pointer-events-none' : '']"
    >
      <img
        :src="props.imgSrc"
        alt="nft"
        :class="[
          'w-full h-auto aspect-square object-cover rounded-t-md',
          props.hasCheckbox ? 'opacity-90' : 'opacity-100'
        ]"
      />
    </a>

    <!-- badge -->
    <template v-if="props.hasBadge">
      <!-- badge: 1155 -->
      <p
        class="absolute left-3 top-3 badge badge-sm bg-base-100/90 border-none backdrop-blur-md md:base-base"
      >
        {{ props.badgeName }}
      </p>
    </template>

    <!-- checkbox -->
    <input
      v-if="props.hasCheckbox"
      type="checkbox"
      class="checkbox checkbox-warning absolute top-2 right-2 rounded-full border border-base-300/70 bg-neutral/70 transition hover:bg-neutral/90"
      aria-label="checkbox"
      :checked="addAsset.has(props.asset?.[0])"
      @click="selectAddAsset"
    />

    <!-- information -->
    <div
      :class="[
        props.isSmall
          ? 'px-2.5 py-2 border border-base-300 border-t-0 rounded-b-md'
          : 'px-2.5 py-1.5 md:px-5 md:py-3'
      ]"
    >
      <!-- address: 6551 -->
      <p
        v-if="props.ercType === 6551"
        :class="[
          'flex items-center font-medium',
          props.isSmall ? 'text-sm md:text-base' : 'text-md md:text-[20px]'
        ]"
      >
        {{ truncate(props.walletAddress) }}
        <button
          class="p-1.5 rounded-md md:ml-0.5 md:p-2 md:hover:bg-neutral-content"
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
          props.isSmall ? 'text-sm md:text-base' : 'text-md md:text-[20px]'
        ]"
      >
        {{ props.cardName }}
      </p>

      <!-- network -->
      <p
        v-if="showNetwork"
        :class="[
          'flex items-center text-neutral/60 font-medium',
          props.isSmall ? 'mt-0.5 pl-[1px] text-[10px] md:text-[12px]' : 'text-xs md:text-sm'
        ]"
      >
        Bora Testnet
      </p>

      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useAssetStore } from '@/stores/asset.module';
import { copy, truncate } from '@/constant/utils';

const assetStore = useAssetStore();
const { addAsset } = storeToRefs(assetStore);

const selectAddAsset = () => {
  const alreadyCheck = addAsset.value.get(props.asset[0]) !== undefined;

  if (alreadyCheck) {
    addAsset.value.delete(props.asset[0]);
    return;
  } else addAsset.value.set(props.asset[0], props.asset[1]);
};

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
});

const isCopy = ref(true);

const changeIcon = () => {
  isCopy.value = false;
  setTimeout(() => (isCopy.value = true), 3000);
};
</script>
