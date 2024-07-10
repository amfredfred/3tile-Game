<template>
    <div class="slider-container">
        <swiper :slides-per-view="1.2" :space-between="15" @swiper="onSwiper" @slideChange="onSlideChange">
            <swiper-slide class="swiper-slide">
                <img :src="WallpaperFireTree" alt="">
            </swiper-slide>
            <swiper-slide class="swiper-slide">
                <img :src="WallpaperFireTree" alt="">
            </swiper-slide>
            <swiper-slide class="swiper-slide">
                <img :src="WallpaperFireTree" alt="">
            </swiper-slide>
        </swiper>
    </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import WallpaperFireTree from '@/assets/photos/anime-demon-slayer-kimetsu-no-yaiba-tanjirou.jpg'

const onSwiper = (swiper: any) => {
 
}

const onSlideChange = () => {
    
}

</script>

<style scoped>
.slider-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.swiper-slide {
    background: rgb(0, 0, 0);
    aspect-ratio: 16/9;
    border-radius: 15px;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 140px;
    overflow: hidden;
}

.swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: fill;
}
</style>