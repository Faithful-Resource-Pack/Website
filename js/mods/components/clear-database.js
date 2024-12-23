/* global Vue, indexedDB */
/* eslint no-multi-str: 0 */

export default {
	name: "clear-database",
	template: `
		<label for="clearDatabase" class="block pb-1">Database</label>
		<button
			id="clearDatabase"
			class="btn block btn-dark"
			@click="clearDB"
		>
			Clear database
		</button>
	`,
	methods: {
		clearDB() {
			const dbName = this.$root.$refs.localDownload.dbName;

			// try to close db
			try {
				this.$root.$refs.localDownload.database.close();
			} catch (_err) {}

			const request = indexedDB.deleteDatabase(dbName);
			console.log("Clearing " + dbName + " database...");

			request.onsuccess = function (_event) {
				console.info(dbName + "database cleared.");

				document.location.reload();
			};

			request.onerror = function (event) {
				console.error("Error when clearing database", event);
			};

			request.onblocked = function (_event) {
				console.error("Couldn't delete database due to the operation being blocked");
			};
		},
	},
};
