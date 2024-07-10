<template>
  <home-layout>
    <template #content>
      <swiper class="main-swiper" :options="swiperOptions" :slides-per-view="1" :space-between="15" @swiper="onSwiper"
        effect="cube" :modules="modules" @slideChange="onSlideChange">
        <swiper-slide>
          <div class="scene-container" style="padding-inline: 1rem;">
            <v-smartcoderedeemer-component />
          </div>
        </swiper-slide>

        <!-- FRENS VIEW -->
        <swiper-slide>
          <div class="scene-container">
            <FrensView :isInViewPort="activeIndex === 1" />
          </div>
        </swiper-slide>

        <!-- REWARDS VIEW -->
        <swiper-slide>
          <div class="scene-container">
            <RewardsView :isInViewPort="activeIndex === 2" />
          </div>
        </swiper-slide>
      </swiper>
    </template>
    <template #navigation>
      <NavigationBar :activeIndex="activeIndex" :goToSlide="goToSlide" />
    </template>
  </home-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { Swiper as SwiperInstance } from 'swiper/types';

import NavigationBar from '@/components/NavigationBar.vue'
import FrensView from '@/views/Frens/FrensView.vue';
import RewardsView from '@/views/Rewards/RewardsView.vue';
import { EffectCube } from 'swiper/modules';

const modules = [EffectCube]

const swiperOptions = {
  loop: true,
  autoplay: false,
  speed: 500,
  mousewheel: true
};

const swiperRef = ref<SwiperInstance | null>(null);
const activeIndex = ref(0)

const goToSlide = (index: number) => {
  if (swiperRef.value) {
    swiperRef.value.slideTo(index);
  }
};

const onSwiper = (swiper: SwiperInstance) => {
  swiperRef.value = swiper
};

const onSlideChange = (swiper: SwiperInstance) => {
  activeIndex.value = swiper.activeIndex
};
</script>

<style scoped>
.scene-container {
  overflow: hidden auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-end;
  height: 100%;
}

.main-swiper {
  height: 100%;
}

.main-swiper .swiper-slide::-webkit-scrollbar {
  display: none !important;
}
</style>