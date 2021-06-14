//var sketch=require('./traceSkeleton.js');
var servicio=require('./servicio.js');

function ServidorWS(){
    this.socket;
    this.name;


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

    this.getName = function(){
        this.socket.emit('getName');
    }

	this.lanzarSocketSrv=function(io, service){
		var cli=this;

		io.on('connection',function(socket){
            //socket on, obtenerIMG, salidaTemporal  
            //asignar variable
            cli.socket=socket;

            socket.on('obtenerCodigo', function() {
                   var code = service.getCodigo();
                   cli.enviarRemitente(cli.socket, 'codigoObtenido', code);             
            });

            socket.on('setName', function(file) {
                cli.enviarRemitente(cli.socket, 'nameSetting', file);
                cli.name = file;
            }); 

            socket.on('confirmar', function(id, tipo) {
                cli.enviarRemitente(cli.socket, 'confirmado', id, tipo);
            }); 

            socket.on('confirm', function() {
                cli.enviarRemitente(cli.socket, 'check');
            }); 

            socket.on('no',function(){
                cli.enviarRemitente(cli.socket,'noCheck');
            })

		});
	}

}

module.exports.ServidorWS=ServidorWS;