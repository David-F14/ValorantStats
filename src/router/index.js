import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AgentsView from '../views/AgentsView.vue'
import MapsView from '../views/MapsView.vue'
import GameModesView from '../views/GameModesView.vue'
import WeaponsView from '../views/WeaponsView.vue'
import AgentsDetails from '@/components/AgentDetails.vue'
import WeaponsDetails from '@/components/WeaponDetails.vue'
import MapDetails from '@/components/MapDetails.vue'

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
      path: '/agents/:uuid',
      name: 'agentDetails',
      component: AgentsDetails,
      props: true
    },
    {
      path: '/weapons',
      name: 'weapons',
      component: WeaponsView
    },
    {
      path: '/weapons/:uuid',
      name: 'weaponDetails',
      component: WeaponsDetails,
      props: true
    },
    {
      path: '/maps',
      name: 'maps',
      component: MapsView
    },
    {
      path: '/maps/:uuid',
      name: 'mapDetails',
      component: MapDetails,
      props: true
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
