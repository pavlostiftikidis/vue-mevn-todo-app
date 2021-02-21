<template>
    
    <div id="deleteAlert" class="alert alert-danger alert-dismissible fade" role="alert">
    <strong>Delete has completed!</strong>
    </div> 


    <div id="addAlert" class="alert alert-info alert-dismissible fade" role="alert">
    <strong>Add has completed!</strong>
    </div> 


    <div id="editAlert" class="alert alert-info alert-dismissible fade" role="alert">
    <strong>Edit has completed!</strong>
    </div> 

    <div id="updateAlert" class="alert alert-info alert-dismissible fade" role="alert">
    <strong>Project status has changed</strong>
    </div> 
    
</template>

<script>
    export default {
        name: 'Alert'
    }
</script>

<style scoped>
.alert{
    bottom: 20px;
    right: 20px;
    position: fixed;
}
</style>