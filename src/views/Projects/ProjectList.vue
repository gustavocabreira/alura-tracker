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
import { GET_PROJECTS } from '@/store/actions-types';
import { DELETE_PROJECT } from '@/store/mutation-types';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'ProjectList',
  methods: {
    deleteProject(project: IProject): void {
      this.store.commit(DELETE_PROJECT, project);
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