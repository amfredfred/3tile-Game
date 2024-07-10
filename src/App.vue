<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useWebSocketStore } from './stores/websocket';
import { apiCall } from '@/configs/api';
import PreloaderDialog from './OutsideBox/PreloaderDialog.vue';
import { useMainStore } from './stores/mainstore';
import type { IProfile } from './interfaces/IProfile';
import MaintenanceView from '@/views/Feedback/MaintenanceView.vue';

const webSocketStore = useWebSocketStore();
const mainStore = useMainStore();
const isFullyLoaded = ref(false);
const isError = ref(false);
const isRealoading = ref(false)
const isUserNotFound = ref(false)

const CreateConnection = async () => {
  try {
    const userResponse = await apiCall<{ user: IProfile, message: string }>('authenticate');
    if (userResponse.status !== 200) {
      throw new Error(userResponse?.data?.message);
    }
    mainStore.setIsGuestState(false);
    webSocketStore.initializeWebSocket().then(() => {
      isFullyLoaded.value = true;
      isError.value = false;
    }).catch(() => {
      throw new Error("Websocket Error")
    });
  } catch (error) {
    if ((error as any)?.response?.status == 401) {
      isUserNotFound.value = true
    } else {
      isError.value = true;
    }
    isFullyLoaded.value = false;
    mainStore.setIsGuestState(true);
  }
};

const reload = async () => {
  isRealoading.value = true
  await CreateConnection()
  isRealoading.value = false
}

onMounted(async () => {
  (window as any).Telegram = {
    WebApp: {
      initDataUnsafe: {
        user: {
          id: 12345678909232,
        },
      },
    },
  };

  await CreateConnection();
});
</script>


<template>
  <div class="main-container">
    <div class="contents-wrapper">
      <MaintenanceView @reload="reload" v-if="isError" :isReloading="isRealoading" />
      <div class="main-views" v-else>
        <PreloaderDialog v-if="!isFullyLoaded" />
        <RouterView v-else />
      </div>
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

.main-views {
  width: 100%;
}
</style>