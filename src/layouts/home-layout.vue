<template>
    <div class="layout" :style="{ background: `url(${WallpaperFireTree})` }">
        <heading-panel />
        <div class="container-main">
            <slot name="content" />
        </div>
        <slot name="navigation" />
    </div>
</template>

<script setup lang="ts">
import WallpaperFireTree from '@/assets/photos/red-rose-valentines-day-art-flower-moments-b-w.jpg'
</script>

<style scoped>
.layout {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100dvh;
    overflow: hidden;
    isolation: isolate;
    justify-content: space-between;
    position: relative;
    background-size:cover !important;
    background-repeat: no-repeat !important;
    background-position:center !important;
}

.layout::after,
.layout::before {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 40%;
    content: '';
    width: 100%;
    height: 100%;
    z-index: -2;
}

.layout::before {
    background: transparent;
    left: 50%;
    top: 50%;
    content: '';
    z-index: -1;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(100px) grayscale(.1);
}

.container-main {
    width: 100%;
    overflow: hidden;
    height: 100%;
}
</style>