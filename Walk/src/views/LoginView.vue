<script setup>
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { ref } from 'vue';
import router from "@/router";

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
          .then((userCredentials) => sendEmailAndGoToDashboard(userCredentials))
    } else {
      await signInWithEmailAndPassword(auth, email.value, password.value)
          .then((userCredentials) =>
              goToDashboard(userCredentials.user.uid)
          )
    }
  } catch (error) {
    errorMessage.value = error.message;
  }
  isLoading.value = false;
};

function goToAbout() {
  router.push({ name: 'about' })
}

function goToDashboard(uidString) {
  // router.push({ name: "dashboard", params: { uid: uidString} })
  router.push(`/dashboard/${uidString}`)
}

function sendEmailAndGoToDashboard(userCredentials) {
  sendEmailVerification(userCredentials.user);
  goToDashboard(userCredentials.user.uid);
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
            <div
                class="padded-bot"
                v-if="newUser">
              <a href="#" @click="newUser = false">Returning User?</a>
            </div>
            <div
                class="padded-bot"
                v-else>
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
                  >
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
                  >
                </div>
              </div>

              <div class="field">
                <div class="center btn-container">
                  <button
                      class="btn btn-large"
                      :class="{'is-loading': isLoading}"
                      type="submit"
                  >
                    {{ newUser ? 'Sign Up' : 'Login'}}
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
                <p>
                  Loading ...
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style>

</style>
