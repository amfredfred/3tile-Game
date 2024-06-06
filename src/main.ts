import '@/assets/main.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import App from '@/App.vue'
import router from '@/router'
import earnedPointsTab from '@/components/earned-points-tab.vue'

import Button from 'primevue/button'
import accountPhoto from '@/components/account-photo.vue'
import accountName from '@/components/account-name.vue'
import TileDot from '@/views/Games/TileGame/components/TileDot.vue'
import { MotionPlugin } from '@vueuse/motion'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import ExplossiveCountdown from '@/components/explossive-countdown.vue'
import HomeLayout from '@/layouts/home-layout.vue'
import HeadingPanel from '@/components/heading-panel.vue'
import FootingPanel from '@/components/footing-panel.vue'
import AccountBalanceTab from '@/components/account-balance-tab.vue'
import Skeleton from 'primevue/skeleton'
import NumberAnimation from "vue-number-animation";
import GameCardsGrid from './components/game-cards-grid.vue'
import FarmingButton from '@/components/farming-button.vue'
import FrensButton from '@/components/frens-button.vue'
import BoostButton from '@/components/boost-button.vue'
import ConfettiExplosion from "vue-confetti-explosion";

const app = createApp(App)


const vuetify = createVuetify({
    components,
    directives,
    ssr: true
})

app.use(createPinia())
app.use(ToastService,)
app.use(router)
app.use(PrimeVue, { ripple: true })
app.use(MotionPlugin)
app.use(vuetify)


app.component('earned-points-tab', earnedPointsTab)
app.component('account-photo', accountPhoto)
app.component('account-name', accountName)
app.component('tile-dot', TileDot)
app.component('explossive-countdown', ExplossiveCountdown)
app.component('home-layout', HomeLayout)
app.component('heading-panel', HeadingPanel)
app.component('footing-panel', FootingPanel)
app.component('account-balance-tab', AccountBalanceTab)
app.component('game-cards-grid', GameCardsGrid)
app.component('farming-button', FarmingButton)
app.component('frens-button', FrensButton)
app.component('boost-button', BoostButton)

app.component('v-skeleton', Skeleton)
app.component('v-button', Button)
app.component('v-number', NumberAnimation)

app.component('v-confetti', ConfettiExplosion)


app.mount('#app')
