//var sketch=require('./traceSkeleton.js');

function ServidorWS(){
    this.socket;


	this.enviarRemitente=function(socket,mens,datos){
        socket.emit(mens,datos);
    };
    this.enviarATodos=function(io,nombreHabS,mens,datos){
        io.sockets.in(nombreHabS).emit(mens,datos);
    };
    this.enviarATodosMenosRemitente=function(socket,nombreHabS,mens,datos){
        socket.broadcast.to(nombreHabS).emit(mens,datos)
    };

    this.avisar=function(){
        this.socket.emit('avisar');        
    }

    this.console=function(msg){
        console.log(msg);
    }

	this.lanzarSocketSrv=function(io, service){
		var cli=this;

		io.on('connection',function(socket){
            //socket on, obtenerIMG, salidaTemporal  
            //asignar variable
            cli.socket=socket;
		});
	}

}

module.exports.ServidorWS=ServidorWS;