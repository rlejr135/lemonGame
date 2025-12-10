import { createRouter, createWebHistory } from "vue-router";
import Game from "../pages/Game.vue";
import Ranking from "../pages/Ranking.vue";

import testrcp from "../pages/testrcp.vue";

const routes = [
  {
    path: "/home",
    redirect: "/App"
  },
  {
    path: "/game",
    name: "Game",
    component: Game
  },
  {
    path: "/ranking",
    name: "Ranking",
    component: Ranking
  },
  
  { 
    path: "/testrcp",
    component: testrcp
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
