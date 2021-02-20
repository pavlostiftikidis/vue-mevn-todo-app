<template>
<div>
  <Input v-model="formValues.title" info="Title"/>
  <Input v-model="formValues.description" info="Description"/>
  <button @click.prevent="submitForm" class="btn btn-success">Submit</button>
  <div v-if="showSuccessAlert = true" >
    <div v-bind:class="{notificationAlert:showSuccessAlert}" >
    This is a success alert—check it out!
  </div>
  </div>
  
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
      submitForm() {  
        if(this.formValues._id != null){
          console.log('from update')
          console.log(JSON.stringify(this.formValues))
          let apiURL = `http://localhost:4000/api/update-task/${this.formValues._id}`;

            axios.post(apiURL, this.formValues).then((res) => {
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
.notificationAlert {
  color: white;
  bottom: 20px;
  right: 20px;
  position: fixed;
  background-color: #f4b251;
  border-bottom: 4px solid #E89F3C;
  color: #fff;
  padding: 20px;
  border-radius: 14px;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  transform: translateX(100%);
  transition: all 500ms;
  opacity: 0;
  z-index: -1;
}

.notification-alert--shown {
  opacity: 1;
  transform: translateX(0);
  transition: all 500ms;
}
</style>