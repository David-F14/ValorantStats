import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AgentsView from '../views/AgentsView.vue'
import MapsView from '../views/MapsView.vue'
import GameModesView from '../views/GameModesView.vue'
import WeaponsView from '../views/WeaponsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [    
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/agents',
      name: 'agents',
      component: AgentsView
    },
    {
      path: '/weapons',
      name: 'weapons',
      component: WeaponsView
    },
    {
      path: '/maps',
      name: 'maps',
      component: MapsView
    },
    {
      path: '/game-modes',
      name: 'game-modes',
      component: GameModesView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
