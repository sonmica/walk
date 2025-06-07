<template>
    {{ steps }}/{{ goal }}
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
</template>

<style scoped>
</style>

<script lang="ts">
export default {
  props: {
    steps: Number,
    goal: Number
  },
  computed: {
    percentToGoal() {
      return this.steps ? (this.steps / (this.goal ? this.goal : 0) * 100) : 0
    },
  },
}
</script>
