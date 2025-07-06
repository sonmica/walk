import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStepsStore = defineStore('steps', () => {
  const totalSteps = ref(0)
  function addSteps(amount: number) {
    totalSteps.value += amount
  }
  function setSteps(amount: number) {
    totalSteps.value = amount
  }

  return { totalSteps, addSteps, setSteps }
})
