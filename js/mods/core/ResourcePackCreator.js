/* eslint new-cap: 0 */
/* global MinecraftUtils, axios, idb, JSZip, axiosRetry, fetch */

const PATH_PACK_PNG =
  "https://database.faithfulpack.net/images/branding/logos/transparent/512/mods_logo.png";
const MCMETA_DESCRIPTION = "Faithful Mods";

/**
 * Resolves after delay
 * @param {number} delay
 * @param {T|undefined} value
 * @returns {Promise<T|undefined>}
 * @template T
 */
Promise.sleep = (delay, value = undefined) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(value), delay);
  });

/**
 * @callback PromiseCallback
 * @returns {Promise<any>}
 */

/**
 * Executes promises one after the others
 * @param {Array<PromiseCallback>} arr Promise array
 * @param {number} throttle Throttle  in ms
 * @param {number} delay Delay in ms
 * @param {any[]} results Promise results
 * @returns {Promise<any[]>} all results if successful
 */
Promise.throttle = function (arr, throttle, delay, results = []) {
  if (arr.length === 0) return results;

  const start = new Date().getTime();
  const one = arr.shift();

  return one()
    .then((res) => {
      let end = new Date().getTime();
      let duration = end - start;
      return Promise.sleep(duration < throttle ? Math.min(throttle - duration, delay) : delay, res);
    })
    .then((res) => {
      results.push(res);
      return Promise.throttle(arr, throttle, delay, results);
    });
};

/**
 * This callback is displayed as part of the Requester class.
 * @callback LogCallback
 * @param {{ step: number, message: string }} logMessage
 */

/**
 * @typedef ModResponse
 * @type {object}
 * @property {Blob} response Response data
 */

/**
 * @typedef Mod Mod data object
 * @type {object}
 * @property {string} displayName
 * @property {string} name
 * @property {string} repositoryURL
 * @property {string} version
 */

/**
 * @typedef ModSelection Mod selection
 * @type {object}
 * @property {string} name Mod name
 * @property {string} displayName Mod displayed name
 * @property {string} repositoryURL Mod github repo URL
 * @property {string} version mod minecraft version
 */

