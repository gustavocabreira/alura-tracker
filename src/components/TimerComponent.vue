<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <TimerDisplay :timeInSeconds="timeInSeconds" />

    <div class="is-flex is-align-items-center">
      <button class="button" @click="start" :disabled="isTimerRunning">
        <span class="icon">
          <i class="fas fa-play"></i>
        </span>
        <span>play</span>
      </button>
      <button class="button" @click="stop" :disabled="!isTimerRunning">
        <span class="icon">
          <i class="fas fa-stop"></i>
        </span>
        <span>stop</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TimerDisplay from './TimerDisplay.vue';

export default defineComponent({
  name: 'TimerComponent',
  emits: ['stopped'],
  components: {
    TimerDisplay,
  },
  data() {
    return {
      timeInSeconds: 0,
      timer: 0,
      isTimerRunning: false,
    }
  },
  methods: {
    start() {
      this.toggleTimer();
      this.timer = setInterval(() => {
        this.timeInSeconds += 1;
      }, 1000)
    },
    stop() {
      this.toggleTimer();
      this.$emit('stopped', this.timeInSeconds)
      clearInterval(this.timer);
      this.timeInSeconds = 0;
    },
    toggleTimer() {
      this.isTimerRunning = !this.isTimerRunning;
    }
  }
});
</script>