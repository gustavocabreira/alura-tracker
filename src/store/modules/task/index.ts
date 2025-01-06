import http from "@/http";
import ITask from "@/interfaces/ITask";
import { State } from "@/store";
import { CREATE_TASK, GET_TASKS, UPDATE_TASK } from "@/store/actions-types";
import { SETUP_TASKS } from "@/store/mutation-types";
import { Module } from "vuex";

export interface TaskState {
  tasks: ITask[],
}

export const task: Module<TaskState, State> = {
  mutations: {
    [SETUP_TASKS](state, tasks: ITask[]) {
      state.tasks = tasks;
    },
  },
  actions: {
    [GET_TASKS]({ commit }) {
      http.get('tasks')
        .then(response => commit(SETUP_TASKS, response.data))
    },
    [CREATE_TASK](context, task: ITask) {
      return http.post('tasks', task);
    },
    [UPDATE_TASK](context, task: ITask) {
      return http.put(`tasks/${task.id}`, task);
    }
  }
}