import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import { useMainStore } from '@/stores/mainstore'
import TileGameView from '@/views/Games/TileGame/TileGameView.vue'
import RushDotgameView from '@/views/Games/RushDot/RushDotGameView.vue'
import HomeView from '@/views/HomeView.vue'
import TaskView from '@/views/Tasks/TasksView.vue'
import FrensView from '@/views/Frens/FrensView.vue'
import RewardsView from '@/views/Rewards/RewardsView.vue'
// import NotFound404Page from '@/views/Errors/NotFound404Page.vue'
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
      path: '/',
      name: 'farm',
      component: HomeView,
      meta: {
        requires_auth: true
      }
    },
    {
      path: '/farm',
      name: 'farm-home',
      component: HomeView,
      meta: {
        requires_auth: true
      }
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TaskView,
      meta: {
        requires_auth: true
      }
    },
    {
      path: '/frens',
      name: 'frens',
      component: FrensView,
      meta: {
        requires_auth: true
      }
    },
    {
      path: '/rewards',
      name: 'rewards',
      component: RewardsView,
      meta: {
        requires_auth: true
      }
    },
    {
      path: '/3tile-game',
      name: '3tile-game-page',
      component: TileGameView,
      meta: {
        requires_auth: true
      }
    },
    {
      path: '/rush-dot-game',
      name: 'rush-dot-game-page',
      component: RushDotgameView,
      meta: {
        requires_auth: true
      }
    },
    // 
    {
      path: '/farm',
      name: 'farm-page',
      component: HomeView,
      meta: {
        requires_auth: true
      }
    },
    // Add a wildcard route for 404 Not Found
    // {
    //   path: '/:catchAll(.*)',
    //   component: NotFound404Page
    // }
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
