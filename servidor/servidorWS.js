var sketch=require('./traceSkeleton.js');

function ServidorWS(){
	this.enviarRemitente=function(socket,mens,datos){
        socket.emit(mens,datos);
    };
    this.enviarATodos=function(io,nombreHabS,mens,datos){
        io.sockets.in(nombreHabS).emit(mens,datos);
    };
    this.enviarATodosMenosRemitente=function(socket,nombreHabS,mens,datos){
        socket.broadcast.to(nombreHabS).emit(mens,datos)
    };

	this.lanzarSocketSrv=function(io){
		var cli=this;

		io.on('connection',function(socket){
		});
	}

}

module.exports.ServidorWS=ServidorWS;