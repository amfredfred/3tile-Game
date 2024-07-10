// Import CSS and SCSS
import '@/assets/main.css';
import 'primevue/resources/themes/aura-light-green/theme.css';
import 'primeicons/primeicons.css';
import 'swiper/css';
import '@/assets/main.scss';

// Import Vue and Plugins
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import piniaPersistedState from 'pinia-plugin-persistedstate';
import ToastService from 'primevue/toastservice'; 
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { VueQueryPlugin } from '@tanstack/vue-query';
import Particles from "@tsparticles/vue3";
import { loadFull } from "tsparticles";
import { MotionPlugin } from '@vueuse/motion'


// Import Main App and Router
import App from '@/App.vue';
import router from '@/router';

// Import Components
import PointsModal from '@/components/points-modal.vue';
import Button from 'primevue/button';
import accountPhoto from '@/components/account-photo.vue';
import accountName from '@/components/account-name.vue';
import ExplossiveCountdown from '@/components/explossive-countdown.vue';
import HomeLayout from '@/layouts/home-layout.vue';
import HeadingPanel from '@/components/panels/heading-panel.vue';
import FootingPanel from '@/components/panels/footing-panel.vue';
import Skeleton from 'primevue/skeleton';
import NumberAnimation from "vue-number-animation";
import GameCardsGrid from '@/components/game-cards-grid.vue';
import FarmingButton from '@/components/earning-points/farm-button.vue';
import FrensButton from '@/components/frens-button.vue';
import BoostButton from '@/components/boost-button.vue';
import ConfettiExplosion from "vue-confetti-explosion";
import ScreenHeading from '@/components/screen-heading.vue';
import TriviaComponent from '@/components/trivia-component.vue';
import TriviaOption from '@/components/trivia-option.vue';
import LeagueModal from '@/components/league-modal.vue';
import onboradingButton from '@/components/onborading-button.vue';
import WheelOfFame from '@/components/games/wheel-of-fame.vue';
import FingerGearing from '@/components/games/finger-gearing.vue';
import SmartCodeRedeemer from '@/components/games/smart-code-redeemer.vue';
import SectionHeadline from '@/components/typography/section-headline.vue';
import SectionSubHeadline from '@/components/typography/section-subheadline.vue';
import BannerSlider from '@/components/sliders/banners-slider.vue'

// Create Vue App
const app = createApp(App);

// Create and Configure Vuetify
const vuetify = createVuetify({
    components,
    directives,
    ssr: true
});

// Create and Configure Pinia
const pinia = createPinia();
pinia.use(piniaPersistedState);

// Use Plugins
app.use(pinia);
app.use(ToastService);
app.use(router);
app.use(PrimeVue, { ripple: true });
app.use(MotionPlugin);
app.use(vuetify);
app.use(VueQueryPlugin); 
app.use(Particles, { init: async engine => await loadFull(engine) });

// Register Global Components
app.component('points-modal', PointsModal);
app.component('account-photo', accountPhoto);
app.component('account-name', accountName);
app.component('explossive-countdown', ExplossiveCountdown);
app.component('home-layout', HomeLayout);
app.component('heading-panel', HeadingPanel);
app.component('footing-panel', FootingPanel);
app.component('game-cards-grid', GameCardsGrid);
app.component('farming-button', FarmingButton);
app.component('frens-button', FrensButton);
app.component('boost-button', BoostButton);
app.component('screen-heading', ScreenHeading);
app.component('wheel-of-fame', WheelOfFame);
app.component('finger-gearing', FingerGearing);
app.component('trivia-component', TriviaComponent);
app.component('trivia-option', TriviaOption);
app.component('league-modal', LeagueModal);
app.component('v-skeleton', Skeleton);
app.component('v-button', Button);
app.component('v-number', NumberAnimation);
app.component('v-confetti', ConfettiExplosion);
app.component('v-smartcoderedeemer-component', SmartCodeRedeemer);
app.component('v-section-headline', SectionHeadline);
app.component('v-section-subheadline', SectionSubHeadline);
app.component('v-banner-slider', BannerSlider)
app.component('r-button', onboradingButton);

// Mount the App
app.mount('#app');