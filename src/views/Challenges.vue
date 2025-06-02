<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {auth} from "@/firebase";
// import {collection, addDoc, query, where, getDocs} from "firebase/firestore";
import router from "@/router";
import {signOut} from "firebase/auth";
import { useRoute } from 'vue-router';

const route = useRoute()
const id = route.params.id

// const dbPath = ""

const uid = ref('')
const errorMessage = ref('')




// const baseUrl = computed(() => {
//   return process.env.VUE_APP_URL + 'r/'
// });


const handleSignOut = () => {
  signOut(auth)
  router.push('/')
}

onMounted(async () => {
  const currentUser = auth.currentUser;
  if (!currentUser || currentUser.uid !== id) {
    await router.push('/')
  }
  if (currentUser) {
    uid.value = currentUser.uid
  }
});

</script>

<template>

  <section class="section">
    <div>
      <div class="columns center">
        <div id="parent">
          <div class="center padded-bot">
            <button class="btn btn-large" @click="handleSignOut"> Log out</button>
          </div>
          <div>
            <p>
              You are signed in! uid: {{ uid }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>


</template>

<style scoped>
</style>
