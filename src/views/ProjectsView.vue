<template>
  <section class="projects">
    <h1 class="title">Projects</h1>
    <router-link :to="{ name: 'CreateProject' }" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>New Project</span>
    </router-link>

    <ProjectList />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProjectList from './Projects/ProjectList.vue';

export default defineComponent({
  name: 'ProjectsView',
  components: {
    ProjectList
  }
});
</script>

<style scoped>
.projects {
  padding: 1.25rem;
}
</style>