<template>
  <section class="flex flex-col empty text-center mt-12" v-if="empty">
    There is no NFT
  </section>

  <template v-else>
    <ul class="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
      <li class="overflow-hidden relative rounded-t-lg">
        <a href="#">
          <img src="https://gfile.boraportal.com/cdn-cgi/image/width=300,format=webp/1024000001/2/100109992.png" class="w-full h-auto" alt="" />
          <div class="absolute left-3 top-3 badge bg-black h-8 rounded-md text-xs shadow-sm md:text-sm">
            <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1">
            <path d="M14.25 4H9.75C6.56802 4 4.97703 4 3.98851 5.00421C3 6.00841 3 7.62465 3 10.8571V13.1429C3 16.3753 3 17.9916 3.98851 18.9958C4.97703 20 6.56802 20 9.75 20H14.25C17.432 20 19.023 20 20.0115 18.9958C21 17.9916 21 16.3753 21 13.1429V10.8571C21 7.62465 21 6.00841 20.0115 5.00421C19.023 4 17.432 4 14.25 4Z" stroke="currentColor"/>
            <path d="M7 8H10" stroke="currentColor" stroke-linecap="round"/>
            <path d="M19 16H17C16.0572 16 15.5858 16 15.2929 15.7071C15 15.4142 15 14.9428 15 14C15 13.0572 15 12.5858 15.2929 12.2929C15.5858 12 16.0572 12 17 12H19C19.9428 12 20.4142 12 20.7071 12.2929C21 12.5858 21 13.0572 21 14C21 14.9428 21 15.4142 20.7071 15.7071C20.4142 16 19.9428 16 19 16Z" stroke="currentColor"/>
            </svg>
            ERC-6551
          </div>
        </a>
        <div class="border border-neutral-600 border-t-0 rounded-b-lg">
          <p class="flex items-center h-14 px-3 md:px-4 md:text-lg">
            0x2D12...34caB1
            <button class="p-2 hover:text-neutral-300"><svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"><path d="M4.79175 17.7502C4.37508 17.7502 4.02091 17.6043 3.72925 17.3127C3.43758 17.021 3.29175 16.6668 3.29175 16.2502V5.66683H4.54175V16.2502C4.54175 16.3196 4.56591 16.3785 4.61425 16.4268C4.66314 16.4757 4.7223 16.5002 4.79175 16.5002H12.8751V17.7502H4.79175ZM7.70841 14.8335C7.29175 14.8335 6.93758 14.6877 6.64591 14.396C6.35425 14.1043 6.20841 13.7502 6.20841 13.3335V3.85433C6.20841 3.42377 6.35425 3.06266 6.64591 2.771C6.93758 2.47933 7.29175 2.3335 7.70841 2.3335H14.6876C15.1181 2.3335 15.4792 2.47933 15.7709 2.771C16.0626 3.06266 16.2084 3.42377 16.2084 3.85433V13.3335C16.2084 13.7502 16.0626 14.1043 15.7709 14.396C15.4792 14.6877 15.1181 14.8335 14.6876 14.8335H7.70841ZM7.70841 13.5835H14.6876C14.757 13.5835 14.8195 13.5591 14.8751 13.5102C14.9306 13.4618 14.9584 13.4029 14.9584 13.3335V3.85433C14.9584 3.78488 14.9306 3.72239 14.8751 3.66683C14.8195 3.61127 14.757 3.5835 14.6876 3.5835H7.70841C7.63897 3.5835 7.58008 3.61127 7.53175 3.66683C7.48286 3.72239 7.45841 3.78488 7.45841 3.85433V13.3335C7.45841 13.4029 7.48286 13.4618 7.53175 13.5102C7.58008 13.5591 7.63897 13.5835 7.70841 13.5835Z" fill="currentColor"></path></svg></button>
          </p>
          <div class="grid grid-cols-6">
            <button class="col-span-4 btn btn-primary rounded-none">Add NFT</button>
            <button class="col-span-2 btn btn-white rounded-none">Send</button>
          </div>
          <p class="flex items-center p-3 text-xs text-neutral-300 md:text-sm">
            <img src="https://www.boraportal.com/play/assets/card-round-klaytn.313cb130.svg" class="w-5 h-5 mr-1 opacity-70 md:w-6 md:h-6" alt="" />
            Bora Testnet
          </p>
        </div>
      </li>

      <li class="overflow-hidden relative rounded-t-lg">
        <a href="#">
          <img src="https://gfile.boraportal.com/cdn-cgi/image/width=300,format=webp/1022000005/3/10393.gif" class="w-full h-auto" alt="" />
          <div class="absolute left-3 top-3 badge bg-neutral-600 border-neutral-600 h-8 rounded-md text-xs shadow-sm md:text-sm">
            ERC-721
          </div>
        </a>
        <div class="border border-neutral-600 border-t-0 rounded-b-lg">
          <p class="h-14 truncate px-3 pt-4 md:px-4 md:pt-3.5 md:text-lg">Batteryyg #123234234423</p>
          <div class="grid grid-cols-6">
            <button class="col-span-4 btn btn-secondary rounded-none">Convert to TBA</button>
            <button class="col-span-2 btn btn-white rounded-none">Send</button>
          </div>
          <p class="flex items-center p-3 text-xs text-neutral-300 md:text-sm">
            <img src="https://www.boraportal.com/play/assets/card-round-klaytn.313cb130.svg" class="w-5 h-5 mr-1 opacity-70 md:w-6 md:h-6" alt="" />
            Bora Testnet
          </p>
        </div>
      </li>

      <li class="overflow-hidden relative rounded-t-lg">
        <a href="#">
          <img src="https://gfile.boraportal.com/cdn-cgi/image/width=300,format=webp/1025000002/9/5139.png" class="w-full h-auto" alt="" />
          <div class="absolute left-3 top-3 badge bg-neutral-600 border-neutral-600 h-8 rounded-md text-xs shadow-sm md:text-sm">ERC-1155</div>
        </a>
        <div class="border border-neutral-600 border-t-0 rounded-b-lg">
          <p class="h-14 truncate px-3 pt-4 md:px-4 md:pt-3.5 md:text-lg">Batter #1234 Baseman Baseman Baseman Baseman</p>
          <div class="grid">
            <button class="btn btn-white rounded-none">Send</button>
          </div>
          <p class="flex items-center p-3 text-xs text-neutral-300 md:text-sm">
            <img src="https://www.boraportal.com/play/assets/card-round-klaytn.313cb130.svg" class="w-5 h-5 mr-1 opacity-70 md:w-6 md:h-6" alt="" />
            Bora Testnet
          </p>
        </div>
      </li>

      <li class="overflow-hidden relative rounded-t-lg">
        <a href="#">
          <img src="https://gfile.boraportal.com/cdn-cgi/image/width=300,format=webp/1025000003/4/3084.jpg" class="w-full h-auto" alt="" />
          <div class="absolute left-3 top-3 badge bg-neutral-600 border-neutral-600 h-8 rounded-md text-xs shadow-sm md:text-sm">
            ERC-1155
          </div>
        </a>
        <div class="border border-neutral-600 border-t-0 rounded-b-lg">
          <p class="h-14 truncate px-3 pt-4 md:px-4 md:pt-3.5 md:text-lg">Batter #1234</p>
          <div class="grid">
            <button class="btn btn-white rounded-none">Send</button>
          </div>
          <p class="flex items-center p-3 text-xs text-neutral-300 md:text-sm">
            <img src="https://www.boraportal.com/play/assets/card-round-klaytn.313cb130.svg" class="w-5 h-5 mr-1 opacity-70 md:w-6 md:h-6" alt="" />
            Bora Testnet
          </p>
        </div>
      </li>
    </ul>
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const empty = ref(false);
</script>

<style scoped>
</style>