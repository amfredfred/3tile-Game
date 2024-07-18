<!-- NavigationBar.vue -->
<template>
    <nav class="nav-bar">
        <div class="nav-inner">
            <v-button :class="['nav-link', activeIndex == 0 ? 'active' : '']" @click="goToSlide(0)" aria-label="Rush">
                <span class="pi pi-dollar"></span>
                <strong class="link-title">Redeem</strong>
            </v-button>
            <v-button :class="['nav-link', activeIndex == 1 ? 'active' : '']" @click="goToSlide(1)" aria-label="Frens">
                <span class="pi pi-users"></span>
                <strong class="link-title">Frens</strong>
            </v-button>
            <v-button :class="['nav-link', activeIndex == 2 ? 'active' : '']" @click="goToSlide(2)"
                aria-label="Rewards">
                <span class="pi pi-gift"></span>
                <strong class="link-title">Rewards</strong>
            </v-button>
        </div>
    </nav>
</template>

<script setup lang="ts">
defineProps<{ activeIndex: number, goToSlide: (index: number) => void }>();
</script>

<style scoped>
.nav-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    pointer-events: all;
    padding-block: 1rem !important;
    /* border-radius: 50px; */
    background: rgb(0, 0, 0);
}

.nav-bar {
    user-select: none;
    pointer-events: none;
    width: 100%;
    margin-top: auto;
    color: aliceblue;
    z-index: 1;
    position: relative;
}

.nav-bar::after {
    position: absolute;
    left: 50%;
    top: 0px;
    content: '';
    width: calc(100% - 2rem);
    padding: 1px;
    background: grey;
    transform: translate(-50%, 0);
    border-radius: 50px;
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
    color: rgb(195, 152, 152);
    position: relative;
    cursor: pointer;

    background: transparent;
    border: none;
}

.nav-link.active {
    color: rgb(255, 255, 255);
    pointer-events: none;
    outline: none;
    position: relative;
    /* background: rgba(73, 86, 86, 0.952) !important; */
}

.link-title {
    font-size: .7rem;
}
</style>