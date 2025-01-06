import IProject from "@/interfaces/IProject";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADD_TASK, NOTIFY, SETUP_PROJECTS } from "./mutation-types";
import ITask from "@/interfaces/ITask";
import { INotification } from "@/interfaces/INotification";
import { CREATE_PROJECT, GET_PROJECTS, UPDATE_PROJECT, DELETE_PROJECT } from "./actions-types";
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
    [ADD_TASK](state, task: ITask) {
      state.tasks.push(task);
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
    }
  }
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
