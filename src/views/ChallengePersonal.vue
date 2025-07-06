<template>
  <div class="challengePersonal">
    Challenges Page (personal)
    <ProgressBar :steps="steps" :goal="challenge?.stepGoal"></ProgressBar>
  </div>
</template>

<script lang="ts">
import ProgressBar from '@/components/ProgressBar.vue';
import type Challenge from '@/models/Challenge';
import { useChallengeStore } from '@/stores/challengeStore';
import { useStepsStore } from '@/stores/stepsStore';

const challengeStore = useChallengeStore();
const stepsStore = useStepsStore();

export default {
  created() {
    // Fetch whatever challenge has been set as the "current" challenge in the store
    this.challenge = challengeStore.getCurrentChallenge;
    // Fetch the total steps for the current user
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
