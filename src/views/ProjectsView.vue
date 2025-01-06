<template>
  <section class="projects">
    <h1 class="title">Projects</h1>
    <form @submit.prevent="store">
      <div class="field">
        <label for="name" class="label">Name</label>
        <input type="text" name="name" id="name" class="input" v-model="name">
      </div>
      <div class="field">
        <button class="button" type="submit">
          Store
        </button>
      </div>
    </form>

    <table class="table is-fullwidth mt-5">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(project, index) in projects" :key="index">
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import IProject from '@/interfaces/IProject';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProjectsView',
  data() {
    return {
      name: '',
      projects: [] as IProject[],
    }
  },
  methods: {
    store() {
      const project: IProject = {
        name: this.name,
        id: new Date().toISOString(),
      };

      this.projects.push(project);

      this.name = '';
    }
  }
});
</script>

<style scoped>
.projects {
  padding: 1.25rem;
}
</style>