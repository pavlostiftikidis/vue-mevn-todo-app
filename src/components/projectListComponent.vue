<template>
<div class="row">
    <div class="col-12 col-sm-6 col-md-3">
        <h4><span class="badge bg-info text-dark">Actions</span></h4>
        <div class="row justify-content-center">
            <button type="button" @click="showProjectForm = !showProjectForm" class="btn btn-primary">Add Project</button>
        </div>
        <div>
            <Project-form v-if="showProjectForm" :projects="this.projects" :editFormData="this.editFormData" @close="showProjectForm = false"/>
        </div>
    </div>
    <div class="col-12 col-sm-6 col-md-9">
        <h4><span class="badge bg-warning text-dark">Uncompleted</span></h4>
        <div class="row justify-content-center">
            <div class="col-12 col-sm-6 col-md-10" v-for="(item, index) in projects" :key="item._id">
                <div class="card" v-if="percentCompletedTask(index) != '100%'">
                    <div class="card-body">
                        <h5 class="card-title">{{item.title}}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" :style="{width:percentCompletedTask(index)}" aria-valuemin="0" aria-valuemax="100">{{percentCompletedTask(index)}}</div>
                        </div>
                        </h6>
                        <p class="card-text">{{item.description}}</p>
                        <router-link :to="{ name: 'projectSingleComponent', props:{io: item._id},params: {id: item._id, project: JSON.stringify(item), progress: percentCompletedTask(index)} }">Read More</router-link>
                        <div>
                            <button type="button" @click="editForm(item)" class="btn btn-dark btn-sm">Edit</button>   
                            <button type="button" @click.prevent="deleteProject(item._id)" class="btn btn-danger btn-sm">Delete</button>  
                        </div>
                        

                    </div>
                </div>
            </div>
        </div>
        <h4><span class="badge bg-success">Completed</span></h4>
    
        <div class="row justify-content-center">    
            <div class="col-sm-6 col-md-4" v-for="(item, index) in projects" :key="item._id">
                <div class="card" v-if="percentCompletedTask(index) == '100%'">
                    <div class="card-body">
                        <h5 class="card-title">{{item.title}}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" :style="{width:percentCompletedTask(index)}" aria-valuemin="0" aria-valuemax="100">{{percentCompletedTask(index)}}</div>
                        </div>
                        </h6>
                        <p class="card-text">{{item.description}}</p>
                        <router-link :to="{ name: 'projectSingleComponent', params: {id: item._id}}">Read More</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>


<script>
import axios from "axios";
import projectSingleComponent from '@/components/projectSingleComponent.vue'
import ProjectForm from '@/components/Project-form.vue'

    export default {  
        name: 'projectListComponent', 
        components:{ProjectForm},   
        data() {
            return {
                components: {projectSingleComponent},
                    projects: [],
                    showProjectForm: false,
                    editFormData:
                    {
                        _id: null,
                        title: null,
                        description: null,
                        task: []
                    },
            }
        },
        methods: {
            deleteProject(id){
               console.log(id)
               let apiURL = `http://localhost:4000/api/delete-task/${id}`;
                let indexOfArrayItem = this.projects.findIndex(i => i._id === id);

                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.projects.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            },
            editForm(item) {
                this.showProjectForm = true
                this.editFormData = item
            },
            percentCompletedTask(index) {
                let tasks
                if(this.projects[index].task.length != 0){
                    tasks = this.projects[index].task.length
                }else{
                     return 0+'%'
                }
                
                let completedTask = this.projects[index].task.filter(item => item.completed === true).length
                   return parseInt((completedTask / tasks) * 100, 10) + '%'
            },
            submitForm(event) {
                event.preventDefault();                
                this.projects.push(this.newProject)
            },
            percent() {
                console.log('My injected function')
            }
        },
        provide() {
            return {
                name: 'Pavlos'
            }
        },
        created(){
            let apiURL = 'http://localhost:4000/api';
                axios.get(apiURL).then(res => {
                    this.projects = res.data;
                }).catch(error => {
                    console.log(error)
                });
        }
    }
    

</script>

<style>
.row{
    margin-bottom: 20px;
}
.card{
    margin-bottom: 15px;
}

.top-link {
  transition: all .25s ease-in-out;
  position: fixed;
  bottom: 0;
  right: 0;
  display: inline-flex;
   
 cursor: pointer;
 align-items: center;
 justify-content: center;
 margin: 0 3em 3em 0;
 border-radius: 50%;
 padding: .25em;
 width: 80px;
 height: 80px;
 background-color: #F8F8F8;
}
</style>