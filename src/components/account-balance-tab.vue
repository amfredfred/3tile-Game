<template>
    <section class="balance-section">
        <h1>Overview</h1>
        <p class="small-text">Yeeh, you are progressive. Please review the information below. 🌟</p>

        <div class="balance-container">
            <div class="flex-container" style="width: 100%;">
                <v-button class="balance-display-button" style="flex-grow: 1;">
                    <h1>$<v-number :from="0" :to="(0).toFixed(2)" /></h1>
                    <div class="flex-container" style="margin-left: auto; flex-grow: 0;">
                        <strong>CONNECT</strong>
                        <img :src="TONcon" class="icon">
                    </div>
                </v-button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import TONcon from '@/assets/icons/ton-icon.png'
</script>

<style scoped>
.balance-section {
    width: 100%;
    border-radius: 10px;
    padding: .5rem;
}

.balance-section h1 {
    color: white;
    font-weight: 800;
    font-size: 1.4em;
}

.balance-section .small-text {
    color: grey;
    font-size: small;
}

.balance-display-button {
    background: var(--vt-c-black);
    border: none;
    display: flex;
    align-items: center;
    gap: .4rem;
    border-radius: 4px;
    padding: 1rem;
}


.balance-container {
    width: 100%;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
}

.flex-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
    gap: 1rem;
}

.points-container {
    background-clip: text;
    -moz-background-clip: text;
    -webkit-background-clip: text;
}
</style>