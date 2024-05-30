<template>
    <div :class="['tile neon', { active: isActive, [tile?.class]: true }]" :style="tileStyle(tile)"
        @click.exact="handleClick" :data-content="tile?.points">
    </div>
</template>

<script setup lang="ts">
import {  defineEmits } from 'vue';
const props = defineProps({
    tile: Object,
    index: Number,
    isActive: Boolean,
});

const emits = defineEmits(['tile-click']);

const handleClick = () => {
    emits('tile-click', props.index); // Emitting the 'tile-click' event with the index
};

const tileStyle = (tile: any) => {
    return {
        // boxShadow: tile.shadow,
        transform: `translate(${tile.x}px, ${tile.y}px)`,
        background: tile.color,
        display: tile.live ? 'flex' : 'none',
        width: `${tile.width - 60}px`,
    };
};
</script>

<style scoped>
.tile {
    position: absolute;
    pointer-events: all;
    /* Enable click events*/
    border-radius: 50px;
    z-index: 1;
    aspect-ratio: 9/16;
    overflow: hidden;
    display: inline-flex;
    flex-direction: column;
    font-family: system-ui, sans-serif;
    justify-content: space-around;
    background: var(--neon-glow);
}


.tile:active {
    background: rgb(228, 5, 146) !important;
}

.tile::after {
    margin: auto;
    aspect-ratio: 1;
    text-align: center;
    vertical-align: middle;
    color: rgb(240, 243, 255);
    font-weight: 900;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    font-size: 1.7rem;
    content: attr(data-content);
    width: max-content;
}

.tile::before {
    margin: auto;
    position: absolute;
    transform: translate(-50%, -50%) rotate(45deg);
    left: 50%;
    top: 50%;
    font-size: 1.2rem;
    content: '';
    width: 70%;
    aspect-ratio: 1;
    border-radius: 50px;
    animation: infinite rotating_animation linear 3s;
    border-top: solid thick currentColor;
}

.glow-effect {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.7),
        0 0 40px rgba(255, 255, 255, 0.7),
        0 0 60px rgba(255, 255, 255, 0.7),
        0 0 80px rgba(255, 255, 255, 0.7);
    animation: glow-animation 1s ease-in-out infinite alternate;
}

@keyframes glow-animation {
    from {
        opacity: 1;
    }

    to {
        opacity: 0.5;
    }
}

@keyframes rotating_animation {
    from {
        transform: translate(-50%, -50%) rotate(0deg);
    }

    to {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}
</style>
