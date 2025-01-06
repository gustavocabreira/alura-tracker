import TasksView from "@/views/TasksView.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tasks',
    component: () => TasksView
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;