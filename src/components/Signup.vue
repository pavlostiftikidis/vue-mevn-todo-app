<template>
  <div>
    <form @submit.prevent="signup">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputEmail4">Firstname</label>
          <input
            type="text"
            class="form-control"
            id="name"
            required
            v-model="firstname"
            placeholder="Firstname"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="inputPassword4">Lastname</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword4"
            required
            v-model="lastname"
            placeholder="Lastname"
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
            v-model="email"
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
            v-model="password"
            placeholder="Password"
          />
        <div v-if="password.length > 1 && password.length < 6" class="text-danger">Password length length should be greater than 6</div>
        </div>
        <div class="form-group col-md-6">
          <label for="inputPassword4">Re-Enter Password</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword4"
            required
            v-model="repassword"
            placeholder="Password"
          />
          <div v-if="password != repassword && repassword.length >1">Password don't matched</div>
        </div>
      </div>
      
      <button type="submit" class="btn btn-primary">Sign in</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      firstname: "",
      lastname: "",
      password: "",
      repassword: "",
      email: ""
    }
  },
  methods: {
    signup() {
      console.log(this.firstname)
    }
  }
};
</script>

<style scoped>
</style>