import http from "@/http";
import IProject from "@/interfaces/IProject";
import { State } from "@/store";
import { CREATE_PROJECT, GET_PROJECTS } from "@/store/actions-types";
import { DELETE_PROJECT, SETUP_PROJECTS, UPDATE_PROJECT } from "@/store/mutation-types";
import { Module } from "vuex";

export interface ProjectState {
  projects: IProject[],
}

export const project: Module<ProjectState, State> = {
  mutations: {
    [SETUP_PROJECTS](state, projects: IProject[]) {
      state.projects = projects;
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
  }
}

