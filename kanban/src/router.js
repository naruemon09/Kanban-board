import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Board from "./components/Board.vue";
import CreateBoard from "./components/CreateBoard.vue";
import Column from "./components/Column.vue";
import Navbar from "./components/Navbar.vue";
import { currentUser } from "./api/auth";

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
    meta: { requiresAuth: true },
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
        path: "board/:id",
        component: Column
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth) {
    if (!token) {
      return next("/");
    }

    try {
      await currentUser(token);
      return next();          
    } catch (err) {
      localStorage.removeItem('token'); 
      localStorage.removeItem('User'); 
      return next("/");
    }
  }

  if (to.path === "/" && token) {
    return next("/board");
  }

  next();
});

export default router;
