<template>
    <home-layout>
        <template #content>
            <div class="container">
                <screen-heading title="Tasks Area {soon}" heading="FIll task, fill POINTS" />
                <p style="text-align: center; max-width: 80%; font-size: 13px;">
                    Receive instant MEP for completing tasks.
                </p>
                <v-infinite-scroll class="tasks-container" :height="300" :items="items" :onLoad="load">
                    <template v-for="(item, index) in items" :key="item">
                        <div :class="['pa-2 ', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
                            <v-skeleton-loader class="fren-item" theme="dark" :loading="true" type="actions">
                                <v-list-item lines="two" color="secondary" subtitle="Subtitle" title="Title" rounded>
                                    Item number #{{ item }}
                                </v-list-item>
                            </v-skeleton-loader>
                        </div>
                    </template>
                </v-infinite-scroll>
            </div>
        </template>
    </home-layout>
</template>


<script setup lang="ts">

import { ref } from 'vue'

const items = ref(Array.from({ length: 30 }, (k, v) => v + 1))

async function api() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(Array.from({ length: 10 }, (k, v) => v + items.value.at(-1) + 1))
        }, 1000)
    })
}
async function load({ done }) {
    // Perform API call
    const res = await api()

    items.value.push(...res)

    done('ok')
}
</script>

<style scoped>
.tasks-container {
    width: 100%;
    flex-grow: 1;
    border-radius: 10px 10px 0 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.fren-item {
    background: rgba(23, 22, 22, 0.155);
}
</style>