<template>
    <div class="avatar-container">
        <a href="#">
            <img :src="LogoPointsSpeak" alt="">
        </a>
    </div>
</template>

<script setup lang="ts">
import LogoPointsSpeak from '@/assets/logo-points-speak.jpg'
</script>

<style scoped>
.avatar-container {
    width: 30px;
    padding: 1px;
    background: red;
    border-radius: 50px;
}


.avatar-container a {
    width: 100%;
    height: 100%;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.avatar-container a * {
    width: 100%;
    height: 100%;
    border-radius: 50px;
}
</style>