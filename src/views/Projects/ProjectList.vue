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
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'ProjectList',

  setup() {
    const store = useStore()
    return {
      projects: computed(() => store.state.projects),
    };
  },
});
</script>