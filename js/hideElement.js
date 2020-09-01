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

	var countMissing = parseInt(document.getElementById("missing-texture").innerHTML, 10) + 1;  // add one each time a texture is missing
	var total = parseInt(document.getElementById("total-texture").innerHTML, 10);
	var missing = (total * 100) / countMissing;

	console.log(total + '-' + countMissing + '-' + missing )

	document.getElementById("missing-texture").innerHTML = countMissing;
	document.getElementById("percentage-texture").innerHTML = missing;

}