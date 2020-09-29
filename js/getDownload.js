
// Used in download.html

// Thx to : https://stackoverflow.com/questions/12460378/how-to-get-json-from-url-in-javascript
var getJSON = function(url, callback) {
	var xhr = new XMLHttpRequest();

	xhr.open('GET', url, true);
	xhr.responseType = 'json';

	xhr.onload = function() {
		var status = xhr.status;

		if (status === 200) {
			callback(null, xhr.response);
		} else {
			callback(status, xhr.response);
		}
	};

	xhr.send();
};

function getDownload(id, release, prefix){

	release = release - 1;
	var	url = 'https://api.github.com/repos/Faithful-Dungeons/' + prefix + '/releases';

	getJSON(url, function(err, data) {
		if (err !== null) {
			console.log('Something went wrong: ' + err);
		} else {
			count = data[release]['assets'][0]['download_count'];
			document.getElementById(id).innerHTML = count;
		}
	});
}