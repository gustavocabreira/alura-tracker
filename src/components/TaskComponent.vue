<template>
  <BoxComponent>
    <div class="columns">
      <div class="column is-7">
        {{ task.task || 'Task with no description' }}
      </div>
      <div class="column">
        <TimerDisplay :time-in-seconds="task.timeInSeconds" />
      </div>
      <div class="column">
        {{ task?.project?.name }}
      </div>
    </div>
  </BoxComponent>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import TimerDisplay from './TimerDisplay.vue';
import ITask from '@/interfaces/ITask';
import BoxComponent from './BoxComponent.vue';

export default defineComponent({
  name: 'TaskComponent',
  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true,
    },
  },
  components: {
    TimerDisplay,
    BoxComponent,
  },
})

</script>

<style scoped></style>