<template>
    <div class="smart-code-redeeemer-component">
        <br />
        <v-section-headline title="DIGI REDEEM" />
        <p style="text-align: center;">
            Grab the code from our channel <a href="">@channelname</a>,<br />enter it below, and claim your reward!
        </p>

        <div class="smart-redeem-container">
            <div class="smart-redeem-input-container">
                <input v-model="redeemCode"
                    :readonly="isOnHold || !_store.redeemableCodePool || _store.redeemableCodePool.isRedeemed"
                    @input="({ target }) => onTextInput((target as any)?.value)"
                    @paste="({ target }) => onTextInput((target as any)?.value)" :placeholder="inputPlaceholder"
                    :class="['farming-button  text-input button-round']" />
            </div>

            <div class="smart-redeemer-header">
                <v-chip-group v-if="!_store.redeemableCodePool?.code">
                    <v-chip>
                        Come Back Later
                    </v-chip>
                </v-chip-group>
                <v-chip-group v-else>
                    <v-chip>
                        <v-progress-circular class="progress" size="19" v-if="!_store.redeemableCodePool"
                            indeterminate />
                        <div v-else style="display: flex;align-items: center;gap: .4rem;">
                            <span class="pi pi-gift"></span>
                            <strong>{{ formatNumber(Number(_store?.redeemableCodePool?.remainingRewards))
                                }}</strong>
                        </div>
                    </v-chip>
                    <v-chip :style="{ background: _store.redeemableCodePool?.isRedeemed ? 'red' : 'darkgreen' }">
                        <v-progress-circular class="progress" size="19" v-if="!_store.redeemableCodePool"
                            indeterminate />
                        <div v-else style="display: flex;align-items: center;gap: .4rem;">
                            <span class="pi pi-clock"></span>
                            <strong>{{ getActualCountdown(Number(_store.redeemableCodePool?.expirationTimestamp))
                                }}</strong>
                        </div>
                    </v-chip>
                </v-chip-group>

                <span style="cursor: pointer; align-items: center; display: flex;">
                    <v-chip>Learn</v-chip><span class="pi pi-chevron-right"></span>
                </span>
            </div>

            <v-button
                :disabled="isOnHold || !_store.redeemableCodePool || isUnmatchedCode || _store.redeemableCodePool.isRedeemed"
                @click="claimReward(redeemCode)" :class="['farming-button button-round ']">
                <v-progress-circular class="progress" size="19" v-if="isOnHold || !_store.redeemableCodePool"
                    indeterminate />
                <strong v-else class="">
                    Claim Rewards
                    <span v-if="_store.redeemableCodePool?.isRedeemed" class="pi pi-check"></span>
                    <span v-if="_store.redeemableCodePool?.isRedeemed" class="pi pi-check"></span>
                </strong>
            </v-button>
        </div>

        <v-bottom-sheet :absolute="true" v-model="isBottomesheetVisible">
            <div class="bottom-sheet-container power_string">
                <h1 style="font-weight: 900;">Congrats</h1>
                <p style="text-align: center;">
                    {{ 'wonItem' }}
                </p>
                <v-button @click="claimReward" :class="['farming-button button-round ']">
                    <strong class="">CLAIM REWARD</strong>
                </v-button>
            </div>
        </v-bottom-sheet>
    </div>
</template>


<script setup lang="ts">
import { apiCall } from '@/configs/api';
import { isMatchingCode, formatNumber, getActualCountdown } from '@/utils';
import { useMutation } from '@tanstack/vue-query';
import { onMounted, ref, watch } from 'vue';
import { useMainStore } from '@/stores/mainstore';
import { useWebSocketStore } from '@/stores/websocket';

const inputPlaceholder = 'C-ZFTOPJMA-TS-1720452651265';
const isOnHold = ref(false);
const redeemCode = ref('');
const isBottomesheetVisible = ref(false);
const isUnmatchedCode = ref(true);

const _store = useMainStore();
const socket = useWebSocketStore()
onMounted(() => socket.sendMessage('claimable-reward-pool'))

watch(() => _store?.redeemableCodePool?.isRedeemed, () => {
    if (_store.redeemableCodePool?.isRedeemed) {
        redeemCode.value = `${_store.redeemableCodePool?.code}`
    }
})
const poolTodayMutation = useMutation({
    mutationKey: ['pool-session'],
    mutationFn: async (pool_session_id) => apiCall('code-redeem', 'claim-reward', { pool_session_id })
});

const claimReward = async (pool_session_id: string) => {
    isOnHold.value = true;
    const mutate = await poolTodayMutation.mutateAsync(pool_session_id as any);
    isOnHold.value = false;
    isBottomesheetVisible.value = mutate.status <= 200;
    socket.sendMessage('account-overview')
};

const onTextInput = async (value: string) => {
    isUnmatchedCode.value = !isMatchingCode(value);
    if (!isUnmatchedCode.value) {
        await claimReward(value);
    }
};
</script>


<style scoped>
.smart-code-redeeemer-component {
    border-radius: 20px;
    width: 100%;
    margin-block: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    margin-top: auto;
    height: 100%;
}

.smart-redeemer-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.smart-redeem-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
}

.text-input {
    outline: none !important;
    text-align: center;
    text-transform: uppercase;
}

.smart-redeem-input-container {
    position: relative;
    display: flex;
    /* background: rgba(0, 0, 0, 0.274); */
    /* border-radius: 50px; */
    align-items: center;
    border-bottom: solid thick transparent;
}

.smart-redeem-input-container::after,
.information-container {
    /* position: absolute;
    left: 0;
    bottom: -5px;
    height: 5px;
    background: rgb(2, 45, 45);
    content: '';
    width: 100%;
    border-radius: 50px; */
}

.information-container {
    z-index: 2;
}

.progress {
    border-radius: inherit;
    width: 100%;
}
</style>