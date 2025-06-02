<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { auth, db } from '@/firebase'
import router from '@/router'
import { signOut } from 'firebase/auth'
import { useRoute } from 'vue-router'
// import { addDoc, collection, getDocs, query, where, limit } from 'firebase/firestore'
import { addDoc, collection } from 'firebase/firestore'

const route = useRoute()
const id = route.params.id

const dbPath = 'steps'

const uid = ref('')
const errorMessage = ref('')
const steps = ref(0)
const creatingNewChallenge = ref(false)

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
  }
})

function goToChallenge(challengeId: string) {
  router.push({ name: 'challengePersonal', params: { challengeId: challengeId } })
}
</script>

<template>
  <section class="section">
    <div>
      <button class="btn btn-warning btn-large" @click="handleSignOut">Log out</button>
      <button class="btn btn-primary btn-large" @click="goToChallenge('123')">
        Go to challenge
      </button>
    </div>
    <div>
      <p>You are signed in! uid: {{ uid }}</p>
    </div>
    <span class="">
      <input v-model="steps" type="number" placeholder="Enter steps" />
      <button @click="addSteps" :disabled="errorMessage !== ''" class="btn btn-warning">
        Add steps
      </button>
    </span>
  </section>
</template>

<style scoped></style>
