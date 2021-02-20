<template>
    <div class="item">
        <!-- <h3 :class="{done: status}">{{title}} - {{status ? 'Done' : 'Undone'}} <input type="checkbox" id="scales" name="scales"
         checked></h3>
         <button @click="$emit('update')">asd</button> -->
        <h3 @click="$emit('update')" :class="{done: task.completed}">{{task.title}}</h3>
    </div>
    <div class="button">
        <button type="button" @click="$emit('deleteItem', task.id)" class="btn btn-danger btn-sm">Delete</button>
    </div>
</template>

<script>
    export default {
        name: 'TodoItem',
        props: {
            task: Object
        },
        emits: ['update', 'deleteItem'],
    }
</script>

<style scoped>
.done{
    text-decoration: line-through;
}
.item {
    display: inline-block;
    width: 70%;
}
.button {
    display: inline-block;
}
</style>