<template>
  <!-- Nav bar -->
  <nav
    class="navbar navbar-custom navbar-dark justify-content-between flex-nowrap flex-row"
  >
    <div class="container">
      <a class="navbar-brand float-left">MEVN Stack ToDo App</a>
      <ul class="nav navbar-nav flex-row float-right">
        <li v-bind:class="{ hidden: user != null }" class="nav-item">
          <router-link class="nav-link pr-3" to="/login">Sign in</router-link>
        </li>
        <li v-bind:class="{ hidden: user != null }" class="nav-item">
          <router-link class="nav-link pr-3" to="/signup">Sign up</router-link>
        </li>
        <li v-bind:class="{ hidden: user == null }" class="nav-item">
          <router-link class="nav-link pr-3" to="/projects"
            >Projects</router-link
          >
        </li>
        <li
          type="submit"
          @click="logOut()"
          v-bind:class="{ hidden: user == null }"
          class="nav-item"
        >
          <router-link class="nav-link pr-3" to="/login">Logout</router-link>
        </li>
      </ul>
    </div>
  </nav>

  <!-- Router view -->
  <div class="container mt-5">
    <router-view></router-view>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
        this.$router.push({ name: "login" });
      }
    });
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          firebase.auth().onAuthStateChanged(() => {
            this.$router.push("/login");
          });
        });
      this.user = null;
    },
  },
};
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

/* Modify the backgorund color */
.navbar-custom {
  background-color: #42b983;
}

#nav a.router-link-exact-active {
  color: #ffeedb;
}

.hidden {
  display: none;
}
</style>
