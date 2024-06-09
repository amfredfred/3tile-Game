<!-- WebSocketDialog.vue -->
<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
            <v-card-title class="headline">Connecting to WebSocket</v-card-title>
            <v-card-text>
                Please wait while we establish a connection...
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text="" @click="cancelConnection">
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { useWebSocketStore } from '@/stores/websocket';
import { ref, watch } from 'vue';

const dialog = ref(true);
const webSocketStore = useWebSocketStore();

watch(() => webSocketStore.isConnected, (newVal) => {
        dialog.value = newVal;
});

const cancelConnection = () => {
    webSocketStore.closeWebSocket();
    dialog.value = false;
};
</script>
