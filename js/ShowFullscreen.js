function ShowFullscreen(imgURL, captionText){
	var modal = document.getElementById("ShowFullscreen")

	modal.style.display = "block";

	// close modal: 
	var span = document.getElementById("SF-Span");
	span.onclick = function() {
		modal.style.display = "none";
	}
	// when pressing escape key:
	$(document).keydown(function(event) { 
		if (event.keyCode == 27) { 
			modal.style.display = "none";
		}
	});

	// set img in modal:
	var img = document.getElementById("SF-Img");
	img.src = imgURL;

	// set caption:
	var caption = document.getElementById("SF-Caption");
	caption.innerHTML = captionText;

	// set button to github:
	var btn = document.getElementById("SF-Btn");
	if (captionText.indexOf("/") == -1){
		btn.setAttribute('href', 'https://github.com/Faithful-Dungeons/Resource-Pack/blob/master/Block%20Textures/' + captionText + '.png');
	} else {
		btn.setAttribute('href', 'https://github.com/Faithful-Dungeons/Resource-Pack/blob/master/UE4Project/' + captionText + '.png')
	}
	btn.setAttribute('target', "_blank");
}