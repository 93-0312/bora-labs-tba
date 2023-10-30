<template>
  <section
    v-if="!hasAsset || !isSigned"
    class="flex flex-col empty text-center font-medium my-10 md:my-24"
  >
    <span>There is no NFT.</span>
  </section>

  <ul v-else class="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-7">
    <!-- 6551 -->
    <li v-for="asset in asset6551" :key="Number(asset[0])">
      <ItemCard
        :ercType="asset[1]?.metadata.type"
        :card-name="asset[1]?.metadata.name"
        :img-src="asset[1]?.metadata.image"
        :id="Number(asset[0])"
        :walletAddress="asset[1]?.metadata.walletAddress"
      >
        <div class="grid grid-cols-6 gap-1 pt-4 pb-2 md:gap-2 md:pt-5 md:pb-3">
          <button
            class="min-h-0 h-9 col-span-4 btn btn-primary btn-outline rounded-lg text-[11px] md:h-12 md:text-base"
            type="button"
            @click="
              showAddModal(asset[1]?.metadata.walletAddress),
                setToAddress(asset[1]?.metadata.walletAddress)
            "
          >
            Add NFT
          </button>
          <button
            class="min-h-0 h-9 col-span-2 btn btn-neutral btn-outline rounded-lg text-[11px] md:h-12 md:text-base"
            type="button"
            @click="showSendModal(asset)"
          >
            Send
          </button>
        </div>
      </ItemCard>
    </li>

    <!-- 721 -->
    <li v-for="asset in asset721" :key="Number(asset[0])">
      <ItemCard
        :ercType="asset[1]?.metadata.type"
        badge-name="ERC-721"
        :card-name="asset[1]?.metadata.name"
        :img-src="asset[1]?.metadata.image"
        :id="Number(asset[0])"
      >
        <div class="grid grid-cols-6 gap-1 pt-4 pb-2 md:gap-2 md:pt-5 md:pb-3">
          <button
            class="min-h-0 h-9 col-span-4 btn btn-accent btn-outline rounded-lg text-[11px] leading-tight md:h-12 md:text-base"
            type="button"
            @click="convert721to6551(asset[0])"
          >
            Convert to TBA
          </button>
          <button
            class="min-h-0 h-9 col-span-2 btn btn-neutral btn-outline rounded-lg text-[11px] md:h-12 md:text-base"
            type="button"
            @click="showSendModal(asset)"
          >
            Send
          </button>
        </div>
      </ItemCard>
    </li>

    <!-- 1155 -->
    <li v-for="asset in asset1155" :key="Number(asset[0])">
      <ItemCard
        :ercType="asset[1]?.metadata.type"
        badge-name="ERC-1155"
        :card-name="asset[1]?.metadata.name"
        :img-src="asset[1]?.metadata.image"
        :id="Number(asset[0])"
      >
        <div class="pt-4 pb-2 md:pt-5 md:pb-3">
          <button
            class="min-h-0 h-9 btn btn-neutral btn-outline w-full rounded-lg text-[11px] md:btn-base md:h-12 md:text-base"
            type="button"
            @click="showSendModal(asset)"
          >
            Send
          </button>
        </div>
      </ItemCard>
    </li>
  </ul>

  <!-- modal: add nft -->
  <SendModal />
  <AddModal />
</template>

<script setup lang="ts">
import ItemCard from '@/components/service/ItemCard.vue'
import { useAssetStore } from '@/stores/asset.module.ts'
import { storeToRefs } from 'pinia'

import { useAccountStore } from '@/stores/account.module.ts'
import AddModal from './AddModal.vue'
import SendModal from './SendModal.vue'
import { setupAsset } from '@/setups/asset.composition'
import { onMounted } from 'vue'
import { setupModal } from '@/setups/modal.composition'

const accountStore = useAccountStore()
const assetStore = useAssetStore()

const { convert721to6551, checkAsset } = setupAsset()
const { isSigned } = storeToRefs(accountStore)
const { hasAsset, asset721, asset1155, asset6551 } = storeToRefs(assetStore)
const { setToAddress } = assetStore
// modal
const { showSendModal, showAddModal } = setupModal()

onMounted(async () => await checkAsset())
</script>
