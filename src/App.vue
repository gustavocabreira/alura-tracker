<template>
  <main class="columns is-gapless is-multilines">
    <div class="column is-one-quarter">
      <SideBar />
    </div>
    <div class="column is-three-quarter">
      <MainForm />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './components/SideBar.vue';
import MainForm from './components/MainForm.vue';

export default defineComponent({
  name: 'App',
  components: {
    SideBar,
    MainForm
  }
});
</script>

<style></style>
