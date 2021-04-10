/* global XMLHttpRequest, Blob, NAME */
try {
  let NAME // eslint-disable-line
} catch (_e) {}
NAME = 'Compliance Mods' // eslint-disable-line

function downloadFile (url) { // eslint-disable-line no-unused-vars
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest()
    req.open('GET', url, true)
    req.responseType = 'blob'

    const FINAL_NAME = NAME + ' Resource Pack'

    req.onload = function (_event) {
      if (req.status !== 200) {
        reject(req)
        return
      }

      const blob = req.response
      const fileName = FINAL_NAME + ' ' + new Date().getTime() + '.zip'
      const contentType = 'application/zip'

      if (window.navigator.msSaveOrOpenBlob) {
        // Internet Explorer
        window.navigator.msSaveOrOpenBlob(new Blob([blob], { type: contentType }), fileName)
      } else {
        const el = document.getElementById('target')
        el.href = window.URL.createObjectURL(blob)
        el.download = fileName
        el.click()
      }

      resolve()
    }
    req.onerror = function () {
      reject(req)
    }

    req.send()
  })
}
