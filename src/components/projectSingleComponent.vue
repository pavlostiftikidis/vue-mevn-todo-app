<template>
<button @click="showModal = true">Show modal</button>
<Modal v-if="showModal" @close="closeModal"/>
    <div class="row">
        <div class="col-12">
            <h1><span class="badge badge-secondary todoProgress">Progress1</span></h1>
            <div class="progress">
                <div class="progress-bar" role="progressbar" :style="{width:progressPercent() + '%'}" aria-valuemin="0" aria-valuemax="100">{{progressPercent()}} %</div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-md-6 project">
            <h1><span class="badge badge-secondary">Project Details</span></h1>
            <div class="border">
                <h2>Id: {{project.id ? project.id :  project._id}}</h2>
                <h2>title: {{project.title}}</h2>
                <h2>description: {{project.description}}</h2>
                <h2>status: {{project.status}}</h2>

           </div>
           
           
            
        </div>
        <div class="col-12 col-md-6 todo">
            <h1><span class="badge badge-secondary">Todo list</span></h1>
            <ul id="example-1">
                <li v-for="item in project.task" :key="item.id">
                    <!-- <h2 @click="toggleDone(item)" :id="item.id" :class="{ done: item.completed }">{{ item.title }} - {{ item.completed }}</h2> -->
                    <Todo-item :task="item" @update="toggleDone(item)"/>
                </li>
            </ul>
        </div>
    </div>
    
</template>

<script>
import axios from "axios";
import Modal from './Modal.vue';
import TodoItem from './Todo-item.vue';

    export default {
  components: { Modal, TodoItem },
  name: 'projectSingleComponent',  
        data() {
            return {
                showModal: false,
                project: {
                    id: '',
                    title: '',
                    description: '',
                    status: false,
                    task: [],
                    progress: ''
                },
                projectData:'',
                currentProgress: 0
                
            }

        },
        watch: {
            currentProgress(val){
                if(val == 100){
                    console.log("i am a watcher, project completed " + val)
                    if(this.project.status == true){
                        this.project.status = !this.project.status
                        let apiURL = 'http://localhost:4000/api/update-task/' + this.$route.params.id;
                            axios.post(apiURL, this.project).then((res) => {
                            console.log(res)
                            console.log('update status')
                        }).catch(error => {
                            console.log(error)
                        });
                    }
                }else if(isNaN(val)){
                    return
                }else{ 
                    if(this.project.status == false){   
                        this.project.status = !this.project.status
                        let apiURL = 'http://localhost:4000/api/update-task/' + this.$route.params.id;
                            axios.post(apiURL, this.project).then((res) => {
                            console.log(res)
                            console.log('update status from completed to uncompleted')
                        }).catch(error => {
                            console.log(error)
                        });
                    }               
                    console.log("i am a watcher, project not completed " + val)
                }
                
            }
        },
        computed: {
            
        },
        methods: {
            closeModal(data) {
                this.showModal = false
                console.log(data)
            },
            progressPercent() {
                let taskCount = this.project.task.length
                let completedTask = this.project.task.filter(item => item.completed === true).length
                let percent = (completedTask / taskCount) * 100
                this.currentProgress = percent
                return parseInt(percent, 10) 
            },
            toggleDone(task) {
                if(this.project.id == null){
                    //if fetch from api parse id, this.project._id
                    this.project.id = this.project._id
                }    
                //afou kserw to id tou task, kserw kai thn thesi tou (task.id - 1) = index           
                this.project.task[task.id - 1].completed = !this.project.task[task.id - 1].completed
                this.currentProgress = this.progressPercent()

                let apiURL = 'http://localhost:4000/api/update-task/' + this.$route.params.id;
                axios.post(apiURL, this.project).then((res) => {
                console.log(res)
            }).catch(error => {
                console.log(error)
            });

                
            }           
        },
        created() {
            let projectData = this.$route.params;
            if(projectData.project){
                this.project.id = projectData.id
                this.project.title = JSON.parse(projectData.project).title
                this.project.description = JSON.parse(projectData.project).description
                this.project.status = JSON.parse(projectData.project).status
                this.project.task = JSON.parse(projectData.project).task
                this.project.progress = projectData.progress
                
            }else{
                console.log('Fetch data from API')
                
                let apiURL = 'http://localhost:4000/api/edit-task/' + this.$route.params.id;
                console.log(apiURL)
                axios.get(apiURL).then(res => {
                    this.project = res.data;
                }).catch(error => {
                    console.log(error)
                });
            }
            
        }
    };
</script>

<style scoped>

.badge {
    margin-bottom: 50px ;
}

.todoProgress {
    margin-top: 50px;
}

.done {
    text-decoration: line-through;
}

</style>