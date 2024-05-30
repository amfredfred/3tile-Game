<template>
    <div class="layout">
        <!-- <heading-panel /> -->
        <slot name="content" />
        <Toast />
        <!-- <footing-panel /> -->
    </div>
</template>

<script setup lang="ts">
import { wsocket } from '@/configs/wsocket';
import Toast from 'primevue/toast';

import { onBeforeMount } from 'vue';
import { useMainStore } from '@/stores/mainstore';
const _store = useMainStore()

onBeforeMount(() => {
    const socket = wsocket('');
    const instance = socket.instance;
    if (instance && instance.onopen) {
        instance.onopen = () => {
            socket.send('overview');
        };
        instance.onmessage = (messageEvent) => {
            const message = messageEvent.data;
            try {
                const data = JSON.parse(message);
                if (data?.overview) {
                    _store.setAccountOverview(data.overview);
                }
            } catch (error) {
                // console.error('Error decoding WebSocket message:', error);
            }
        };
    }
});

</script>

<style scoped>
.layout {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100dvh;
    overflow: hidden;
}
</style>