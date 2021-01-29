}<template>
<button @click="showPopup = true">click open modal</button>
<Popup v-if="showPopup" @close1="closePopup"/>
    <div class="row">
        <div class="col-12 col-md-6 project">
            <h1><span class="badge badge-secondary">Project Details</span></h1>
            <div class="border">
                <h2>Id: {{project.id}}</h2>
                <h2>title: {{project.title}}</h2>
                <h2>description: {{project.description}}</h2>
                <h2>status: {{project.status}}</h2>
                <h2>progress: {{project.progress}}</h2>
                <hr>
                <h2>Name:{{name}}</h2>
           </div>
           <h1><span class="badge badge-secondary todoProgress">Progress</span></h1>
           <div class="progress">
                <div class="progress-bar" role="progressbar" :style="{width:project.progress}" aria-valuemin="0" aria-valuemax="100">{{project.progress}}</div>
            </div>
           
            
        </div>
        <div class="col-12 col-md-6 todo">
            <h1><span class="badge badge-secondary">Todo list</span></h1>
            <ul id="example-1">
                <li v-for="item in project.task" :key="item.id">
                    <h2>{{ item.title }} - {{ item.completed }}</h2>
                </li>
            </ul>
        </div>
    </div>
    
</template>

<script>
import axios from "axios";
import Popup from './Popup.vue';
    export default {
  components: { Popup },
        name: 'projectSingleComponent',
        inject: ['name'],   
        data() {
            return {
                showPopup: false,
                project: {
                    id: 0,
                    title: '',
                    description: '',
                    status: false,
                    task: [],
                    progress: ''
                },
                projectData:''
                
            }

        },
        methods: {
            closePopup(){
                this.showPopup = false

            }
        },
        created() {
            console.log(`Injected property: ${this.name}`)
            let projectData = this.$route.params;
            if(projectData.project){
                this.project.id = projectData.id
                this.project.title = JSON.parse(projectData.project).title
                this.project.description = JSON.parse(projectData.project).description
                this.project.status = JSON.parse(projectData.project).status
                this.project.task = JSON.parse(projectData.project).task
                this.project.progress = projectData.progress
            }else{
                console.log('kanena data')
                let apiURL = 'http://localhost:4000/api/edit-task/600c4a01804d281158c11f71';
                axios.get(apiURL).then(res => {
                    this.project = res.data;
                    console.log(this.project)
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

</style>