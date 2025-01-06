<template>
  <section class="projects">
    <h1 class="title">Projects</h1>
    <form @submit.prevent="storeProject">
      <div class="field">
        <label for="name" class="label">Name</label>
        <input type="text" name="name" id="name" class="input" v-model="name">
      </div>
      <div class="field">
        <button class="button" type="submit">
          Store
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { NotificationType } from '@/interfaces/INotification';
import { notificationMixin } from '@/mixins/notify';
import { useStore } from '@/store';
import { ADD_PROJECT, UPDATE_PROJECT } from '@/store/mutation-types';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProjectForm',
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  mixins: [notificationMixin],
  data() {
    return {
      name: '',
    }
  },
  methods: {
    storeProject() {
      if (this.id) {
        this.store.commit(UPDATE_PROJECT, {
          id: this.id,
          name: this.name,
        });

        this.$router.push({ name: 'Projects' })
        this.notify(NotificationType.SUCCESS, 'Success', 'Project updated successfuly');
        return;
      }

      this.store.commit(ADD_PROJECT, this.name)
      this.notify(NotificationType.SUCCESS, 'Success', 'Project added successfuly');
      this.name = '';

      this.$router.push({
        name: 'Projects',
      });
    },
  },
  setup() {
    const store = useStore()
    return {
      store,
    };
  },
  mounted() {
    if (this.id) {
      const project = this.store.state.projects.find(project => project.id == this.id)

      this.name = project?.name || '';
    }
  }
});
</script>

<style scoped>
.projects {
  padding: 1.25rem;
}
</style>