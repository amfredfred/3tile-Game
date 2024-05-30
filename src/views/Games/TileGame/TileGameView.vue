<template>
    <div class="convas_container">
        <explossive-countdown v-if="sessionData.timeLestBeforeContinue"
            :countdown="sessionData.timeLestBeforeContinue" />

        <div class="tiles_container" ref="scene_container" @click="handleContainerClick">
            <div :class="['total-points-to-earn']">
                <img class="icon" :src="coinIcon" alt="Coin Icon">
                <span :class="['', { danger: sessionData.myScore < 0 }]"> {{ sessionData.myScore }}</span>
            </div>
            <video ref="video_background_ref" autoplay loop muted :src="sessionData.videoBackground"
                class="background-inimated"></video>
            <tile-dot v-for="(tile, index) in sessionData.myTiles" :key="index" :tile="tile" :index="index"
                :isActive="sessionData.eachState[index]" @tile-click="handleTileClick" />
            <audio ref="music" :src="sessionData.musicSource"></audio>

            <span v-if="sessionData.gameState === 'idle'" @click="playGame()"
                class="neon-text-flicker start-button neon-apply neon-pink"> Start </span>

            <v-bottom-sheet :absolute="true" v-model="sessionData.showFailedGameModal">
                <div class="bottom-sheet-container" :style="{ width: `${sessionData.bgCanvas.width}px` }">
                    <img :src="waitIcons" alt="" class="game-controller-icon">
                    <h1 style="font-weight: 900;">UhhUh 😒</h1>
                    <p style="text-align: center;">
                        Your actions have paused the game.
                        <br />You made
                        <strong class="neon-text-flicker">{{ sessionData.invalidTapCount }}</strong> invalid
                        <strong class="neon-text-flicker">{{ sessionData.invalidTapCount === 1 ? 'tap' : 'taps'
                            }}</strong>.
                    </p>
                    <div class="flex" style="width: 100%">
                        <button @click.stop="continueGame" class="neon neon-apply neon-purple game-option-button">
                            <v-progress-circular size="15" v-if="sessionData.isContinueAccested" color="primary"
                                indeterminate />
                            <strong v-else>Continue</strong>
                        </button>
                    </div>
                </div>
            </v-bottom-sheet>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue';
import { background_dicts1, box_shadows_dict, neon_classes } from '@/assets/colors';
import musicSource from '@/uploads/audio/music.mp3';
import waitIcons from '@/assets/icons/wait-icon.png';
import coinIcon from '@/assets/icons/coin-icon.png';
import videoBackground from '@/uploads/videos/sci-fi-neon-corridor_2017028.mp4';
import { adsGramController, type IShowPromiseResult } from '@/stores/ads_gram';
import { wsocket } from '@/configs/wsocket';
import type { TileSessionData } from './types';
import { useMainStore } from '@/stores/mainstore';
const _store = useMainStore()
const socket = wsocket('');

const numOfTiles = 4;
const scene_container = ref<HTMLDivElement | null>(null);
const video_background_ref = ref<HTMLVideoElement | null>(null);
const music = ref<HTMLAudioElement | null>(null);

const sessionData = reactive<TileSessionData>({
    start_timestamp: Date.now(),
    end_timestamp: null,
    score: 0,
    invalidTaps: 0,
    gameState: 'idle',
    musicSource,
    videoBackground,
    adsLoadingResult: {},
    myScore: 0,
    eachState: Array(numOfTiles).fill(false),
    myTiles: Array(numOfTiles).fill({}),
    pointsToEarn: 3,
    audioDuration: 0,
    audioProgress: 0,
    mathSigns: ['-', '', '', ''],
    bgCanvas: { width: 0, height: 0 },
    showFailedGameModal: false,
    timeLestBeforeContinue: 0,
    invalidTapCount: 0,
    isContinueAccested: false,
});

const intervalTmp = ref()


