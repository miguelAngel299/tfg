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
		//document.getElementById('canvasPosition').style.visibility="visible";
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
       	//canv.canvas.hidden=false;
        //mostrar();
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
		//console.log('getHeight+++++'+height.getBoundingClientRect().height);
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
		var cadena = '<div id="download"><input type="button" class="btnFinal" value="Descargar" onClick="descargar()"><input type="button" class="btnFinal" value="Volver Menú" onClick="volver()"></div>';
		var z = document.createElement('p'); // is a node
		z.innerHTML = cadena;
		if(btn){
			document.getElementById("ang").appendChild(btn);	
		}else{
			document.getElementById("btnDownload").appendChild(z);
		}
		//$('#btnDownload').append(cadena);
	}

	this.crear=function(){
		document.getElementById("contenedorPrincipal").appendChild(canvas);
		//yo.ponerResultado(ws.angulo);
		//document.getElementById("canvasPosition").appendChild(btn);	
	}
}