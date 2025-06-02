<script setup lang="ts">
import LoginView from "@/views/LoginView.vue";
import {onAuthStateChanged, signOut, type User} from "firebase/auth";
import {auth} from "@/firebase";
import { onBeforeUnmount, ref } from "vue";
import router from "@/router";


const isLoggedIn = ref(false)

const listen = onAuthStateChanged(auth, (firebaseUser) => updateValues(firebaseUser))


function updateValues(firebaseUser: User|null) {
  isLoggedIn.value = !!firebaseUser;
}

const handleSignOut = () => {
  signOut(auth)
  router.push('/')
}

onBeforeUnmount(async () => {
  listen()
});

</script>

<template>
  <LoginView v-if="!isLoggedIn" />
  <div v-else>
    <button class="btn btn-large padded" @click="handleSignOut">To login</button>
  </div>
</template>
