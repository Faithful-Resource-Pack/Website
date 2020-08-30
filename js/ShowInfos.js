function ShowInfos(imgURL, captionText){
	var panel = document.getElementById("ShowInfos")
	panel.style.width = "85%";

	// Set img
	document.getElementById("SI-img").src = imgURL;

	// Print texture name below img:
	document.getElementById("caption").innerHTML = captionText;

	// WIP
	// call github api to get infos about the texture:
	var auth = 'auth'; // list of authors (Juknum, Robert..;)
	var size = 'size'; // dimensions (32x32, 64x64, ...)
	var date = 'date'; 	
	var uses = ['use1','use2','use3']; // use json (use for blocks textures (result: squidcoast, ...))

	document.getElementById("auth").innerHTML = 'Authors: ' + auth;
	document.getElementById("size").innerHTML = 'Size: ' + size;
	document.getElementById("date").innerHTML = 'Published: ' + date;
	document.getElementById("uses").innerHTML = 'Used in' + uses;

	// set url in text-muted:
	document.getElementById("url").innerHTML = 'URL:' + imgURL;

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