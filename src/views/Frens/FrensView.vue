<template>
    <div class="frens-wrapper">
        <v-infinite-scroll class="frens-container" :items="items" :onLoad="load">
            <!-- <screen-heading heading="Invite Friends" /> -->
            <v-section-headline title="INVITE YOUR FRENS" />
            <p>Earn rewards by inviting your friends to join us!</p>
            <div class="referral-info">
                <div class="referral-stats">
                    <div class="stat-block">
                        <strong><span class="pi pi-user"></span> {{ totalReferrals }} </strong>
                        <label> Your Frens </label>
                    </div>
                    <div class="stat-block">
                        <strong><span class="pi pi-chart-scatter"></span> {{ formatNumber(totalRewards) }}</strong>
                        <label> Earnings </label>
                    </div>
                </div>
            </div>

            <template v-for="(item, index) in (items.length ? items : dummyItems)" :key="item.id || index">
                <v-skeleton-loader class="fren-item" theme="dark" :loading="!item?.id"
                    type="list-item-avatar-three-line" v-motion-slide-visible-bottom>
                    <v-button v-if="item" class="list-item-list">
                        <span class="pi pi-user user-icon"></span>
                        <div class="list-item-inner">
                            <div class="list-item-info">
                                <strong>{{ `@${item?.username}` }} -> 0.00</strong>
                                <small class="fren-score pi  pi-user-plus">&nbsp;332</small>
                            </div>
                            <div class="list-item-stats">
                                <strong>{{ formatNumber(567/*item?.points*/) }}MEP</strong>
                                <span class="pi  pi-box"></span>
                            </div>
                            <!-- <v-button @click="deleteDownline(index)" class="delete-button">Delete</v-button> -->
                        </div>
                    </v-button>
                </v-skeleton-loader>
            </template>
        </v-infinite-scroll>


        <div class="referral-link">
            <FrenInviteButton />
        </div>
    </div>
</template>

<script setup lang="ts">
import { apiCall } from '@/configs/api';
import type { IFrens } from '@/interfaces/IFrens';
import type { IProfile } from '@/interfaces/IProfile';
import { useQuery } from '@tanstack/vue-query';
import { ref, watch } from 'vue'

import FrenInviteButton from '@/components/FrenInviteButton.vue'

const page = ref(0)
const totalPages = ref(1)
const items = ref<IFrens['downlines']['data']>([])
const dummyItems = ref<IProfile[]>(Array.from({ length: 5 }).fill({} as IProfile) as IProfile[])
const referralLink = ref("https://yourwebsite.com/referral?code=YOURCODE")
const totalReferrals = ref(0)
const totalRewards = ref(0)
const maxReferrals = ref(50)

const ine = ref(0)
setInterval(() => ine.value++, 1000)

const frensQuery = useQuery({
    queryKey: ['frens'],
    queryFn: async (page) => await apiCall<IFrens>('referrals', '', { page }),
})

function load() {
    if (page.value >= totalPages.value) return
    frensQuery.refetch(page.value + 1 as any)
}

function formatNumber(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const props = defineProps({
    isInViewPort: {
        type: Boolean,
        required: true
    }
})

watch(() => [props.isInViewPort], ([current]) => {
    if (current) {
        console.log('Activation turned on');
        load()
    } else {
        console.log('Activation turned off');
    }
})

watch([frensQuery.data.value?.data], ([frens]) => {
    console.log('FETCHED FRENS', { frens })

    if (typeof frens == 'object') {
        items.value.push(...frens.downlines.data)
        page.value = frens.downlines?.page
        totalPages.value = frens.downlines?.totalPages
        totalReferrals.value = frens.downlines.total
    }
})

</script>

<style scoped>
.frens-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;

    height: 100%;
    overflow: hidden auto;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    padding-bottom: 1rem;
    background: rgb(0, 0, 0);
}

.frens-container {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden auto;
}

.frens-container::-webkit-scrollbar {
    display: none;
}

.fren-item {
    background: transparent;
}

.heading-container {
    text-align: center;
    margin-bottom: 1rem;
}

.referral-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}


.referral-stats {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    overflow-x: auto;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
}

.stat-block {
    background: var(--container-bg);
    padding: 1rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    box-shadow: 0 0 1px rgb(17, 17, 17) inset;
    text-align: left;
}

.referral-link {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
}




.stat-block label {
    display: block;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 1.1rem;
}

.stat-block strong {
    font-size: 1.5em;
    display: flex;
    align-items: center;
    gap: .5rem;
}

.stat-block .pi {
    font-size: 1.3rem;
}



.list-item-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background: var(--container-bg);
    border-radius: 8px;
    width: 100%;
    margin-bottom: 10px;
    border: none;
}

.user-icon {
    padding: 10px;
    font-size: 2rem;
    border-radius: 50px;
    /* background-color: black; */
    margin-right: 10px;
}

.list-item-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.list-item-info {
    display: flex;
    flex-direction: column;
    gap: .3rem;
    text-transform: uppercase;
    align-items: flex-start;
}

.list-item-info strong {
    font-size: 14px;
}

.fren-score {
    font-size: 12px;
    color: #bbb;
}

.list-item-stats {
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: bold;

}

.list-item-stats strong {
    font-size: 1rem;
    font-weight: bold;
}

.list-item-stats .pi {
    font-size: 16px;
}

.delete-button {
    background-color: red;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
}
</style>
