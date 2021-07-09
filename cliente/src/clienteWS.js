function ClienteWS(){
	this.socket;
	this.codigo; 
	this.name;
	this.angulo;
	this.check=false;

	this.ini=function(){
		this.socket=io.connect(/*Se puede definir una URL*/);
		this.lanzarSocketSrv();
		cw.primerMenu();
	}

	this.obtenerCodigo=function(){
		this.socket.emit("obtenerCodigo");
	}

	this.confirmar=function(id){
		this.socket.emit("confirmar",id, tipo);
	}

	this.setName=function(file){
		this.socket.emit("setName", file);
	}

	this.confirm=function(){
		this.socket.emit("confirm");
	}

	this.noCheck=function(){
		this.socket.emit("noCheck");
	}

	this.lanzarSocketSrv=function(){
		var cli=this;

		this.socket.on('connect', function(){			
			console.log("conectado al servidor de Ws");
		});

		this.socket.on('avisar',function(){
			mostrar();
		});	

		this.socket.on('codigoObtenido', function(code){
			cli.codigo= code;
		});

		this.socket.on('check', function(){
			cli.check= true;

		});

		this.socket.on('check', function(){
			cli.check= false;
			$('#modalGeneral').modal('hide');
			$('#modalGeneral').remove();
		});

		this.socket.on('confirmado', function(id, tipo){
			cw.dialogoConfirmacion("¿Esta seguro?","Asegurese de que desea eliminar el paciente", id, tipo);
		});

		this.socket.on('nameSetting', function(file){
			cli.name= file;
		});
	}

	this.ini();
}