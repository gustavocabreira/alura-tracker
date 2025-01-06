<template>
  <header>
    <h1>
      <img src="@/assets/logo.png" alt="">
    </h1>
    <button class="button" @click="changeTheme">
      {{ buttonText }}
    </button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SideBar',
  emits: ['changedTheme'],
  data() {
    return {
      darkMode: false,
    };
  },
  computed: {
    buttonText(): string {
      return this.darkMode ? 'Enable light mode' : 'Enable dark mode';
    },
  },
  methods: {
    changeTheme(): void {
      this.darkMode = !this.darkMode;
      this.$emit('changedTheme', this.darkMode);
    }
  }
});

</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>