const createBlock = (index: number) => {
    const randomBackground = background_dicts1[Math.floor(Math.random() * background_dicts1.length)];
    const randomSign = sessionData.mathSigns[Math.floor(Math.random() * sessionData.mathSigns.length)];
    const tileShadow = box_shadows_dict[Math.floor(Math.random() * box_shadows_dict.length)];
    const neon_class = neon_classes[Math.floor(Math.random() * neon_classes.length)];

    const block = {
        index,
        appearPos: Math.floor(Math.random() * 4),
        width: (sessionData.bgCanvas.width / 3),
        height: 120,
        color: randomBackground,
        live: true,
        x: 0,
        y: -120,
        points: 0,
        aspectRatio: 0,
        shadow: tileShadow,
        class: `${neon_class} neon-apply`,
    };

    if (sessionData.pointsToEarn > 0) {
        const point = Math.floor((sessionData.audioDuration) / 100);
        block.points = Math.floor(Math.random() * Number(`${randomSign}${(point * (randomSign !== '-' ? 77 : 777))}`));
    }

    sessionData.eachState[index] = true;
    const bgRectWidth = sessionData.bgCanvas.width / 4;
    block.x = bgRectWidth * block.appearPos;

    return block;
};

const handleTileClick = (index: number) => {
    if (sessionData.eachState[index] && sessionData.gameState === 'playing') {
        afterRight(index);
    }
};

const handleContainerClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.classList.contains('tile') && sessionData.gameState === 'playing') {
        sessionData.invalidTapCount += 1;
        sessionData.invalidTaps = sessionData.invalidTapCount;
        if (sessionData.invalidTapCount >= 5) endGame();
    } else {
        if (sessionData.gameState === 'failed') {
            sessionData.invalidTapCount = 0;
            sessionData.showFailedGameModal = true;
        }
    }
};

const afterRight = (index: number) => {
    sessionData.myTiles[index].live = false;
    sessionData.eachState[index] = false;
    sessionData.myScore += Math.floor(sessionData.myTiles[index].points);
    sessionData.score = sessionData.myScore;
};

const upDateAndGeneBlock = () => {
    let atLeastOneActive = false;
    for (let i = 0; i < numOfTiles; ++i) {
        if (sessionData.eachState[i]) {
            sessionData.myTiles[i].y += 1.8;
            if (sessionData.myTiles[i].y > sessionData.bgCanvas.height - 50) {
                sessionData.myTiles[i].live = false;
                sessionData.eachState[i] = false;
                if (sessionData.myTiles[i].points > 0)
                    sessionData.myScore -= Number(Math.floor(sessionData.myTiles[i].points));
                sessionData.score = sessionData.myScore;
            }
            atLeastOneActive = true;
        }
    }

    if (!atLeastOneActive) {
        let myRand = Math.floor(Math.random() * numOfTiles);
        while (sessionData.eachState[myRand]) {
            myRand = Math.floor(Math.random() * numOfTiles);
        }
        sessionData.myTiles[myRand] = createBlock(myRand);
    }
};

const toggleGame = () => {
    if (sessionData.gameState === 'idle') {
        playGame();
    } else if (sessionData.gameState === 'failed') {
        restartGame();
    } else if (sessionData.gameState === 'paused') {
        continueGame();
    } else {
        pauseGame();
    }
};

const countDown = () => {
    const ms = 10000;
    sessionData.showFailedGameModal = false;
    sessionData.timeLestBeforeContinue = ms / 1000;
    sessionData.countdownInterval = setInterval(() => sessionData.timeLestBeforeContinue -= 1, 1000);
    sessionData.countdownTimeout = setTimeout(() => playGame(), ms + 500);
};

const continueGame = () => {
    sessionData.isContinueAccested = true;
    adsGramController.show().then((result: IShowPromiseResult) => {
        if (result.done) {
            countDown();
        } else {
            console.log({ result });
        }
    }).catch((result: IShowPromiseResult) => {
        if (result.error) {
            countDown();
        }
    }).finally(() => {
        sessionData.isContinueAccested = false;
    });
};

const restartGame = () => {
    sessionData.eachState.fill(false);
    sessionData.myTiles.fill({} as any);
    sessionData.myScore = 0;
    if (music.value) {
        music.value.currentTime = 0;
        music.value.play();
    }
    playGame();
};

const pauseGame = () => {
    if (music.value) music.value.pause();
    if (intervalTmp.value) clearInterval(intervalTmp.value);
    sessionData.gameState = 'paused';
};

const playGame = async () => {
    if (sessionData.countdownInterval) clearInterval(sessionData.countdownInterval);
    if (sessionData.countdownTimeout) clearTimeout(sessionData.countdownTimeout);
    intervalTmp.value = window.setInterval(upDateAndGeneBlock, 2);
    if (video_background_ref.value) await video_background_ref.value?.play();
    if (music.value) music.value.play();
    sessionData.gameState = 'playing';
    sessionData.start_timestamp = Date.now();
};

