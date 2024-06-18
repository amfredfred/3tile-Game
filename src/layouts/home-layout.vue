<template>
    <div class="layout">
        <!-- <heading-panel /> -->
        <vue-particles id="tsparticles" class="particles" :options="ParticleConst" />
        <div class="container-main">
            <slot name="content" />
        </div>
        <footing-panel />
        <Toast />
    </div>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';
import { ParticleConst } from '@/configs/particles-options';  
</script>

<style scoped>
.layout {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100dvh;
    overflow: hidden;
    background: rgb(9, 9, 11);
    position: relative;
    isolation: isolate;
}

.container-main {
    width: 100%;
    height: 100%;
    overflow:hidden auto;
}

.particles {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    z-index: -2;
}
</style>