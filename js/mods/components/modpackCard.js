/* global Vue */
/* eslint no-multi-str: 0 */

export default {
	name: "modpack-card",
	props: ["modpack", "cantDownload", "onbuttonclick"],
	template: `
		<div class="mb-4">
		<div class="card">
			<div class="card-image embed-responsive embed-responsive-1by1" :style="{'background-image': 'url(' + modpack.coverSource + ')' }">
			</div>
			<div class="card-body">
				<h4 class="card-title">{{ modpack.modpackName }}</h4>
				<div class="card-text">
					<div class="auto-flex">
						<small>
							<p class="ma-0 text-left">Modpack:</p>
						</small>
						<small>
							<p class="ma-0 text-right">{{ modpack.modpackVersion }}</p>
						</small>
					</div>
					<div class="auto-flex">
						<small>
							<p class="ma-0 text-left">Minecraft:</p>
						</small>
						<small>
							<p class="ma-0 text-right">{{ modpack.minecraftVersion }}</p>
						</small>
					</div>
				</div>
				<button
					@click="onbuttonclick"
					:title="cantDownload"
					:disabled="cantDownload || !modpack.modList || modpack.modList.length == 0"
					class="btn block btn-dark"
				>
					Download Resource Pack
				</button>
			</div>
		</div>
	</div>`,
};
