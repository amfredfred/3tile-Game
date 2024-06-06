<template>
    <div class="game-cards-container "> 
        <div :key="item.name" v-for="item in items" class="game-card-item">
            <img class="game-card-photo" :src="item.photo" alt="">
            <span class="game-card-name neon-text-flicker ">{{ item.name }}</span>
            <RouterLink :to="`/${item.path}`">
                <span class="pi pi-play play-icon icon"></span>
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import TileGamePhoto from '@/uploads/photos/3tile-game-photot.jpg'
import RushDotGamePhoto from '@/uploads/photos/blue-triangles.jpg'
import { RouterLink } from 'vue-router';

interface IGameCardItem {
    name: string,
    photo: string,
    path: string
}

const items: IGameCardItem[] = [
    { name: '3Tile', photo: TileGamePhoto, path: '3tile-game' },
    { name: 'Rush Dot', photo: RushDotGamePhoto, path: 'rush-dot-game' }
]
</script>

<style coped>
.game-cards-container {
    width: 100%;
    border-radius: 20px 20px 0 0;
    overflow: auto;
    position: relative;
    isolation: isolate;
    z-index: -1;
    border-radius: 20px 20px 0 0;
    gap: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow-x: hidden;
    padding: .5rem;
    padding-top: 0;
    margin-top: 1rem;
    user-select: none;
}

.game-card-photo {
    width: 100%;
    height: 100%;
    object-fit: fill;
}

.game-card-name {
    position: absolute;
    left: 10px;
    bottom: 10px;
    padding: .5rem 1.7rem;
    backdrop-filter: blur(100px);
    -webkit-backdrop-filter: blur(100px);
    border-radius: 10px;
    overflow: hidden;
    font-weight: 900;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.play-icon {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: .5rem 1.7rem;
    backdrop-filter: blur(100px);
    -webkit-backdrop-filter: blur(100px);
    border-radius: 50px;
    overflow: hidden;
    font-weight: 900;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.game-card-item {
    border-radius: 10px;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(50% - .5rem);
    overflow: hidden;
    cursor: pointer;
    position: relative;
}

.game-cards-container::before,
.game-cards-container::after {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    content: '';
}

.game-cards-container::before {
    z-index: -2;
    background: rgb(0, 66, 101);
    width: 100px;
    aspect-ratio: 1;
    border-radius: 60px/400px;
    left: 5%;
    top: 5%;
}

.game-cards-container::after {
    z-index: -1;
    backdrop-filter: blur(100px);
    -webkit-backdrop-filter: blur(100px);
    width: 100%;
    height: 100%;
    top: 10%;
} 
</style>