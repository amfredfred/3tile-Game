<template>
    <home-layout>
        <template #content>
            <div class="frens-wrapper">
                <v-infinite-scroll class="frens-container" :items="items" :onLoad="load">
                    <!-- <screen-heading heading="Invite Friends" /> -->
                    <div class="heading-container">
                        <p>Earn rewards by inviting your friends to join us!</p>
                    </div>

                    <div class="referral-info">
                        <div class="referral-stats">
                            <div class="stat-block">
                                <label>REWARDS <span>{{ formatNumber(totalRewards) }}MEP</span></label>
                            </div>
                        </div>
                    </div>
                    <strong style="margin-bottom: .6rem;">YOUR FRENS ({{ totalReferrals }})</strong>
                    <template v-for="(item, index) in (items.length ? items : dummyItems)" :key="item.id || index">
                        <v-skeleton-loader class="fren-item" theme="dark" :loading="!item?.id"
                            type="list-item-avatar-three-line">
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
                    <v-button class="link-stat-block">
                        {{ totalReferrals }}/{{ maxReferrals }}
                    </v-button>
                    <div class="link-container">
                        <input type="text" v-model="referralLink" readonly />
                        <v-button @click="copyToClipboard">invite</v-button>
                    </div>
                </div>
            </div>
        </template>
    </home-layout>
</template>

<script setup lang="ts">
import { apiCall } from '@/configs/api';
import type { IFrens } from '@/interfaces/IFrens';
import type { IProfile } from '@/interfaces/IProfile';
import { onMounted, ref } from 'vue'

const page = ref(0)
const totalPages = ref(1)
const items = ref<IFrens['downlines']['data']>([])
const dummyItems = ref<IProfile[]>(Array.from({ length: 5 }).fill({} as IProfile) as IProfile[])
const referralLink = ref("https://yourwebsite.com/referral?code=YOURCODE")
const totalReferrals = ref(0)
const totalRewards = ref(0)
const maxReferrals = ref(50)

async function load(metadate: any = null) {
    if (page.value < totalPages.value) {
        const res = await apiCall<IFrens>('referrals', '', {
            page: page.value + 1
        })
        if (res.status <= 203) {
            items.value.push(...res.data.downlines.data)
            page.value = res?.data?.downlines?.page
            totalPages.value = res?.data?.downlines?.totalPages
            totalReferrals.value = res.data.downlines.total
            totalRewards.value = 3456782 //res.data.totalRewards
            metadate?.done?.('ok')
        } else {
            console.log('error')
        }
    } else {
        metadate?.end()
    }
}

function formatNumber(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function copyToClipboard() {
    navigator.clipboard.writeText(referralLink.value).then(() => {
        alert('Referral link copied to clipboard!');
    });
}

async function deleteDownline(index: number) {
    const downlineId = items.value[index].id;
    try {
        const res = await apiCall('referrals', 'remove', { downlineId });
        if (res.status <= 203) {
            items.value.splice(index, 1);
            totalReferrals.value--;
            alert('Downline deleted successfully!');
        } else {
            console.log('Error deleting downline');
        }
    } catch (error) {
        console.log('Error deleting downline', error);
    }
}

onMounted(() => {
    load()
})
</script>

<style scoped>
.frens-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.frens-container {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden auto;
    padding-inline: 1rem;
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
    margin-bottom: 20px;
    width: 100%;
}

.referral-link {
    display: flex;
    align-items: center;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    gap: 1rem;
    padding-block: .5rem;
}

.link-stat-block {
    background: transparent;
    padding: 0;
    margin: 0;
    background-color: inherit;
    border: none;
    padding: 10px 5px;
    padding-left: 1rem;
    border-radius: 0;
}


.link-container button {
    padding: 10px 20px;
    border: none;
    background-color: inherit;
    color: white;
    cursor: pointer;
    text-transform: uppercase;
    padding-right: 1rem;
}


.link-container {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 600px;
}

.link-container input {
    all: unset;
    flex-grow: 1;
}

.referral-stats {
    display: flex;
    gap: 1rem;
    width: 100%;
    flex-wrap: wrap;
}

.stat-block {
    background: var(--container-bg);
    padding: 1rem;
    border-radius: 10px;
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.stat-block label {
    display: block;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 1.5rem;
}

.stat-block strong {
    font-size: 1.5em;
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
