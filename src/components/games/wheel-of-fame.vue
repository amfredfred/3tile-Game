<template>
    <div class="wheel-container">
        <div class="wheel-wrapper ">
            <div ref="wheelRef" class="wheel " />
            <!-- <div class="pointer"></div> -->
            <v-button :class="['farming-button button-round']" @click="spin">
                {{ spinPassTickets ? "SPIN THE WHEEL" : "CHECK BACK LATER" }}
            </v-button>
        </div>

        <v-bottom-sheet :absolute="true" v-model="wh.isBottomesheetVisible">
            <div class="bottom-sheet-container power_string">
                <!-- <img :src="AlramClock" alt="" class="image-small"> -->
                <h1 style="font-weight: 900;">Congrats 🎉🎉</h1>
                <p style="text-align: center;">
                    {{ wonItem }}
                </p>
                <v-button @click="claimReward" :class="['farming-button button-round ']">
                    <strong class="">CLAIM REWARD</strong>
                </v-button>
            </div>
        </v-bottom-sheet>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { Wheel } from 'spin-wheel'

const wheel = ref()
const wheelRef = ref()
const wonItem = ref()
const spinPassTickets = ref(10)

const wh = reactive({
    isSpinig: false,
    isBottomesheetVisible: false
})

const items = [
    {
        label: 'zero',
    },
    {
        label: 'two',
    },
    {
        label: 'three',
    },
    {
        label: '10,000 MEP',
        value: 'You wan a red car',
        weight: .3,
        backgroundColor: 'orange'
    },
]

const spin = async () => {
    if (wh.isSpinig) return false
    if (wonItem.value) await claimReward()
    if (spinPassTickets.value <= 0) {
        console.log("no more passes")
    }
    spinPassTickets.value -= 1
    const chosen = Math.floor(Math.random() * items.length)
    const duration = 1000;
    wheel?.value?.spinToItem?.(chosen, duration, true, 2, 1)
};

const claimReward = async () => {
    console.log('CLimed')
    wh.isBottomesheetVisible = false
}

const onWheelRest = (event: any) => {
    console.log('rested', { event })
    wh.isBottomesheetVisible = true
    wh.isSpinig = false
}

const onWheelSpin = (event: any) => {
    wh.isSpinig = true
    console.log('spin', { event })
}

const onWheelCurrentIndexChange = (event: any) => {
    wonItem.value = items[event?.currentIndex]
    console.log('CurrentIndexChange', { event })
}

onMounted(() => {
    const props = {
        items: items,
        theme: 'movie',
        borderColor: 'whitesmoke',
        borderWidth: 20,
        pointerAngle: 0,
        itemLabelFont: 'Jaro',
        itemBackgroundColors: ['green', 'green'],
        isInteractive: false,
        onRest: onWheelRest,
        onSpin: onWheelSpin,
        onCurrentIndexChange: onWheelCurrentIndexChange
    }
    if (wheelRef.value) {
        wheel.value = new Wheel(wheelRef.value, props)
    }
})


</script>

<style scoped>
.wheel-container {
    width: 100%;
    border-radius: 20px;
    background: var(--container-bg);
    overflow: hidden;
}

.wheel-wrapper {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
}
</style>
