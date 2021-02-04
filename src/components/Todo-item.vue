<template>
    <div>
        <!-- <h3 :class="{done: status}">{{title}} - {{status ? 'Done' : 'Undone'}} <input type="checkbox" id="scales" name="scales"
         checked></h3>
         <button @click="$emit('update')">asd</button> -->
         <h3 @click="$emit('update')" :class="{done: task.completed}">{{task.title}}</h3>
    </div>
</template>

<script>
    export default {
        name: 'TodoItem',
        props: {
            task: Object
        },
        emits: ['update']
    }
</script>

<style scoped>
.done{
    text-decoration: line-through;
}
</style>