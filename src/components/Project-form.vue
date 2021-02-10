<template>
<div>
  <Input v-model="formValues.title" info="Title"/>
  <Input v-model="formValues.description" info="Description"/>
  <button @click.prevent="submitForm" class="btn btn-success">Submit</button>
</div>
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
        formValues: {
            _id: Object,
            title: null,
            description: null,
            task: [],
            status: false
        },
        allProjects: this.projects
      }
    },
    methods: {
      submitForm() {
        if(this.formValues._id != null){
          console.log('from update')
        }else{
          console.log('from create')
          let apiURL = 'http://localhost:4000/api/create-task';
                axios.post(apiURL, this.formValues).then((res) => {
                  this.$router.push('/projects')
                  // parse id for new project
                  let projectId = res.data._id
                  this.formValues._id = projectId
                  this.allProjects.push(this.formValues)
                  console.log(projectId)
                }).catch(error => {
                    console.log(error)
                });
        }
        
      }
    },
    created() {
      console.log(this.editFormData)
      if(this.editFormData){
        console.log('from edit')
        this.formValues = this.editFormData
        console.log(this.formValues)

      }
    }
    
  }
</script>

<style scoped>

</style>