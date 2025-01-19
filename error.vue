<template>
	<!-- theme class must be outside the layout so it encapsulates the navbar/footer -->
	<div class="error-theme">
		<nuxt-layout name="default">
			<div class="text-center">
				<h1>Are you lost in The End?</h1>
				<p>
					Unfortunately, the page you requested doesn't exist!
					<br />
					Try checking your spelling or going to the <nuxt-link to="/">main page</nuxt-link> to find
					what you were looking for.
				</p>
			</div>
			<div class="animation-container">
				<img id="tnt" v-show="tntVisible" :src="tntSrc" alt="Block of TNT" @click="boom" />
				<img
					id="diamond"
					v-show="diamondVisible"
					src="https://api.faithfulpack.net/v2/textures/1484/url/faithful_32x/latest"
					alt="Diamond"
				/>
				<img
					id="explosion"
					v-show="explosionVisible"
					:src="explosionSrc"
					alt="TNT Explosion Particles"
				/>
			</div>
		</nuxt-layout>
	</div>
</template>

<script>
const FRAME_TIME = 12;

export default defineNuxtComponent({
	data() {
		return {
			exploded: false,
			tntVisible: true,
			diamondVisible: false,
			explosionVisible: false,
			tntSrc: "/image/404/tnt_side.png",
			explosionSrc: "/image/404/explosion_0.png",
		};
	},
	head() {
		return {
			title: "404 - Faithful",
		};
	},
	methods: {
		reset() {
			this.tntVisible = true;
			this.explosionVisible = false;
			this.diamondVisible = false;
			this.exploded = false;
		},
		// main entry point
		async boom() {
			if (this.exploded) return;

			// set it first to prevent spamming the tnt breaking things
			this.exploded = true;
			await this.primeTNT();
			await this.handleParticles();

			this.diamondVisible = true;
			sleep(FRAME_TIME * 100).then(() => this.reset());
		},
		async primeTNT() {
			for (let i = 0; i < 8; ++i) {
				await sleep(FRAME_TIME * 25);
				if (i % 2 === 0) this.tntSrc = "/image/404/tnt_side_on.png";
				else this.tntSrc = "/image/404/tnt_side.png";
				this.$forceUpdate();
			}
			this.tntVisible = false;
		},
		async handleParticles() {
			this.explosionVisible = true;
			for (let i = 0; i < 16; ++i) {
				await sleep(Math.round(FRAME_TIME * 1.3));
				this.explosionSrc = `/image/404/explosion_${i}.png`;
				// by default nuxt batches the updates together which ruins the animation
				this.$forceUpdate();
			}
			this.explosionVisible = false;
		},
	},
});
</script>

<style scoped lang="scss">
.animation-container {
	position: relative;
	height: 64px;
	width: 128px;
	margin: 100px auto;
}
#tnt {
	position: absolute;
	left: 32px;
	cursor:
		url("https://api.faithfulpack.net/v2/textures/1521/url/faithful_32x/latest") 16 16,
		pointer;
	image-rendering: pixelated;
	width: 64px;
	height: 64px;
}
#diamond {
	position: absolute;
	image-rendering: pixelated;
	left: 32px;
	width: 64px;
	height: 64px;
}
#explosion {
	position: absolute;
	left: 32px;
}
</style>
