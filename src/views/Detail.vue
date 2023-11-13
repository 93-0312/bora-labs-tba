<template>
  <template v-if="!detailAsset.size" />

  <main
    v-else
    class="grid gap-6 items-start w-full max-w-[1200px] mx-auto px-4 pt-4 pb-16 align-top md:gap-10 md:px-7 md:pb-20 md:grid-cols-[4fr_5fr] md:pt-8"
  >
    <section
      class="relative w-full max-w-[80%] mx-auto h-auto text-center md:sticky md:top-28 md:max-w-lg"
    >
      <img
        :src="detailAsset && detailAsset?.get(tokenId)?.metadata['image']"
        class="w-full h-auto rounded-md border"
        alt="nft"
        width="490"
        height="490"
      />

      <!-- badge: 6551 -->
      <div v-if="is6551" class="absolute left-4 top-4 badge badge-warning font-medium md:badge-lg">
        ERC-6551
      </div>

      <!-- badge: 1155 -->
      <p
        v-else-if="is1155"
        class="absolute left-4 top-4 badge bg-base-100/90 border-none backdrop-blur-md font-medium"
      >
        {{ 'ERC-1155' }}
      </p>

      <!-- badge: 721 -->
      <p v-else class="absolute left-4 top-4 badge badge-info font-medium md:badge-lg">
        {{ 'ERC-721' }}
      </p>
    </section>

    <section>
      <h2 class="text-3xl font-bold md:text-4xl">
        {{ detailAsset && detailAsset?.get(tokenId)?.metadata['name'] }}
      </h2>

      <!-- erc-6551 -->
      <template v-if="is6551">
        <div class="flex items-center justify-between mt-3 md:mt-4">
          <p
            class="inline-flex items-center h-10 pl-4 bg-neutral-content rounded-md text-sm md:h-11 md:text-base"
          >
            {{ truncate(tbaWalletAddress) }}
            <button
              @click="copy(tbaWalletAddress), changeIcon()"
              class="px-3 h-11 ml-1 rounded-r-md hover:bg-secondary/20"
              type="button"
              aria-label="copy"
            >
              <img
                v-if="isCopy"
                :src="icCopy"
                alt="copy"
                width="20"
                height="20"
                class="w-5 h-auto"
              />
              <img v-else :src="icCheck" alt="check" width="20" height="20" class="w-5 h-auto" />
            </button>
          </p>

          <div class="tooltip tooltip-neutral tooltip-left" data-tip="Go to Bora Scope">
            <a
              :href="`${scopeUrl}address/${tbaWalletAddress}`"
              target="_blank"
              class="flex items-center justify-center w-10 h-10 rounded-md bg-neutral-content md:w-11 md:h-11"
              aria-label="go to borascope"
            >
              <!-- prettier-ignore -->
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" class="w-5 h-5 md:w-6 md:h-6">
                <mask id="open_in_new" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32"><rect width="32" height="32" fill="#fff"/></mask>
                <g mask="url(#open_in_new)"><path d="M7.06669 27.3333C6.40002 27.3333 5.83335 27.1 5.36669 26.6333C4.90002 26.1666 4.66669 25.6 4.66669 24.9333V7.06663C4.66669 6.39996 4.90002 5.83329 5.36669 5.36663C5.83335 4.89996 6.40002 4.66663 7.06669 4.66663H15.5V6.66663H7.06669C6.9778 6.66663 6.88891 6.71107 6.80002 6.79996C6.71113 6.88885 6.66669 6.97774 6.66669 7.06663V24.9333C6.66669 25.0222 6.71113 25.1111 6.80002 25.2C6.88891 25.2888 6.9778 25.3333 7.06669 25.3333H24.9334C25.0222 25.3333 25.1111 25.2888 25.2 25.2C25.2889 25.1111 25.3334 25.0222 25.3334 24.9333V16.5H27.3334V24.9333C27.3334 25.6 27.1 26.1666 26.6334 26.6333C26.1667 27.1 25.6 27.3333 24.9334 27.3333H7.06669ZM12.9667 20.4333L11.5667 19.0333L23.9334 6.66663H18.6667V4.66663H27.3334V13.3333H25.3334V8.06663L12.9667 20.4333Z" fill="currentColor"/></g>
              </svg>
            </a>
          </div>
        </div>

        <Accordion :title="`NFT (${tbaAssetSize})`">
          <div
            v-if="tbaAssetisEmpty"
            class="text-center flex flex-col justify-center items-center py-5"
          >
            <img :src="icEmpty" alt="empty" width="40" height="40" class="w-9 h-auto md:w-10" />
            <span class="mt-2 font-medium text-sm md:text-md">There is no NFT</span>
          </div>

          <template v-else>
            <ul class="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-4">
              <li v-for="asset in tbaAsset1155" :key="Number(asset[0])" class="relative">
                <ItemCard
                  :is-small="true"
                  :has-badge="false"
                  :show-network="false"
                  :card-name="asset[1]?.metadata.name"
                  :img-src="asset[1]?.metadata.image"
                  :id="Number(asset[0])"
                >
                  <div class="border-t mt-2">
                    <button
                      class="btn btn-ghost btn-sm btn-block min-h-0 h-7 mx-auto mt-1 rounded-sm hover:bg-neutral hover:text-base-100 md:h-8"
                      type="button"
                      @click="showSendModal(asset, tokenId)"
                    >
                      Send
                    </button>
                  </div>
                </ItemCard>

                <span
                  class="absolute top-2 right-2 badge badge-lg px-1 rounded-sm bg-opacity-80 border-none backdrop-blur-sm text-sm font-medium"
                >
                  <!-- prettier-ignore -->
                  <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-auto">
                    <path d="M12 12L6 6M12 12L18 18M12 12L18 6M12 12L6 18" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                  </svg>
                  {{ asset[1].amount }}
                </span>
              </li>
              <li v-for="asset in tbaAsset721" :key="Number(asset[0])" class="relative">
                <ItemCard
                  :is-small="true"
                  :has-badge="false"
                  :show-network="false"
                  :card-name="asset[1]?.metadata.name"
                  :img-src="asset[1].metadata.image"
                  :id="Number(asset[0])"
                >
                  <div class="border-t mt-2">
                    <button
                      class="btn btn-ghost btn-sm btn-block min-h-0 h-7 mx-auto mt-1 rounded-sm hover:bg-neutral hover:text-base-100 md:h-8"
                      type="button"
                      @click="showSendModal(asset, tokenId)"
                    >
                      Send
                    </button>
                  </div>
                </ItemCard>
              </li>
            </ul>
          </template>
        </Accordion>

        <Accordion title="Token (1)">
          <div
            v-for="(asset, i) in tbaAsset20"
            :key="i"
            class="flex justify-between items-center mb-5 last:mb-0"
          >
            <div class="flex items-center mr-4 font-medium text-md">
              <img
                src="https://static.boraportal.com/logo/coins/mainnet/token-ic-bid.svg"
                :alt="asset.tknSymbol"
                class="w-8 h-8 mr-2"
              />
              <span>{{ asset.tknSymbol }}</span>
            </div>

            <p class="ml-auto text-sm md:text-base">{{ asset.formatEtherAmount }}</p>

            <button
              class="btn btn-neutral btn-circle btn-sm ml-3 md:ml-4"
              type="button"
              @click="showTokenSendModal(asset, tokenId)"
              aria-label="send"
            >
              <!-- prettier-ignore -->
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" class="w-[18px] h-auto -translate-x-[1px]">
                <path d="M24.3375 38.75C23.8729 38.7544 23.4163 38.6293 23.0188 38.3886C22.6214 38.1479 22.2989 37.8013 22.0875 37.3875L17.0875 27.925C16.9425 27.6325 16.9176 27.295 17.0183 26.9844C17.1189 26.6739 17.337 26.415 17.626 26.2632C17.915 26.1113 18.2519 26.0786 18.5647 26.1719C18.8775 26.2652 19.1414 26.4772 19.3 26.7625L24.3 36.225L36.25 3.82501L3.75001 15.6125L16 22.1875L26.4 11.7875C26.6354 11.5521 26.9546 11.4199 27.2875 11.4199C27.6204 11.4199 27.9396 11.5521 28.175 11.7875C28.4104 12.0229 28.5426 12.3421 28.5426 12.675C28.5426 13.0079 28.4104 13.3271 28.175 13.5625L17.1125 24.6125C16.9244 24.8008 16.6812 24.9242 16.4181 24.9647C16.1551 25.0051 15.886 24.9606 15.65 24.8375L2.61251 17.9125C2.15617 17.6989 1.77501 17.3524 1.519 16.9185C1.26299 16.4845 1.14408 15.9833 1.17787 15.4806C1.21165 14.9779 1.39655 14.4971 1.70832 14.1013C2.0201 13.7055 2.44419 13.4131 2.92501 13.2625L35.3125 1.41251C35.7706 1.21931 36.2759 1.16709 36.7639 1.26252C37.2518 1.35796 37.7002 1.59671 38.0518 1.94827C38.4033 2.29983 38.6421 2.74822 38.7375 3.23616C38.8329 3.72409 38.7807 4.2294 38.5875 4.68751L26.7375 37.075C26.5746 37.5434 26.2761 37.9528 25.8799 38.251C25.4837 38.5493 25.0077 38.723 24.5125 38.75H24.3375Z" fill="white"/>
              </svg>
            </button>
          </div>
        </Accordion>
      </template>

      <!-- erc-721, 1155 -->
      <template v-else>
        <div class="overflow-hidden grid grid-cols-6 gap-3 mt-7 md:gap-4">
          <button
            v-if="is721"
            class="col-span-4 btn btn-accent rounded-sm md:btn-lg"
            type="button"
            @click="
              async () => [await convert721to6551(tokenId), router.push(`/tba/6551/${tokenId}`)]
            "
          >
            Convert to TBA
          </button>
          <button
            :class="['btn btn-neutral rounded-sm md:btn-lg', is721 ? 'col-span-2' : 'col-span-6']"
            type="button"
            :disabled="detailAsset?.get(tokenId)?.['amount'] === 0n"
            @click="showSendModal([tokenId, detailAsset.get(tokenId)!])"
          >
            Send
          </button>
        </div>

        <Accordion v-if="is1155" title="Item (1)">
          <ul class="text-sm md:text-base">
            <li class="flex items-center">
              <img
                :src="detailAsset && detailAsset?.get(tokenId)?.metadata['image']"
                class="flex-none w-14 h-14 mr-3 rounded-md md:mr-4"
                alt="nft"
              />
              <p class="text-md">
                {{ detailAsset && detailAsset?.get(tokenId)?.metadata['name'] }}
              </p>
              <p class="flex-none w-16 ml-auto text-right font-medium">
                <span class="text-xs mr-1">✕</span>
                {{ detailAsset && detailAsset?.get(tokenId)?.['amount'] }}
              </p>
            </li>
          </ul>
        </Accordion>
      </template>

      <!-- info -->
      <Accordion
        :owner="assetOwner"
        :-contract-address="nftContractAddress"
        :-token-id="Number(tokenId)"
        isInfo
      />
    </section>

    <!-- modal -->
    <SendModal />
    <SendTokenModal />

    <ModalLoading
      @modal-ref="(ref) => (modalConvertRef = ref.value)"
      :is-radial="true"
      desc="It takes about 5 minutes. Once complete, you can check in TBA menu."
      progress-name="Convert"
    />
  </main>
