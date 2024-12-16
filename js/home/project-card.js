export default {
	name: "project-card",
	props: {
		name: {
			type: String,
			required: true,
		},
		background: {
			type: String,
			required: true,
		},
		wordmark: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	template: `
		<div class="card project-card">
			<div class="project-image">
				<img class="project-background" :src="background" :alt="name">
				<img class="project-wordmark" :src="wordmark" :alt="name + ' wordmark'">
			</div>
			<div class="card-body">
				<div class="card-text auto-flex">
					<span class="my-2 text-center" style="min-height: 65px">
						{{ description }}
					</span>
					<br>
				</div>
				<slot name="btns" />
			</div>
		</div>
	`,
};
