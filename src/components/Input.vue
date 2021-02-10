<template>
    <div>
        <input type="text" required :value="modelValue" :placeholder="info" @input="$emit('update:modelValue', $event.target.value)">
    </div>
</template>

<script>
    export default {
        name: 'Input',
        props: {
            info: String,
            modelValue: String
        }
    }
</script>

<style scoped>
input {
    margin-bottom: 5%;
    width: 100%;
    border-top-style: hidden;
    border-right-style: hidden;
    border-left-style: hidden;
    border-bottom-style: groove;
    border-bottom: 2px solid;    
}

input:hover{
    background-color: #eee;
}

</style>