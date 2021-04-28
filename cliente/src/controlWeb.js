function ControlWeb($){
	var yo=this;
	var principal;
	var canvas;
	var btn;
	
	this.ponerResultado=function(){
		principal = document.getElementById('main');
		$('#main').remove();
		//document.getElementById('canvasPosition').style.visibility="visible";
		this.mover();
		document.getElementById('canvasPosition').style.visibility="visible";
		document.getElementsByTagName('canvas')[0].style.visibility="visible";
	}

	this.mover=function(){
		var canv1 = document.getElementsByTagName('canvas')[1];
		if(canv1)
			canv1.remove();
        var canv = document.getElementsByTagName('canvas')[0];
        document.getElementById("canvasPosition").appendChild(canv);
        yo.ponerBoton();
       	//canv.canvas.hidden=false;
        //mostrar();
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
		$('#canvasPosition').remove();
		$('#btnDownload').remove();
		document.getElementById("contenedorPrincipal").appendChild(principal);
	}

	this.ponerBoton=function(){
		var cadena = '<div id="download"><input type="button" class="btnFinal" value="Descargar" onClick="descargar()"><input type="button" class="btnFinal" value="Volver Menú" onClick="volver()"></div>';
		var z = document.createElement('p'); // is a node
		z.innerHTML = cadena;
		if(btn){
			document.getElementById("canvasPosition").appendChild(btn);	
		}else{
			document.getElementById("btnDownload").appendChild(z);
		}
		//$('#btnDownload').append(cadena);
	}

	this.crear=function(){
		document.getElementById("contenedorPrincipal").appendChild(canvas);
		yo.ponerResultado();
		//document.getElementById("canvasPosition").appendChild(btn);	
	}
}