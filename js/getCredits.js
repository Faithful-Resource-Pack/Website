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


function getCredits(id, texture){
	var count = 0;
	var comits = new Array();
	var	url = 'https://api.github.com/repos/Faithful-Dungeons/Resource-Pack/commits?path=' + texture;

	getJSON(url, function(err, data) {
		if (err !== null) {
			console.log('Something went wrong: ' + err);
		} else {
			while (comitter !== null || count === 100) { // Idk : unless committer is broken -> no more committer			  
			  comitter = data[count]['commit'][1]['name'];
			  comits.push(comitter); // Add comitter to the list
			  count++;
			}
			document.getElementById(id).innerHTML =  comits;
		}
	};

}














