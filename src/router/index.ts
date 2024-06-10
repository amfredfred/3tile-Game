import { createRouter, createWebHistory } from 'vue-router'
import { useMainStore } from '@/stores/mainstore'
import TileGameView from '@/views/Games/TileGame/TileGameView.vue'
import RushDotgameView from '@/views/Games/RushDot/RushDotGameView.vue'
import HomeView from '@/views/HomeView.vue'
import TaskView from '@/views/Tasks/TasksView.vue'
import FrensView from '@/views/Frens/FrensView.vue'
import RewardsView from '@/views/Rewards/RewardsView.vue'
import FarmView from '@/views/Farm/FarmView.vue'
import NotFound404Page from '@/views/Errors/NotFound404Page.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'farm',
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
    {
      path: '/:catchAll(.*)',
      component: NotFound404Page
    }
  ]
})


router.beforeEach(async function (to, from, next) {
  const _store = useMainStore()
  if (to.meta.requires_auth) {
    if (_store.is_guest || !_store.user) {
      _store.setShowAuthModal(true)
      next()
    } else {
      if (_store.show_auth_modal) {
        _store.setShowAuthModal(false)
      }
      next()
    }
  } else {
    next()
  }
})

export default router
