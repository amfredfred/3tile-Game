<template>
    <div class="layout">
        <heading-panel />
        <div class="container-main">
            <slot name="content" />
        </div>
        <footing-panel />
        <Toast />
    </div>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';
</script>

<style scoped>
.layout {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100dvh;
    overflow: hidden;
    position: relative;
    isolation: isolate;
    justify-content: space-between;
}

.layout::after,.layout::before{
    position:absolute;
    transform:translate(-50%, -50%);
    left:50%;
    top:40%;
    background:linear-gradient(to top left, rgb(255, 4, 255), red);
    content:'';
    width:50%;
    aspect-ratio:1;
    z-index:-2
}

.layout::before{
    background:transparent;
    left:50%;
    top:50%;
    content:'';
    z-index:-1;
    width:100%;
    height:100%;
    backdrop-filter:blur(200px);
}

.container-main {
    width: 100%;
    height: 100%;
    overflow:hidden auto;
    flex: 1;
}

</style>