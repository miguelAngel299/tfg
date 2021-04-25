function ControlWeb($){
	var yo=this;
	this.ponerResultado=function(){
		$('#main').remove();
		//document.getElementById('canvasPosition').style.visibility="visible";
		this.mover();
		document.getElementById('canvasPosition').style.visibility="visible";
		document.getElementById('defaultCanvas0').style.visibility="visible";
	}

	this.mover=function(){
        var canv = document.getElementsByTagName('canvas')[0];
        document.getElementById("canvasPosition").appendChild(canv);
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
}