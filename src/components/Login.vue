<template>
  <div class="box">
    <form @submit.prevent="userLogin">
      <div class="form-group title">
        <h2>Sign in</h2>
      </div>
      <hr />
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          required
          v-model="user.email"
          placeholder="Enter email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          required
          v-model="user.password"
          placeholder="Password"
        />
      </div>
      <button type="submit" class="btn btn-signin btn-block">Sign in</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      userAuth: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userAuth = user;
        this.$router.push({ name: "Projects" });
      } else {
        this.userAuth = null;
        this.$router.push({ name: "login" });
      }
    });
  },
  methods: {
    userLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
          this.$router.push("/projects");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>

<style scoped>
.box {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  padding: 20px;
}

form {
  padding: 3%;
  width: 50%;
}

.btn-signin {
  color: #fff;
  background-color: #42b983;
  border-color: #42b983;
}
</style>