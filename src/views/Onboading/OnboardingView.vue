<template>
    <div class="onboarding-container">
        <swiper @slideChange="onSlideChange" :options="swiperOptions" class="swiper-container" :modules="modules"
            effect='cube'>
            <!-- First Slide: Project Details -->
            <swiper-slide class="swiper-slide">
                <div class="slider-item">
                    <screen-heading heading="HELLO, FRED - welcome" />
                    <p style="text-align: center; max-width: 90%; font-size: 13px;">
                        <!-- Lorem Ipsum is simply dummy text of the printing and typesetting industry. -->
                    </p>
                    <img :src="WelcomeTipIcon" alt="" class="image-small">
                </div>
                <r-button value="NEXT =>" />
            </swiper-slide>

            <!-- Second Slide: Making the Most of It -->
            <swiper-slide class="swiper-slide">
                <div class="slider-item">
                    <screen-heading heading="fun frens are fun" />
                    <p style="text-align: center; max-width: 90%; font-size: 13px;">
                        <!-- Lorem Ipsum is simply dummy text of the printing and typesetting industry. -->
                    </p>
                    <img :src="GroupOfPeopleIcon" alt="" class="image-small">
                </div>
                <r-button value="NEXT" />
            </swiper-slide>

            <!-- Third Slide: Community and More -->
            <swiper-slide class="swiper-slide">
                <div class="slider-item">
                    <screen-heading title="Are you ready?" heading="Let us Go to The Moon" />
                    <!-- <img :src="GroupOfPeopleIcon" alt="" class="image-small"> -->
                    <div style="z-index: -1;">
                        <explossive-countdown :countdown="timeLeftBeforeJumingIn" />
                    </div>
                </div>
                <!-- <r-button value="🚀🚀🚀🚀🚀🚀🚀🚀🚀" /> -->

                <v-progress-linear color="light-blue" height="10" style="border-radius: 50px;" :model-value="100"
                    striped />
            </swiper-slide>

        </swiper>
    </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectCube, Pagination } from 'swiper/modules';
import { ref } from 'vue'
import GroupOfPeopleIcon from '@/assets/icons/alarm-clock.png'
import WelcomeTipIcon from '@/assets/icons/welcome-tip.png'
import { useMainStore } from '@/stores/mainstore';

const modules = [EffectCube, Pagination]
const intervalBeforeJumpingIn = ref<any>(null)
const timeLeftBeforeJumingIn = ref(2)
const _store = useMainStore()

const swiperOptions = {
    direction: 'horizontal',
}

const onSlideChange = (event: any) => {
    if (intervalBeforeJumpingIn.value) clearInterval(intervalBeforeJumpingIn.value)
    if (event?.isEnd) {
        intervalBeforeJumpingIn.value = setInterval(() => {
            timeLeftBeforeJumingIn.value--
            if (timeLeftBeforeJumingIn.value <= 0) {
                if (intervalBeforeJumpingIn.value) clearInterval(intervalBeforeJumpingIn.value)
                timeLeftBeforeJumingIn.value = 0
                _store.setIsGuestState(false)
            }
        }, 1000)
        return
    }
    timeLeftBeforeJumingIn.value = 2
}

</script>

<style scoped>
.onboarding-container {
    height: 100%;
    border-bottom: solid thin orange;
    overflow: hidden;
}

.swiper-container {
    width: 100%;
    height: 100%;
}

.swiper-slide {
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: .6rem;
    flex-grow: 1;
    background: linear-gradient(to top, transparent, rgba(4, 81, 88, 0.69));
}

.slider-item {
    flex-grow: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.slider-item .image-small {
    width: 230px;
    margin: auto;
}
</style>