const ResourcePackCreator = {
  // eslint-disable-line no-unused-vars
  packVersions: Array[String],
  database: undefined,
  databasePromise: undefined,
  storeName: undefined,
  zipOptions: undefined,
  fullPackageVersion: undefined,

  /**
   * Gives package version based on mod selection
   * @param {Array<ModSelection>} modSelection
   * @return {number|undefined} package version or undefined
   */
  modPackageVersion(modSelection) {
    // you can pack mods if they have the same package version number
    // (list of package number must not change)

    // we need mods and versions to be loaded
    if (modSelection.length === 0) {
      return undefined;
    }

    let currentPackageVersion;
    let versionChanged = false;

    let i = 0;
    while (i < modSelection.length && !versionChanged) {
      const tmpPackageVersion = this.packageVersion(modSelection[i].version);

      if (currentPackageVersion === undefined) {
        currentPackageVersion = tmpPackageVersion;
      } else {
        if (currentPackageVersion !== tmpPackageVersion) {
          versionChanged = true;
        }
      }

      ++i;
    }

    return versionChanged ? undefined : currentPackageVersion;
  },

  /**
   * Gives package veriosn based on minecraft version
   * @param {string} modVersion Mod minecraft version
   * @returns {number} mod package version
   */
  packageVersion(modVersion) {
    const numbers = MinecraftUtils.minecraftVersionToNumberArray(modVersion);

    const packageVersionKeys = Object.keys(this.packVersions);

    let i = 0;
    let result = -1;
    while (i < packageVersionKeys.length && result === -1) {
      const otherNumbersMin = MinecraftUtils.minecraftVersionToNumberArray(
        this.packVersions[packageVersionKeys[i]].min,
      );
      const otherNumbersMax = MinecraftUtils.minecraftVersionToNumberArray(
        this.packVersions[packageVersionKeys[i]].max,
      );

      // we compute the corresponding numbers
      const correspondingNumbers = MinecraftUtils.minecraftVersionsToNumbers([
        numbers,
        otherNumbersMin,
        otherNumbersMax,
      ]);

      if (
        correspondingNumbers[0] >= correspondingNumbers[1] &&
        correspondingNumbers[0] <= correspondingNumbers[2]
      ) {
        result = packageVersionKeys[i];
      }

      ++i;
    }

    if (result === -1) {
      throw new Error("No package versions file");
    }

    this.fullPackageVersion = result;

    return result;
  },

  modToDisplayName(mod) {
    return mod.name.displayName;
  },

  modToRepoName(mod) {
    if (mod.name.extRepo) return mod.name.extRepo.split("/").pop();
    else return mod.name.orgRepo;
  },

  modToRepoURL(mod) {
    if (mod.orgRepo) {
      return "https://github.com/Faithful-Mods/" + this.modToRepoName(mod);
    } else {
      return mod.extRepo;
    }
  },

  modToSelection(mod, version = undefined) {
    return {
      name: this.modToRepoName(mod),
      displayName: this.modToDisplayName(mod),
      repositoryURL: this.modToRepoURL(mod, version),
      version: mod.versionSelected || version,
    };
  },

  /**
   * Tells whether the pack can be made or not
   * @param {ModSelection[]} modSelection Given mod selection array
   * @param {number | undefined} modPackageVersion optional found mod package version
   * @returns {boolean} Allowed to make a pack
   */
  canPackMods(modSelection, modPackageVersion = undefined) {
    if (modSelection) {
      return this.modPackageVersion(modSelection) !== undefined;
    }

    return modPackageVersion !== undefined;
  },

  /**
   * Sends request and saves result to db
   * @param {Mod} mod Mod object
   * @returns {Promise<ModResponse>}
   */
  requestDownloadMod(mod) {
    return axios({
      url:
        "https://api.allorigins.win/raw?url=" +
        mod.repositoryURL +
        "/archive/" +
        mod.version +
        ".zip",
      method: "GET",
      responseType: "blob", // important
    }).then((res) => {
      const fileKey = this.fileKey(mod);

      this.database.delete(this.storeName, fileKey).then(() => {
        this.database.put(this.storeName, res.data, fileKey);
      });

      return res;
    });
  },

  fileKey(mod) {
    return mod.name + "-" + mod.version;
  },

  /**
   *
   * @param {*} mod Mod object
   * @param {boolean} forceDownload Force Mod download
   * @param {LogCallback} logListener
   * @returns {Promise<ModResponse>} Mod downloaded or loaded
   */
  getMod(mod, forceDownload = false, logListener = function () {}) {
    if (forceDownload) {
      return this.requestDownloadMod(mod);
    }

    // only proceed if database loaded
    if (typeof this.database === "object" && "get" in this.database) {
      const fileKey = this.fileKey(mod);

      return this.database
        .get(this.storeName, fileKey)
        .then((res) => {
          logListener({
            step: 0,
            message: "Already downloaded " + mod.displayName + " v" + mod.version + " in cache",
          });

          if (res) {
            return Promise.resolve({ data: res });
          }

          // fallback on catch
          return Promise.reject("Download required");
        })
        .catch(() => {
          return this.requestDownloadMod(mod);
        });
    } else {
      return this.requestDownloadMod(mod);
    }
  },

  /**
   *
   * @param {Array<ModSelection>} modSelection Mods selected
   * @param {boolean} forceDownload Force remote download
   * @param {LogCallback} logListener callback listener
   * @returns {Promise<void>}
   */
  downloadLocally(modSelection, forceDownload = false, logListener = function () {}) {
    // database not loaded yet
    if (!this.database) {
      return this.databasePromise.then(() => {
        return this.downloadLocally(modSelection, forceDownload, logListener);
      });
    }

    if (!this.storeName || !this.zipOptions) return Promise.reject("Elements missing");
    if (modSelection.length === 0) return Promise.resolve(); // successfully finished doing nothing

    // create final zip
    const finalZip = new JSZip();

    const promises = [];

    modSelection.forEach((mod) => {
      promises.push(() => {
        logListener({
          step: 0,
          message: "Downloading " + mod.displayName + " v" + mod.version + "...",
        });
        return this.getMod(mod, forceDownload, logListener);
      });
    });

    let success = 0;
    return Promise.throttle(promises, 3000, 20)
      .then((values) => {
        return new Promise((resolve, reject) => {
          this.currentStep = 1;
          values.forEach((res, index) => {
            logListener({
              step: 1,
              message: "Extracting " + modSelection[index].displayName + " into final zip",
            });
            if (res.data.type === "text/xml") {
              console.warn(modSelection[index]);
            }

            const fileKey = this.fileKey(modSelection[index]);

            // load this pack
            const zip = new JSZip();

            zip
              .loadAsync(res.data)
              .then((zip) => {
                const keys = Object.keys(zip.files);

                let newName;
                for (let i = 0; i < keys.length; ++i) {
                  newName = keys[i].replace(fileKey + "/", "");

                  if (newName.trim() !== "") {
                    finalZip.files[newName] = zip.files[keys[i]];
                    finalZip.files[newName].name = newName;
                  }
                }

                ++success;
                // if all archives have been successfully added
                if (success === modSelection.length) {
                  logListener({
                    step: 2,
                    message: "Inserting pack.png and pack.mcmeta into final zip",
                  });

                  fetch(PATH_PACK_PNG)
                    .then((packImage) => {
                      return packImage.blob();
                    })
                    .then((packImageBlob) => {
                      finalZip.file("pack.png", packImageBlob, { blob: true });
                      finalZip.file(
                        "pack.mcmeta",
                        `{"pack": {"pack_format": ${this.fullPackageVersion}, "description": "${MCMETA_DESCRIPTION}"}}`,
                      );

                      logListener({
                        step: 2,
                        message: "Zipping...",
                      });

                      finalZip
                        .generateAsync(this.zipOptions, (metadata) => {
                          logListener({
                            step: 2,
                            message: metadata.percent.toFixed(2),
                          });
                        })
                        .then((blob) => {
                          logListener({
                            step: 3,
                            message: blob,
                          });

                          resolve(); // * SUCCESS
                        })
                        .catch((err) => {
                          console.error(err);
                          reject(err);
                        });
                    })
                    .catch(reject);
                  return;
                }
              })
              .catch(reject);
          });
        });
      })
      .catch((...args) => {
        console.error(...args);
        const error = args[0];
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
        return Promise.reject(...args);
      });
  },

  openDatabase(dataBaseName, databaseVersion, storeName) {
    this.storeName = storeName;

    this.databasePromise = new Promise((resolve, reject) => {
      idb
        .openDB(dataBaseName, databaseVersion, {
          upgrade(db, _oldVersion, _newVersion, _transaction) {
            db.createObjectStore(storeName);
          },
        })
        .then((db) => {
          this.database = db;
          resolve();
        })
        .catch((err) => {
          this.database = 1;
          console.error(err);
          reject(new Error(err));
        });
    });
  },
};
