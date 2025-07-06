import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type Challenge from '@/models/Challenge'

export const useChallengeStore = defineStore('challenge', {
  state: () => ({ currentChallenge: null as Challenge | null }),
  getters: {
    getCurrentChallenge: (state) => state.currentChallenge,
  },
  actions: {
    setCurrentChallenge(newChallenge : Challenge) {
      this.currentChallenge = newChallenge;
    },
  },
})