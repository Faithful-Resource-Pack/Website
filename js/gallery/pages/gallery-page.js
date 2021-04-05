const VERSION_JAVA = '1.17'
const VERSION_BEDROCK = '1.16.210'
const BRANCH_JAVA = 'Jappa-1.17'
const BRANCH_BEDROCK = 'Jappa-1.16.210'
window.ERROR_IMG = './image/gallery/not-found.png'

const TYPE_JAVA = 'java'
const TYPE_BEDROCK = 'bedrock'
const TYPE_DUNGEONS = 'dungeons'
const TYPE_EDUACTION = 'education'

const ARTIST_UNKNOWN = 'Unknown'

import { MCAnimation } from '../MCAnimation.js'

window.data = {
	versions: ['java-32x', 'java-64x', 'bedrock-32x', 'bedrock-64x', 'dungeons', 'education'],
	javaSections: ['all', 'block', 'effect', 'entity', 'environment', 'font', 'gui', 'item', 'map', 'misc', 'mob_effect', 'models', 'painting', 'particle'],
	bedrockSections: ['all', 'blocks', 'effect', 'entity', 'environment', 'gui', 'items', 'map', 'misc', 'models', 'painting', 'particle', 'ui'],
	dungeonsSections: ['all', 'blocks', 'components', 'decor', 'effects', 'entity', 'equipment', 'items', 'materials', 'others', 'ui'],
	educationSections: ['all']
}

window.cache = {}

window.capitalize = string => {
	if (string == 'gui') return 'GUI';
	if (string == 'ui') return 'UI';
	if (string == 'mob_effect') return 'Mob Effect';
	else return string.charAt(0).toUpperCase() + string.slice(1)
}

window.getJson = async url => {
	if (window.cache.hasOwnProperty(url)) {
		console.log('cached: ' + url)
		return window.cache[url]
	} else {
		console.log('new: ' + url)
		let data = await fetch(url).then(response => response.json())
		window.cache[url] = data
		return data
	}
}

