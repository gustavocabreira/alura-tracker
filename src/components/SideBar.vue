<template>
  <header>
    <h1>
      <img src="@/assets/logo.png" alt="">
    </h1>
    <button class="button" @click="changeTheme">
      {{ buttonText }}
    </button>
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link :to="{name: 'Tasks'}" class="link">
            <i class="fas fa-tasks"></i>
            Tasks
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'Projects'}" class="link">
            <i class="fas fa-tasks"></i>
            Projects
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SideBar',
  emits: ['changedTheme'],
  data() {
    return {
      darkMode: true,
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

.panel li {
    margin: 8px 0;
    text-align: left;
}
.link {
    color: #fff;
}
.link:hover {
    color: #FAF0CA;
}
.link.router-link-active {
    color: #FAF0CA;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>