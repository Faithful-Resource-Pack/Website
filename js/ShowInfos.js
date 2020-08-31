
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

function ShowInfos(imgURL, captionText, blockTexture){
	var panel = document.getElementById("ShowInfos")
	panel.style.width = "85%";

	// set GitHub API url:
	var	url = 'https://api.github.com/repos/Faithful-Dungeons/Resource-Pack/commits?path=';
	if (blockTexture) {
		url += '/Block%20Textures/' + captionText + '.png';
	} else {
		url += '/UE4Project/Content/' + captionText + '.png';
	}


	var auth = getJSON(url, function(err, data){

		if (err !== null){
			console.log('Something went wrong: ' + err);
			var authTxt = 'GitHub API error:' + err;

		} else {
			var count = 0;
			var authArr = new Array(); 

			while (data[count] !== undefined || count < 100){ // while data isn't broken or count is reached (max 100)
				if(data[count]){
					var author = data[count].committer.login;
					console.log(author);
					authArr.push(author);
					count++;
				} else {
					var authTxt = authArr;
					count = 100;
				}	
			}
		}

		return authTxt;
		});



	// WIP
	// call github api to get infos about the texture:
	var size = 'size'; // dimensions (32x32, 64x64, ...)
	var date = 'date'; 	
	var uses = ['use1','use2','use3']; // use json (use for blocks textures (result: squidcoast, ...))

	document.getElementById("auth").innerHTML = 'Authors: ' + auth;
	document.getElementById("size").innerHTML = 'Size: ' + size;
	document.getElementById("date").innerHTML = 'Published: ' + date;
	document.getElementById("uses").innerHTML = 'Used in: ' + uses;

	// Set img
	document.getElementById("SI-img").src = imgURL;

	// Print texture name below img:
	document.getElementById("caption").innerHTML = captionText;

	// set url in text-muted:
	document.getElementById("url").innerHTML = 'URL: ' + imgURL;

	// close pannel when pressing escape key:
	$(document).keydown(function(event) { 
		if (event.keyCode == 27) { 
			panel.style.width = "0%";
		}
	});
};

function closeNav() {
	document.getElementById("ShowInfos").style.width = "0";
};