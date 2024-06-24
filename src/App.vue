<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import { useWebSocketStore } from './stores/websocket';
import { apiCall } from '@/configs/api';
import { useQuery } from '@tanstack/vue-query';
import PreloaderDialog from './OutsideBox/PreloaderDialog.vue';
import { useMainStore } from './stores/mainstore';
import type { IProfile } from './interfaces/IProfile';

const webSocketStore = useWebSocketStore();
const mainStore = useMainStore();
const isWebSocketConnected = ref(false);
const isFullyLoaded = ref(false);

const userResponse = useQuery({
  queryKey: ['user-authentication'],
  queryFn: async () => await apiCall<{ user: IProfile, message: string }>('authenticate'),
  retry: 2,
});

watch(() => userResponse.status.value, (newVal) => {
  if (newVal === 'success') {
    mainStore.setIsGuestState(false)
    // mainStore.setUser(userData);
  } else {
    mainStore.setIsGuestState(true)
  }
  isFullyLoaded.value = isWebSocketConnected.value;
});

watch(() => isWebSocketConnected.value, (newVal) => {
  if (newVal) {
    isFullyLoaded.value = userResponse.status.value === 'success';
  }
});

onMounted(() => {
  (window as any).Telegram = {
    WebApp: {
      initDataUnsafe: {
        user: {
          id: 1234567890,
        },
      },
    },
  };

  webSocketStore.initializeWebSocket()
    .then(() => {
      isWebSocketConnected.value = true;
    })
    .catch((error) => {
      console.error('WebSocket initialization error:', error);
    });
});
</script>

<template>
  <div class="main-container">
    <div class="contents-wrapper">
      <PreloaderDialog v-if="!isFullyLoaded" />
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