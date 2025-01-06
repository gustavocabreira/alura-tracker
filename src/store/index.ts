import IProject from "@/interfaces/IProject";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT } from "./mutation-types";

interface State {
  projects: IProject[],
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projects: [],
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
  }
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
