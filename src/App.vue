<template>
  <Header />
  <RouterView />
  <Footer />

  <ModalLoading
    @modal-ref="(ref) => (sendLoadingModalRef = ref.value)"
    :is-radial="true"
    desc="It takes about 5 minutes. Once complete, you can check in send address."
    progress-name="Send"
  />

  <!-- modal: minting -->
  <ModalLoading
    @modal-ref="(ref) => (radialModalRef = ref.value)"
    :is-radial="true"
    desc="It takes about 5 minutes. Once complete, you can check in TBA menu."
    progress-name="Convert"
  />

  <ModalLoading
    @modal-ref="(ref) => (addLoadingModalRef = ref.value)"
    :is-radial="true"
    desc="It takes about 5 minutes. Once complete, you can check in TBA address."
    progress-name="Add"
  />

  <ModalLoading
    @modal-ref="(ref) => (stepModalRef = ref.value)"
    :is-step="true"
    :step="4"
    :current-step="tbaMintStep"
    progress-name="Minting in progress"
    :desc="tbaMintDesc"
  />

  <Toast @close="setShowToast(false)" :showToast="showToast" :msg="toastMsg" />
</template>

<script setup lang="ts">
import ModalLoading from './components/ui/ModalLoading.vue';
import Toast from './components/ui/Toast.vue';
import { useAssetStore } from './stores/asset.module';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import Footer from '@/components/layout/Footer.vue';
import Header from '@/components/layout/Header.vue';
import { useModalStore } from '@/stores/modal.module';

const modalStore = useModalStore();
const assetStore = useAssetStore();

const { tbaMintStep } = storeToRefs(assetStore);
const { setShowToast } = modalStore;
const {
  showToast,
  toastMsg,
  sendLoadingModalRef,
  radialModalRef,
  addLoadingModalRef,
  stepModalRef
} = storeToRefs(modalStore);

const tbaMintDescObj = {
  1: 'ERC-721 is currently being minted.',
  2: 'TBA is currently being minted.',
  3: 'ERC-20 is currently being minted.',
  4: 'ERC-1155 is currently being minted.'
};

const tbaMintDesc = computed(() => tbaMintDescObj[tbaMintStep.value]);
</script>
