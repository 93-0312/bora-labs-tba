<template>
  <section v-if="isEmpty" class="flex flex-col empty text-center mt-12">There is no NFT</section>

  <ul v-else class="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
    <!-- 6551 -->
    <li class="overflow-hidden relative rounded-t-lg">
      <ItemCard
        is6551
        img-src="https://gfile.boraportal.com/cdn-cgi/image/width=300,format=webp/1024000001/2/100109992.png"
      >
        <div class="grid grid-cols-6">
          <button
            class="col-span-4 btn btn-primary rounded-none text-xs md:text-sm"
            type="button"
            @click="modalAddRef?.showModal()"
          >
            Add NFT
          </button>
          <button
            class="col-span-2 btn btn-white rounded-none text-xs md:text-sm"
            type="button"
            @click="modalSendRef?.showModal()"
          >
            Send
          </button>
        </div>
      </ItemCard>
    </li>

    <!-- 721 -->
    <li v-for="i in 2" :key="i" class="overflow-hidden relative rounded-t-lg">
      <ItemCard
        is721
        badge-name="ERC-721"
        img-src="https://gfile.boraportal.com/cdn-cgi/image/width=300,format=webp/1022000005/3/10393.gif"
      >
        <div class="grid grid-cols-6">
          <button
            class="col-span-4 btn btn-secondary rounded-none text-xs md:text-sm"
            type="button"
            @click="modalConvertRef?.showModal()"
          >
            Convert to TBA
          </button>
          <button
            class="col-span-2 btn btn-white rounded-none text-xs md:text-sm"
            type="button"
            @click="modalSendRef?.showModal()"
          >
            Send
          </button>
        </div>
      </ItemCard>
    </li>

    <!-- 1155 -->
    <li v-for="i in 5" :key="i" class="overflow-hidden relative rounded-t-lg">
      <ItemCard
        badge-name="ERC-1155"
        img-src="https://gfile.boraportal.com/cdn-cgi/image/width=300,format=webp/1025000003/4/3084.jpg"
      >
        <button
          class="btn btn-white w-full rounded-none text-xs md:text-sm"
          type="button"
          @click="modalSendRef?.showModal()"
        >
          Send
        </button>
      </ItemCard>
    </li>
  </ul>

  <!-- modal: add nft -->
  <ModalLayout @modal-ref="(ref) => (modalAddRef = ref.value)" title="Add NFT" btn-name="Add">
    <p class="mb-2 text-sm md:text-base">Pitcher #1234에 추가할 NFT를 선택하세요.</p>
    <ul
      class="overflow-auto grid grid-cols-3 gap-2 max-h-72 md:grid-cols-4 md:gap-3 md:max-h-[340px]"
    >
      <li v-for="i in 7" :key="i" class="overflow-hidden relative rounded">
        <ItemCard
          :is-small="true"
          :has-badge="false"
          :has-checkbox="true"
          img-src="https://gfile.boraportal.com/cdn-cgi/image/width=300,format=webp/1022000005/3/10393.gif"
        />
      </li>
    </ul>
  </ModalLayout>

  <!-- modal: send nft -->
  <ModalLayout @modal-ref="(ref) => (modalSendRef = ref.value)" title="Send NFT" btn-name="Send">
    <div class="w-32 mx-auto">
      <ItemCard
        :is-small="true"
        :has-badge="false"
        img-src="https://gfile.boraportal.com/cdn-cgi/image/width=300,format=webp/1024000001/2/100109992.png"
      />
    </div>
    <div class="form-control w-full mt-4">
      <label class="label">
        <span class="label-text">Who are you sending the NFT to?</span>
      </label>
      <!-- input error시 class에 input-error 추가  -->
      <input
        type="text"
        placeholder="ex. 0x1234..."
        :class="['input', 'input-bordered', 'w-full', { 'input-error': isInputError }]"
        maxlength="42"
      />
      <!-- input error시 노출 -->
      <label v-if="isInputError" class="label">
        <span class="label-text-alt text-error">This is not a valid wallet address.</span>
      </label>
    </div>

    <p class="mt-4 text-xs text-neutral-content/70">
      The recipient must be connected to the same chain as the NFT to check.
    </p>
  </ModalLayout>

  <!-- modal: convert to TBA -->
  <ModalLoading
    @modal-ref="(ref) => (modalConvertRef = ref.value)"
    :is-radial="true"
    desc="It takes about 5 minutes. Once complete, you can check in TBA menu."
    progress-name="Convert"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ItemCard from '@/components/service/ItemCard.vue'
import ModalLayout from '@/components/ui/ModalLayout.vue'
import ModalLoading from '../ui/ModalLoading.vue'

const isEmpty = ref(false)
const isInputError = ref(false)

// modal
const modalAddRef = ref<HTMLDialogElement>()
const modalSendRef = ref<HTMLDialogElement>()
const modalConvertRef = ref<HTMLDialogElement>()
</script>
