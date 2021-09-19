try {
  if(typeof process === 'object') {
    var axios = require("axios").default
  }
} catch(_error) {}

/**
 * @typedef {Object} SearchOption
 * @property {String} field The field you want to search in
 * @property {"!=" | "==" | ">=" | "<=" | "<" | ">" | "in" | "includes" | "startsWith" | "endsWith" | "array-contains" | "array-contains-any" | "array-length-(eq|df|gt|lt|ge|le)" } criteria // filter criteria
 * @property {String | Number | Boolean | Array } value // the value you want to compare
 */

/**
 * @typedef {Object} EditObject
 * @property {String | Number } id the affected element
 * @property {String} field The field you want to edit
 * @property {"set" | "remove" | "append" | "increment" | "decrement" | "array-push" | "array-delete" | "array-splice"} operation Wanted operation on field
 * @property {String | Number | Boolean | Array } [value] // the value you want to compare
 */

/**
 * @typedef {Object} SelectOption
 * @property {Array<String>} fields Chosen fields to eventually return
 */

let _address = undefined
let _token = undefined

const ID_FIELD_NAME = 'id'

const readAddress = () => {
  if(!_address)
    throw new Error('Firestorm address was not configured')
  
  return _address + 'get.php'
}
const writeAddress = () => {
  if(!_address)
    throw new Error('Firestorm address was not configured')
  
  return _address + 'post.php'
}

const writeToken = () => {
  if(!_token)
    throw new Error('Firestorm token was not configured')

  return _token
}

/**
 * Class representing a collection
 * @template T
 */
class Collection {
  /** 
   * @param {String} name The name of the Collection
   * @param {Function?} addMethods Additional methods and data to add to the objects
   */
  constructor(name, addMethods = el => el) {
    this.addMethods = addMethods
    this.collectionName = name
  }

  __add_methods(req) {
    return new Promise((resolve, reject) => {
      req
      .then(el => {
        if(Array.isArray(el)) {
          return resolve(el.map(e => this.addMethods(e)))
        }

        el[Object.keys(el)[0]][ID_FIELD_NAME] = Object.keys(el)[0]
        el = el[Object.keys(el)[0]]

        // else on the object itself
        return resolve(this.addMethods(el))
      }).catch(err => reject(err))
    })
  }

  /**
   * Auto-extracts data from Axios request
   * @param {Promise<T>} request The Axios concerned request
   */
  __extract_data(request) {
    return new Promise((resolve, reject) => {
      request.then(res => {
        if ('data' in res) return resolve(res.data)
        return resolve(res)
      })
      .catch(err => reject(err))
    })
  }

  /**
   * Send get request and extract data from ir
   * @param {Object} data Body data
   * @returns {Promise<Any>} data out
   */
  __get_request(data) {
    const request = typeof process === 'object' ? axios.get(readAddress(), {
      data: data
    }) : axios.post(readAddress(), data)
    return this.__extract_data(request)
  }

  /**
   * Get an element from the collection
   * @param {String|Number} id The entry ID
   * @returns {Promise<T>} Result entry you may be looking for
   */
  get(id) {
    return this.__add_methods(this.__get_request({
      "collection": this.collectionName,
      "command": "get",
      "id": id
    }))
  }

  /**
   * Search through collection
   * @param {SearchOption[]} searchOptions
   * @returns {Promise<T[]>}
   */
  search(searchOptions) {
    if(!Array.isArray(searchOptions))
      return Promise.reject(new Error('searchOptions shall be an array'))

    searchOptions.forEach(searchOption => {
      if(searchOption.field === undefined || searchOption.criteria === undefined || searchOption.value === undefined)
        return Promise.reject(new Error('Missing fields in searchOptions array'))

      if(typeof searchOption.field !== 'string')
        return Promise.reject(new Error(`${JSON.stringify(searchOption)} search option field is not a string`))

      if(searchOption.criteria == 'in' && !Array.isArray(searchOption.value))
        return Promise.reject(new Error('in takes an array of values'))

      //TODO: add more strict value field warnings in JS and PHP
    })

    return new Promise((resolve, reject) => {
      this.__get_request({
        "collection": this.collectionName,
        "command": "search",
        "search": searchOptions
      }).then(res => {
        const arr = []

        Object.keys(res).forEach(contribID => {
          const tmp = res[contribID]
          tmp[ID_FIELD_NAME] = contribID
          arr.push(tmp)
        })

        resolve(this.__add_methods(Promise.resolve(arr)))

      }).catch(err => reject(err))
    })
  }

  /**
   * Search specific keys through collection
   * @param {String[]|Number[]} keys Wanted keys
   * @returns {Promise<T[]>} Search results
   */
  searchKeys(keys) {
    if(!Array.isArray(keys))
      return Promise.reject('Incorrect keys')

    return new Promise((resolve, reject) => {
      this.__get_request({
        "collection": this.collectionName,
        "command": "searchKeys",
        "search": keys
      }).then(res => {
        const arr = []
        Object.keys(res).forEach(contribID => {
          const tmp = res[contribID]
          tmp[ID_FIELD_NAME] = contribID
          arr.push(tmp)
        })

        resolve(this.__add_methods(Promise.resolve(arr)))

      }).catch(err => reject(err))
    })
  }

  /**
   * Returns the whole content of the file
   * @returns {Promise} // the get promise of the collection raw file content
   */
  read_raw() {
    return new Promise((resolve, reject) => {
      this.__get_request({
        "collection": this.collectionName,
        "command": "read_raw"
      })
      .then(data => {
        Object.keys(data).forEach(key => {
          data[key][ID_FIELD_NAME] = key
          this.addMethods(data[key])
        })

        resolve(data)
      })
      .catch(reject)
    })
  }

