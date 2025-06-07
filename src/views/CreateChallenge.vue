<script setup lang="ts">

import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '@/firebase.ts'
import router from '@/router'
import { ref } from 'vue'

const titleValue = ref('');
const stepGoalValue = ref(0);
const startDateValue = ref(Date.now());
const endDateValue = ref(Date.now());

const dbPath = 'challenges'

async function addChallenge() {
  await addDoc(collection(db, dbPath), {
    adminUid: auth.currentUser?.uid,
    title: titleValue.value,
    stepGoal: stepGoalValue.value,
    startDate: startDateValue.value,
    endDate: endDateValue.value,
  }).then(() =>
    goToChallenges(auth.currentUser?.uid),
  );

}

function goToChallenges(uidString: string | undefined) {
  router.push(`/challenges/${uidString}`)
}

</script>

<template>

  <div>
    <input v-model="titleValue" placeholder="Title"/>
    <input v-model="stepGoalValue" type="number" placeholder="Enter steps" />
    <input type="datetime-local" v-model="startDateValue" />
    <input type="datetime-local" v-model="endDateValue" />
    <button @click="addChallenge">
      Add challenge
    </button>
  </div>

</template>

<style scoped>

</style>
