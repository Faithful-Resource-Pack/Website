'use strict';

const fs = require('fs')
const sharp = require('sharp')
const path = require('path')

const THUMBNAIL_DIR = './thumbs/'

const ORIGINAL = undefined
const LARGE = 1200
const BIG = 972
const MEDIUM = 768
const SMOLL = 576 
const FORMATS = ["webp", ORIGINAL]

const DEMI_HOME_IMAGES = {
  glob: ["./image/home/{,poster_}*{32,64}.{png,jpg}"],
  sizes: [545, 483, 393, 273, 545],
  breakpoints: [ORIGINAL, LARGE, BIG, MEDIUM, SMOLL],
  formats: FORMATS
}

const TIER_HOME_IMAGES = {
  glob: ["./image/home/{c,poster\_}*.{png,jpg}", "!./image/home/{,poster_}*{32,64}.{png,jpg}"],
  sizes: [545, 294, 243, 273, 545],
  breakpoints: [ORIGINAL, LARGE, BIG, MEDIUM, SMOLL],
  formats: FORMATS
}

const HOME_SEE_MORE = {
  glob: ["image/home/see_more.png"],
  sizes: [259, 259, 214, 273, 545],
  breakpoints: [ORIGINAL, LARGE, MEDIUM, SMOLL],
  formats: FORMATS
}

const ALL = [
  DEMI_HOME_IMAGES,
  TIER_HOME_IMAGES,
  HOME_SEE_MORE
]

/**
 * Creates thumbnail from information
 * 
 * @param {String} image_path Location of the source image
 * @param {sharp.Sharp} image Sharp image instance
 * @param {sharp.Metadata} metadata loaded image metadata
 * @param {String|undefined} format Output format
 * @param {Number} width Output width
 * @param {Number|undefined} breakpoint Output breakoint
 * @returns Promise<void>
 */
async function make(image_path, image, metadata, format, width, breakpoint) {
  if((breakpoint !== ORIGINAL && metadata.width < width) || (breakpoint === ORIGINAL && format === ORIGINAL))
    return Promise.resolve()

  if(width !== ORIGINAL)
    image = image.resize({ width: width })

  if(format === ORIGINAL)
    format = metadata.format

  if(format === 'webp') {
    image = image.webp({
      quality: 100,
      alphaQuality: 100,
      effort: 6,
      lossless: true,
    })
  } else if (format === 'png') {
    image = image.png({
      compressionLevel: 9,
      effort: 10,
    })
  } else {
    image = image[format]()
  }

  let to = path.join(THUMBNAIL_DIR, image_path)
  const basename = path.basename(image_path).replace(/(\.\w+)+$/,"")
  const dirname = path.dirname(to)
  await fs.promises.mkdir(dirname, { recursive: true })

  to = path.join(dirname, `${basename}` + (breakpoint ? `_${breakpoint}` : '') + `.${format}`)

  console.log(`Saving ${to}...`)
  await image.toFile(to)

  return to
}

function outerHTML (element) {
  var index = element.index();
  var parent = element.parent().clone();
  var child = parent.children()[index];
  parent.empty();
  parent.append(child);
  return parent.html();
}

fs.rmSync(THUMBNAIL_DIR, { recursive: true, force: true });
fs.mkdirSync(THUMBNAIL_DIR, { recursive: true });

async function main() {
  const { globby } = await import('globby')

  ALL.forEach(async group => {
    let found = await globby(group.glob)

    let whole = await Promise.all(found.map(async image_path => {
      let image = await sharp(image_path)
      let metadata = await image.metadata()

      return [image_path, image, metadata]
    }))
    
    whole = whole.map((w) => group.formats.map((f) => [...w, f])).flat()
    whole = whole.map((w) => group.sizes.map((s, s_i) => [...w, s, group.breakpoints[s_i]])).flat()
    
    // make thumbs
    let out_paths = await Promise.all(whole.map(w => make(w[0], w[1].clone(), w[2], w[3], w[4], w[5])))

    let out_associated = out_paths.reduce((acc, cur, i) => {
      if(cur === ORIGINAL) return acc
      let ass_key = path.basename(whole[i][0])
      if(!acc[ass_key]) acc[ass_key] = []

      const latest = [cur.split(path.sep).join('/'), ...whole[i].slice(3)]
      if(latest[1] === ORIGINAL) latest[1] = whole[i][2].format
      latest.splice(2, 1)
      acc[ass_key].push(latest)

      return acc
    }, {})

    // modify the shit of pages for picture tag
    console.log('Modifying index.html page...')
    let $ = require('cheerio').load(fs.readFileSync('_site/index.html'));

    for(let key in out_associated) {
      let assoc = out_associated[key].filter((v,i,a) => a.map(o => o[0]).indexOf(v[0]) === i)
      assoc.sort((a,b) => {
        if(a[1] != b[1]) {
          // sort extensions
          if(a[1] === 'webp') return 0
        } else {
          // sort sizes
          if(a[2] === ORIGINAL && b[2] === ORIGINAL) return 0
          else if(a[2] === ORIGINAL) return 1
          else if(b[2] === ORIGINAL) return -1
          else if(a[2] < b[2]) return 1
          return -1
        }
        return 0
      })
      let image = $(`img[src$="${key}"]`)
      image.replaceWith(
`<picture>
  ${ assoc.map(source => `<source srcset="/${source[0]}"
    ${ source[2] ? `media="(min-width: ${source[2]}px)"` : '' }
  type="image/${source[1]}">`).join('\n') }
    ${ outerHTML(image) }
</picture>`)
    }

    fs.writeFileSync('_site/index.html', $.html())
  })
}

main()