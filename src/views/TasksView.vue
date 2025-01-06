<template>
  <div class="column is-three-quarter content">
    <MainForm @finishTask="storeTask" />
    <div class="lista">
      <TaskComponent v-for="(task, index) in tasks" :key="index" :task="task" />
      <BoxComponent v-if="!tasks.length">
        No tasks finished yet.
      </BoxComponent>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainForm from '@/components/MainForm.vue';
import TaskComponent from '@/components/TaskComponent.vue';
import ITask from '@/interfaces/ITask';
import BoxComponent from '@/components/BoxComponent.vue';

export default defineComponent({
  name: 'TasksView',
  components: {
    MainForm,
    TaskComponent,
    BoxComponent,
  },
  data() {
    return {
      tasks: [] as ITask[],
    };
  },
  methods: {
    storeTask(task: ITask): void {
      this.tasks.push(task);
    },
  }
});
</script>

<style></style>