export default {
	name: 'gallery-page',
	data() {
		return {
			textures:          null,
			currentSections:   [],
			imageArray:        [],
			currentType:       '',
			currentTypeObject: '',
			currentRepository: '',
			currentBranch:     '',
			searchString:      ''
		}
	},
	watch:{
		$route() {
			this.update()
		}
	},
	template:
	`<div id="gallery">
		<div ref="modal" class="modal" v-on:click="closeModal()">
			<span class="close">×</span>
			<div class="modal-content">
				<div class="modal-textures">
					<img class="modal-img" ref="modal_img" onerror="this.src = ERROR_IMG">
					<div class="modal-animated" ref="modal_canvas" ></div>
				</div>
				<h1 ref="modal_h1"></h1>
				<p ref="modal_p"></p>
			</div>
		</div>
		<div class="mb-4">
			<router-link v-for="item in window.data.versions" :key="item" class="btn btn-dark mr-1 mb-2" :to="'/' + item + '/' + $route.params.section">{{ window.capitalize(item) }}</router-link>
		</div>
		<input id="SearchBar" type="text" placeholder="Search for a texture name or author..." title="Type something" class="fancy-card-1x mb-4" v-model="searchString" v-on:keyup.enter="showResults()">
		<div class="mb-4">
			<router-link v-for="item in currentSections" :key="item" class="btn btn-dark mr-1 mb-2" :to="'/' + $route.params.version + '/' + item">{{ window.capitalize(item) }}</router-link>
		</div>
		<div ref="grid" class="res-grid-6">
			<div v-for="item in imageArray" :key="item.path" class="gallery-item" >

				<div v-if="item.animated" :ref="item.name">
					<img loading="lazy" onerror="this.src = ERROR_IMG" :src="item.path" :alt="item.title" />
				</div>
				<div v-else>
					<img loading="lazy" onerror="this.src = ERROR_IMG" :src="item.path" :alt="item.title" />
				</div>

				<a :href="item.path" download class="fas fa-download"></a>
				<i class="fas fa-expand" v-on:click="fullscreen(item)"></i>

				<div class="popover">
					<h5>{{ item.title }}</h5>
					<p class="secondary"><i class="fas fa-user"></i> {{ item.artist }}</p>
					<p class="secondary"><i class="far fa-calendar"></i> {{ item.date }}</p>
					<p class="secondary" v-if="item.animated"><i class="fas fa-file-code"></i> Animated</p>
				</div>
			</div>
		</div>
	</div>`,
	methods: {
		loadType() {
			let tempVersion = this.$route.params.version.toLowerCase()
			if (tempVersion.includes(TYPE_JAVA)) {
				this.currentType = TYPE_JAVA
				this.currentSections = window.data.javaSections
				if (tempVersion.includes('64')) {
					this.currentTypeObject = 'c64'
					this.currentRepository = 'Compliance-Java-64x'
				}
				else {
					this.currentTypeObject = 'c32'
					this.currentRepository = 'Compliance-Java-32x'
				}
				this.currentBranch = BRANCH_JAVA
			} else if (tempVersion.includes(TYPE_BEDROCK)) {
				this.currentType = TYPE_BEDROCK
				this.currentSections = window.data.bedrockSections
				if (tempVersion.includes('64')) {
					this.currentTypeObject = 'c64'
					this.currentRepository = 'Compliance-Bedrock-64x'
				}
				else {
					this.currentTypeObject = 'c32'
					this.currentRepository = 'Compliance-Bedrock-32x'
				}
				this.currentBranch = BRANCH_BEDROCK
			} else if (tempVersion.includes(TYPE_DUNGEONS)) {
				this.currentType = TYPE_DUNGEONS
				this.currentSections = window.data.dungeonsSections
				this.currentRepository = null
				this.currentBranch = null
			} else if (tempVersion.includes(TYPE_EDUACTION)) {
				this.currentType = TYPE_EDUACTION
				this.currentSections = window.data.educationSections
				this.currentRepository = 'Education-Edition'
				this.currentBranch = null
			}
		},
		async getArtists(object) {
			let readableArtists = []
			if (object[this.currentTypeObject].hasOwnProperty('author')) {
				let profiles = await window.getJson('https://raw.githubusercontent.com/Compliance-Resource-Pack/JSON/main/profiles.json')
				object[this.currentTypeObject].author.forEach(item => {
					for (const profile of profiles) {
						if (item === profile.id) {
							if (profile.username !== null) readableArtists.push(profile.username)
							break
						}
					}
				})
			}
			return readableArtists.length < 1 ? ARTIST_UNKNOWN : readableArtists.join(', ')
		},
		async filter(string) {
			if (string.toLowerCase().includes('all')) string = ''
		
			this.textures   = await window.getJson('https://raw.githubusercontent.com/Compliance-Resource-Pack/JSON/main/contributors/' + this.currentType + '.json')
			let tempArray   = []
			let currentItem = null
			let date        = null
		
			for (const item of this.textures) {

				if (this.currentType == TYPE_JAVA) {
					currentItem = '/assets/' + item.version[VERSION_JAVA]
					if (this.currentTypeObject == 'c32') date = item.c32.date || 'Unknown'
					else date = item.c64.date || 'Unknown'
				}

				else if (this.currentType == TYPE_BEDROCK) {
					currentItem = '/' + item.version[VERSION_BEDROCK]
					if (this.currentTypeObject == 'c32') date = item.c32.date || 'Unknown'
					else date = item.c64.date || 'Unknown'
				}

				let artists  = await this.getArtists(item)

				if ((currentItem.toLowerCase().includes(this.searchString.toLowerCase()) || artists.toLowerCase().includes(this.searchString.toLowerCase())) && currentItem.toLowerCase().includes(string.toLowerCase())) {
					tempArray.push({
						title:    currentItem.substring(currentItem.lastIndexOf('/') + 1, currentItem.lastIndexOf('.')).replace(/(.{3})/g,"$1\xAD"),
						name:     currentItem.substring(currentItem.lastIndexOf('/') + 1, currentItem.lastIndexOf('.')),
						path:     'https://raw.githubusercontent.com/Compliance-Resource-Pack/' + this.currentRepository + '/' + this.currentBranch + currentItem,
						artist:   artists,
						date:     date,
						animated: item.animated,
						mcmeta:   item.mcmeta
					})
				}
			}
			return tempArray
		},
		async update() {
			this.loadType()

			if (this.currentType == TYPE_DUNGEONS || this.currentType == TYPE_EDUACTION) {
				this.imageArray = [{
					title: 'Missing Config File!',
					name: undefined,
					path: window.ERROR_IMG,
					artist: 'Please contact us!',
					date: '',
					animated: false,
					mcmeta: undefined
				}]
				return
			}

			this.imageArray = await this.filter('/' + this.$route.params.section + '/')
		},
		showResults: async function() {
			this.imageArray = await this.filter('/' + this.$route.params.section + '/')
		},/*
		animate() {
			for (const item of this.textures) {
				if (item.animated == true) console.log(item.name)
			}
		},*/
		fullscreen(item) {
			this.$refs.modal_img.src       = item.path
			this.$refs.modal_h1.innerHTML  = item.title
			this.$refs.modal_p.innerHTML   = '<i class="fas fa-user"></i> ' + item.artist + '<br><i class="far fa-calendar"></i> ' + item.date
			this.$refs.modal.style.display = 'block'

			if (item.animated) {
				var mca = undefined
				console.log(item)
				console.log(item.mcmeta)
				if (item.mcmeta) {
					mca = new MCAnimation(item.path, item.mcmeta)
				} else mca = new MCAnimation(item.path)

				this.$refs.modal_canvas.appendChild(mca.canvas)
				this.$refs.modal_canvas.style.display = 'block'
			} else this.$refs.modal_canvas.style.display = 'none'
		},
		closeModal() {
			this.$refs.modal.style.display        = 'none'
			this.$refs.modal_canvas.innerHTML = ''
		}
	},
	mounted() {
		this.update()
	}
}