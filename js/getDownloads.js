// Used in download.html
const DEFAULT_ORG = 'Compliance-Resource-Pack'

let cache = {}

async function getJson(url) {
	if (cache.hasOwnProperty(url)) {
	  console.log('cached: ' + url)
	  return cache[url]
	} else {
	  console.log('new: ' + url)
	  let data = await fetch(url).then(response => response.json())
	  cache[url] = data
	  return data
	}
}

async function getDownloads(id, release, org, repo) {
	let	url = `https://api.github.com/repos/${org}/${repo}/releases`
	let data = await getJson(url)
	document.getElementById(id).innerHTML = data[release - 1]['assets'][0]['download_count'] + '<i style="margin-left: 10px" class="fas fa-download"></i>'
}
