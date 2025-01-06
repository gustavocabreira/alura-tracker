import ProjectForm from "@/views/Projects/ProjectForm.vue";
import ProjectsView from "@/views/ProjectsView.vue";
import TasksView from "@/views/TasksView.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tasks',
    component: TasksView,
  },
  {
    path: '/projects',
    children: [
      {
        path: '',
        name: 'Projects',
        component: ProjectsView,
      },
      {
        path: 'new',
        name: 'CreateProject',
        component: ProjectForm,
      },
      {
        path: ':id',
        name: 'EditProject',
        component: ProjectForm,
        props: true,
      },
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;