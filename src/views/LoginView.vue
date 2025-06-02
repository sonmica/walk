<script setup lang="ts">
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { ref } from 'vue';
import router from "@/router";
import { type UserCredential } from "firebase/auth"


const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const newUser = ref(true);

const handleLogin = async () => {

  isLoading.value = true;
  errorMessage.value = '';
  try {
    if (newUser.value) {
      await createUserWithEmailAndPassword(auth, email.value, password.value)
          .then((userCredentials) => sendEmailAndGoToChallenges(userCredentials))
    } else {
      await signInWithEmailAndPassword(auth, email.value, password.value)
          .then((userCredentials) =>
              goToChallenges(userCredentials.user.uid)
          )
    }
  } catch (error) {
    console.log(error)
  }
  isLoading.value = false;
};

function goToAbout() {
  router.push({ name: 'about' })
}

function goToChallenges(uidString: string) {
  router.push(`/challenges/${uidString}`)
}

function sendEmailAndGoToChallenges(userCredentials: UserCredential) {
  sendEmailVerification(userCredentials.user);
  goToChallenges(userCredentials.user.uid);
}
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="parent">
        <div class="center">
          <div>
            <div class="center">
              <h1 class="title">Login</h1>
            </div>
            <div class="padded-bot" v-if="newUser">
              <a href="#" @click="newUser = false">Returning User?</a>
            </div>
            <div class="padded-bot" v-else>
              <a href="#" @click="newUser = true">New user?</a>
            </div>
            <form @submit.prevent="handleLogin">
              <div class="field padded-bot">
                <label class="label">Email</label>
                <div class="control">
                  <input
                    v-model="email"
                    class="input"
                    type="email"
                    placeholder="youremail@example.com"
                    required
                    size="42"
                  />
                </div>
              </div>

              <div class="field padded-bot">
                <label class="label">Password</label>
                <div class="control">
                  <input
                    v-model="password"
                    class="input"
                    type="password"
                    placeholder="********"
                    required
                    size="42"
                  />
                </div>
              </div>

              <div class="field">
                <div class="center btn-container">
                  <button class="btn btn-large" :class="{ 'is-loading': isLoading }" type="submit">
                    {{ newUser ? 'Sign Up' : 'Login' }}
                  </button>
                </div>
              </div>

              <div v-if="errorMessage" class="notification is-danger is-light mt-4">
                {{ errorMessage }}
              </div>
            </form>

            <div class="center btn-container padded">
              <button @click="goToAbout" class="btn">About</button>
            </div>

            <div class="center" v-if="isLoading === true">
              <div>
                <p>Loading ...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
