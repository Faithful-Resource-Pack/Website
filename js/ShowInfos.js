function getAuthors(texture, blockTexture){
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

	var count = 0;
	var comits = new Array();
	var	url = 'https://api.github.com/repos/Faithful-Dungeons/Resource-Pack/commits?path=';

	if (blockTexture) {
		url += '/Block%20Textures/' + texture + '.png';
	} else {
		url += '/UE4Project/Content/' + texture + '.png';
	}

	console.log(url);

	getJSON(url, function(err, data) {

		console.log(data);

		if (err !== null) {
			console.log('Something went wrong: ' + err);
		} else {
			while (comitter !== null || count === 100) { // Idk : unless committer is broken -> no more committer			  
			  var comitter = data[count]['committer']['login'];
			  comits.push(comitter); // Add comitter to the list
			  count++;
			}
		}
	});

	return comits;
}

function ShowInfos(imgURL, captionText, blockTexture){
	var panel = document.getElementById("ShowInfos")
	panel.style.width = "85%";

	// Set img
	document.getElementById("SI-img").src = imgURL;

	// Print texture name below img:
	document.getElementById("caption").innerHTML = captionText;

	// WIP
	// call github api to get infos about the texture:
	var auth = getAuthors(captionText, blockTexture);
	var size = 'size'; // dimensions (32x32, 64x64, ...)
	var date = 'date'; 	
	var uses = ['use1','use2','use3']; // use json (use for blocks textures (result: squidcoast, ...))

	document.getElementById("auth").innerHTML = 'Authors: ' + auth;
	document.getElementById("size").innerHTML = 'Size: ' + size;
	document.getElementById("date").innerHTML = 'Published: ' + date;
	document.getElementById("uses").innerHTML = 'Used in' + uses;

	// set url in text-muted:
	document.getElementById("url").innerHTML = 'URL: ' + imgURL;

	// close pannel when pressing escape key:
	$(document).keydown(function(event) { 
		if (event.keyCode == 27) { 
			panel.style.width = "0%";
		}
	});
}

function closeNav() {
	document.getElementById("ShowInfos").style.width = "0";
}