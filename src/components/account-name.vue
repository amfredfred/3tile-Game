<template>
    <span class="name-span">{{ (_store.user?.first_name ?? '' + _store?.user?.last_name ?? '') ?? "@" + _store.user?.username }}</span>
</template>


<script setup lang="ts">
import { useMainStore } from '@/stores/mainstore';

const _store = useMainStore()
</script>


<style scoped>
.name-span {
    font-size: 13px;
    line-height: 1.4;
    text-transform: capitalize;
    max-width: 6.4dvw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>