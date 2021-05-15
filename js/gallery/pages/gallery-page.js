const VERSION_JAVA     = '1.17'
const VERSION_BEDROCK  = '1.16.210'
const VERSION_DUNGEONS = 'master'

const BRANCH_JAVA      = 'Jappa-1.17'
const BRANCH_BEDROCK   = 'Jappa-1.16.210'
const BRANCH_DUNGEONS  = 'master'

const TYPE_JAVA        = 'java'
const TYPE_BEDROCK     = 'bedrock'
const TYPE_DUNGEONS    = 'dungeons'
const TYPE_EDUCATION   = 'education'

const ARTIST_UNKNOWN = 'Unknown'

window.ERROR_IMG = './image/gallery/not-found.png'

import { MCAnimation } from '../MCAnimation.js'

window.data = {
	versions: [
		{ name: 'java-32x' }, 
		{ name: 'java-64x' },
		{ name: 'bedrock-32x' },
		{ name: 'bedrock-64x' },
		{ name: 'dungeons' },
		{ name: 'education', disabled: true }
	],
	javaSections: [
		{ name: 'all', },
		{ name: 'block', },
		{ name: 'effect', },
		{ name: 'entity', },
		{ name: 'environment', },
		{ name: 'font', },
		{ name: 'gui', },
		{ name: 'item', },
		{ name: 'map', },
		{ name: 'misc', },
		{ name: 'mob_effect', },
		{ name: 'models' },
		{ name: 'painting', },
		{ name: 'particle' }
	],
	bedrockSections: [
		{ name: 'all' },
		{ name: 'blocks' },
		{ name: 'effect' },
		{ name: 'entity' },
		{ name: 'environment' },
		{ name: 'gui' },
		{ name: 'items' },
		{ name: 'map' },
		{ name: 'misc' },
		{ name: 'models' },
		{ name: 'painting' },
		{ name: 'particle' },
		{ name: 'ui' }
	],
	dungeonsSections: [
		{ name: 'all', disabled: true },
		{ name: 'actors' },
		{ name: 'block' },
		{ name: 'components' },
		{ name: 'cues' },
		{ name: 'decor' },
		{ name: 'dlc3' }, 
		{ name: 'dlc4' }, 
		{ name: 'effects' },
		{ name: 'materials' },
		{ name: 'meshes' },
		{ name: 'patches' },
		{ name: 'save_icons' },
		{ name: 'textures' },
		{ name: 'ui' }
	],
	educationSections: [
		{ name: 'all', disabled: true }
	]
}

window.cache = {}

window.capitalize = string => {
	if (string == 'gui') return 'GUI'
	if (string == 'ui') return 'UI'
	if (string == 'dlc3') return 'DLC 3'
	if (string == 'dlc4') return 'DLC 4'
	if (string == 'save_icons') return 'Save Icons'
	if (string == 'mob_effect') return 'Mob Effect'
	else return string.charAt(0).toUpperCase() + string.slice(1)
}

