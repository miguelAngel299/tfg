function ClienteWS(){
	this.socket;
	this.ini=function(){
		this.socket=io.connect(/*Se puede definir una URL*/);
		this.lanzarSocketSrv();
	}

	this.lanzarSocketSrv=function(){
		var cli=this;

		this.socket.on('connect', function(){			
			console.log("conectado al servidor de Ws");
		});
	}

	this.ini();
}