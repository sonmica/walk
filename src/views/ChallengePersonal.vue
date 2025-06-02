<template>
  <div class="challengePersonal">
    Challenges Page (personal) {{ steps }}/{{ goal }}
    <div
      class="progress"
      role="progressbar"
      aria-label="Steps towards goal"
      :aria-valuenow="steps"
      :aria-valuemin="0"
      :aria-valuemax="goal"
      style="height: 20px"
    >
      <div class="progress-bar" v-bind:style="{ width: percentToGoal + '%' }"></div>
    </div>
    <input type="range" v-model="steps" />
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      goal: 350 as number,
      steps: 28 as number,
    }
  },
  computed: {
    percentToGoal() {
      return (this.steps / this.goal) * 100
    },
  },
}
</script>

<style></style>
