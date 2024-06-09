<template>

    <nav class="nav-bar">
        <div class="nav-inner">
            <div class="white-bar"></div>
            <RouterLink to="/" class="nav-link">
                <span class="pi pi-home "></span>
                <strong class="link-title">Home</strong>
            </RouterLink>
            <RouterLink to="/" class="nav-link">
                <span class="pi pi-home "></span>
                <strong class="link-title">Tasks</strong>
            </RouterLink>
            <RouterLink to="/" class="nav-link">
                <span class="pi pi-home "></span>
                <strong class="link-title">Frens</strong>
            </RouterLink>
            <RouterLink to="/" class="nav-link">
                <span class="pi pi-home "></span>
                <strong class="link-title">Home</strong>
            </RouterLink>
            <!-- <account-name /> -->
            <!-- <account-name /> -->
        </div>
    </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>


<style scoped>
.nav-inner {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    border-radius: 5px;
    pointer-events: all;
}

/* 
.white-bar {
    width: 60%;
    border-radius: 50px;
    background: white;
    height: 10px;
} */

.nav-bar {
    padding-top: 0;
    user-select: none;
    pointer-events: none;
    width: 100%;
    margin-top: auto;
    background: rgb(17, 11, 11);
    color: aliceblue;
}

.nav-inner {
    padding: 10px;
}

span.pi {
    font-size: 1.4em;
}


.nav-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
}

.link-title {
    font-size: .7rem
}
</style>
