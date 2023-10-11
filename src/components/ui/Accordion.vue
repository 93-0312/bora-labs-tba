<template>
  <div
    :class="[
      'my-4',
      'border',
      'border-neutral-600',
      'rounded-lg',
      'md:my-6',
      { 'bg-neutral-600/20': showContents }
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
      <div v-if="showContents" class="border-t border-neutral-600">
        <dl v-if="props.isInfo" class="p-3 grid grid-cols-4 text-sm md:text-base md:p-4">
          <dt class="col-span-1 text-neutral-400">Owner</dt>
          <dd class="col-span-3 text-right break-all">
            0xcee2cd22d59cfa9ebfb178f9578181411111480a
          </dd>
          <dt class="col-span-1 my-3 text-neutral-400">Chain</dt>
          <dd class="col-span-3 my-3 text-right">Bora Testnet</dd>
          <dt class="col-span-1 text-neutral-400">Token ID</dt>
          <dd class="col-span-3 text-right">1234</dd>
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
  title: String
})

const showContents = ref(false)

onMounted(() => (showContents.value = props.isInfo ? false : true))
</script>
