<template>
  <div class="challengePersonal">
    Challenges Page (personal) {{ steps }}/{{ challenge?.stepGoal }}
    <div
      class="progress"
      role="progressbar"
      aria-label="Steps towards goal"
      :aria-valuenow="steps"
      :aria-valuemin="0"
      :aria-valuemax="challenge?.stepGoal"
      style="height: 20px"
    >
      <div class="progress-bar" v-bind:style="{ width: percentToGoal + '%' }"></div>
    </div>
    <input type="range" v-model="steps" />
  </div>
</template>

<script lang="ts">
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
  },
  computed: {
    percentToGoal() {
      return this.challenge ? (this.steps / this.challenge?.stepGoal * 100) : 0
    },
  },
}
</script>

<style></style>
