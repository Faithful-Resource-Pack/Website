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

	var missing = parseInt(document.getElementById("missing-texture").innerHTML, 10);
	var missing += 1; // add one each time a texture is missing
	document.getElementById("missing-texture").innerHTML = missing;

	//var percentage = document.getElementById("percentage-texure");

	var total = parseInt(document.getElementById("total-texture").innerHTML, 10);
	var missingPER = total * 100 / missing;

	document.getElementById("percentage-texture").innerHTML = missingPER;

	/*
	total => 100%
	missing => 100*total / missing %
	*/

}