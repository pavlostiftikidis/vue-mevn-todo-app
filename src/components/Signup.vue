<template>
  <div>
    <form @submit.prevent="userRegistration">
      <div class="form-row">
        <div class="form-group col-md-12">
          <label for="inputEmail4">Username</label>
          <input
            type="text"
            class="form-control"
            id="name"
            required
            v-model="user.name"
            placeholder="Username"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-12">
          <label for="inputEmail4">Email</label>
          <input
            type="email"
            class="form-control"
            id="inputEmail4"
            required
            v-model="user.email"
            placeholder="Email"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputPassword4">Password</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword4"
            required
            v-model="user.password"
            placeholder="Password"
          />
        <div v-if="user.password.length > 1 && user.password.length < 6" class="text-danger">Password length length should be greater than 6</div>
        </div>
        <div class="form-group col-md-6">
          <label for="inputPassword4">Re-Enter Password</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword4"
            required
            v-model="user.repassword"
            placeholder="Password"
          />
          <div v-if="user.password != user.repassword && user.repassword.length >1">Password don't matched</div>
        </div>
      </div>
      
      <button type="submit" class="btn btn-primary">Sign in</button>
    </form>
  </div>
</template>

<script>

import firebase from "firebase";

export default {
  name: "Signup",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        repassword: ""
      },
    }
  },
  methods: {
    userRegistration() {
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then((res) => {
        res.user
          .updateProfile({
            displayName: this.user.name
          })
          .then(() => {
            this.$router.push('/login')
          });
      })
      .catch((error) => {
         alert(error.message);
      });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userAuth = user;
        this.$router.push({ name: "Projects" });
      } else {
        this.userAuth = null;
        this.$router.push({ name: "signup" });
      }
    });
  }
};
</script>

<style scoped>
</style>