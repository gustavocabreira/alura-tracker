<template>
  <section class="projects">
    <h1 class="title">Projects</h1>
    <form @submit.prevent="storeProject">
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
import { useStore } from '@/store';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'ProjectsView',
  data() {
    return {
      name: '',
    }
  },
  methods: {
    storeProject() {
      this.store.commit('ADD_PROJECT', this.name)
      this.name = '';
    }
  },
  setup() {
    const store = useStore()
    return {
      store,
      projects: computed(() => store.state.projects),
    };
  },
});
</script>

<style scoped>
.projects {
  padding: 1.25rem;
}
</style>