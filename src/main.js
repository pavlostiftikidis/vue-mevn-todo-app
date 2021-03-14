import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase';



createApp(App).use(router).mount('#app')


