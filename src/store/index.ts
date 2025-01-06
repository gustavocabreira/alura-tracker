import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { NOTIFY } from "./mutation-types";
import { INotification } from "@/interfaces/INotification";
import { project, ProjectState } from "./modules/project";
import { task, TaskState } from "./modules/task";

export interface State {
  task: TaskState,
  notifications: INotification[],
  project: ProjectState,
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    task: {
      tasks: [],
    },
    notifications: [],
    project: {
      projects: [],
    },
  },
  mutations: {
    [NOTIFY](state, notification: INotification) {
      notification.id = new Date().getTime();
      state.notifications.push(notification);

      setTimeout(() => {
        state.notifications = state.notifications.filter(notif => notif.id !== notification.id);
      }, 3000);
    },
  },
  actions: {},
  modules: {
    project,
    task,
  }
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
