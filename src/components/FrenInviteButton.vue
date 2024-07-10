<template>
    <div class="fren-invite-button-container">
        <v-button @click="openBottomsheet" class="farming-button button-round" style="height: 45px;">
            InVITE
        </v-button>

        <v-button @click="openBottomsheet" class="button-round farming-button button-round"
            style="aspect-ratio: 1; width:45px;">
            <span class="pi pi-info-circle"></span>
        </v-button>

        <v-button class="button-round farming-button button-round" style="aspect-ratio: 1; width:45px;">
            <span class="pi pi-copy"></span>
        </v-button>


        <v-bottom-sheet :absolute="true" v-model="isBottomesheetVisible">
            <div class="bottom-sheet-container power_string">
                <h1 style="font-weight: 900;">Congrats</h1>
                <p style="text-align: center;">
                    {{ 'wonItem' }}
                </p>
                <v-button @click="isBottomesheetVisible = !isBottomesheetVisible"
                    :class="['farming-button button-round ']">
                    <strong class="">CLAIM REWARD</strong>
                </v-button>

            </div>
        </v-bottom-sheet>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const inviteUrl = ref("https://yourwebsite.com/referral?code=YOURCODE")
const isBottomesheetVisible = ref(false)

const openBottomsheet = () => {
    isBottomesheetVisible.value = true
}
</script>

<style scoped>
.fren-invite-button-container {
    overflow: hidden;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: .4rem 1rem;
    gap: 1rem;
}


.fren-invite-button-container .farming-button {
    background: transparent;
    background: var(--container-bg);
    /* position: relative; */
}
</style>