import '@/assets/main.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import 'swiper/css';
import '@/assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import App from '@/App.vue'
import router from '@/router'
import PointsModal from '@/components/points-modal.vue'

import Button from 'primevue/button'
import accountPhoto from '@/components/account-photo.vue'
import accountName from '@/components/account-name.vue'
import { MotionPlugin } from '@vueuse/motion'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import ExplossiveCountdown from '@/components/explossive-countdown.vue'
import HomeLayout from '@/layouts/home-layout.vue'
import HeadingPanel from '@/components/panels/heading-panel.vue'
import FootingPanel from '@/components/panels/footing-panel.vue'
import Skeleton from 'primevue/skeleton'
import NumberAnimation from "vue-number-animation";
import GameCardsGrid from './components/game-cards-grid.vue'
import FarmingButton from '@/components/farming-button.vue'
import FrensButton from '@/components/frens-button.vue'
import BoostButton from '@/components/boost-button.vue'
import ConfettiExplosion from "vue-confetti-explosion";

import ScreenHeading from '@/components/screen-heading.vue'

import TriviaComponent from '@/components/trivia-component.vue'

import Particles from "@tsparticles/vue3";
import { loadFull } from "tsparticles";
import TriviaOption from './components/trivia-option.vue';
import LeagueModal from './components/league-modal.vue';

import onboradingButton from './components/onborading-button.vue';
import WheelOfFame from './components/games/wheel-of-fame.vue';
import FingerGearing from './components/games/finger-gearing.vue'

const app = createApp(App)

const vuetify = createVuetify({
    components,
    directives,
    ssr: true
})

app.use(createPinia())
app.use(ToastService )
app.use(router)
app.use(PrimeVue, { ripple: true })
app.use(MotionPlugin)
app.use(vuetify)
app.use(Particles, { init: async engine => await loadFull(engine) })

app.component('points-modal', PointsModal)
app.component('account-photo', accountPhoto)
app.component('account-name', accountName)
app.component('explossive-countdown', ExplossiveCountdown)
app.component('home-layout', HomeLayout)
app.component('heading-panel', HeadingPanel)
app.component('footing-panel', FootingPanel)
app.component('game-cards-grid', GameCardsGrid)
app.component('farming-button', FarmingButton)
app.component('frens-button', FrensButton)
app.component('boost-button', BoostButton)
app.component('screen-heading', ScreenHeading)
app.component('wheel-of-fame', WheelOfFame)
app.component('finger-gearing', FingerGearing)

app.component('trivia-component', TriviaComponent)
app.component('trivia-option', TriviaOption)
app.component('league-modal', LeagueModal)

app.component('v-skeleton', Skeleton)
app.component('v-button', Button)
app.component('v-number', NumberAnimation)
app.component('v-confetti', ConfettiExplosion);

app.component('r-button', onboradingButton)

app.mount('#app');

