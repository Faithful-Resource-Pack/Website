const VERSION64 = '1.17';
const VERSION32 = 'Jappa-1.17';
const VERSION_BEDROCK = '1.16.100';
const SIZE    = 256;
const MAX_IMG = 30;

function Hide(id){
	var col1, col2, col3, btn;
	var THIRD = true;

	if (id == 'DUNGEONS-RESULT') THIRD = false;

	btn  = document.getElementById('BTN-'+id);
	col1 = document.getElementById('COL1-'+id);
	col2 = document.getElementById('COL2-'+id);
	if (THIRD) col3 = document.getElementById('COL3-'+id);

	col1.innerHTML = '<h2 class="display-5 m-3 text-center">32x</h2>';
	col2.innerHTML = '<h2 class="display-5 m-3 text-center">Texture Name</h2>';
	if (THIRD) col3.innerHTML = '<h2 class="display-5 m-3 text-center">64x</h2>';

	col1.style.display = 'none';
	col2.style.display = 'none';
	if (THIRD) col3.style.display = 'none';

	btn.style.display = 'none';
}

function Fullscreen(file) {
	var modal      = document.getElementById('FULLSCREEN');
	var modal_img  = document.getElementById('FULLSCREEN-IMG');
	var modal_span = document.getElementById('FULLSCREEN-SPAN');

	modal_img.src = file;
	modal.style.display = 'block';

	//
	// Close modal:
	// 
	modal_span.onclick = function() {
		modal.style.display = 'none';
	};
	// By pressing escape:
	$(document).keydown(function(event) {
		if (event.keyCode == 27) {
			modal.style.display = 'none'
		}
	});

}

