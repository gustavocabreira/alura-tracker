<template>
  <main class="columns is-gapless is-multilines" :class="{ 'dark-mode': darkMode }">
    <div class="column is-one-quarter">
      <SideBar @changedTheme="changeTheme" />
    </div>
    <div class="column is-three-quarter content">
      <NotificationComponent />
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from '@/components/SideBar.vue';
import NotificationComponent from './components/NotificationComponent.vue';

export default defineComponent({
  name: 'App',
  components: {
    SideBar,
    NotificationComponent,
  },
  data() {
    return {
      darkMode: true,
    }
  },
  methods: {
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
