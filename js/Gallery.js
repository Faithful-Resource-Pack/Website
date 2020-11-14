function Hide(id){
	var col1, col2, col3, btn;
	btn  = document.getElementById('BTN-'+id);
	col1 = document.getElementById('COL1-'+id);
	col2 = document.getElementById('COL2-'+id);
	col3 = document.getElementById('COL3-'+id);

	col1.innerHTML = '<h2 class="display-5 m-3 text-center">16x</h2>';
	col2.innerHTML = '<h2 class="display-5 m-3 text-center">32x</h2>';
	col3.innerHTML = '<h2 class="display-5 m-3 text-center">128x</h2>';

	col1.style.display = 'none';
	col2.style.display = 'none';
	col3.style.display = 'none';

	btn.style.display = 'none';
}

function Load_Textures(file,done) {
	console.log('file:' + file);

	var VERSION = '1.17';
	var SIZE    = 256;
	var MAX_IMG = 30;

	var MC_TYPE;

	if (file.startsWith('/data/java')) {
		MC_TYPE = 'JAVA-RESULT';
	}

	var btn, col1, col2, col3;

	btn  = document.getElementById('BTN-'+MC_TYPE);
	col1 = document.getElementById('COL1-'+MC_TYPE);
	col2 = document.getElementById('COL2-'+MC_TYPE);
	col3 = document.getElementById('COL3-'+MC_TYPE);
		
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

			if (k < MAX && k < json.length && MC_TYPE == 'JAVA-RESULT'){
				console.log(k,MAX)
				col1.innerHTML += `<img alt="Not done yet" src="https://raw.githubusercontent.com/Compliance-Resource-Pack/Default-texture/master/Java/` + VERSION + json[k] + `" width="` + SIZE + `" height="` + SIZE + `" class="center img-gallery"><br>`
				col2.innerHTML += `<img alt="Not done yet" src="https://raw.githubusercontent.com/Compliance-Resource-Pack/Resource-Pack-32x/master/Jappa/` + VERSION + `/assets` + json[k] + `" width="` + SIZE + `" height="` + SIZE + `" class="center img-gallery"><br>`
				col3.innerHTML += `<img alt="Not done yet" src="https://raw.githubusercontent.com/Compliance-Resource-Pack/Resource-Pack-64x/master/Jappa/` + VERSION + `/assets` + json[k] + `" width="` + SIZE + `" height="` + SIZE + `" class="center img-gallery"><br>`
			}
		}

		if (j > MAX) {
			col2.innerHTML += `<button class="btn btn-block btn-success" id="load-more" onclick="Load_Textures('` + file + `',` + MAX + `)">Load More</button>`
		}
			
		btn.style.display  = 'block';

		col1.style.display = 'block';
		col2.style.display = 'block';
		col3.style.display = 'block';
	});
}