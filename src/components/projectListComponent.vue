<template>
<div class="row">
    <div class="col-2">
        <h4><span class="badge bg-info text-dark">Actions</span></h4>
        <div class="row justify-content-center">
            <button type="button" class="btn btn-primary">Add Project</button>
        </div>
    </div>
    <div class="col-10">
        <h4><span class="badge bg-warning text-dark">Uncompleted</span></h4>
        <div class="row justify-content-center">
            <div class="col-sm-6 col-md-4" v-for="(item, index) in projects" :key="item._id">
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

    export default {  
        name: 'projectListComponent',    
        data() {
            return {
                components: {projectSingleComponent},
                newProject:
                    {
                        title: '',
                        description: '',
                        status: false,
                        task:[]
                    },
                    projects: [],
                // projects:[
                //     {
                //         id: 1,
                //         title: 'ptyxiakh',
                //         description: 'TEI',
                //         status: false,
                //         task:[{title:'task1', completed: false}, {title:'task2', completed: true},{title:'task2', completed: true}]
                //     },
                //     {
                //         id: 2,
                //         title: 'vue app',
                //         description: 'My first vue js app',
                //         status: false,
                //         task:[{title:'task1', completed: false}]
                //     },
                //     {
                //         id: 3,
                //         title: 'Codeigniter',
                //         description: 'My first codeigniter app',
                //         status: false,
                //         task:[{title:'task1', completed: false}, {title:'task2', completed: true}]
                //     },
                //     {
                //         id: 4,
                //         title: 'Codeigniter_new',
                //         description: 'My first codeigniter app',
                //         status: false,
                //         task:[{title:'task1', completed: true}, {title:'task2', completed: true}]
                //     },
                //     {
                //         id: 5,
                //         title: 'nexctloud',
                //         description: 'My first codeigniter app',
                //         status: false,
                //         task:[{title:'task1', completed: true}, {title:'task2', completed: true},{title:'task2', completed: true}]
                //     },
                    
                // ],
            }
        },
        methods: {
            percentCompletedTask(index) {
                var tasks
                if(this.projects[index].task.length != 0){
                    tasks = this.projects[index].task.length
                }else{
                     return 0+'%'
                }
                
                var completedTask = this.projects[index].task.filter(item => item.completed === true).length
                   return (completedTask / tasks) * 100 + '%'
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