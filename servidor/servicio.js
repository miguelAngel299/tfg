const { exec } = require('child_process');
function Servicio(sw){
	this.sw=sw;
	this.throwJavaProg = function(pathFile, codigo, name){
		var data = JSON.stringify(pathFile);
		//var date = JSON.stringify(date);
        var cmd = 'java -jar .\\servidor\\BinaryConverter.jar '+data+' '+codigo+' '+name;
        console.log(cmd);
        
		exec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.error(`error: ${error.message}`);
				return;
			}

			if (stderr) {
				console.error(`stderr: ${stderr}`);
				return;
			}
			//mande un mensaje al cliente con ws, avisar
			process.stdout.write("Imagen creada\n"); 
			//ws.obtenerImg();
			sw.avisar();
			//console.log(`stdout: \n${stdout}`);
		});
	}

	this.getCodigo = function(){
		let cadena="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; //En la consola con letras=cadena.split('') 
		let letras = cadena.split(''); //las separa en letras 
		let maxCadena = cadena.length;
		let codigo=[];
		for(i=0;i<6;i++){
			codigo.push(letras[randomInt(1,maxCadena)-1]);
		}
		return codigo.join('');
	}

	this.getName = function (){
		return sw.name;
	}
}

function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}

module.exports.Servicio=Servicio;