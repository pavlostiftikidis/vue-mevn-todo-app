<template>
<h2>This is a popup</h2>
<button @click="$emit('close1', 'Vishwas')">Close popup</button>
</template>

<script>
export default {
    name: 'Popup',
    emits: ['close1']
}
</script>

<style scoped>

</style>