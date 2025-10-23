import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Board from "./components/Board.vue";
import CreateBoard from "./components/CreateBoard.vue";
import Column from "./components/Column.vue";
import Navbar from "./components/Navbar.vue";

const routes = [

  { 
    path: "/", 
    component: Login,
  },
  { 
    path: "/register", 
    component: Register,
  },
  
  {
    path: "/",
    component: Navbar,
    // meta: { requiresAuth: true },
    children: [
      {
        path: "board",
        component: Board
      },
      {
        path: "createBoard",
        component: CreateBoard
      },
      {
        path: "column/:id",
        component: Column
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// router.beforeEach((to, from, next) => {
//   const user = localStorage.getItem('User');
  
//   if (to.meta.requiresAuth && !user) {
//     next('/');
//   } else if (to.path === '/' && user) {
//     next('/board');
//   } else {
//     next();
//   }
// });

export default router;
