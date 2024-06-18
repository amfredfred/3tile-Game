<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useMainStore } from '@/stores/mainstore';
import { onMounted, ref } from 'vue';

const _store = useMainStore()

onMounted(() => {

  console.log((window as any).Telegram);

  ((window as any).Telegram) = {
    WebApp: {
      initDataUnsafe: {
        user: {
          id: 6033850568
        } as any
      } as any
    }
  } as any

  webSocketStore.initializeWebSocket().then(() => {
    isWebSocketConnected.value = true;
  }).catch((error) => {
    error
    // console.error('Failed to initialize WebSocket:', error);
    // Handle the error accordingly, e.g., show an error message to the user
  });

})

import WebSocketDialog from '@/OutsideBox/WebSocketDialog.vue';
import { useWebSocketStore } from './stores/websocket';

const webSocketStore = useWebSocketStore();
const isWebSocketConnected = ref(webSocketStore.isConnected);
</script>

<template>
  <div class="main-container">
    <div class="contents-wrapper">
      <WebSocketDialog v-if="!isWebSocketConnected" />
      <RouterView v-else />
    </div>
  </div>
</template>


<style scoped>
.main-container {
  position: relative;
  height: 100%;
  width: 100vw;
  width: 498px;
  max-width: 100dvw;
  overflow: hidden;
  flex-wrap: wrap;
  margin-inline: auto;
  background: black;
  /* border-radius: 20px 20px 0 0; */
}

.contents-wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden auto;
}
</style>