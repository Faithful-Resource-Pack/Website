const favContainer = document.getElementById('favorites')
const template = document.getElementById('template')

const KEY = 'favs' + window.location.pathname

Object.defineProperty(window, 'favorites', {
  get() {
    return JSON.parse(localStorage.getItem(KEY)) || []
  },
  set(value) {
    localStorage.setItem(KEY, JSON.stringify(value))
  }
})

function updateView() {
  if (favorites.length) {
    favContainer.style.display = 'grid'
    favContainer.innerHTML = ''
    let locFavs = favorites
    locFavs.sort((a, b) => {
      if (a.title < b.title) { return -1; }
      if (a.title > b.title) { return 1; }
      return 0;
    })
    locFavs.forEach((item, i) => {
      favContainer.append(template.content.cloneNode(true))
      document.getElementsByClassName('fav_img')[i].src = item.imgURL
      document.getElementsByClassName('img-card')[i].href = item.link
      document.getElementsByClassName('fav_title')[i].innerHTML = item.title
      document.getElementsByClassName('rem-button')[i].onclick = () => { removeFromFavs(item.link) }
    })
  } else {
    favContainer.style.display = 'none'
  }
}

window.addToFavs = function (imgURL, title, link) {
  let newFavs = favorites
  if (!newFavs.some((e) => e.link == link)) {
    newFavs.push({
      imgURL: imgURL,
      link: link,
      title: title
    })
    favorites = newFavs
    updateView()
  }
}

window.removeFromFavs = function (link) {
  let newFavs = favorites
  newFavs.forEach((item, i) => {
    if (item.link == link) newFavs.splice(i, 1)
  })
  favorites = newFavs
  updateView()
}

updateView()
