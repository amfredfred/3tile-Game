<template>
    <div class="fren-invite-button-container">
        <button @click="openBottomsheet" class="farming-button button-round" style="height: 45px;">
            Send Invite ({{ slotsRemaining }})
        </button>

        <button @click="openBottomsheet" class="button-round farming-button button-round"
            style="aspect-ratio: 1; width:45px;">
            <span class="pi pi-info-circle"></span>
        </button>

        <div>
            <button class="button-round farming-button button-round" @click="copyToClipboard(inviteUrl)"
                style="aspect-ratio: 1; width:45px; ">
                <v-progress-circular v-if="isCopying || !inviteUrl" indeterminate size="15" />
                <span v-else-if="isCopied" class="pi pi-check-circle" style="color: darkgreen;"></span>
                <span v-else class="pi pi-copy"></span>
            </button>
        </div>

        <v-bottom-sheet :absolute="true" v-model="isBottomesheetVisible">
            <div class="bottom-sheet-container power_string">
                <h1 style="font-weight: 900;">Congrats</h1>
                <p style="text-align: center;">
                    {{ 'wonItem' }}
                </p>

                <v-button style="cursor: pointer !important;" @click="isBottomesheetVisible = !isBottomesheetVisible"
                    :class="['farming-button button-round ']">
                    <strong class="">CLAIM REWARD</strong>
                </v-button>
            </div>
        </v-bottom-sheet>
    </div>
</template>

<script setup lang="ts">
import { promise } from '@/utils';
import { computed, ref } from 'vue';
const isBottomesheetVisible = ref(false)
const isCopying = ref(false)
const isCopied = ref(false)
const copiedInterval = ref<any>()

const openBottomsheet = () => {
    console.log('openBottomsheet')
    isBottomesheetVisible.value = true
}

const props = defineProps({
    referralLink: {
        type: String,
        required: true
    },
    slotsRemaining: {
        type: Number,
        required: true
    },
    filledSlots: {
        type: Number,
        required: true
    },
})

const inviteUrl = computed(() => props.referralLink)

const copyToClipboard = async (text: string) => {
    isCopying.value = true
    await promise(2000)
    await navigator.clipboard.writeText(text);
    isCopied.value = true
    if (copiedInterval.value) clearInterval(copiedInterval.value)
    copiedInterval.value = setTimeout(() => isCopied.value = false, 2000)
    isCopying.value = false
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

.button-round.farming-button.button-round {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer !important;
}

.button-round.farming-button.button-round:hover {
    box-shadow: 0 0 2px rgb(63, 74, 84);
}
</style>