</template>

<script setup lang="ts">
import { copy, truncate } from '@/utils/utils';
import { storeToRefs } from 'pinia';
import { computed, onMounted, onUpdated, ref, watch, type ComputedRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ItemCard from '@/components/service/ItemCard.vue';
import SendModal from '@/components/service/SendModal.vue';
import SendTokenModal from '@/components/service/SendTokenModal.vue';
import Accordion from '@/components/ui/Accordion.vue';
import ModalLoading from '@/components/ui/ModalLoading.vue';
import { setupAsset } from '@/setups/asset.composition';
import { setupCommon } from '@/setups/common.composition';
import { setupModal } from '@/setups/modal.composition';
import { useAssetStore } from '@/stores/asset.module.ts';
import type { Erc6551Asset, ErcAsset } from '@/types/asset';
import icCheck from '@/assets/ic-check.svg';
import icCopy from '@/assets/ic-copy.svg';
import icEmpty from '@/assets/ic-empty.svg';

const scopeUrl = import.meta.env.VITE_BORACHAIN_EXPLORER_URL;

const route = useRoute();
const router = useRouter();

const assetStore = useAssetStore();

const { asset6551, detail1155Asset, detail721Asset, tbaAsset20, tbaAsset721, tbaAsset1155 } =
  storeToRefs(assetStore);

const { changeIcon, isCopy } = setupCommon();
const { convert721to6551, checkOwner, checkDetailAsset, assetOwner } = setupAsset();
const { showSendModal, showTokenSendModal } = setupModal();

const ercType = ref<number>(0);
const tokenId = ref<bigint>(0n);

const modalConvertRef = ref<HTMLDialogElement>();

const is6551 = computed(() => ercType.value === 6551);
const is1155 = computed(() => ercType.value === 1155);
const is721 = computed(() => ercType.value === 721);

const nftContractAddress = computed(() =>
  ercType.value === 721
    ? import.meta.env.VITE_BORALABS_NFT_CONTRACT
    : ercType.value === 6551
    ? import.meta.env.VITE_BORALABS_TACC_CONTRACT
    : import.meta.env.VITE_BORALABS_MTS_CONTRACT
);

const detailAsset: ComputedRef<Erc6551Asset | ErcAsset> = computed(() => {
  return ercType.value === 721
    ? detail721Asset.value
    : ercType.value === 6551
    ? asset6551.value
    : detail1155Asset.value;
});

const tbaAssetisEmpty = computed(
  () =>
    (tbaAsset721.value && tbaAsset721.value.size) === 0 &&
    tbaAsset1155.value &&
    tbaAsset1155.value.size === 0
);

const tbaAssetSize = computed(() => tbaAsset1155.value?.size + tbaAsset721.value?.size);
const tbaWalletAddress = computed(
  () => (detailAsset.value as Erc6551Asset).get(tokenId.value)!.metadata.walletAddress
);

onMounted(async () => {
  ercType.value = route?.meta.type as number;
  tokenId.value = BigInt(route?.params.id as string);
  // CHECK OWNER LOGIC
  const isOwner = await checkOwner(tokenId.value, ercType.value);
  !isOwner && router.replace('/');
});

onUpdated(() => (ercType.value = route?.meta.type as number));

watch(
  () => ercType.value,
  async (ercType: number) => {
    await checkDetailAsset(ercType, tokenId.value);
  },
  { immediate: true }
);
</script>
