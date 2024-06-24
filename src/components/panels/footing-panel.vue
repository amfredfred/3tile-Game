<template>

    <nav class="nav-bar">
        <div class="nav-inner">
            <!-- <div class="white-bar"></div> -->
            <RouterLink active-class="active" to="/" class="nav-link">
                <span class="pi pi-dollar "></span>
                <strong class="link-title">Farm</strong>
            </RouterLink>
            <RouterLink active-class="active" to="/tasks" class="nav-link">
                <span class="pi pi-book "></span>
                <strong class="link-title">Tasks</strong>
            </RouterLink>
            <RouterLink active-class="active" to="/frens" class="nav-link">
                <span class="pi pi-users "></span>
                <strong class="link-title">Frens</strong>
            </RouterLink>
            <RouterLink active-class="active" to="/rewards" class="nav-link">
                <span class="pi pi-gift "></span>
                <strong class="link-title">Rewards</strong>
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
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    pointer-events: all;
    backdrop-filter: blur(60px);
    background: var(--container-bg);
    padding-block: 1rem !important;
}


/* .white-bar {
    width: 60%;
    border-radius: 50px;
    background: rgb(29, 25, 25);
    height: 10px;
    aspect-ratio: 1;
}  */

.nav-bar {
    user-select: none;
    pointer-events: none;
    width: 100%;
    margin-top: auto;
    /* box-shadow: 0 0 1px  white; */
    color: aliceblue;
    z-index: 1;
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
    color: rgb(132, 126, 126);

    position: relative;
}

.nav-link.active {
    color: rgb(255, 255, 255);
    pointer-events: none;
    outline: none;
}

.link-title {
    font-size: .7rem
}
</style>
