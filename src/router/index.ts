import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Challenges from '@/views/Challenges.vue'

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
      path: '/challenges/:id',
      name: 'challenges',
      component: () => import('../views/Challenges.vue'),
    },
    {
      path: '/challenge/:id/:id',
      component: () => import('../views/Challenge.vue'),
      children: [
        {
          path: 'personal',
        component: () => import('../views/ChallengePersonal.vue'),
        },
        {
          path: 'group',
        component: () => import('../views/ChallengeGroup.vue'),
        },
        {
          path: 'details',
        component: () => import('../views/ChallengeDetails.vue'),
        },
      ],
    },
  ],
})

export default router
