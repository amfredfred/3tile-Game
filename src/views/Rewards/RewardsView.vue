<template>
    <home-layout>
        <template #content>
            <div class="rewards-wrapper">
                <v-infinite-scroll class="rewards-container" :items="items" :onLoad="load">
                    <!-- <screen-heading title="MEP rewards {soon}" heading="Let today reward you" /> -->
                    <div class="heading-container">
                        <p>Free rewards, free points - stay tuned!</p>
                    </div>
                    <template v-for="(item, index) in items" :key="item">
                        <div :class="['pa-2 ', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
                            <v-skeleton-loader class="fren-item" theme="dark" :loading="true" type="button">
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
import { ref } from 'vue';

const items = ref<any>(Array.from({ length: 30 }, (k, v) => v + 1))

async function api() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(Array.from({ length: 10 }, (k, v) => v + items.value!.at(-1) + 1))
        }, 1000)
    })
}
async function load() {

}
</script>

<style scoped>

.tasks-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.rewards-container {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden auto;
    padding-inline: 1rem;
}

.rewards-container::-webkit-scrollbar {
    display: none;
}

.heading-container {
    text-align: center;
    margin-bottom: 1rem;
}

.fren-item {
    background: rgba(23, 22, 22, 0.155);
}
</style>