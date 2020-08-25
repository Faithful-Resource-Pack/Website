function ShowInfos(imgURL, captionText){
	var panel = document.getElementById("ShowInfos")
	panel.style.width = "85%";

	// Set img
	document.getElementById("SI-img").src = imgURL;

	// Print texture name below img:
	document.getElementById("caption").innerHTML = captionText;

	// WIP
	// call github api to get infos about the texture:
	var auth = '-'; // list of authors (Juknum, Robert..;)
	var size = '-'; // dimensions (32x32, 64x64, ...)
	var date = '-'; 	
	var uses = '-'; // use json (use for blocks textures (result: squidcoast, ...))

	document.getElementById("auth").innerHTML = auth;
	document.getElementById("size").innerHTML = size;
	document.getElementById("date").innerHTML = date;
	document.getElementById("uses").innerHTML = uses;

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