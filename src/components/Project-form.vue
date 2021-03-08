<template>
<form @submit.prevent="submitForm">
  <Input v-model="formValues.title" info="Title"/>
  <Input v-model="formValues.description" info="Description"/>
  <button type="submit" class="btn btn-success">Submit</button>
  
</form>
</template>

<script>
import Input from '@/components/Input.vue'
import axios from "axios";

  export default {
    name: 'Project-form',
    components:{ Input },
    props: {
      projects: Object,
      editFormData: Object
      },
    emits: ['close'],
    data() {
      return {
        showSuccessAlert: false,
        formValues: {
            id: null,
            title: null,
            description: null,
            task: [],
            status: false
        },
        allProjects: this.projects,
        
      }
    },
    methods: {
      submitForm(event) {  
        if(this.formValues._id != null){
          console.log('from update')
          console.log(JSON.stringify(this.formValues))
          let apiURL = `http://localhost:4000/api/update-task/${this.formValues._id}`;

            axios.post(apiURL, this.formValues).then((res) => {
              document.getElementById('editAlert').classList.add("show")
              setTimeout(function() { document.getElementById('editAlert').classList.remove("show") }, 3000);
                console.log(res)
            }).catch(error => {
                console.log(error)
            });
        }else{
          console.log('from create')
          //this.formValues.status = false
          let apiURL = 'http://localhost:4000/api/create-task';
                axios.post(apiURL, this.formValues).then((res) => {
                  
                  // parse id for new project
                  let projectId = res.data._id
                  console.log(projectId)
                  this.formValues.id = projectId
                  this.formValues._id = projectId
                  console.log(JSON.stringify(this.formValues))
                  this.allProjects.push(this.formValues)
                  this.$router.push('/projects')
                  document.getElementById('addAlert').classList.add("show")
                  setTimeout(function() { document.getElementById('addAlert').classList.remove("show") }, 3000);
                  event.target.reset();
                }).catch(error => {
                    console.log(error)
                });
        }
        
      }
    },
    created() {
      if(this.editFormData){
        console.log('from edit')
        this.formValues = this.editFormData
      }
    }
    
  }
</script>

<style scoped>

</style>