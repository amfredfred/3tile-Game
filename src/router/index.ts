import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import { useMainStore } from '@/stores/mainstore'
import HomeView from '@/views/HomeView.vue'
import OnboardingView from '@/views/Onboading/OnboardingView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/onboarding',
      name: 'onboarding',
      component: OnboardingView,
      meta: {
        requires_auth: false
      }
    },
    {
      path: '/:catchAll(.*)',
      component: HomeView
    }
  ]
})

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  try {
    const _store = useMainStore();
    if (_store.is_guest && to.meta.requires_auth) {
      if (to.name !== 'onboarding') {
        return next({ name: 'onboarding' });
      } else {
        return next();
      }
    }
    if (_store.show_auth_modal) {
      _store.setShowAuthModal(false);
    }
    if (to.name === 'onboarding' && !_store.is_guest) {
      return next('')
    }
    return next();
  } catch (error) {
    console.error("Error during route navigation:", error);
    next(false);
  }
});
export default router
