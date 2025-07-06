<template>
  <div class="challengePersonal">
    Challenges Page (personal)
    <ProgressBar :steps="steps" :goal="challenge?.stepGoal"></ProgressBar>
    <input type="range" v-model="steps" />
  </div>
</template>

<script lang="ts">
import ProgressBar from '@/components/ProgressBar.vue';
import type Challenge from '@/models/Challenge';
import router from '@/router';
import { useChallengeStore } from '@/stores/challengeStore';
import type { PropType } from 'vue'

export default {
  created() {
    const challengeStore = useChallengeStore();
    console.log("=======");
    console.log(router.currentRoute.value.params.challengeId);
    console.log(challengeStore.getCurrentChallenge)
    console.log("=======");

  },
  data() {
    return {
      steps: 28 as number,
    }
  }
}
</script>

<style></style>
