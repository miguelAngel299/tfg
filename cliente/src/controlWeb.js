function ControlWeb($){
	var yo=this;
	var principal;
	var canvas;
	var btn;
	var angulo;
	var divAngulo;
	
	this.ponerResultado=function(angulo){
		principal = document.getElementById('main');
		$('#main').remove();
		this.mover(angulo);
		document.getElementById('canvasPosition').style.visibility="visible";
		document.getElementsByTagName('canvas')[0].style.visibility="visible";
	}

	this.mover=function(angulo){
		var canv1 = document.getElementsByTagName('canvas')[1];
		if(canv1)
			canv1.remove();
        var canv = document.getElementsByTagName('canvas')[0];
        document.getElementById("canvasPosition").appendChild(canv);
        yo.ponerAngulo(angulo);
        yo.ponerBoton();
	}

	this.ponerAngulo=function(angulo){
		if(divAngulo)
			document.getElementById("canvasPosition").appendChild(divAngulo);
		
		$('#angulo').remove();
		var cadena = '<h2 id="angulo">Angulo --> '+angulo+'</h2>';
		$('#ang').append(cadena);
		
		
	}

	this.getWidth=function(){
		var width = document.getElementById('canvasPosition');
		return width.getBoundingClientRect().width;
	}

	this.getHeight=function(){
		var height = document.getElementById('canvasPosition');
		return Math.abs(height.getBoundingClientRect().height);
	}

	this.volverPrincipal=function(){
		canvas = document.getElementById('canvasPosition');
		btn = document.getElementById('btnDownload');
		divAngulo = document.getElementById('ang');
		$('#canvasPosition').remove();
		$('#btnDownload').remove();
		$('#ang').remove();
		document.getElementById("contenedorPrincipal").appendChild(principal);
	}

	this.ponerBoton=function(){
		var cadena = '<div id="download" class="botones"><div class="image-download"><label for="btnDescargar">';
		cadena += '<h1 class="icon-download-alt" alt ="Click aquí para subir tu foto" title ="Click aquí para descargar la foto"></h1></label>';
		cadena += '<input id="btnDescargar" type="button" class="btnFinal" value="Descargar" onClick="descargar()"></div>';
		cadena += '</hr>';
		cadena+= '<div class="image-return"><label for="btnFinal">';
		cadena += '<h1 class="icon-undo" alt ="Click aquí para volver al menú" title ="Click aquí para volver al menú"></h1></label>';
		cadena+='<input id="btnFinal" type="button" class="btnFinal" value="Volver Menú" onClick="volver()"></div></div>';
		var z = document.createElement('p'); // is a node
		z.innerHTML = cadena;
		if(btn){
			document.getElementById("ang").appendChild(btn);	
		}else{
			document.getElementById("btnDownload").appendChild(z);
		}
	}

	this.crear=function(){
		document.getElementById("contenedorPrincipal").appendChild(canvas);
	}

	this.mostrarModal=function(h2,p, color){
		$('#miModal').remove();
		var cadena = '<div id="miModal" class="modal"><div class="modal-contenido" style="background-color:'+color+';"><a href="#" style="align-self: flex-end;">X</a><h2>'+h2+'</h2><p>'+p+'</p></div></div>';
		$('#modal').append(cadena);
	}
}