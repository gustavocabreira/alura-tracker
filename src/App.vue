<template>
  <main class="columns is-gapless is-multilines" :class="{'dark-mode': darkMode}">
    <div class="column is-one-quarter">
      <SideBar @changedTheme="changeTheme" />
    </div>
    <div class="column is-three-quarter content">
      <MainForm @finishTask="storeTask" />
      <div class="lista">
        <TaskComponent v-for="(task, index) in tasks" :key="index" :task="task" />
        <BoxComponent v-if="!tasks.length">
          No tasks finished yet.
        </BoxComponent>
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
import BoxComponent from './components/BoxComponent.vue';

export default defineComponent({
  name: 'App',
  components: {
    SideBar,
    MainForm,
    TaskComponent,
    BoxComponent,
  },
  data() {
    return {
      tasks: [] as ITask[],
      darkMode: false,
    }
  },
  methods: {
    storeTask(task: ITask): void {
      this.tasks.push(task);
    },
    changeTheme(darkMode: boolean) {
      this.darkMode = darkMode;
    }
  },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}

main {
  --bg-primary: #fff;
  --text-primary: #000;
}

main.dark-mode {
  --bg-primary: #2b2d42;
  --text-primary: #ddd;
}

.content {
  background-color: var(--bg-primary);
}
</style>
