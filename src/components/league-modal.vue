<template>
    <div class="league-button-container">
        <img :src="LeagueIcon" alt="" class="icon">
        <div class="league-content">
            <strong>Soon</strong>
            <!-- League -->
        </div>
    </div>
</template>

<script setup lang="ts">
import LeagueIcon from '@/assets/icons/league-icon.png'
</script>

<style scoped>
.league-button-container {
    display: flex;
    justify-content: center;
    padding: .5rem 1rem;
    width: max-content;

    border-radius: 10px;
    background: rgba(29, 31, 31, 0.5);
    height: 100%;
    gap: .4rem;
    height: 50px;
}

.league-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: 16px;
}
</style>