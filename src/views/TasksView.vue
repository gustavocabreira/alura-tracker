<template>
  <div class="column is-three-quarter content">
    <MainForm @finishTask="storeTask" />
    <div class="lista">
      <BoxComponent v-if="typeof tasks == 'undefined' || !tasks.length">
        No tasks finished yet.
      </BoxComponent>
      <TaskComponent v-for="(task, index) in tasks" :key="index" :task="task" @selected="selectTask" />

      <div class="modal" :class="{ 'is-active': selectedTask }" v-if="selectedTask">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Updating task</p>
            <button class="delete" aria-label="close" @click="disposeModal"></button>
          </header>
          <section class="modal-card-body">
            <div class="field">
              <label for="name" class="label">Name</label>
              <input type="text" name="name" id="name" class="input" v-model="selectedTask.task">
            </div>
          </section>
          <footer class="modal-card-foot">
            <div class="buttons">
              <button @click="updateTask" class="button is-success">Save changes</button>
              <button @click="disposeModal" class="button">Cancel</button>
            </div>
          </footer>
        </div>
      </div>
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
import { CREATE_TASK, GET_TASKS, UPDATE_TASK } from '@/store/actions-types';

export default defineComponent({
  name: 'TasksView',
  components: {
    MainForm,
    TaskComponent,
    BoxComponent,
  },
  data() {
    return {
      selectedTask: null as ITask | null,
    }
  },
  methods: {
    storeTask(task: ITask): void {
      this.store.dispatch(CREATE_TASK, task)
        .then(() => {
          this.notify(NotificationType.SUCCESS, 'Success!', 'Task added successfuly.');
          this.store.dispatch(GET_TASKS);
        });
    },
    selectTask(task: ITask): void {
      this.selectedTask = task;
    },
    disposeModal(): void {
      this.selectedTask = null;
    },
    updateTask(): void {
      if (!this.selectedTask?.task) {
        this.notify(NotificationType.DANGER, 'Oops!', 'Name is required!')
        return;
      }

      this.store.dispatch(UPDATE_TASK, this.selectedTask)
        .then(() => {
          this.notify(NotificationType.SUCCESS, 'Success!', 'Task updated successfuly.');
          this.disposeModal();
          this.store.dispatch(GET_TASKS);
        });
    }
  },
  setup() {
    const store = useStore();
    store.dispatch(GET_TASKS);

    const { notify } = useNotifier();
    return {
      store,
      tasks: computed(() => store.state.task.tasks),
      notify,
    };
  }
});
</script>

<style></style>
