import { createApp } from 'vue'
import 'vue3-toastify/dist/index.css'
import App from './App.vue'
import './style.css'
import router from './router'

createApp(App).use(router).mount('#app')


// import { createApp } from 'vue'
// import { createWebHistory, createRouter } from 'vue-router'
// import './style.css'
// import App from './App.vue'
// import Login from './components/Login.vue'
// import Register from './components/Register.vue'
// import Board from './components/Board.vue'
// import CreateBoard from './components/CreateBoard.vue'
// import Column from './components/Column.vue'

// const routes = [
//   { path: '/', component: Login },
//   { path: '/register', component: Register },
//   { path: '/board', component: Board },
//   { path: '/createBoard', component: CreateBoard },
//   { path: '/column/:board_name', component: Column },
// ]

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes
// })

// createApp(App).use(router).mount('#app')