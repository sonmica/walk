<script setup lang="ts">

import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '@/firebase.ts'

async function addChallenge() {
  await addDoc(collection(db, dbPath), {
    adminUid: auth.currentUser?.uid,
    title: "adventurrr",
    stepGoal: 42,
    startDate: new Date(),
    endDate: new Date(),
  });

}

</script>

<template>

</template>

<style scoped>

</style>
