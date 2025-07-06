<template>
  <div class="challengePersonal">
    Challenges Page (personal)
    <ProgressBar :steps="steps" :goal="challenge?.stepGoal"></ProgressBar>
  </div>
</template>

<script lang="ts">
import ProgressBar from '@/components/ProgressBar.vue';
import type Challenge from '@/models/Challenge';
import router from '@/router';
import { useChallengeStore } from '@/stores/challengeStore';
import { useStepsStore } from '@/stores/stepsStore';
import type { PropType } from 'vue'

export default {
  created() {
    // Fetch whatever challenge has been set as the "current" on in the store
    const challengeStore = useChallengeStore();
    this.challenge = challengeStore.getCurrentChallenge;
    const stepsStore = useStepsStore();
    this.steps = stepsStore.totalSteps;
  },
  data() {
    return {
      challenge: null as Challenge | null,
      steps: 0
    }
  },
  components: {
    ProgressBar
  },
}
</script>

<style></style>
