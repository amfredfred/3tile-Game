<template>
    <div class="tasks-wrapper">
        <div class="coming-soon-content" v-motion-fade-visible>
            <div
                style="display: flex; align-items: center; justify-content: space-between;position: sticky; top: 0; z-index: 2; background: black; border-bottom: solid thin grey;">
                <v-tabs v-model="tab" theme="dark">
                    <v-tab :prepend-icon="'pi pi-gift'" value="tab-rewards">REWARDS</v-tab>
                    <v-tab :prepend-icon="'pi pi-list'" value="tab-tasks">TASKS</v-tab>
                </v-tabs>
            </div>

            <v-tabs-window v-model="tab">
                <v-tabs-window-item value="tab-rewards">
                    <template v-for="(item, index) in Array.from({ length: 5 })" :key="index">
                        <v-skeleton-loader style="background: transparent; margin-block: .5rem;" theme="dark"
                            type="list-item-avatar-three-line" v-motion-slide-visible-left />
                    </template>
                </v-tabs-window-item>
                <v-tabs-window-item value="tab-tasks">
                    <template v-for="(item, index) in Array.from({ length: 4 })" :key="index">
                        <v-skeleton-loader style="background: transparent; margin-block: .5rem;" theme="dark"
                            type="list-item-avatar-three-line" v-motion-slide-visible-right />
                    </template>
                </v-tabs-window-item>
            </v-tabs-window>

            <div style="padding: 1rem;">
                <strong v-motion-pop :key="countdownMessage" style="text-transform: uppercase; font-weight: bolder;">
                    <span style="color: brown;">(SOON)</span> {{ countdownMessage }}
                </strong>
                <p>
                    Our exciting feature "Rewards/Tasks" is on it`s way.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const tab = ref(null)
const countdownMessages = [
    "In 40 Days?",
    "In 102 Days? Nope.",
    "Another 12 Days? Nope."
];

const countdownMessage = ref(countdownMessages[0]);
const respawnInterval = ref<any>(null)

const props = defineProps({
    isInViewPort: {
        type: Boolean,
        required: true
    }
})

watch(() => [props.isInViewPort], ([current]) => {
    if (current) {
        console.log('Activation turned on');
        respawnInterval.value = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * countdownMessages.length);
            countdownMessage.value = countdownMessages[randomIndex];
        }, 3000);
    } else {
        console.log('Activation turned off');
        if (respawnInterval.value) {
            try {
                clearInterval(respawnInterval.value)
            } catch (error) {
                error
            }
        }
    }
})


</script>

<style scoped>
.tasks-wrapper {
    height: 100%;
    overflow: hidden auto;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    background: rgb(0, 0, 0);
}



.tasks-wrapper::-webkit-scrollbar {
    display: none;
}

.coming-soon-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.coming-soon-image {
    max-width: 100%;
    margin-top: 20px;
}
</style>
