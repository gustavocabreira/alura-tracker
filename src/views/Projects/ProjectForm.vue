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
import { useStore } from '@/store';
import { defineComponent } from 'vue';
import useNotifier from '@/hooks/notifier';
import { CREATE_PROJECT, UPDATE_PROJECT } from '@/store/actions-types';

export default defineComponent({
  name: 'ProjectForm',
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      name: '',
    }
  },
  methods: {
    storeProject() {
      if (this.id) {
        this.store.dispatch(UPDATE_PROJECT, {
          id: this.id,
          name: this.name,
        })
          .then(() => this.handleSuccess('Project updated successfuly'));
        return;
      }

      this.store.dispatch(CREATE_PROJECT, this.name)
        .then(() => this.handleSuccess('Project added successfuly'))
    },
    handleSuccess(message: string) {
      this.$router.push({ name: 'Projects' })
      this.notify(NotificationType.SUCCESS, 'Success', message);
      return;
    }
  },
  setup() {
    const store = useStore()
    const { notify } = useNotifier()

    return {
      store,
      notify,
    };
  },
  mounted() {
    if (this.id) {
      const project = this.store.state.project.projects.find(project => project.id == this.id)

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