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

import { computed, defineComponent } from 'vue';
import TimerComponent from './TimerComponent.vue';
import { useStore } from 'vuex';
import { key } from '@/store';

export default defineComponent({
	name: 'MainForm',
	components: {
		TimerComponent,
	},
	emits: ['finishTask'],
	data() {
		return {
			task: '',
			tasks: [],
			projectId: null,
		};
	},
	methods: {
		finishTask(elapsedTimeInSeconds: number): void {
			this.$emit('finishTask', {
				task: this.task,
				timeInSeconds: elapsedTimeInSeconds,
				project: this.projects.find(project => project.id == this.projectId),
			});

			this.task = '';
		},
	},
	setup() {
		const store = useStore(key);
		return {
			projects: computed(() => store.state.projects),
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