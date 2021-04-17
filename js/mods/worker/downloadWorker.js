/* global ResourcePackCreator, self, postMessage, importScripts */

importScripts('../core/MinecraftUtils.js', '../core/ResourcePackCreator.js', '../../axios.min.js', '../jszip.min.js', 'https://unpkg.com/idb@5/build/iife/index-min.js')

const sendMessage = function (type, content) {
  postMessage({
    type: type,
    content: content
  })
}

self.addEventListener('message', ev => {
  const message = ev.data

  let modSelection, canPack
  switch (message.channel) {
    case 'createPack':
      modSelection = message.data.modSelection

      canPack = ResourcePackCreator.canPackMods(modSelection)

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
