
function showModal(ModalID, ImgID, ModalImgID, TextureName, SpanID, ImgURL){
	var modal = document.getElementById(ModalID);

	// Get the image and insert it inside the modal - use its "alt" text as a caption
	var img = document.getElementById(ImgID);
	var modalImg = document.getElementById(ModalImgID);
	var captionText = document.getElementById(TextureName);

	var btn = document.createElement("A");
	btn.innerHTML = "See on GitHub";
	btn.classList.add("btn","btn-info","btn-modal");
	btn.setAttribute('href', "https://github.com/Faithful-Dungeons/Resource-Pack/blob/master/");

	img.onclick = function(){
	  modal.style.display = "block";
	  modalImg.src = this.src;
	  captionText.innerHTML = this.alt;
	  modal.appendChild(btn);
	}

	var span = document.getElementById(SpanID);

	// When the user clicks on <span> (x), close the modal
	span.onclick = function(){
		modal.style.display = "none"
	}
}