function Load_Textures(file,done) {
	console.log('file:' + file);
	var MC_TYPE;
	var THIRD = true;

	if (file.startsWith('/data/java')) {
		MC_TYPE = 'JAVA-RESULT';
	}

	if (file.startsWith('/data/bedrock')) {
		MC_TYPE = 'BEDROCK-RESULT';
	}

	if (file.startsWith('/data/dungeons')) {
		MC_TYPE = 'DUNGEONS-RESULT';
		THIRD = false;
	}

	if (file.startsWith('/data/education')) {
		MC_TYPE = 'EDUCATION-RESULT';
	}

	var btn, col1, col2, col3;

	btn  = document.getElementById('BTN-'+MC_TYPE);
	col1 = document.getElementById('COL1-'+MC_TYPE);
	col2 = document.getElementById('COL2-'+MC_TYPE);
	if (THIRD) col3 = document.getElementById('COL3-'+MC_TYPE);
		
	if (done){
		var old_btn = document.getElementById('load-more');
		old_btn.parentNode.removeChild(old_btn);
	} else {
		Hide(MC_TYPE);
	}

	$.getJSON(file, function(json) {
		for (k in json) {
			if (done) {
				k = parseInt(k,10) + parseInt(done,10);
				MAX = parseInt(MAX_IMG,10) + parseInt(done,10);
			} else {
				MAX = MAX_IMG;
			}
			
			var j = k

			if (k < MAX && k < json.length){
				console.log(k,MAX)

				if (MC_TYPE == 'JAVA-RESULT') {
					col1.innerHTML += 
					`
						<img class="center img-gallery" alt="Not done yet" src="https://raw.githubusercontent.com/Compliance-Resource-Pack/Resource-Pack-32x/` + VERSION32 + `/assets` + json[k] + `" width="` + SIZE + `" height="` + SIZE + `">
						<br>
					`
					col2.innerHTML += 
					`
						<div class="card card-sized">
							<div class="card-body">
								<h4 class="card-title text-center title-top">` + json[k].split("/").pop() + `</h4>
								<h5 class="card-title text-center">See on GitHub:</h5>
								<div class="row">
									<div class="col">
										<a target="_blank" class="btn btn-block btn-success" href="https://github.com/Compliance-Resource-Pack/Resource-Pack-32x/tree/` + VERSION32 + `/assets` + json[k] + `">32x</a>
									</div>
									<div class="col">
										<a target="_blank" class="btn btn-block btn-success" href="https://github.com/Compliance-Resource-Pack/Resource-Pack-64x/tree/master/Jappa/` + VERSION64 + `/assets` + json[k] + `">64x</a>
									</div>
								</div>
								<h5 class="card-title text-center">Fullscreen:</h5>
								<div class="row">
									<div class="col">
										<button class="btn btn-block btn-primary" onclick="Fullscreen('https://raw.githubusercontent.com/Compliance-Resource-Pack/Resource-Pack-32x/` + VERSION32 + `/assets` + json[k] + `')">32x</button>
									</div>
									<div class="col">
										<button class="btn btn-block btn-primary" onclick="Fullscreen('https://raw.githubusercontent.com/Compliance-Resource-Pack/Resource-Pack-64x/master/Jappa/` + VERSION64 + `/assets` + json[k] + `')">64x</button>
									</div>
								</div>
							</div>
						</div>
						<br>
					`
					col3.innerHTML += 
					`
						<img class="center img-gallery" alt="Not done yet" src="https://raw.githubusercontent.com/Compliance-Resource-Pack/Resource-Pack-64x/master/Jappa/` + VERSION64 + `/assets` + json[k] + `" width="` + SIZE + `" height="` + SIZE + `">
						<br>
					`
				}

				if (MC_TYPE == 'BEDROCK-RESULT') {
					col1.innerHTML +=
					`
						<img class="center img-gallery" alt="Not done yet" src="https://raw.githubusercontent.com/Compliance-Resource-Pack/Resource-Pack-32x-Bedrock/master/` + VERSION_BEDROCK + json[k] + `" width="` + SIZE + `" height="` + SIZE + `">
						<br>
					`
					col2.innerHTML += 
					`
						<div class="card card-sized">
							<div class="card-body">
								<h4 class="card-title text-center title-top">` + json[k].split("/").pop() + `</h4>
								<h5 class="card-title text-center">See on GitHub:</h5>
								<div class="row">
									<div class="col">
										<a target="_blank" class="btn btn-block btn-success" href="https://github.com/Compliance-Resource-Pack/Resource-Pack-32x-Bedrock/tree/master/` + VERSION_BEDROCK + json[k] + `">32x</a>
									</div>
									<div class="col">
										<a target="_blank" class="btn btn-block btn-success" href="https://github.com/Compliance-Resource-Pack/Resource-Pack-64x-Bedrock/tree/master/` + VERSION_BEDROCK + json[k] + `">64x</a>
									</div>
								</div>
								<h5 class="card-title text-center">Fullscreen:</h5>
								<div class="row">
									<div class="col">
										<button class="btn btn-block btn-primary" onclick="Fullscreen('https://raw.githubusercontent.com/Compliance-Resource-Pack/Resource-Pack-32x/master/` + VERSION_BEDROCK + json[k] + `')">32x</button>
									</div>
									<div class="col">
										<button class="btn btn-block btn-primary" onclick="Fullscreen('https://raw.githubusercontent.com/Compliance-Resource-Pack/Resource-Pack-64x/master/` + VERSION_BEDROCK + json[k] + `')">64x</button>
									</div>
								</div>
							</div>
						</div>
						<br>
					`
					col3.innerHTML +=
					`
						<img class="center img-gallery" alt="Not done yet" src="https://raw.githubusercontent.com/Compliance-Resource-Pack/Resource-Pack-64x-Bedrock/master/` + VERSION_BEDROCK + json[k] + `" width="` + SIZE + `" height="` + SIZE + `">
						<br>
					`
				}

				if (MC_TYPE == 'DUNGEONS-RESULT') {
					col1.innerHTML +=
					`
						<img class="center img-gallery" alt="Not done yet" src="https://raw.githubusercontent.com/Faithful-Dungeons/Resource-Pack/master/`+ json[k] + `" width="` + SIZE + `" height="` + SIZE + `">
						<br>
					`
					col2.innerHTML += 
					`
						<div class="card card-sized">
							<div class="card-body">
								<h4 class="card-title text-center title-top">` + json[k].split("/").pop() + `</h4>
								<h5 class="card-title text-center">See on GitHub:</h5>
								<div class="row">
									<div class="col">
										<a target="_blank" class="btn btn-block btn-success" href="https://github.com/Faithful-Dungeons/Resource-Pack/tree/master/` + json[k] + `">32x</a>
									</div>
								</div>
								<h5 class="card-title text-center">Fullscreen:</h5>
								<div class="row">
									<div class="col">
										<button class="btn btn-block btn-primary" onclick="Fullscreen('https://raw.githubusercontent.com/Faithful-Dungeons/Resource-Pack/master/` + json[k] + `')">32x</button>
									</div>
								</div>
							</div>
						</div>
						<br>
					`
				}

			}
		}

		if (j > MAX) {
			col2.innerHTML += `<button class="btn btn-block btn-info" id="load-more" onclick="Load_Textures('` + file + `',` + MAX + `)">Load More</button>`
		}
			
		btn.style.display  = 'block';

		col1.style.display = 'block';
		col2.style.display = 'block';
		if (THIRD) col3.style.display = 'block';
	});
}