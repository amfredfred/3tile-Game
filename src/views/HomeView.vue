<template>
  <home-layout>
    <template #content>
      <div class="container">
        <div class="flex-container">
          <points-modal />
          <!-- <league-modal /> -->
        </div>

        <farming-button />

        <!-- <trivia-component /> -->
        <!-- <game-cards-grid /> -->
        <!-- :particlesInit="particlesInit" :particlesLoaded="particlesLoaded" -->
      </div>
    </template>
  </home-layout>
</template>


<script setup lang="ts">
</script>

<style>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow: hidden;
  isolation: isolate;
  padding-inline: .5rem;
  gap: 1rem;
  padding-inline: 2rem;
  padding-top: 2rem;
  padding-bottom:1rem
}

.flex-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
}

/* .container::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100%;
  width: 100%;
  transform: translate(-50%, -50%);
  z-index: -1;
  backdrop-filter: blur(320px);
}

.container::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  background: linear-gradient(to top left, rgb(255, 157, 0), rgb(117, 4, 38));
  height: 50%;
  width: 50%;
  transform: translate(-50%, -50%);
} */
</style>