<template>
  <home-layout>
    <template #content>
      <div class="container">
        <!-- <heading-panel /> -->
        <div>&bullet;</div>
        <account-balance-tab />
        
        <!-- <game-cards-grid /> -->
        <footing-panel />
      </div>
    </template>
  </home-layout>
</template>


<script setup lang="ts"></script>

<style>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow: hidden;
  isolation: isolate;
  background: rgb(0, 0, 0);
  padding-inline: .5rem;
}

.container::before {
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
  z-index: -2;
}
</style>