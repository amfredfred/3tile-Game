import { createRouter, createWebHistory } from 'vue-router'
import { useMainStore } from '@/stores/mainstore'
import TileGameView from '@/views/Games/TileGame/TileGameView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
    }
    // Add a wildcard route for 404 Not Found
    // {
    //   path: '/:catchAll(.*)',
    //   component: NotFound404Page
    // }
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
