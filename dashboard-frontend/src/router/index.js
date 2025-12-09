import { createRouter, createWebHistory } from "vue-router";
import Game from "../pages/Game.vue";
import Ranking from "../pages/Ranking.vue";

const routes = [
  {
    path: "/",
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
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
