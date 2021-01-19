<template>
    <div>
        <h2>Id: {{id}}</h2>
    </div>
</template>

<script>
    export default {
        name: 'projectSingleComponent',    
        data() {
            return {
                id: 0
            }

        },
        created() {
            this.id = this.$route.params.id;
        }  
    }
</script>

<style scoped>

</style>