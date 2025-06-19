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
import type { PropType } from 'vue'

export default {
  props: {
    challenge: Object as PropType<Challenge>
  },
  setup(props) {
    if(!props.challenge){
      throw new Error("No Challenge provided to ChallengePersonal!!")
    }
  },
  data() {
    return {
      steps: 28 as number,
    }
  }
}
</script>

<style></style>
