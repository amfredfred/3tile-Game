<script setup lang="ts">
import { RouterView } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { useWebSocketStore } from './stores/websocket';
import { apiCall } from '@/configs/api';
import PreloaderDialog from './OutsideBox/PreloaderDialog.vue';
import { useMainStore } from './stores/mainstore';
import type { IProfile } from './interfaces/IProfile';
import MaintenanceView from '@/views/Feedback/MaintenanceView.vue';
import OnboardingView from '@/views/Onboading/OnboardingView.vue'


import WebApp from '@twa-dev/sdk';
import type { AdminSettings } from './interfaces';

const webSocketStore = useWebSocketStore();
const mainStore = useMainStore();
const isFullyLoaded = ref(false);
const isError = ref(false);
const isRealoading = ref(false)
const isUserNotFound = ref(false)

const CreateConnection = async () => {
  WebApp.setHeaderColor('secondary_bg_color')
  WebApp.ready()

  try {
    const [configsResponse, userResponse] = await Promise.allSettled([
      apiCall<{ admin_settings: AdminSettings, message: string }>('administration'),
      apiCall<{ user: IProfile, message: string }>('authenticate')
    ])

    if (configsResponse.status === 'fulfilled') { 
      mainStore.setAdminSettings(configsResponse.value.data.admin_settings)
    }else {
      throw new Error(configsResponse.reason);
    }
    if (userResponse.status === 'fulfilled') {
      mainStore.setIsNew(userResponse.value.data.user.is_new)
      mainStore.setIsGuestState(false);
    } else {
      throw new Error(userResponse.reason);
    }
    await webSocketStore.initializeWebSocket()
    isFullyLoaded.value = true;
    isError.value = false;
    isUserNotFound.value = false
  } catch (error) {
    if ((error as any)?.response?.status == 401) {
      isError.value = false;
    } else if ((error as any)?.response?.status == 404) {
      isUserNotFound.value = true
    }
    else {
      isError.value = true;
    }
    isFullyLoaded.value = false;
    mainStore.setIsGuestState(true);
  }
};

const isNewUser = computed(() => mainStore.is_new)

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
          id: 1497831921,
        },
      },
    },
  };

  await CreateConnection();
});
</script>

<template>
  <div class="main-container">
    <span v-if="isUserNotFound" style="position: fixed; transform: translate(-50%, -50%);left: 50%; top: 50%;">
      USER NOT FOUND
    </span>
    <OnboardingView v-motion-slide-visible-once-top v-else-if="isNewUser" />
    <div v-else class="contents-wrapper">
      <MaintenanceView @reload="reload" v-if="isError" :isReloading="isRealoading" />
      <div class="main-views" v-else>
        <PreloaderDialog v-if="!isFullyLoaded" />
        <RouterView v-else v-motion-slide-left />
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