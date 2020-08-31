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

function getMeta(imgUrl) {
	return new Promise(function(resolve, reject) {

		https.get(imgUrl, function (response) {
			var chunks = [];
			response.on('data', function (chunk) {
				chunks.push(chunk);
			}).on('end', function() {
				var buffer = Buffer.concat(chunks);
				resolve(sizeOf(buffer));
			});
		}).on('error', function(error) {
			reject(error);
		});

	});
}

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

	getJSON(url, function(err, data){
		if (err !== null){
			console.log('Something went wrong: ' + err);
			var authTxt = 'GitHub API error:' + err;
		} else {

			// authors:
			var count = 0;
			const MAX_COUNT = 20;
			var authArr = new Array();
			var authTxt = '';

			while (data[count] !== undefined || count < MAX_COUNT){ // while data isn't broken or count is reached (max 100)
				//console.log(data[count]);
				if(data[count]){
					var author = data[count].committer.login;
					if(author !== undefined) {
						//console.log(author);
						authArr.push(author);
						count++;
					} else { // might be useless
						count = MAX_COUNT;
						authTxt = authArr;
					}
				} else {
					count = MAX_COUNT;
					authTxt = authArr;
				}	
			}

			// date: (last commit)
			var dateTxt = data[0].commit.author.date;
		}
		authTxt = authTxt.toString().replace(/,/g, ", ");
		document.getElementById("auth").innerHTML = '<strong>Authors:</strong> ' + authTxt;

		dateTxt = dateTxt.toString().substring(0, 10).replace(/-/g, '/');
		document.getElementById("date").innerHTML = '<strong>Published:</strong> ' + dateTxt;
	});

	// texture size: 
	axios.get(imgURL).then(function (response) {
		getMeta(imgURL).then(function (dimension) {
			var size = dimension.width + 'x' + dimension.height;

			document.getElementById("size").innerHTML = '<strong>Size:</strong> ' + size;
		}).catch(function(error) {
			console.log('getMeta: ' + error);
		});
	}).catch(function(error) {
		console.log('axios: ' + error);
	});

	// WIP
	// call github api to get infos about the texture:
	var size = 'size'; // dimensions (32x32, 64x64, ...)
	var uses = ['use1','use2','use3']; // use json (use for blocks textures (result: squidcoast, ...))
	
	
	document.getElementById("uses").innerHTML = '<strong>Used in:</strong> ' + uses;

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