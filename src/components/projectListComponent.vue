<template>
    <h4><span class="badge bg-warning text-dark">Uncompleted</span></h4>
    <div class="row justify-content-center">
        <div class="col-sm-6 col-md-4" v-for="(item, index) in projects" :key="item.id">
            <div class="card" v-if="percentCompletedTask(index) != '100%'">
                <div class="card-body">
                    <h5 class="card-title">{{item.title}}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" :style="{width:percentCompletedTask(index)}" aria-valuemin="0" aria-valuemax="100">{{percentCompletedTask(index)}}</div>
                    </div>
                    </h6>
                    <p class="card-text">{{item.description}}</p>
                    <!-- <a :href="`#/projects/${item.id}`"  class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Primary link</a>
                     -->
                     <router-link :to="{ name: 'projectSingleComponent', params: {id: item.id}}">Read More</router-link>
                </div>
            </div>
        </div>
    </div>
    
    <h4><span class="badge bg-success">Completed</span></h4>
    
    <div class="row justify-content-center">    
        <div class="col-sm-6 col-md-4" v-for="(item, index) in projects" :key="item.id">
            <div class="card" v-if="percentCompletedTask(index) == '100%'">
                <div class="card-body">
                    <h5 class="card-title">{{item.title}}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" :style="{width:percentCompletedTask(index)}" aria-valuemin="0" aria-valuemax="100">{{percentCompletedTask(index)}}</div>
                    </div>
                    </h6>
                    <p class="card-text">{{item.description}}</p>
                    <a :href="`#/projects/${item.id}`"  class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Primary link</a>
                </div>
            </div>
        </div>
    </div>

    <form @submit="submitForm">
    <div>
      <label for="name">Title:</label>
      <input type="text" id="name" v-model="newProject.title">
    </div>

    <div>
      <label for="profile">Description</label>
      <textarea name="profile" id="profile" cols="30" rows="5" v-model="newProject.description"></textarea>
    </div>
    <button>Submit</button>
  </form>

    <a class="top-link hide" href="" id="js-top">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg>
  <span class="screen-reader-text"></span>
</a>  
</template>


<script>
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
                projects:[
                    {
                        id: 1,
                        title: 'ptyxiakh',
                        description: 'TEI',
                        status: false,
                        task:[{title:'task1', completed: false}, {title:'task2', completed: true}]
                    },
                    {
                        id: 2,
                        title: 'vue app',
                        description: 'My first vue js app',
                        status: false,
                        task:[{title:'task1', completed: false}]
                    },
                    {
                        id: 3,
                        title: 'Codeigniter',
                        description: 'My first codeigniter app',
                        status: false,
                        task:[{title:'task1', completed: false}, {title:'task2', completed: true}]
                    },
                    {
                        id: 4,
                        title: 'Codeigniter_new',
                        description: 'My first codeigniter app',
                        status: false,
                        task:[{title:'task1', completed: true}, {title:'task2', completed: true}]
                    },
                    {
                        id: 5,
                        title: 'nexctloud',
                        description: 'My first codeigniter app',
                        status: false,
                        task:[{title:'task1', completed: true}, {title:'task2', completed: true}]
                    },
                    
                ],
                completedProject:[],
                uncompletedProject:[]
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
            }
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