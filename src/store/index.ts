import IProject from "@/interfaces/IProject";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { NOTIFY, SETUP_PROJECTS, SETUP_TASKS } from "./mutation-types";
import ITask from "@/interfaces/ITask";
import { INotification } from "@/interfaces/INotification";
import { CREATE_PROJECT, GET_PROJECTS, UPDATE_PROJECT, DELETE_PROJECT, GET_TASKS, CREATE_TASK } from "./actions-types";
import http from "@/http";

interface State {
  projects: IProject[],
  tasks: ITask[],
  notifications: INotification[],
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projects: [],
    tasks: [],
    notifications: [],
  },
  mutations: {
    [SETUP_PROJECTS](state, projects: IProject[]) {
      state.projects = projects;
    },
    [SETUP_TASKS](state, tasks: ITask[]) {
      state.tasks = tasks;
    },
    [NOTIFY](state, notification: INotification) {
      notification.id = new Date().getTime();
      state.notifications.push(notification);

      setTimeout(() => {
        state.notifications = state.notifications.filter(notif => notif.id !== notification.id);
      }, 3000);
    },
  },
  actions: {
    [GET_PROJECTS]({ commit }) {
      http.get('projects')
        .then(response => commit(SETUP_PROJECTS, response.data))
    },
    [CREATE_PROJECT](context, name: string) {
      return http.post('projects', {
        name: name,
      });
    },
    [UPDATE_PROJECT](context, project: IProject) {
      return http.put(`projects/${project.id}`, {
        name: project.name,
      });
    },
    [DELETE_PROJECT](context, project: IProject) {
      return http.delete(`projects/${project.id}`);
    },
    [GET_TASKS]({ commit }) {
      http.get('tasks')
        .then(response => commit(SETUP_TASKS, response.data))
    },
    [CREATE_TASK](context, task: ITask) {
      return http.post('tasks', task);
    }
  }
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
