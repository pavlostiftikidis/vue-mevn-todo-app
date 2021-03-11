<template>
  <div class="row">
    <div class="col-12">
      <h1><span class="badge badge-secondary todoProgress">Progress1</span></h1>
      <div class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          :style="{ width: progressPercent() + '%' }"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {{ progressPercent() }} %
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12 col-md-6 project">
      <h1><span class="badge badge-secondary">Project Details</span></h1>
      <div class="border">
        <h2>Id: {{ project.id ? project.id : project._id }}</h2>
        <h2>title: {{ project.title }}</h2>
        <h2>description: {{ project.description }}</h2>
        <h2>status: {{ project.status }}</h2>
      </div>
    </div>

    <div class="col-12 col-md-6 todo">
      <h1><span class="badge badge-secondary">Todo list</span></h1>
      <form @submit.prevent="submitForm">
        <div class="title">
          <input
            type="text"
            v-model.trim="formValues.title"
            placeholder="enter a new task"
          />
          <p>{{ formValues.title }}</p>
        </div>

        <div>
          <button>Submit</button>
        </div>
      </form>

      <ul id="example-1">
        <li v-for="item in project.task" :key="item.id">
          <!-- <h2 @click="toggleDone(item)" :id="item.id" :class="{ done: item.completed }">{{ item.title }} - {{ item.completed }}</h2> -->
          <Todo-item
            :task="item"
            @deleteItem="deleteTask"
            @update="toggleDone(item)"
          />
        </li>
      </ul>
    </div>
  </div>

  <alerts />
</template>

<script>
import axios from "axios";
import TodoItem from "./Todo-item.vue";
import alerts from "./Alerts.vue";
import firebase from "firebase";

export default {
  components: { TodoItem, alerts },
  name: "projectSingleComponent",
  data() {
    return {
      project: {
        id: "",
        title: "",
        description: "",
        status: false,
        task: [],
        progress: "",
      },
      projectData: "",
      currentProgress: 0,
      formValues: {
        id: 0,
        title: null,
        completed: false,
      },
    };
  },
  watch: {
    currentProgress(val) {
      if (val == 100) {
        console.log("i am a watcher, project completed " + val);
        if (this.project.status == true) {
          this.project.status = !this.project.status;
          let apiURL =
            "http://localhost:4000/api/update-task/" + this.$route.params.id;
          axios
            .post(apiURL, this.project)
            .then((res) => {
              console.log(res);
              console.log("update status");
              document.getElementById("updateAlert").classList.add("show");
              setTimeout(function () {
                document.getElementById("updateAlert").classList.remove("show");
              }, 3000);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else if (isNaN(val)) {
        return;
      } else {
        if (this.project.status == false) {
          this.project.status = !this.project.status;
          let apiURL =
            "http://localhost:4000/api/update-task/" + this.$route.params.id;
          axios
            .post(apiURL, this.project)
            .then((res) => {
              console.log(res);
              console.log("update status from completed to uncompleted");
              document.getElementById("updateAlert").classList.add("show");
              setTimeout(function () {
                document.getElementById("updateAlert").classList.remove("show");
              }, 3000);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        console.log("i am a watcher, project not completed " + val);
      }
    },
  },
  computed: {},
  methods: {
    deleteTask(data) {
      let taskId = data;
      let projectId = this.$route.params.id;

      // task list after remove task
      var taskList = this.project.task.filter((x) => {
        return x.id != taskId;
      });
      this.project.task = taskList;
      let apiURL = "http://localhost:4000/api/update-task/" + projectId;
      axios
        .post(apiURL, this.project)
        .then((res) => {
          console.log(res);
          document.getElementById("deleteAlert").classList.add("show");
          setTimeout(function () {
            document.getElementById("deleteAlert").classList.remove("show");
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closeModal(data) {
      this.showModal = false;
      console.log(data);
    },
    submitForm(event) {
      event.preventDefault();
      let newTaskId;

      //parse last array item id and increment for newTaskId
      if (this.project.task.length == 0) {
        newTaskId = 1;
      } else {
        newTaskId =
          parseInt(this.project.task[this.project.task.length - 1].id) + 1;
      }

      this.formValues.id = newTaskId;
      this.project.task.push(this.formValues);

      let apiURL =
        "http://localhost:4000/api/update-task/" + this.$route.params.id;
      axios
        .post(apiURL, this.project)
        .then((res) => {
          console.log(res);
          document.getElementById("addAlert").classList.add("show");
          setTimeout(function () {
            document.getElementById("addAlert").classList.remove("show");
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    progressPercent() {
      let taskCount = this.project.task.length;
      if (taskCount == 0) {
        return parseInt(0, 10);
      } else {
        console.log(taskCount);
        let completedTask = this.project.task.filter(
          (item) => item.completed === true
        ).length;
        let percent = (completedTask / taskCount) * 100;
        this.currentProgress = percent;
        console.log(this.currentProgress);
        return parseInt(percent, 10);
      }
    },
    toggleDone(task) {
      if (this.project.id == null) {
        //if fetch from api parse id, this.project._id
        this.project.id = this.project._id;
      }
      //afou kserw to id tou task, kserw kai thn thesi tou (task.id - 1) = index
      this.project.task[task.id - 1].completed = !this.project.task[task.id - 1]
        .completed;
      this.currentProgress = this.progressPercent();

      let apiURL =
        "http://localhost:4000/api/update-task/" + this.$route.params.id;
      axios
        .post(apiURL, this.project)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
        this.$router.push({ name: "login" });
      }
    });

    let projectData = this.$route.params;
    if (projectData.project) {
      this.project.id = projectData.id;
      this.project.title = JSON.parse(projectData.project).title;
      this.project.description = JSON.parse(projectData.project).description;
      this.project.status = JSON.parse(projectData.project).status;
      this.project.task = JSON.parse(projectData.project).task;
      this.project.progress = projectData.progress;
    } else {
      console.log("Fetch data from API");

      let apiURL =
        "http://localhost:4000/api/edit-task/" + this.$route.params.id;
      console.log(apiURL);
      axios
        .get(apiURL)
        .then((res) => {
          this.project = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>

<style scoped>
.badge {
  margin-bottom: 50px;
}

.todoProgress {
  margin-top: 50px;
}

.done {
  text-decoration: line-through;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

input {
  margin-bottom: 5%;
  width: 100%;
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: groove;
  border-bottom: 2px solid;
}

input:hover {
  background-color: #eee;
}

form {
  padding: 0 90px;
}

.title {
  width: 100%;
}

form > div {
  float: left;
}

ul {
  clear: both;
}
</style>