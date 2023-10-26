<template>
  <div
    :class="[
      'my-4',
      'border',
      'rounded-lg',
      'md:my-6',
      'transition',
      showContents
        ? 'bg-neutral-content border-secondary/10'
        : 'border-secondary/50 hover:border-secondary'
    ]"
  >
    <button
      class="flex items-center justify-between w-full p-2 pr-4 pl-4 font-medium md:p-3 md:pr-5 md:pl-5 md:text-lg"
      type="button"
      @click="showContents = !showContents"
    >
      {{ props.isInfo ? 'Info' : props.title }}
      <span :class="['arrow', { 'arrow-up': showContents }]" />
    </button>
    <transition name="show-down">
      <div v-if="showContents" class="border-t border-secondary/10">
        <dl v-if="props.isInfo" class="p-3 grid grid-cols-4 text-sm md:text-base md:p-4">
          <dt class="col-span-1 text-neutral/60 font-medium">Owner</dt>
          <dd class="col-span-3 text-right break-all">
            0xcee2cd22d59cfa9ebfb178f9578181411111480a
          </dd>
          <dt class="col-span-1 my-3 text-neutral/60 font-medium">Chain</dt>
          <dd class="col-span-3 my-3 text-right">Bora Testnet</dd>
          <dt class="col-span-1 text-neutral/60 font-medium">Token ID</dt>
          <dd class="col-span-3 text-right">1234</dd>

          <!--  -->
          <dt class="col-span-1 my-2 text-neutral-400">Owner</dt>
          <dd class="col-span-3 my-2 text-right break-all">연결된 지갑주소</dd>
          <dt class="col-span-1 my-2 text-neutral-400">Chain</dt>
          <dd class="col-span-3 my-2 text-right">Bora Testnet</dd>
          <dt class="col-span-1 my-2 text-neutral-400">ContractAddress</dt>
          <dd class="col-span-3 my-2 text-right">{{ $props.ContractAddress }}</dd>
          <dt class="col-span-1 my-2 text-neutral-400">Token ID</dt>
          <dd class="col-span-3 my-2 text-right">{{ TokenId }}</dd>
          <!--  -->
        </dl>

        <div v-else class="p-3 md:p-4">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  isInfo: {
    type: Boolean,
    default: false
  },
  title: String,
  owner: String,
  Chain: String,
  ContractAddress: String,
  TokenId: Number
})

const showContents = ref(false)

onMounted(() => (showContents.value = props.isInfo ? false : true))
</script>
