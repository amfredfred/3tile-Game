<template>
    <v-button :disabled="disabled" :class="['option-button neon-apply', { 'neon-red': true }]" @click="onPicked">
        <v-progress-circular class="progress" size="30" v-if="states.isLoading" indeterminate />
        <strong>{{ option.optionText }}</strong>
    </v-button>
</template>

<script setup lang="ts">
import { promise } from '@/utils';
import { useSwiper } from 'swiper/vue'
import { reactive, type PropType } from 'vue';
import { type IOption } from '@/interfaces/ITrivia';
import { useWebSocketStore } from '@/stores/websocket';

const swiper = useSwiper()
const emit = defineEmits(['onPicked', 'onSettled'])
const wssocket = useWebSocketStore()

const states = reactive({
    isLoading: false
})

const props = defineProps({
    option: {
        type: Object as PropType<IOption>,
        required: true
    },
    disabled: {
        type: Boolean
    }
})

const onPicked = async () => {
    emit('onPicked', props.option.id)
    states.isLoading = true
    await promise(1000)
    wssocket.sendMessage('trivia', { optionId: props.option.id }, 'answerQuestion')
    states.isLoading = false
    swiper.value.slideNext()
    emit('onSettled')
}

</script>

<style scoped>
.option-button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    background: var(--neon);
    color: white;
    cursor: pointer;
    border-radius: 50px;
    flex-grow: 1;
    min-width: calc(50% - .5rem);

    display: flex;
    text-align: center;
    gap: .6rem;
    box-shadow: none;
    border: inherit;
}

.option-button strong {
    font-weight: 500;
    text-align: center;
    width: 100%;
}

.option-button:hover {
    background: #ae350a;
}



.progress {
    position: absolute;
    left: 0;
    transform: translate(0, -50%);
    top: 50%;
    background: #ae350a;
    border-radius: 50px;
}
</style>