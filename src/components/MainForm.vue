<template>
	<div class="box form">
		<div class="columns">
			<div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
				<input v-model="task" type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" />
			</div>
			<div class="column is-3">
				<div class="select">
					<select v-model="projectId">
						<option value="">Choose a project</option>
						<option :value="project.id" v-for="project in projects" :key="project.id">{{ project.name }}</option>
					</select>
				</div>
			</div>
			<div class="column">
				<TimerComponent @stopped="finishTask" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">

import { computed, defineComponent, ref } from 'vue';
import TimerComponent from './TimerComponent.vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import { NotificationType } from '@/interfaces/INotification';
import useNotifier from '@/hooks/notifier';
import { GET_PROJECTS } from '@/store/actions-types';

export default defineComponent({
	name: 'MainForm',
	components: {
		TimerComponent,
	},
	emits: ['finishTask'],
	setup(props, { emit }) {
		const store = useStore(key);
		const { notify } = useNotifier()
		store.dispatch(GET_PROJECTS);

		const task = ref("");
		const projectId = ref("");
		const projects = computed(() => store.state.project.projects);

		const finishTask = (elapsedTimeInSeconds: number): void => {
			if (!projectId.value) {
				notify(NotificationType.DANGER, 'Oops!', 'You must select a project before finishing the task.');
				return;
			}

			emit('finishTask', {
				task: task.value,
				timeInSeconds: elapsedTimeInSeconds,
				project: projects.value.find(project => project.id == projectId.value),
			});

			task.value = '';
		};

		return {
			task,
			projectId,
			projects,
			finishTask,
		};
	},
});

</script>

<style>
.form {
	background-color: var(--bg-primary);
	color: var(--text-primary);
}
</style>