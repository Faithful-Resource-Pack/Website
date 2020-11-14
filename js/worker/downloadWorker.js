/* global ResourcePackCreator */

importScripts('../core/MinecraftUtils.js', '../core/ResourcePackCreator.js', '../axios.min.js', '../jszip.min.js', 'https://unpkg.com/idb@5/build/iife/index-min.js') // eslint-disable-line no-undef

const sendMessage = function (type, content) {
  postMessage({ // eslint-disable-line no-undef
    type: type,
    content: content
  })
}

self.addEventListener('message', ev => { // eslint-disable-line no-undef
  const message = ev.data

  switch (message.channel) {
    case 'createPack':
      const modSelection = message.data.modSelection

      const canPack = ResourcePackCreator.canPackMods(modSelection)

      if (!canPack) {
        console.error('Oh no we can\'t pack your mod selection..')
        return
      }

      ResourcePackCreator.downloadLocally(modSelection, message.data.forceDownload, function (log) {
        sendMessage('log', log)
      })

      break
    case 'fillPackVersions':
      ResourcePackCreator.packVersions = message.data
      break
    case 'fillZipOptions':
      ResourcePackCreator.zipOptions = message.data
      break
    case 'openDatabase':
      ResourcePackCreator.openDatabase(message.data.dbName, message.data.dbVersion, message.data.storeName)
      break
    default:
      break
  }
})
