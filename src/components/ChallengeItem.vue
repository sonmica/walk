<template>
  <div class="item p-md-2 rounded">
    <div style="display: flex;">
      <h6>{{ item.name }}</h6>
      <p style="margin-left: auto;">1245 / 20000</p>
    </div>
    <div class="progress" role="progressbar" aria-label="Steps towards goal" v-bind:aria-valuenow="1245" v-bind:aria-valuemin="0" v-bind:aria-valuemax="20000" style="height: 20px"></div>
  </div>
</template>

<style scoped>
.item {
  background-color: grey;
}
</style>

<script lang="ts">
export default {
  props: ['item'],
  setup(props) {
    console.log(props.item)
  }
}
</script>
