<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import router from "@/router";

const route = useRoute();
const challengeId = route.params.challengeId;

function goToPersonal() {
  router.push({ name: 'challengePersonal', params: { 'challengeId': challengeId }});
}

function goToGroup() {
  router.push({ name: 'challengeGroup', params: { 'challengeId': challengeId }});
}

function goToDetails() {
  router.push({ name: 'challengeDetails', params: { 'challengeId': challengeId }});
}

</script>

<template>
  <div class="challenge">Challenge Page!</div>

  <nav>
    <button class="btn btn-large" @click="goToPersonal">Personal</button>
    <button class="btn btn-large" @click="goToGroup">Group</button>
    <button class="btn btn-large" @click="goToDetails">Details</button>
  </nav>

  <RouterView />
</template>

<style></style>
