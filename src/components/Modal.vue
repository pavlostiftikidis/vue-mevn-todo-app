<template>
  <div>
    <h2>This Modal</h2>
    <input type="text" v-model="name">
    <button @click="$emit('close' , name)">Close Modal</button>
  </div>
</template>

<script>
  export default {
    name: 'Modal',
    emits: {
      close: (name) => {
        if(!name) {
          return false
        }else{
          return true
        }
      },
    },
    data() {
      return {
        name: '',
      }
    }
  }
</script>

<style scoped>

</style>