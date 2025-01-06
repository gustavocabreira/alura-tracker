<template>
  <table class="table is-fullwidth mt-5">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(project, index) in projects" :key="index">
        <td>{{ project.id }}</td>
        <td>{{ project.name }}</td>
        <td>
          <router-link :to="{
            name: 'EditProject', params: {
              id: project.id
            }
          }" class="button">
            <span class="icon is-small">
              <i class="fas fa-pencil-alt"></i>
            </span>
          </router-link>

          <button class="button is-danger ml-2" @click="deleteProject(project)">
            <span class="icon is-small">
              <i class="fas fa-trash"></i>
            </span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import IProject from '@/interfaces/IProject';
import { useStore } from '@/store';
import { DELETE_PROJECT, GET_PROJECTS } from '@/store/actions-types';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'ProjectList',
  methods: {
    deleteProject(project: IProject): void {
      this.store.dispatch(DELETE_PROJECT, project)
        .then(() => this.store.dispatch(GET_PROJECTS));
    }
  },
  setup() {
    const store = useStore()
    store.dispatch(GET_PROJECTS);

    return {
      projects: computed(() => store.state.projects),
      store,
    };
  },
});
</script>