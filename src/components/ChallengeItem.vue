<template>
  <div @click="$emit('selected', challenge)" class="item rounded">
    <div class="p-md-2">
      <div style="display: flex;">
        <h6>{{ challenge?.title }}</h6>
      </div>
      <ProgressBar :steps=steps :goal="challenge?.stepGoal"></ProgressBar>
      </div>
    </div>
</template>

<style scoped>
.item {
  background-color: grey;
}
</style>

<script lang="ts">
import ProgressBar from './ProgressBar.vue';
import type Challenge from '@/models/Challenge';
import { useStepsStore } from '@/stores/stepsStore';
import type { PropType } from 'vue'

const stepsStore = useStepsStore();

export default {
  props: {
    challenge: Object as PropType<Challenge>
  },
  computed: {
    steps() {
      return stepsStore.totalSteps
    }
  },
  components: {
    ProgressBar
  },
}
</script>