  /**
   * Upgraded read raw with field selection
   * @param {SelectOption} selectOption Select options
   */
  select(selectOption) {
    if(!selectOption) selectOption = {}
    return new Promise((resolve, reject) => {
      this.__get_request({
        'collection': this.collectionName,
        'command': 'select',
        'select': selectOption
      }).then(data => {
        Object.keys(data).forEach(key => {
          data[key][ID_FIELD_NAME] = key
          this.addMethods(data[key])
        })

        resolve(data)
      })
      .catch(reject)
    })
  }

  /**
   * 
   * @param {String} command The write command you want
   * @param {Object?} value The value for this command 
   * @param {Boolean | undefined} multiple if I need to delete multiple 
   * @returns {Object} Write data object
   */
  __write_data(command, value = undefined, multiple = false) {
    const obj = {
      "token": writeToken(),
      "collection": this.collectionName,
      "command": command
    }
    if(multiple === true && Array.isArray(value)) { // solves errors with undefined and null values
      value.forEach(v => {
        if(typeof value != 'number' && typeof value != 'string' && !Array.isArray(value)) 
          delete v[ID_FIELD_NAME]
      })
    } else if(multiple === false && value != null && value != undefined && typeof value != 'number' && typeof value != 'string' && !Array.isArray(value)) { // solves errors with undefined and null values
      delete value[ID_FIELD_NAME]
    }
    if(value) {
      if(multiple)
        obj["values"] = value
      else
        obj["value"] = value
    }

    return obj
  }

  /**
   * Writes the raw JSON file
   * @param {Object} value The whole JSON to write
   * @returns {Promise<any>}
   */
  write_raw(value) {
    if(value === undefined || value === null) {
      return Promise.reject(new Error('write_raw value must not be undefined or null'))
    }
    return this.__extract_data(axios.post(writeAddress(), this.__write_data('write_raw', value)))
  }

  /**
   * Add automatically a value to the JSON
   * @param {Object} value The value to add
   * @returns {Promise<any>}
   */
  add(value) {
    return new Promise((resolve, reject) => {
      axios.post(writeAddress(), this.__write_data('add', value))
        .then(res => {
          return this.__extract_data(Promise.resolve(res))
        })
        .then(res => {
          if(typeof res != 'object' || !('id' in res) || typeof res.id != 'string') throw(new Error('Incorrect result'))
          resolve(res.id)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  /**
   * Add automatically multiple values to the JSON
   * @param {Object[]} values The values to add
   * @returns {Promise<any>}
   */
  addBulk(values) {
    return new Promise((resolve, reject) => {
    this.__extract_data(axios.post(writeAddress(), this.__write_data('addBulk', values, true)))
      .then(res => {
        resolve(res.ids)
      })
      .catch(reject)
    })
  }

  /**
   * Remove entry with its key from the JSON
   * @param {String | Number} key The key from the entry to remove
   * @returns {Promise<any>}
   */
  remove(key) {
    return this.__extract_data(axios.post(writeAddress(), this.__write_data('remove', key)))
  }

  /**
   * Remove entry with their keys from the JSON
   * @param {String[] | Number[]} keys The key from the entries to remove
   * @returns {Promise<any>}
   */
  removeBulk(keys) {
    return this.__extract_data(axios.post(writeAddress(), this.__write_data('removeBulk', keys)))
  }

  /**
   * Sets an entry in the JSON
   * @param {String} key The key of the value you want to set
   * @param {Object} value The value you want for this key
   * @returns {Promise<any>}
   */
  set(key, value) {
    const data = this.__write_data('set', value)
    data['key'] = key
    return this.__extract_data(axios.post(writeAddress(), data))
  }

  /**
   * Sets multiple entries in the JSON
   * @param {String[]} keys The array of keys of the values you want to set
   * @param {Object[]} values The values you want for these keys
   * @returns {Promise<any>}
   */
  setBulk(keys, values) {
    const data = this.__write_data('setBulk', values, true)
    data['keys'] = keys
    return this.__extract_data(axios.post(writeAddress(), data))
  }

  /**
   * Changes one field from an element in this collection
   * @param {EditObject} obj The edit object
   * @returns {Promise<any>}
   */
  editField(obj) {
    const data = this.__write_data('editField', obj, null)
    return this.__extract_data(axios.post(writeAddress(), data))
  }

  /**
   * Changes one field from an element in this collection
   * @param {EditObject[]} objArray The edit object array with operations
   * @returns {Promise<any>}
   */
  editFieldBulk(objArray) {
    const data = this.__write_data('editFieldBulk', objArray, undefined)
    return this.__extract_data(axios.post(writeAddress(), data))
  }
}

const firestorm = {
  /**
   * @param {String} newValue The new address value
   */
  address: function(newValue = undefined) {
    if(newValue) _address = newValue

    return _address
  },

  /**
   * @param {String} newValue The new write token
   */
  token: function(newValue = undefined) {
    if(newValue) _token = newValue

    return _token
  },
  /**
   * @param {String} name Collection name to get
   * @param {Function?} addMethods Additional methods and data to add to the objects
   */
  collection: function(name, addMethods = el => el) {
    return new Collection(name, addMethods)
  },

  /**
   * 
   * @param {String} name Table name to get
   */
  table: function(name) {
    return this.collection(name)
  },

  ID_FIELD: ID_FIELD_NAME
}

try {
  if(typeof process === 'object') {
    module.exports = firestorm
  }
} catch (_error) {
  // normal browser
}