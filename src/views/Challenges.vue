<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { auth, db } from '@/firebase'
import router from '@/router'
import { signOut } from 'firebase/auth'
import { useRoute } from 'vue-router'
import { addDoc, collection, getDocs, query, where, limit } from 'firebase/firestore'
import ChallengeItem from '@/components/ChallengeItem.vue';
import type Challenge from '@/models/Challenge';

const route = useRoute();
const id = route.params.id;

const dbPath = "steps";

const uid = ref('');
const errorMessage = ref('');
const steps = ref(0);
const creatingNewChallenge = ref(false);

let challengeData = new Array<Challenge>();

async function addSteps() {
  await addDoc(collection(db, dbPath), {
    userUid: uid.value,
    steps: steps.value,
    timestamp: Date.now()
  })
}

// const fetch = async () => {
//   const q = query(collection(db, dbPath), where("owner", "==", uid.value), limit(1));
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     let steps_data = {}
//     steps_data['id'] = doc.id
//     steps_data['data'] = doc.data()
//     steps.value = steps_data.steps_count
//   });
//
// }

// const baseUrl = computed(() => {
//   return process.env.VUE_APP_URL + 'r/'
// });

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

    const querySnapshot = await getDocs(collection(db, 'challenges'));
    challengeData = querySnapshot.docs.map(q => ({
      id: q.id,
      adminUid: q.get('adminUid'),
      title: q.get('title'),
      startDate: q.get('startDate'),
      endDate: q.get('endDate'),
      stepGoal: q.get('stepGoal')
    } as Challenge));
  }
})

function goToChallenge(challengeId: string) {
  console.log(challengeId)
  router.push({ name: 'challengePersonal', params: { challengeId: challengeId } })
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

            <h2>Mary's Challenges</h2>

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
