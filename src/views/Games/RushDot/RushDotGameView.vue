<template>
    <div class="convas_container" :style="{ 'background-image': `url(${ScriFiBackgroundWithLaserGrid}) ` }">
        <h1>{{ state.message }}</h1>
        <div class="scene_container" ref="scene_canvas">
            <p>Time Left: {{ state.timeLeft }}</p>
            <p>Score: {{ state.score }}</p>
            <div @mouseenter="(event) => incrementScore(event, index)" :class="['target targetted']"
                v-for="(target, index) in state.targets" :key="index"
                :style="{ width: target.size + 'px', height: target.size + 'px', backgroundColor: target.color, left: target.position.x + 'px', top: target.position.y + 'px' }">
                <img :src="target.icon" alt="">
                <span class="targeted-income neon-text-flicker">
                    {{ `${target.value > 0 ? '+' : ''}${target.value}` }}
                </span>
            </div>
        </div>
        <v-confetti :key="confettiKey" v-if="state.gameStarted == false" />
        <span v-if="!state.gameStarted" @click="startGame"
            class="neon-text-flicker start-button neon-apply neon-purple">
            Start </span>
    </div>
</template>ttt mxh6sth6gtx rzhbc

<script setup lang="ts">

import { reactive, ref, onMounted } from 'vue';
import ScriFiBackgroundWithLaserGrid from '@/uploads/photos/sci-fi-background-futuristic-with-laser-grid_6241339.jpg'
import BombIcon from '@/assets/icons/bomb-icon.png'
import BrokenGrassIcon from '@/assets/icons/broken-grass-icon.png'
import CloverLeafIcon from '@/assets/icons/clover-icon.png'
import GiftIcon from '@/assets/icons/gift-icon.gif'
import DropShippingIcon from '@/assets/icons/drop-shipping-icon.png'
import type { GameState } from './types';

const state = reactive<GameState>({
    message: 'Tap Dash',
    gameStarted: false,
    timeLeft: 20, // in seconds
    score: 0,
    targetMinSize: 30, // Minimum size in pixels
    targetMaxSize: 50, // Maximum size in pixels
    // targetColor: 'red',
    targets: {},
    targetSpeeds: [1.6, 2.6, 3, 2.2, 4, 2], // Possible speeds for targets
    boosterProbability: 0.1, // 10% chance of spawning a booster
    slowBoosterProbability: 0.05, // 5% chance of spawning a slow booster
    penaltyProbability: 0.1, // 10% chance of spawning a penalty
    boosterMaxSize: 40, // Maximum size for a dot to be a booster
    slowDuration: 5000, // Duration for the slow effect in milliseconds
    lastClickTime: 0, // To track the time between clicks
    clickTimes: [], // To store the intervals between clicks,
    sceneCanvas: { width: 0, height: 0 },
    targetIcon: DropShippingIcon,
    spownInterval: 200,
    updateInterval: 1000,
    fallInterval: 10,
    numOfDots: 1000,
    speedMultiplier: 1
});

let timer: any = null;
let fallInterval: any = null;
let spawnInterval: any = null;
let timeoutClicked: any = null

const confettiKey = ref(1)
const targetIcons = [state.targetIcon, CloverLeafIcon]

const scene_canvas = ref<HTMLDivElement | null>(null);

const startGame = () => {
    state.gameStarted = true;
    state.timeLeft = 120;
    state.score = 0;
    state.targets = {};
    state.clickTimes = [];
    state.lastClickTime = performance.now();
    timer = setInterval(updateTimer, state.updateInterval);
    fallInterval = setInterval(updateTargetPositions, state.fallInterval);
    spawnInterval = setInterval(addTarget, state.spownInterval);
};

const updateTimer = () => {
    if (state.timeLeft > 0) {
        state.timeLeft--;
    } else {
        clearInterval(timer);
        clearInterval(fallInterval);
        clearInterval(spawnInterval);
        alert('Game Over! Your score: ' + state.score);
        state.gameStarted = false;
    }
};

const addTarget = () => {
    const maxWidth = state.sceneCanvas.width - state.targetMaxSize;
    const xPos = Math.floor(Math.random() * maxWidth);
    const randomSize = Math.floor(Math.random() * (state.targetMaxSize - state.targetMinSize + 1)) + state.targetMinSize;
    const speedFactor = (state.targetMaxSize - randomSize) / (state.targetMaxSize - state.targetMinSize) + 1; // Higher speed for smaller size
    const randomSpeed = speedFactor;
    const index = Math.floor(Math.random() * state.numOfDots)
    let isBooster = false;
    let isSlowBooster = false;
    let isPenalty = false;
    let color = state.targetColor;
    let targetIcon = targetIcons[Math.floor(targetIcons.length * Math.random())]
    let value = Math.round((state.targetMaxSize - randomSize) / state.targetMinSize) + 1;
    if (randomSize <= state.boosterMaxSize && Math.random() < state.boosterProbability) {
        isBooster = true;
        targetIcon = GiftIcon
        value += 10
        // color = 'blue';
    } else if (randomSize <= state.boosterMaxSize && Math.random() < state.slowBoosterProbability) {
        isSlowBooster = true;
        targetIcon = BrokenGrassIcon
        value /= value
        // color = 'green';
    } else if (Math.random() < state.penaltyProbability) {
        isPenalty = true;
        targetIcon = BombIcon
        value -= 10
        // color = 'black';
    }

    // const scoreIncrement = Math.round((state.targetMaxSize - randomSize) / state.targetMinSize) + 1;

    state.targets[index] = {
        size: randomSize,
        color: color,
        position: {
            x: xPos,
            y: -randomSize
        },
        speed: randomSpeed,
        isBooster: isBooster,
        isSlowBooster: isSlowBooster,
        isPenalty: isPenalty,
        icon: targetIcon,
        value
    }

};


