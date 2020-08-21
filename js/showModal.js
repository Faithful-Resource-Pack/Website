
function showModal(ModalID, ImgID ,ModalImgID, TextureName, SpanID, BtnID){
	var modal = document.getElementById(ModalID);

	// Get the image and insert it inside the modal - use its "alt" text as a caption
	var btnfull = document.getElementById(BtnID);
	var img = document.getElementById(ImgID);
	var modalImg = document.getElementById(ModalImgID);
	var captionText = document.getElementById(TextureName + "-P");
	var captionBtn = document.getElementById(TextureName + "-DIV")

	var btn = document.createElement("A");
	btn.innerHTML = "See on GitHub";
	btn.classList.add("btn","btn-info","btn-modal");

	var str = TextureName;
	var n = str.indexOf("/")

	// is a block textures
	if (n === -1){
		btn.setAttribute('href', "https://github.com/Faithful-Dungeons/Resource-Pack/blob/master/Block%20Textures/" + TextureName + ".png");
	}
	// isn't it
	else {
		btn.setAttribute('href', "https://github.com/Faithful-Dungeons/Resource-Pack/blob/master/UE4Project/" + TextureName + ".png");
	}

	btn.setAttribute('target', "_blank");

	// click full screen button
	btnfull.onclick = function(){
	  modal.style.display = "block";
	  modalImg.src = img.src;
	  captionText.innerHTML = img.alt;
	  captionBtn.appendChild(btn);
	}
	

	var span = document.getElementById(SpanID);

	// When the user clicks on <span> (x), close the modal
	span.onclick = function(){
		modal.style.display = "none"
	}

	// When user press escape key
	$(document).keydown(function(event) { 
	  if (event.keyCode == 27) { 
	    modal.style.display = "none"
	  }
	});
}