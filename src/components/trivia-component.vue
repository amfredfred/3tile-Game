<template>
    <div class="trivia-main-wrapper">
        <h3 style="font-weight: 400;">Metro Trivia
            <small style="color: burlywood;">{{ triviaSession?.session_name }}</small>
        </h3>

        <div class="bottom-sheet-container">
            <h1 style="font-weight: 900;">Coming Soon</h1>
            <img :src="SpeechPhoto" alt="" class="image-small">
        </div>

        <v-skeleton-loader v-if="!triviaSession?.id" type="card"
            style="width: 100%;background: grey;"></v-skeleton-loader>
        <swiper v-else class="swiper-container" :options="swiperOptions" :modules="modules" effect='cube'>
            <swiper-slide class="swiper-slide" v-for="(question, index) in triviaSession?.questions" :key="index">
                <div class="photo-container">
                    <img class="metro-session-photo" :src="Image" alt="">
                </div>
                <div class="question-container">
                    <h3>
                        <strong>{{ question.question }}</strong>
                    </h3>
                    <div class="options">
                        <trivia-option v-for="(option, optionIndex) in question.options" :key="optionIndex"
                            @onPicked="picked(option)" @onSettled="isWaiting = !isWaiting" :index="option.id"
                            :disabled="isWaiting" :option="option" />
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import Image from '@/uploads/photos/metro-trivia-first-photo.jpg'
import { EffectCube, Pagination } from 'swiper/modules';
import { useMainStore } from '@/stores/mainstore';

import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import type { IOption } from '@/interfaces/ITrivia';
import { useWebSocketStore } from '@/stores/websocket';

import SpeechPhoto from '@/assets/icons/speech-bubbles-icon.png'

const modules = [EffectCube, Pagination]
const _store = useMainStore()
const triviaSession = computed(() => _store?.triviaSession)
const isWaiting = ref(false)
const swiperOptions = {
    direction: 'horizontal',
    loop: false,
    autoplay: false,
    speed: 500,
    mousewheel: false
};

function picked(option: IOption) {
    isWaiting.value = true
    if (option.isCorrect) {
        console.log('correct answer')
    } else {
        console.log('incorrect answer')
    }
    // isWaiting.value = false
}

const socket = useWebSocketStore()
onMounted(() => {
    socket.sendMessage('trivia', null, 'getActiveSession')
})

</script>

<style scoped>
.trivia-main-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
}

.swiper-container {
    width: 100%;
}


.photo-container {
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: 10px;
    box-shadow: 0 0 40px rgb(0, 255, 195) inset;
}

.metro-session-photo {
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: 10px;
}

.question-container {
    width: 100%;
}

.question-container h3 {
    padding: .6rem;
    color: aliceblue;
    text-align: center;

}

.options {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}
</style>