const removeTarget = (index: number | string) => {
    delete state.targets[index]
}

const updateTargetPositions = () => {
    for (const [key, target] of Object.entries(state.targets)) {
        if (Math.abs(target.position.y) >= state.sceneCanvas.height - 50)
            removeTarget(key)
        else {
            (target.position.y += target.speed * state.speedMultiplier)
        }
    }
}

const incrementScore = (event:any, index:any) => {
    const target = state.targets[index];
    const currentTime = performance.now();
    const timeBetweenClicks = currentTime - state.lastClickTime;
    state.clickTimes.push(timeBetweenClicks);
    if (state.clickTimes.length > 20) {
        state.clickTimes.shift();
    }
    state.lastClickTime = currentTime;
    event.target.classList.add('activated')
    if (target.isBooster) {
        event.target.classList.add("explode-warning")
    } else if (target.isSlowBooster) {
        state.speedMultiplier /= 2
        setTimeout(resetTargetSpeed, state.slowDuration);
        event.target.classList.add("explode-info")
    } else if (target.isPenalty) {
        event.target.classList.add("explode-danger")
    } else {
        event.target.classList.add("explode-success")
    }
    state.score += target.value;
    // removeTarget(index)
    detectBotBehavior();
};

const resetTargetSpeed = () => state.speedMultiplier = 1

const detectBotBehavior = () => {
    const averageClickTime = calculateAverageClickTime();

    if (averageClickTime < 50) {
        // alert('Bot Detected! Suspicious clicking behavior.');
        endGame();
    }
};

const calculateAverageClickTime = () => {
    if (state.clickTimes.length === 0) return 0;
    const totalClickTime = state.clickTimes.reduce((sum, clickTime) => sum + clickTime, 0);
    return totalClickTime / state.clickTimes.length;
};

const endGame = () => {
    clearInterval(timer);
    clearInterval(fallInterval);
    clearInterval(spawnInterval);
    state.gameStarted = false;
};

onMounted(() => {
    if (scene_canvas.value) {
        const sceneCanvasRect = scene_canvas.value.getBoundingClientRect();
        state.sceneCanvas.width = sceneCanvasRect.width;
        state.sceneCanvas.height = sceneCanvasRect.height;
    }
})

</script>


<style>
.convas_container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    isolation: isolate;

    background-size: cover;
    background-repeat: no-repeat;
}

.target {
    position: absolute;
    border-radius: 50px;
    cursor: pointer;
    user-select: none;
}

.target img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: contain;
}

.target .targeted-income {
    position: absolute;
    left: 50%;
    top: 50%;
    content: '+11';
    transform: translate(-50%, -50%);
    font-size: 1rem;
    font-weight: 900;
    display: none;
    border-radius: inherit;
    aspect-ratio: 1;
    border: none;
}

.target.activated .targeted-income {
    display: block;
}

.start-button {
    position: absolute;
    left: 50%;
    bottom: 60px;
    transform: translate(-50%, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    border-radius: 50px;
    cursor: pointer;
    font-size: 1.3em;
    color: white;
    font-weight: 600;
    overflow: hidden;
    min-width: max-content;
    padding-inline: 1rem;
    width: 90%;
    border: none;
    line-height: 3;
}


.scene_container {
    position: relative;
    flex: 1;
    overflow: hidden;
    width: 100%;
}

.explode-success {
    animation: explode 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
    background: rgba(0, 128, 0, 0.5);
    border-radius: 50px
}

.explode-danger {
    animation: explode 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
    background: rgb(141, 1, 1);
    border-radius: 50px
}

.explode-danger .targeted-income {
    color: rgb(141, 1, 1);
}

.explode-warning {
    animation: explode 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
    background: rgb(141, 111, 1);
    border-radius: 50px
}

.explode-warning .targeted-income {
    color: rgb(141, 111, 1);
}

.explode-info {
    animation: explode 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
    background: rgb(1, 141, 127);
    border-radius: 50px
}

.explode-info .targeted-warning {
    color: rgb(1, 141, 127);
}


@keyframes explode {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(3);
        opacity: 0;
        display: none !important;
    }
}


.leaf {
    position: absolute;
    width: 20px;
    height: 20px;
    /* Green color with transparency */
    border-radius: 50%;
    animation-fill-mode: both;
    animation: falling-leaf infinite alternate linear 2000ms;
}

@keyframes falling-leaf {
    0% {
        transform: rotate(0deg);
    }

    50% {
        transform: rotate(10deg) rotateX(20deg);
    }

    100% {
        transform: rotate(20deg) rotateX(40deg);
    }
}
</style>