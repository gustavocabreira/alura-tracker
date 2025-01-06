<template>
  <div class="column is-three-quarter content">
    <MainForm @finishTask="storeTask" />
    <div class="lista">
      <BoxComponent v-if="!tasks.length">
        No tasks finished yet.
      </BoxComponent>
      <TaskComponent v-for="(task, index) in tasks" :key="index" :task="task" />
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
import { NotificationType } from '@/interfaces/INotification';
import useNotifier from '@/hooks/notifier';
import { CREATE_TASK, GET_TASKS } from '@/store/actions-types';

export default defineComponent({
  name: 'TasksView',
  components: {
    MainForm,
    TaskComponent,
    BoxComponent,
  },
  methods: {
    storeTask(task: ITask): void {
      this.store.dispatch(CREATE_TASK, task)
        .then(() => {
          this.notify(NotificationType.SUCCESS, 'Success!', 'Task added successfuly.');
          this.store.dispatch(GET_TASKS);
        });
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(GET_TASKS);

    const { notify } = useNotifier();
    return {
      store,
      tasks: computed(() => store.state.tasks),
      notify,
    };
  }
});
</script>

<style></style>
