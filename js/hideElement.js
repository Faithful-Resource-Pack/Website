// Hide an element if image url is broken
/*
* Usage :
*		<div class="col" id="Element-to-hide">
*			<img href="#" onerror=hideElement(Element-to-hide) />
*		</div>
*/

function hideElement(id) {
	var x = document.getElementById(id);
	if (x.style.display === "none") {
		x.style.display = "block";
	}
	else{
		x.style.display = "none";
	}
}