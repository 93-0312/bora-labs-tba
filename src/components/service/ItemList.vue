<template>
  <section v-if="!hasAsset || !isSigned" class="flex flex-col empty text-center mt-12">
    <span>There is no NFT</span>
  </section>

  <ul v-else class="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
    <!-- 6551 -->
    <li
      v-for="asset in asset6551"
      :key="Number(asset[0])"
      class="overflow-hidden relative rounded-t-lg"
    >
      <ItemCard
        :ercType="asset[1]?.metadata.type"
        :card-name="asset[1]?.metadata.name"
        :img-src="asset[1]?.metadata.image"
        :id="Number(asset[0])"
        :walletAddress="asset[1]?.metadata.walletAddress"
      >
        <div class="grid grid-cols-6">
          <button
            class="min-h-0 h-10 col-span-4 btn btn-primary rounded-none text-xs md:h-12 md:text-base"
            type="button"
            @click="addModalRef?.showModal()"
          >
            Add NFT
          </button>
          <button
            class="min-h-0 h-10 col-span-2 btn btn-white rounded-none text-xs md:h-12 md:text-base"
            type="button"
            @click="showSendModal(asset)"
          >
            Send
          </button>
        </div>
      </ItemCard>
    </li>

    <!-- 721 -->
    <li
      v-for="asset in asset721"
      :key="Number(asset[0])"
      class="overflow-hidden relative rounded-t-lg"
    >
      <ItemCard
        :ercType="asset[1]?.metadata.type"
        badge-name="ERC-721"
        :card-name="asset[1]?.metadata.name"
        :img-src="asset[1]?.metadata.image"
        :id="Number(asset[0])"
      >
        <div class="grid grid-cols-6">
          <button
            class="min-h-0 h-10 col-span-4 btn btn-accent rounded-none text-xs md:h-12 md:text-base"
            type="button"
            @click="convert721to6551(asset[0])"
          >
            Convert to TBA
          </button>
          <button
            class="min-h-0 h-10 col-span-2 btn btn-white rounded-none text-xs md:h-12 md:text-base"
            type="button"
            @click="showSendModal(asset)"
          >
            Send
          </button>
        </div>
      </ItemCard>
    </li>

    <!-- 1155 -->
    <li
      v-for="asset in asset1155"
      :key="Number(asset[0])"
      class="overflow-hidden relative rounded-t-lg"
    >
      <ItemCard
        :ercType="asset[1]?.metadata.type"
        badge-name="ERC-1155"
        :card-name="asset[1]?.metadata.name"
        :img-src="asset[1]?.metadata.image"
        :id="Number(asset[0])"
      >
        <button
          class="min-h-0 h-10 btn btn-white w-full rounded-none text-xs md:btn-base md:h-12 md:text-base"
          type="button"
          @click="showSendModal(asset)"
        >
          Send
        </button>
      </ItemCard>
    </li>
  </ul>

  <!-- modal: add nft -->
  <SendModal />
  <AddModal @modal-ref="(ref) => setAddModalRef(ref.value)" :modalAddRef="addModalRef" />
</template>

<script setup lang="ts">
import ItemCard from '@/components/service/ItemCard.vue'
import { useAssetStore } from '@/stores/asset.module.ts'
import { storeToRefs } from 'pinia'

import { useAccountStore } from '@/stores/account.module.ts'
import { useModalStore } from '@/stores/modal.module.ts'
import AddModal from './AddModal.vue'
import SendModal from './SendModal.vue'
import { setupAsset } from '@/setups/asset.composition'

const accountStore = useAccountStore()
const assetStore = useAssetStore()
const modalStore = useModalStore()

const { convert721to6551 } = setupAsset()

const { isSigned } = storeToRefs(accountStore)

const { setSendAsset } = assetStore
const { hasAsset, asset721, asset1155, asset6551 } = storeToRefs(assetStore)

// modal
const { sendModalRef, addModalRef } = storeToRefs(modalStore)
const { setAddModalRef } = modalStore

const showSendModal = (sendAsset: any) => {
  setSendAsset(sendAsset)
  sendModalRef.value?.showModal()
}
</script>
