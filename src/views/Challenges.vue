<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { auth, db } from '@/firebase'
import router from '@/router'
import { signOut } from 'firebase/auth'
import { useRoute } from 'vue-router'
import { addDoc, collection, getDocs, query, where, limit } from 'firebase/firestore'
import ChallengeItem from '@/components/ChallengeItem.vue';
import type Challenge from '@/models/Challenge';
import { useChallengeStore } from '@/stores/challengeStore'
import { useStepsStore } from '@/stores/stepsStore'

const route = useRoute();
const id = route.params.id;

const stepsDbPath = "steps";

const uid = ref('');
const errorMessage = ref('');
const steps = ref(0);
const creatingNewChallenge = ref(false);
const challengeStore = useChallengeStore();
const stepsStore = useStepsStore();

let challengeData = ref(new Array<Challenge>());

async function addSteps() {
  // Add the steps in Firebase
  await addDoc(collection(db, stepsDbPath), {
    owner: uid.value,
    steps: steps.value,
    timestamp: Date.now()
  });

  // Also add them to the store so we don't need to go look in firebase again
  stepsStore.addSteps(steps.value);
}

const handleSignOut = () => {
  signOut(auth)
  router.push('/')
}

onMounted(async () => {
  const currentUser = auth.currentUser
  if (!currentUser || currentUser.uid !== id) {
    await router.push('/')
  }
  if (currentUser) {
    uid.value = currentUser.uid

    // Get challenge data from Firebase
    const queryChallengeSnapshot = await getDocs(collection(db, 'challenges'));
    challengeData.value = queryChallengeSnapshot.docs.map(q => ({
      id: q.id,
      adminUid: q.get('adminUid'),
      title: q.get('title'),
      startDate: q.get('startDate'),
      endDate: q.get('endDate'),
      stepGoal: q.get('stepGoal')
    } as Challenge));

    // reset steps store as we're about to count them up again
    stepsStore.setSteps(0);

    // Get steps data from Firebase
    const q = query(collection(db, stepsDbPath), where("owner", "==", uid.value));
    const queryStepsSnapshot = await getDocs(q);
    // Add all steps documents for this user to the total in the steps store
    queryStepsSnapshot.forEach((doc) => {
      stepsStore.addSteps(doc.get('steps'));
    });
  }
})

function goToChallenge(challenge: Challenge) {
  // Set the "current" challenge in the store, so child pages can just read from that
  // Because passing objects through the route was really hard and I gave up
  challengeStore.setCurrentChallenge(challenge);
  router.push({ name: 'challengePersonal'})
}

function goToCreateChallenge() {
  router.push({ name: 'createChallenge' })
}
</script>

<template>
  <section class="section">
    <div>
      <div class="columns center">
        <div id="parent">
          <div class="center pb-2">
            <button class="btn btn-warning btn-large me-2" @click="handleSignOut">Log out</button>

            <h2>Your challenges</h2>

            <div>
              <ChallengeItem v-for="challenge in challengeData" :key="challenge.id" :challenge="challenge"
                @selected="goToChallenge" class="m-2" />
            </div>

          </div>
          <button @click="goToCreateChallenge">Create Challenge</button>
          <span class="">
            <input v-model="steps" type="number" placeholder="Enter steps" />
            <button @click="addSteps" :disabled="errorMessage !== ''" class="btn btn-warning">Add steps</button>
          </span>
        </div>
      </div>
    </div>
    <div>
      <p>You are signed in! uid: {{ uid }}</p>
    </div>
  </section>
</template>

<style scoped></style>
