function ClienteWS(){
	this.socket;
	this.codigo; 
	this.name;

	this.ini=function(){
		this.socket=io.connect(/*Se puede definir una URL*/);
		this.lanzarSocketSrv();
	}

	this.obtenerCodigo=function(){
		this.socket.emit("obtenerCodigo");
	}

	this.setName=function(file){
		this.socket.emit("setName", file);
	}
	
	this.lanzarSocketSrv=function(){
		var cli=this;

		this.socket.on('connect', function(){			
			console.log("conectado al servidor de Ws");
		});

		this.socket.on('avisar',function(){
			//console.log(res);
			//cli.obtenerImg();
			//cliR.obtenerImg();
			mostrar();
		});	

		this.socket.on('codigoObtenido', function(code){
			cli.codigo= code;
		});

		this.socket.on('nameSetting', function(file){
			cli.name= file;
		});
	}

	this.ini();
}