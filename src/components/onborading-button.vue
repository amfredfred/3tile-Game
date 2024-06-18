<template>
    <v-button :disabled="disabled || states.isLoading" :class="['farming-button button-round ']" @click="onPressed">
        <v-progress-circular class="progress" size="18" v-if="states.isLoading" indeterminate />
        <strong class="">{{value}}</strong>
    </v-button>
</template>

<script setup lang="ts">
import { promise } from '@/utils';
import { useSwiper } from 'swiper/vue'
import { reactive } from 'vue';

const swiper = useSwiper()
const emit = defineEmits(['onPressed', 'onSettled'])

const states = reactive({
    isLoading: false
})

const props = defineProps({
    value: {
        type: String,
        required: true
    },
    disabled: {
        type: Boolean
    }
})

const onPressed = async () => {
    emit('onPressed', props.value)
    states.isLoading = true
    await promise(1000)
    states.isLoading = false
    swiper.value.slideNext()
    emit('onSettled')
}

</script>