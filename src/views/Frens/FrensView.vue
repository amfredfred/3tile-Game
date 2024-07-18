<template>
    <div class="frens-wrapper">
        <v-infinite-scroll class="frens-container" :items="items" :loading="true" :empty="true" @load="load">
            <!-- <screen-heading heading="Invite Friends" /> -->
            <v-section-headline title="INVITE YOUR FRENS" />
            <p>Earn rewards by inviting your friends to join us!</p>
            <div class="referral-info">
                <div class="referral-stats">
                    <strong style="margin-right: auto;">
                        Your frens ({{ totalReferrals }})
                    </strong>
                    <!-- <div class="stat-block">
                        <strong><span class="pi pi-user"></span> {{ totalReferrals }} </strong>
                        <label> Your Frens </label>
                    </div>
                    <div class="stat-block">
                        <strong><span class="pi pi-chart-scatter"></span> {{ formatNumber(totalRewards) }}</strong>
                        <label> Earnings </label>
                    </div> -->
                </div>
            </div>

            <div v-if="!items.length" style="padding: 2rem;">
                Nobody Here Yet<br />
                <small>Lots of benefits when you invite your frens.</small>
            </div>

            <template v-else v-for="(item, index) in (items)" :key="item.id || index">
                <v-skeleton-loader class="fren-item" theme="dark" :loading="!item?.referral_code"
                    type="list-item-avatar-three-line" v-motion-slide-visible-bottom>
                    <v-button v-if="item" class="list-item-list">
                        <span class="pi pi-user user-icon"></span>
                        <div class="list-item-inner">
                            <div class="list-item-info">
                                <strong>
                                    {{ `${item?.referral_code}` }} -> {{ formatNumber(Number(item.wallet_balance)) }}{{
                                        _store.currency }}</strong>
                                <small class="fren-score pi  pi-user-plus">&nbsp;{{ item.downlines_count }}</small>
                            </div>
                            <div class="list-item-stats">
                                <strong>{{ formatNumber(item.rewards_to_upline) }}{{ _store.currency }}</strong>
                                <span class="pi pi-gift"></span>
                            </div>
                            <!-- <v-button @click="deleteDownline(index)" class="delete-button">Delete</v-button> -->
                        </div>
                    </v-button>
                </v-skeleton-loader>
            </template>
        </v-infinite-scroll>

        <div class="referral-link">
            <FrenInviteButton :referralLink="referralLink" :slots-remaining="referralSlots"
                :filled-slots="totalReferrals" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { apiCall } from '@/configs/api';
import type { IFrens } from '@/interfaces/IFrens';
import { ref, watch } from 'vue'

import FrenInviteButton from '@/components/FrenInviteButton.vue'
import { useMainStore } from '@/stores/mainstore';
const _store = useMainStore()
const page = ref(0)
const totalPages = ref(1)
const items = ref<IFrens['downlines']['frens']>([])
const totalReferrals = ref(0)
const totalRewards = ref(0)
const referralLink = ref<any>(null)
const referralSlots = ref(0)

const ine = ref(0)
setInterval(() => ine.value++, 1000)

async function load(meta: any) {
    if (page.value >= totalPages.value) return
    const frensRequest = await apiCall<IFrens>('referrals', '', { page })
    const frens = frensRequest.data
    if (frensRequest.status == 200) {
        if (Array.isArray(frens.downlines.frens)) {
            console.log(frens.downlines.frens)
            items.value.push(...frens.downlines.frens)
        }
        referralLink.value = frens.referral_code
        referralSlots.value = Number(frens.referral_slots ?? 0)
        page.value = frens.downlines.page || 1;
        totalPages.value = frens.downlines.totalPages || 1;
        totalReferrals.value = frens.downlines.total || 0;
    } else {
        console.log('not laoded')
    }
    meta?.done('ok')
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
        load('')
        console.log('Activation turned on');
    } else {
        console.log('Activation turned off');
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
    /* text-align: center; */

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
    margin-block: 1rem;
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
    border-radius: 10px;
    width: 100%;
    margin-bottom: 10px;
    border: none;
    padding-right: 1.4rem;
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
    font-size: 11px;
}

.fren-score {
    font-size: 11px;
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