window.getJson = async url => {
	if (window.cache.hasOwnProperty(url)) {
		//console.log('cached: ' + url)
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
			textures:            null,
			currentSections:     [],
			imageArray:          [],
			currentType:         '',
			currentTypeObject:   '',
			currentOrganization: '',
			currentRepository:   '',
			currentBranch:       '',
			searchString:        ''
		}
	},
	watch:{
		$route() {
			this.update()
		}
	},
	template:
	`<div id="gallery">
		<div ref="modal" class="modal" v-on:click="closeModal($event)">
			<span class="close">×</span>
			<div class="modal-content">
				<div class="modal-textures">
					<img class="modal-img" ref="modal_img" onerror="this.src = ERROR_IMG">
					<div class="modal-animated" ref="modal_canvas" ></div>
				</div>
				<div class="tooltip">
					<h1 ref="modal_h1"></h1>
					<p class="full" ref="modal_author"></p>
					<p class="full" ref="modal_date"></p>
					<p class="full" ref="modal_animated"></p>
				</div>
			</div>
		</div>
		<div class="mb-4">
			<router-link v-for="item in window.data.versions" :key="item" class="btn btn-dark mr-1 mb-2" :class="(item.disabled)?'disabled':''" :to="'/' + item.name + '/' + $route.params.section">{{ window.capitalize(item.name) }}</router-link>
		</div>
		<input id="SearchBar" type="text" placeholder="Search for a texture name or author..." title="Type something" class="fancy-card-1x mb-4" v-model="searchString" v-on:keyup.enter="showResults()">
		<div class="mb-4">
			<router-link v-for="item in currentSections" :key="item" class="btn btn-dark mr-1 mb-2" :class="(item.disabled)?'disabled':''" :to="'/' + $route.params.version + '/' + item.name">{{ window.capitalize(item.name) }}</router-link>
		</div>
		<div ref="grid" class="res-grid-6">
			<div v-for="item in imageArray" :key="item.path" class="gallery-item" >

				<div><img loading="lazy" onerror="this.src = ERROR_IMG" :src="item.path" :alt="item.title" /></div>

				<a :href="item.path" download class="fas fa-download"></a>
				<i class="fas fa-expand" v-on:click="fullscreen(item)"></i>

				<div class="popover">
					<h5>{{ item.title }}</h5>
					<!--<p class="empty"><i class="fas fa-user"></i> {{ item.artist }}</p>-->
					<p class="empty"><i class="far fa-calendar"></i> {{ item.date }}</p>
					<!--<p class="empty"><i class="fas fa-vector-square"></i> {{ item.size }}</p>-->
					<p class="full" v-if="item.animated"><i class="fas fa-file-code"></i> Animated</p>
				</div>
			</div>
		</div>
	</div>`,
	methods: {
		loadType() {
			let tempVersion = this.$route.params.version.toLowerCase()
			if (tempVersion.includes(TYPE_JAVA)) {
				this.currentType         = TYPE_JAVA
				this.currentSections     = window.data.javaSections
				if (tempVersion.includes('64')) {
					this.currentTypeObject = 'c64'
					this.currentRepository = 'Compliance-Java-64x'
				}
				else {
					this.currentTypeObject = 'c32'
					this.currentRepository = 'Compliance-Java-32x'
				}

				this.currentOrganization = 'Compliance-Resource-Pack'
				this.currentBranch = BRANCH_JAVA
			}
			else if (tempVersion.includes(TYPE_BEDROCK)) {
				this.currentType         = TYPE_BEDROCK
				this.currentSections     = window.data.bedrockSections
				if (tempVersion.includes('64')) {
					this.currentTypeObject = 'c64'
					this.currentRepository = 'Compliance-Bedrock-64x'
				}
				else {
					this.currentTypeObject = 'c32'
					this.currentRepository = 'Compliance-Bedrock-32x'
				}

				this.currentOrganization = 'Compliance-Resource-Pack'
				this.currentBranch       = BRANCH_BEDROCK
			} 
			else if (tempVersion.includes(TYPE_DUNGEONS)) {
				this.currentType         = TYPE_DUNGEONS
				this.currentSections     = window.data.dungeonsSections
				this.currentTypeObject   = 'c32' // c64 doesn't exist yet and could be easily implemented like that

				this.currentOrganization = 'Compliance-Dungeons'
				this.currentRepository   = 'Resource-Pack'
				this.currentBranch       = BRANCH_DUNGEONS
			} 
			else if (tempVersion.includes(TYPE_EDUCATION)) {
				this.currentType = TYPE_EDUCATION
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
			var subfolder = '';
			if (this.currentType == TYPE_DUNGEONS) {
				if (string == '/actors/')     { subfolder = '/actors' }
				if (string == '/block/')      { subfolder = '/block_textures'; string = '/Block%20Textures/' }
				if (string == '/components/') { subfolder = '/components' }
				if (string == '/cues/')       { subfolder = '/cues' }
				if (string == '/decor/')      { subfolder = '/decor' }
				if (string == '/dlc3/')       { subfolder = '/dlc3'; string = '/Content_DLC3/' }
				if (string == '/dlc4/')       { subfolder = '/dlc4'; string = '/Content_DLC4/' }
				if (string == '/effects/')    { subfolder = '/effects' }
				if (string == '/materials/')  { subfolder = '/materials' }
				if (string == '/meshes/')     { subfolder = '/meshes' }
				if (string == '/patches/')    { subfolder = '/patches'; string = '/Patch' } // could be '/Patch1/' or '/Patch2/'
				if (string == '/save_icons/') { subfolder = '/save_icons'; string = '/SaveIcons/' }
				if (string == '/textures/')   { subfolder = '/textures' }
				if (string == '/ui/')         { subfolder = '/ui' }
			}
			this.textures = await window.getJson('https://raw.githubusercontent.com/Compliance-Resource-Pack/JSON/main/contributors/' + this.currentType + subfolder + '.json')
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

				else if (this.currentType == TYPE_DUNGEONS) {
					currentItem = '/' + item.version[VERSION_DUNGEONS]
					if (currentItem.startsWith('/Dungeons')) console.log(currentItem);
					/*if (this.currentTypeObject == 'c32')*/ date = item.c32.date || 'Unknown'
					/*else date = item.c64.date || 'Unknown' // for C64x dungeons ()*/
				}

				let artists = await this.getArtists(item)

				if (
						(
							currentItem.toLowerCase().includes(this.searchString.toLowerCase()) 
							|| 
							artists.toLowerCase().includes(this.searchString.toLowerCase())
						) 
					&& 
						currentItem.toLowerCase().includes(string.toLowerCase())
					) {
					tempArray.push({
						title:    currentItem.substring(currentItem.lastIndexOf('/') + 1, currentItem.lastIndexOf('.')).replace(/(.{3})/g,"$1\xAD"),
						name:     currentItem.substring(currentItem.lastIndexOf('/') + 1, currentItem.lastIndexOf('.')),
						path:     'https://raw.githubusercontent.com/' + this.currentOrganization + '/' + this.currentRepository + '/' + this.currentBranch + currentItem,
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

			if (this.currentType == TYPE_EDUCATION) {
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
			this.setNonEmpty()
			this.popoverOffset()
		},
		showResults: async function() {
			this.imageArray = await this.filter('/' + this.$route.params.section + '/')
			this.setNonEmpty()
			this.popoverOffset()
		},
		fullscreen(item) {
			this.$refs.modal_img.src       = item.path
			this.$refs.modal_h1.innerHTML  = item.title
			//this.$refs.modal_author.innerHTML   = '<i class="fas fa-user"></i> ' + item.artist
			this.$refs.modal_date.innerHTML     = '<i class="far fa-calendar"></i> ' + item.date
			if (item.animated) this.$refs.modal_animated.innerHTML = '<i class="fas fa-file-code"></i> Animated'
			else this.$refs.modal_animated.innerHTML = ''
			
			this.$refs.modal.style.display = 'block'

			if (item.animated) {
				var mca = undefined
				// console.log(item)
				// console.log(item.mcmeta)
				if (item.mcmeta) {
					mca = new MCAnimation(item.path, item.mcmeta)
				} else mca = new MCAnimation(item.path)

				this.$refs.modal_canvas.appendChild(mca.canvas)
				this.$refs.modal_canvas.style.display = 'block'
			} else this.$refs.modal_canvas.style.display = 'none'
		},
		closeModal(event) {
			// only close if the user click in the span, the containing div of the img, or the cross
			if (event.srcElement.innerHTML == '×' || event.srcElement.innerHTML.startsWith('<span') || event.srcElement.innerHTML.startsWith('<img') || event.srcElement.innerHTML.startsWith('<canvas')) {
				this.$refs.modal.style.display    = 'none'
				this.$refs.modal_canvas.innerHTML = ''
			}
		},
		setNonEmpty() {
			Vue.nextTick(function () {
				document.querySelectorAll(".empty").forEach(el => {
					const html = el.innerHTML
					if (!html.includes("Unknown")) {
						el.classList.remove("empty")
						el.classList.add("full")
					}
				})
			})
		},
		popoverOffset() {
			Vue.nextTick(function () {
				document.querySelectorAll(".popover").forEach(el => {
					const pos = el.offsetLeft + el.offsetParent.offsetLeft + el.offsetWidth
					var ratio = 3/4 * window.innerWidth
					
					if (window.innerWidth < 1000) ratio = 8/10 * window.innerWidth
					if (window.innerWidth <  835) ratio = 9/10 * window.innerWidth

					if (window.innerWidth > 770) {
						if (pos > ratio) {
							el.classList.add("popover-inverted")
							el.classList.remove("popover")
						}
						else {
							el.classList.add("popover")
							el.classList.remove("popover-inverted")
						}
					}
					else {
						el.classList.add("popover-bottom")
						el.classList.remove("popover")
						el.classList.remove("popover-inverted")
					}

				})

				//console.log(window.innerWidth)
			})
		}
	},
	mounted() {
		this.update()
		window.addEventListener('resize', this.popoverOffset)
	}
}