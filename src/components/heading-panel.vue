<template>
    <nav class="nav-bar">
        <div v-if="!_store.user">
            Authenticate
        </div>
        <div v-else class="nav-inner">
            <account-photo />
            <account-name />
            <!-- <account-name /> -->
            <div class="items-right">
                <points-modal :points="4" />
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useMainStore } from '@/stores/mainstore';

const _store = useMainStore()
</script>


<style scoped>
.nav-bar,
.nav-inner {
    width: 100%;
    background: rgb(33, 33, 33);
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: .6rem;
}

.nav-inner {
    padding: 10px;
}

.items-right {
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: .6rem;
}
</style>
