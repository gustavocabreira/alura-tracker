<template>
	<div class="box form">
		<div class="columns">
			<div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
				<input v-model="task" type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" />
			</div>
			<div class="column">
				<TimerComponent @stopped="finishTask" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import TimerComponent from './TimerComponent.vue';
import ITask from '@/interfaces/ITask';

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
		};
	},
	methods: {
		finishTask(elapsedTimeInSeconds: number): void {
			this.$emit('finishTask', {
				task: this.task,
				timeInSeconds: elapsedTimeInSeconds,
			});

			this.task = '';
		},
	},
});

</script>

<style>
.form {
	background-color: var(--bg-primary);
	color: var(--text-primary);
}
</style>