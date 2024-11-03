export default {
	name: "project-card",
	template: `
		<div class="card discover">
		<div class="poster">
			<img class="card-image" :src="background" :alt="name">
			<img class="card-image wordmark" :src="wordmark" :alt="name + ' wordmark'">
		</div>
		<div class="card-body">
			<div class="card-text auto-flex">
			<span class="my-2 text-center" style="min-height: 65px">
				{{ description }}
			</span><br>
			</div>
			<slot name="btns" />
		</div>
		</div>
	`,
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
		}
	}
}
