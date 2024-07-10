<template>
    <nav class="nav-bar">
        <div v-if="_store?.is_guest">
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

<script setup lang='ts'>
import { useMainStore } from '@/stores/mainstore';

const _store = useMainStore()
</script>


<style scoped>
.nav-bar{
    padding: 1rem;
}
.nav-bar,
.nav-inner {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: .6rem;
    z-index:4
}

.nav-inner {
    padding-inline: 1rem;
    border-radius: 50px;
    background: var(--container-bg);
}

.items-right {
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: .6rem;
}
</style>
