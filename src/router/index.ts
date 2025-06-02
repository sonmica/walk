import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/challenges',
      name: 'challenges',
      component: () => import('../views/Challenges.vue'),
    },
    {
      path: '/challengePersonal',
      name: 'challengePersonal',
      component: () => import('../views/ChallengePersonal.vue'),
    },
    {
      path: '/challengeGroup',
      name: 'challengeGroup',
      component: () => import('../views/ChallengeGroup.vue'),
    },
    { path: '/dashboard/:id', name: 'dashboard', component: DashboardView}
  ],
})

export default router