const endGame = () => {
    if (music.value) music.value.pause();
    if (intervalTmp.value) clearInterval(intervalTmp.value);
    sessionData.gameState = 'failed';
    sessionData.showFailedGameModal = true;
    sessionData.end_timestamp = Date.now();
};

const finishedGame = () => {
    if (intervalTmp.value) clearInterval(intervalTmp.value);
    sessionData.gameState = 'finished';
    sessionData.end_timestamp = Date.now();
};

onMounted(() => {
    if (scene_container.value) {
        const bgCanvasRect = scene_container.value.getBoundingClientRect();
        sessionData.bgCanvas.width = bgCanvasRect.width;
        sessionData.bgCanvas.height = bgCanvasRect.height;
    }

    if (video_background_ref.value) {
        video_background_ref.value.load();
    }

    if (music.value) {
        music.value.addEventListener('loadedmetadata', () => {
            sessionData.audioDuration = Math.floor(music.value!.duration);
        });
        music.value.addEventListener('timeupdate', () => {
            sessionData.audioProgress = Math.floor(music.value!.currentTime);
        });
        music?.value.addEventListener('ended', () => {
            finishedGame();
        });
    }
});

watch(() => sessionData.gameState, (newState) => {
    sessionData.gameState = newState;
});

watch(() => sessionData?.score, () => {
    socket.send('game', sessionData);
    const instance = socket?.instance;
    if (instance && instance.onmessage) {
        instance.onmessage = (event) => {
            _store?.setAccountOverview({ ..._store?.overview, 'totalScore': event?.data })
        };
    }
})
</script>

<style scoped>
:root {
    --color: rgb(0, 242, 255);
}

.convas_container {
    position: relative;
    width: 100%;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    isolation: isolate;
}

.start-button {
    position: absolute;
    left: 50%;
    bottom: 100px;
    transform: translate(-50%, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    border-radius: 150px/60px;
    aspect-ratio: 16/9;
    cursor: pointer;
    font-size: 1.6em;
    color: white;
    font-weight: 900;
    overflow: hidden;
    min-width: max-content;
    padding-inline: 1rem;

    background: var(--neon-glow);
}

.background-inimated {
    width: 100%;
    height: 100%;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    object-fit: fill;
    -o-object-fit: fill;
    background: rgb(0, 33, 45);
    pointer-events: none;
}

.tiles_container {
    position: relative;
    flex: 1;
    border-top: 4px solid rgb(0, 242, 255);
    border-radius: 15px 15px 0 0;
    box-shadow: 0 20px 50px rgb(0, 242, 255);
    overflow: hidden;
}

.tiles_container::after,
.bottom-sheet-container::after {
    content: '';
    position: absolute;
    top: -1px;
    left: 50%;
    width: 100%;
    height: 5px;
    background: rgb(0, 242, 255);
    border-radius: 0 0 15px 15px;
    animation: power_string 3s infinite both;
    transform: translateX(-50%);
    z-index: 2;
}

@keyframes power_string {

    0%,
    100% {
        width: 100%;
    }

    10%,
    90% {
        width: 300px;
    }

    50% {
        width: 50%;
    }
}

.flex {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    justify-content: space-between;
}

.total-points-to-earn {
    padding: 5px 15px;
    font-weight: bolder;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: .2rem;
    border-radius: 50px;
    backdrop-filter: blur(10px);
    position: absolute;
    transform: translate(-50%, 0);
    left: 50%;
    top: 80px;
    z-index: 21;
}

.bottom-sheet-container {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    margin-inline: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    backdrop-filter: blur(50px);
    background: rgba(0, 0, 0, 0.1);
    overflow: hidden;
    box-shadow: 0 20px 50px rgb(0, 242, 255);
}

.game-controller-icon {
    width: 100px;
    aspect-ratio: 1;
}

.total-points-to-earn span {
    font-weight: 900;
    font-size: 2em;
}

.game-option-button {
    height: auto;
    cursor: pointer;
    flex-grow: 1;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    display: flex;
    padding: 13px;
    font-weight: 900;
    border: none;
    color: aliceblue;
    text-transform: uppercase;
}
</style>
