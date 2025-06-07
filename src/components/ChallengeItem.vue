<template>
  <div @click="$emit('selected', challenge?.id)" class="item rounded">
    <div class="p-md-2">
      <div style="display: flex;">
        <h6>{{ challenge?.title }}</h6>
        <p style="margin-left: auto;">1245 / 20000</p>
      </div>
      <div class="progress" role="progressbar" aria-label="Steps towards goal" v-bind:aria-valuenow="1245" v-bind:aria-valuemin="0" v-bind:aria-valuemax="20000" style="height: 20px"></div>
      </div>
    </div>
</template>

<style scoped>
.item {
  background-color: grey;
}
</style>

<script lang="ts">
import type Challenge from '@/models/Challenge';
import type { PropType } from 'vue'

export default {
  props: {
    challenge: Object as PropType<Challenge>
  },
  setup(props) {
    console.log(props.challenge)
  }
}
</script>
