<template>
  <div class="box has-text-weight-bold">
    <div class="columns">
      <div class="column is-7">
        {{ task.task }}
      </div>
      <div class="column">
        <TimerDisplay :time-in-seconds="task.timeInSeconds" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import TimerDisplay from './TimerDisplay.vue';
import ITask from '@/interfaces/ITask';

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
  },
})

</script>

<style scoped>
.box {
  background: #444;
}
</style>