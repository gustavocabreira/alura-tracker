<template>
  <main class="columns is-gapless is-multilines">
    <div class="column is-one-quarter">
      <SideBar />
    </div>
    <div class="column is-three-quarter">
      <MainForm @finishTask="storeTask" />
      <div class="lista">
        <TaskComponent v-for="(task, index) in tasks" :key="index" :task="task"/>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from '@/components/SideBar.vue';
import MainForm from '@/components/MainForm.vue';
import TaskComponent from '@/components/TaskComponent.vue';
import ITask from '@/interfaces/ITask';

export default defineComponent({
  name: 'App',
  components: {
    SideBar,
    MainForm,
    TaskComponent,
  },
  data() {
    return {
      tasks: [] as ITask[],
    }
  },
  methods: {
    storeTask(task: ITask): void {
      this.tasks.push(task);
    },
  },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
</style>
