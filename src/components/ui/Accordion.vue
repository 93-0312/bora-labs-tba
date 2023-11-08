<template>
  <div
    :class="[
      'my-4 border rounded-md transition md:my-6',
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
        <dl v-if="props.isInfo" class="p-4 grid grid-cols-7 text-sm md:text-base md:p-5">
          <dt class="col-span-2 my-2 text-secondary-focus font-medium">Owner</dt>
          <dd class="col-span-5 my-2 text-right break-all">
            {{ owner }}
          </dd>
          <dt class="col-span-2 my-2 text-secondary-focus font-medium">Chain</dt>
          <dd class="col-span-5 my-2 text-right break-all">
            {{ chainName }}
          </dd>
          <dt class="col-span-2 my-2 text-secondary-focus font-medium">Token ID</dt>
          <dd class="col-span-5 my-2 text-right break-all">{{ TokenId }}</dd>
          <dt class="col-span-2 my-2 text-secondary-focus font-medium">Contract ID</dt>
          <dd class="col-span-5 my-2 text-right break-all">
            {{ ContractAddress }}
          </dd>
        </dl>

        <div v-else class="p-4 md:p-5">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

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
});

const showContents = ref(false);
const chainName = import.meta.env.VITE_BORACHAIN_CHAIN_NAME;

onMounted(() => (showContents.value = props.isInfo ? false : true));
</script>
