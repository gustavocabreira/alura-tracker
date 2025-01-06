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
import { computed, defineComponent } from 'vue';
import MainForm from '@/components/MainForm.vue';
import TaskComponent from '@/components/TaskComponent.vue';
import ITask from '@/interfaces/ITask';
import BoxComponent from '@/components/BoxComponent.vue';
import { useStore } from '@/store';

export default defineComponent({
  name: 'TasksView',
  components: {
    MainForm,
    TaskComponent,
    BoxComponent,
  },
  methods: {
    storeTask(task: ITask): void {
      this.store.commit('ADD_TASK', task);
    },
  },
  setup() {
    const store = useStore();
    return {
      store,
      tasks: computed(() => store.state.tasks),
      projects: computed(() => store.state.projects),
    };
  }
});
</script>

<style></style>
