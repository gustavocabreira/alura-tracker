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
import { defineComponent, ref } from 'vue';
import useNotifier from '@/hooks/notifier';
import { CREATE_PROJECT, UPDATE_PROJECT } from '@/store/actions-types';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ProjectForm',
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const router = useRouter();

    const store = useStore()
    const { notify } = useNotifier()

    const name = ref("");

    if (props.id) {
      const project = store.state.project.projects.find(project => project.id == props.id)
      name.value = project?.name || '';
    }

    const handleSuccess = (message: string) => {
      router.push({ name: 'Projects' })
      notify(NotificationType.SUCCESS, 'Success', message);
      return;
    };

    const storeProject = () => {
      if (props.id) {
        store.dispatch(UPDATE_PROJECT, {
          id: props.id,
          name: name.value,
        })
          .then(() => handleSuccess('Project updated successfuly'));
        return;
      }

      store.dispatch(CREATE_PROJECT, name.value)
        .then(() => handleSuccess('Project added successfuly'))
    };

    return {
      name,
      storeProject,
    };
  },
});
</script>

<style scoped>
.projects {
  padding: 1.25rem;
}
</style>