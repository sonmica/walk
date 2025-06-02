<template>
  <div class="challengePersonal">
    Challenges Page (personal) {{steps}}/{{goal}}
    <div class="progress" role="progressbar" aria-label="Steps towards goal" aria-valuenow="100" aria-valuemin="0" aria-valuemax="789" style="height: 20px">
      <div class="progress-bar" v-bind:style="{width: percentToGoal+'%'}"></div>
    </div>
    <input type="range" v-model="steps">
  </div>
</template>

<script>
export default {
  data() {
    return {
      goal: 350,
      steps: 28
    }
  },
  computed: {
    percentToGoal(){
      return this.steps/this.goal*100;
    } 
  }
}
</script>

<style>
</style>
