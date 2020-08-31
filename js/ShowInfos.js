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

	var loading = '<div class="spinner-border text-light" style="color: gray!important; width: 7px; height: 7px; margin-bottom: 7px;"></div>'

	// hide old infos with loading spinner
	document.getElementById("auth").innerHTML = '<strong>Authors:</strong> '   + loading;
	document.getElementById("date").innerHTML = '<strong>Published:</strong> ' + loading;
	document.getElementById("size").innerHTML = '<strong>Size:</strong> '      + loading;
	document.getElementById("uses").innerHTML = '<strong>Used in:</strong> '   + loading;

	panel.style.width = "85%";

	// set GitHub API url:
	var	url = 'https://api.github.com/repos/Faithful-Dungeons/Resource-Pack/commits?path=';
	if (blockTexture) {
		url += '/Block%20Textures/' + captionText + '.png';
	} else {
		url += '/UE4Project/Content/' + captionText + '.png';
	}

	$.getJSON(url, function(data) {
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

		authTxt = authTxt.toString().replace(/,/g, ", ");
		document.getElementById("auth").innerHTML = '<strong>Authors:</strong> ' + authTxt;

		dateTxt = dateTxt.toString().substring(0, 10).replace(/-/g, '/');
		document.getElementById("date").innerHTML = '<strong>Published:</strong> ' + dateTxt;
	});

	// Set img
	document.getElementById("SI-img").src = imgURL;

	// textures size (use img from side pannel)
	var img = document.querySelector("#SI-img");
	var width = img.naturalWidth;
	var height = img.naturalHeight;

	document.getElementById("size").innerHTML = '<strong>Size:</strong> ' + width + 'x' + height;

	// used in: (only blocks)
	if (blockTexture) {
		$.getJSON('https://raw.githubusercontent.com/Faithful-Dungeons/Resource-Pack/master/Tools/configs/block_textures.json', function(json) {
			console.log(json);

			var uses = json[captionText + '.png'];
			console.log(uses);
		});
	}

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