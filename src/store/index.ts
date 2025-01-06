import IProject from "@/interfaces/IProject";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADD_PROJECT, ADD_TASK, DELETE_PROJECT, NOTIFY, SETUP_PROJECTS, UPDATE_PROJECT } from "./mutation-types";
import ITask from "@/interfaces/ITask";
import { INotification } from "@/interfaces/INotification";
import { GET_PROJECTS } from "./actions-types";
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
    [ADD_PROJECT](state, name: string) {
      const project: IProject = {
        id: new Date().toISOString(),
        name: name,
      };
      state.projects.push(project);
    },
    [UPDATE_PROJECT](state, project: IProject) {
      const index = state.projects.findIndex(el => el.id == project.id);
      state.projects[index] = project;
    },
    [DELETE_PROJECT](state, project: IProject) {
      const index = state.projects.findIndex(el => el.id == project.id);
      state.projects.splice(index, 1);
    },
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
    }
  }
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
