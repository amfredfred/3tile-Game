<template>
  <home-layout>
    <template #content>
      <div class="container">
        <game-cards-grid />
        <account-balance-tab />
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
  padding-inline: .5rem;
}
</style>