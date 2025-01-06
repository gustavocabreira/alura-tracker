import IProject from "@/interfaces/IProject";
import { InjectionKey, useTemplateRef } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADD_PROJECT, ADD_TASK, DELETE_PROJECT, UPDATE_PROJECT } from "./mutation-types";
import ITask from "@/interfaces/ITask";

interface State {
  projects: IProject[],
  tasks: ITask[],
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projects: [],
    tasks: [],
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
    [ADD_TASK](state, task: ITask) {
      state.tasks.push(task);
    }
  }
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
